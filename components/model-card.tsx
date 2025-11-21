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
            <div>
              <h3 className="font-bold text-white">
                {model.name} - {model.phone}
              </h3>
              <p className="text-sm text-white/60">
                {model.location} | Nairobi
              </p>
            </div>
            <Button className="rounded-full cursor-pointer">
              <LucidePhoneCall className="size-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ModelCard;
