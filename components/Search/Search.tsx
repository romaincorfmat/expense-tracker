import React from "react";
import SearchBar from "./SearchBar";
import DropDownSearch from "./DropDownSearch";

const Search = () => {
  return (
    <div className=" w-full flex items-center gap-6">
      <SearchBar route="/expenses" />
      <DropDownSearch route="/expenses" />
    </div>
  );
};

export default Search;
