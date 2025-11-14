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

const SelectDepartment = ({
  onSelectChange,
}: {
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
          <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
          <SelectItem value="Engineering">Engineering</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Product">Product</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Customer Success & Sales">
            Customer Success & Sales
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDepartment;
