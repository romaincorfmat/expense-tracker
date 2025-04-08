import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0"); // Get day and pad with leading zero
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = d.getFullYear(); // Get full year

  const hours = String(d.getHours()).padStart(2, "0"); // Get hours and pad with leading zero
  const minutes = String(d.getMinutes()).padStart(2, "0"); // Get minutes and pad

  return `${day}-${month}-${year} ${hours}-${minutes}`; // Format as dd-mm-yyyy hh-mm
}

export const formatCurrency = (amount: number | string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export const createUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params);
  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromUrl = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};
