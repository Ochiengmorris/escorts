import { Model } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { LucidePhoneCall } from "lucide-react";
import Link from "next/link";

const ModelCard = ({ model }: { model: Model }) => {
  return (
    <Link
      href={`/model/${model.id}`}
      className="hover:scale-[103%] transition-all"
    >
      <Card key={model.id} className="h-full w-full p-0 overflow-hidden">
        <CardContent className="p-0 h-[320px] relative">
          <Image
            src={model.image}
            alt={model.name}
            className="h-full w-full object-cover transition-all"
          />
          <div className="absolute top-0 left-0 right-0 h-full w-full bg-linear-to-b from-transparent via-transparent  to-black transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 right-0 p-4  flex transition-all duration-1000 items-center justify-between">
            <div className="w-full">
              <h3 className="font-bold hidden md:block text-base bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                {model.name} - {model.phone}
              </h3>
              <div className="md:hidden flex items-center justify-between w-full gap-2">
                <h3 className="font-bold text-xs">
                  <span className="text-base bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                    {model.name}
                  </span>
                  <br />
                  <span className="text-white">{model.phone}</span>
                </h3>
                <Button className="rounded-full cursor-pointer">
                  <LucidePhoneCall className="size-3" />
                </Button>
              </div>
              <p className="text-xs md:text-sm text-white/60">
                {model.location} | Nairobi
              </p>
            </div>
            <Button className="rounded-full cursor-pointer hidden md:block">
              <LucidePhoneCall className="size-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ModelCard;
