import { Button } from "./ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import { images } from "@/images/images";

const CTAHome = () => {
  return (
    <div className="h-fit w-full p-4 mt-4 flex flex-col">
      <div className="border overflow-hidden rounded-lg grid grid-cols-2 shadow">
        <div className="bg-linear-to-r from-primary/50 via-primary/50 to-primary/5 flex items-center justify-center h-full w-full gap-8 p-2">
          <Image
            src={images.Silhoute2}
            alt="Silhoute2"
            width={200}
            height={200}
            className=""
          />
          <Image
            src={images.Silhoute3}
            alt="Silhoute3"
            width={200}
            height={200}
            className=""
          />
        </div>
        <div className="p-8 bg-primary/5">
          <h1 className="font-bold text-center text-2xl">
            Are you an escort in Kenya ? <br />
            Create your escort profile today and get listed.
          </h1>
          <p className="text-center text-lg font-cookie mt-2">
            VIP Listing Guarantees you a spot in Kenya listing page and A VIP
            Tag on your profile for Best Visibility MAXIMUM EXPOSURE as an
            escort in Kenya.
          </p>

          <div className="flex justify-center mt-4">
            <Button
              className="flex items-center hover:cursor-pointer gap-2"
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
