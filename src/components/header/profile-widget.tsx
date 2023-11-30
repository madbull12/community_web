"use client";

import React, { FC } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import UserAvatar from "../user-avatar";
import { User } from "next-auth";

type Props = {
  user: User;
};
const ProfileWidget: FC<Props> = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex-[0.2] group focus:outline-none  cursor-pointer p-2 hover:bg-violet-50 rounded-sm transition-all ease-in-out duration-100">
          <section className="flex items-center gap-x-2 ">
            <UserAvatar
              src={user?.image as string}
              className="rounded-sm"
              fallback={user?.name?.split("")[0].charAt(0) as string}
            />
            <div className="mr-auto flex flex-col items-start">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs ">
                Points: <span className="text-gray-500">22</span>
              </p>
            </div>
            <ChevronDown />
          </section>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My stuff</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>User Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>View Options</DropdownMenuLabel>
          <div className="flex justify-between px-2 py-1.5 items-center ">
            <Label htmlFor="dark-mode">Dark Mode</Label>

            <Switch
              id="dark-mode"
              className="data-[state=checked]:bg-purple-700"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileWidget;
