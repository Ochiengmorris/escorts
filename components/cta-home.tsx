import { Button } from "./ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import { images } from "@/images/images";

const CTAHome = () => {
  return (
    <div className="h-fit w-full p-4 mt-4 flex flex-col">
      <div className="border overflow-hidden rounded-lg grid grid-cols-1 md:grid-cols-2 shadow">
        <div className="md:bg-linear-to-r bg-linear-to-b  from-primary/50 via-primary/50 to-primary/5 flex items-center justify-center h-full w-full gap-8 md:p-2 p-6">
          <Image
            src={images.Silhoute2}
            alt="Silhoute2"
            // width={200}
            // height={200}
            className="size-40"
          />
          <Image
            src={images.Silhoute3}
            alt="Silhoute3"
            // width={300}
            // height={300}
            className="size-80"
          />
        </div>
        <div className="p-8 bg-primary/5 flex flex-col justify-center ">
          <h1 className="font-bold text-center text-xl md:text-2xl">
            Are you an escort in Kenya ? <br />
            Create your escort profile today and get listed.
          </h1>
          <p className="text-center text-md md:text-lg font-cookie mt-2">
            VIP Listing Guarantees you a spot in Kenya listing page and A VIP
            Tag on your profile for Best Visibility MAXIMUM EXPOSURE as an
            escort in Kenya.
          </p>

          <div className="flex justify-center mt-4">
            <Button
              className="flex items-center hover:cursor-pointer gap-2 text-xs md:text-sm"
              size={"lg"}
            >
              Register Now
              <ArrowRightCircle className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAHome;
