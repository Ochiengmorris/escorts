"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NairobiAreas } from "@/lib/data";

const HomeTags = () => {
  const [area, setArea] = useState("");
  const [place, setPlace] = useState("");
  return (
    <div className="border-b border-primary/50 h-fit w-full p-4 flex flex-col gap-2">
      <h3 className="text-2xl font-bold">
        Find the best escorts in Nairobi today!
      </h3>
      <p className="text-xl font-bold text-primary/90 font-cookie">
        Browse our selection of <span className="uppercase">escorts</span> and
        find the perfect match for you.
      </p>

      <div className="flex gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for places in Nairobi ..."
            defaultValue={area}
            onChange={(e) => setArea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setArea(e.currentTarget.value);
              }
            }}
            className="pl-10 focus-visible:ring-0 focus-visible:border-primary/50 h-full"
          />
        </div>

        <Select value={place} onValueChange={(value) => setPlace(value)}>
          <SelectTrigger className="max-w-[140px] flex-1 focus-visible:ring-0 focus-visible:border-primary/50">
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All areas</SelectItem>
            {Object.values(NairobiAreas).map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HomeTags;
