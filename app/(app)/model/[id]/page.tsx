import BreadcrumbComponent from "@/components/breadcrumb";
import { images } from "@/images/images";
import { topTenModels } from "@/lib/data";
import { convertKshToDollars } from "@/lib/utils";
import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ModelPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const link = `model/${id}`;

  const model = topTenModels.find((model) => model.id === parseInt(id));

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <div className="h-full w-full p-4">
      <BreadcrumbComponent link={link} />

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
          <div className="col-span-1  w-full">
            <div className="relative rounded-xl h-[600px] overflow-hidden border">
              <Image
                src={model?.image}
                alt={model?.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 border border-primary/20 shadow-sm rounded-lg mt-4">
              <h1 className="border-l-4 border-black pl-2  text-lg md:text-xl lg:text-2xl font-bold">
                Contact Info
              </h1>
              <div className="mt-2">
                <span className="text-sm md:text-base">Reach me on:</span>
                <div className="flex gap-4 mt-2">
                  <Link href={`tel:${model.phone}`}>
                    <div className="flex flex-col w-fit py-4 px-6 rounded-lg items-center bg-primary/10 flex-1">
                      <span className="">
                        <Image
                          src={images.Phone}
                          width={32}
                          height={32}
                          alt="Phone"
                        />
                      </span>
                      <span className="text-xs md:text-sm lg:text-base">
                        Phone
                      </span>
                    </div>
                  </Link>
                  <Link
                    href={`https://wa.me/${model.phone}?text=Hi%2C+I+saw+your+profile+on+https%3A%2F%2Fwww.escortspremiumkenya.com`}
                    target="_blank"
                  >
                    <div className="flex flex-col w-fit py-4 px-6 rounded-lg items-center bg-primary/10 flex-1">
                      <span className="">
                        <Image
                          src={images.Whatsapp}
                          width={32}
                          height={32}
                          alt="Whatsapp"
                        />
                      </span>
                      <span className="text-xs md:text-sm lg:text-base">
                        Whatsapp
                      </span>
                    </div>
                  </Link>
                  <Link
                    href={`https://twitter.com/${model.name}`}
                    target="_blank"
                  >
                    <div className="flex flex-col w-fit py-4 px-6 rounded-lg items-center bg-primary/10 flex-1">
                      <span className="">
                        <Image src={images.X} width={32} height={32} alt="X" />
                      </span>
                      <span className="text-xs md:text-sm lg:text-base">
                        (Twitter)
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 p-6 border border-primary/20 shadow-sm rounded-lg">
            <div className="flex flex-col gap-4">
              <h1 className="border-l-4 border-black pl-2  text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                {model?.name}
              </h1>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-6 w-6" />
                    <span className="text-sm md:text-md lg:text-base font-semibold">
                      {model.phone}
                    </span>
                  </div>
                  <div className="flex items-center  gap-2">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm md:text-md lg:text-base font-semibold">
                      {model.phone} (Whatsapp)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm md:text-md lg:text-base font-semibold">
                      email@example.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm md:text-md lg:text-base font-semibold">
                      {model.location} | Nairobi
                    </span>
                  </div>
                  <div className="flex md:hidden justify-center">
                    <span className="text-md bg-clip-text text-transparent bg-linear-to-r from-purple-700 to-primary font-semibold">
                      {model.age} Years
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col w-fit py-4 px-6 rounded-lg items-center bg-primary/10">
                    <span className="text-md md:text-xl font-semibold">
                      {model.age}
                    </span>
                    <span>Years</span>
                  </div>
                </div>

                <div className="flex-1 rounded-lg p-4 bg-primary/10">
                  <h1 className="border-l-4 border-black pl-2  text-lg md:text-xl lg:text-2xl font-bold">
                    About
                  </h1>

                  <p className="mt-2 font-semibold text-xs">
                    {model.description}
                  </p>
                </div>
              </div>

              <div className="grow rounded-lg p-4 bg-primary/10">
                <h1 className="border-l-4 border-black pl-2 text-lg md:text-xl lg:text-2xl font-bold">
                  Services Offered
                </h1>
                <div className="grid grid-cols-2 gap-1">
                  {model.servicesOffered.map((service, index) => (
                    <p
                      key={index}
                      className="mt-2 font-semibold text-xs md:text-sm lg:text-base"
                    >
                      {service}
                    </p>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border border-primary/20 rounded-lg grid grid-cols-2 gap-2 p-4">
                <div className="flex flex-col md:flex-row  gap-2 items-center">
                  <span>
                    <ArrowDownLeftSquare className="size-6 md:size-10" />
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-xs md:text-sm">
                      Incalls per hour as from
                    </span>
                    <span className="font-semibold text-xs">
                      Ksh{" "}
                      <span className="text-lg">
                        {model.priceInCall} ($
                        {convertKshToDollars(model.priceInCall)})
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <span>
                    <ArrowUpRightSquare className="size-6 md:size-10" />
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-xs md:text-sm">
                      Outcalls per hour as from
                    </span>
                    <span className="font-semibold text-xs">
                      Ksh{" "}
                      <span className="text-lg">
                        {model.priceOutCall} ($
                        {convertKshToDollars(model.priceOutCall)})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
