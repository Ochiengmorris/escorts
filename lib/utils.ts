import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert ksh to dollars - roundoff to 2 decimal places
export function convertKshToDollars(ksh: number) {
  return parseFloat((ksh / 129).toFixed(2));
}
