import React from "react";
import { LuSchool } from "react-icons/lu";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DarkMode } from "@/DarkMode";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Navbar = () => {
  const user = true;
  return (
    <>
      <div className="h-20 bg-white border-b dark:bg-black dark:border-b-gray-800 border-b-gray-200 duration-300 z- shadow-md ">
        {/* desktop */}
        <div className="max-w-7xl  mx-auto hidden md:flex justify-between items-center h-full gap-10 ">
          <div className="flex  justify-center items-center gap-3">
            <LuSchool className="h-8 w-8" />
            <h1 className="md:block hidden font-extrabold text-2xl">
              SkillKro
            </h1>
          </div>

          <div className="flex justify-center items-center gap-5">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Learning</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="edit-profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Setting</DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline">Login</Button>
                <Button>Sinup</Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>
        {/* mobile  */}
        <div className="flex justify-between md:hidden items-center px-4 h-full ">
          <h1 className="font-extrabold text-2xl">skill-Kronus</h1>
          <MobileNavbar />
        </div>
      </div>
    </>
  );
};

export const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200 "
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>skill-kronus</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <Link to="/edit-profile">
            <span>Edit Profile</span>
          </Link>
          <span>Log out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
