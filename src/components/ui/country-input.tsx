import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";

// Define the type for country options
interface CountryOption {
  value: string;
  label: string;
}

const CountrySelector: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const options: CountryOption[] = useMemo(() => countryList().getData(), []);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const changeHandler = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Select onValueChange={changeHandler} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pays" />
      </SelectTrigger>
      <SelectContent className="relative p-0">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search countries..."
          className="border bg-white z-10 border-gray-300 fixed -top-2 left-0 rounded-md p-2 mt-2"
        />
        <div className="pt-11">
          {filteredOptions.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
