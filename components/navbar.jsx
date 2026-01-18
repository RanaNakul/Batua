import React from "react";
import { Wallet } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="relative z-20 mt-5 2xl:mt-7 gap-6 mx-auto text-primary flex items-center  mb-6 px-7 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-full shadow-md ">
      <div className="flex gap-2 items-center">
        <Wallet className="  " size={32} />
        <p className="text-[29px] font-semibold tracking-tight">Batua </p>
        <p className="  border border-primary bg-neutral-200 dark:bg-neutral-700 rounded-full px-2">
          v1
        </p>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
