import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export const title = "Breadcrumb";

export default function BreadcrumbComponent({ link }: { link: string }) {
  const links = link.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-semibold">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={"/"} className="capitalize font-semibold">
                {link}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
