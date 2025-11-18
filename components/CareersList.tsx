"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SelectDepartment from "./Select";
import { Search } from "lucide-react";
import CareerCard from "./CareerCard";
import { departmentProps, jobProps } from "@/types";



const CareersPagination = ({departments, availableJobs} :{departments: departmentProps[], availableJobs: jobProps[] }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [jobSearch, setJobSearch] = useState("");
  const [jobs, setJobs] = useState(availableJobs);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const currentItems = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const searchJobs = () => {
    const searchTerm = jobSearch.trim().toLowerCase();

    if (searchTerm) {
      const newJobs = availableJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchTerm) ||
          job.jobDescription.toLowerCase().includes(searchTerm)
      );
      setJobs(newJobs);
    } else {
      setJobs(availableJobs);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobSearch(value);

    if (value === "") {
      setJobs(availableJobs);
      setCurrentPage(1);
    }
  };

  const onSelectChange = (value: string) => {
    if (value === "all") {
      setJobs(availableJobs);
    } else {
      const newJobs = availableJobs.filter((job) => job.department.department === value);
      setJobs(newJobs);
    }
    setCurrentPage(1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      {/** Filter and search secondarytion */}
      <div className="w-full mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search for Jobs"
              value={jobSearch}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchJobs();
              }}
              className="flex-1"
            />
            <Button size="md" onClick={searchJobs}>
              Search
            </Button>
          </div>

          <div>
            <SelectDepartment onSelectChange={onSelectChange} departments={departments}/>
          </div>
        </div>
      </div>

      {/* availableJobs List */}
      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="text-slate-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-slate-600 text-lg font-medium">
            No jobs found matching your search
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((job) => (
            <CareerCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {jobs.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => goToPage(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default CareersPagination;
