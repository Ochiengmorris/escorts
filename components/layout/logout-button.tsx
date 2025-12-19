"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient
          .signOut()
          .then(() => {
            toast.success("Logged out successfully!");
          })
          .finally(() => {
            router.refresh();
          })
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
