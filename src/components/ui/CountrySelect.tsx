import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useState } from "react";
import countryList from "react-select-country-list";
import { Input } from "./input";

interface Props {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function CountrySelect({ name, value, onValueChange }: Props) {
  const options = React.useMemo(() => countryList().getData(), []);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select name={name} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Choisir votre pays" />
      </SelectTrigger>
      <SelectContent className="relative pt-[50px]">
        <Input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="fixed top-2 bg-white z-10 left-1/2 -translate-x-1/2 w-[95%]"
        />
        {filteredOptions.map((option) => (
          <SelectItem key={option.value} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
