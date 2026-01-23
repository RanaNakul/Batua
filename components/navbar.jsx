import React from "react";
import { Wallet } from "lucide-react";
import { ThemeToggleButton } from "./ui/skiper-ui/skiper26";

const Navbar = () => {
  return (
    <div className="relative z-20 mt-5 2xl:mt-7 gap-6 mx-auto text-primary flex items-center   mb-6 px-7 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-full shadow-md ">
      <div className="flex gap-2 items-center text-[#F2A900] ">
        <Wallet className="text-[#F2A900]   " size={32} />
        <p className="text-[29px] font-semibold tracking-tight text-[#F2A900]">Batua </p>
        <p className="  border border-[#F2A900] bg-neutral-200 dark:bg-neutral-700 rounded-full px-2">
          v1.1
        </p>
      </div>
      <ThemeToggleButton variant="circle" blur="on" start="top-center" />
    </div> 
  );
};

export default Navbar;
