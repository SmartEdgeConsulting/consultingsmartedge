"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departmentProps } from "@/types";

const SelectDepartment = ({
  onSelectChange,
  departments,
}: {
  departments: departmentProps[];
  onSelectChange: (value: string) => void;
}) => {
  const [selected, setSelected] = React.useState<string>("");

  const handleValueChange = (value: string) => {
    setSelected(value);
    onSelectChange(value);
  };

  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departments</SelectLabel>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((department) => {
            return (
              <SelectItem key={department._id} value={department.department}>
                {department.department}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDepartment;
