"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrlQuery, removeKeysFromUrl } from "@/lib/utils";

const DropDownSearch = ({ route }: { route: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get("transactionType") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = createUrlQuery({
          params: searchParams.toString(),
          key: "transactionType",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrl({
            params: searchParams.toString(),
            keysToRemove: ["transactionType"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, searchParams, router, query, pathname, route]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {searchQuery || "Select transaction type"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setSearchQuery("");
          }}
        >
          ALL
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSearchQuery("EXPENSE");
          }}
        >
          EXPENSE
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSearchQuery("INCOME");
          }}
        >
          INCOME
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownSearch;
