"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrlQuery, removeKeysFromUrl } from "@/lib/utils";

const SearchBar = ({ route }: { route: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get("name") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = createUrlQuery({
          params: searchParams.toString(),
          key: "name",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrl({
            params: searchParams.toString(),
            keysToRemove: ["name"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, searchParams, router, query, pathname, route]);

  return (
    <div className="flex items-center max-h-[40px] border border-gray-300 rounded-lg p-2">
      <Search />
      <Input
        type="text"
        placeholder="Search..."
        className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
