import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-1/4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
      <input
        type="text"
        className="bg-transparent text-zinc-400 outline-none border border-zinc-700 py-1 pl-9 pr-3  rounded-full w-full focus:border-main-color"
        placeholder="Search users..."
      />
    </div>
  );
};

export default SearchBar;
