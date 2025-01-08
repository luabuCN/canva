"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Loader, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

const UserButton = () => {
  const session = useSession();
  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }
  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }
  const name = session.data?.user?.name!;
  const imageUrl = session.data?.user?.image;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled={false} onClick={() => {}} className="h-10">
          <CreditCard className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10" onClick={() => {}}>
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
