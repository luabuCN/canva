import UserButton from "@/app/features/auth/components/user-button";
import LocaleSwitch from "@/components/localeSwitch";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center p-4 h-[68px]">
      <div className="ml-auto gap-4 flex items-center justify-center">
        <a
          href="https://github.com/luabuCN/canva"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="hover:opacity-75 transition-opacity" />
        </a>
        <UserButton />
        <LocaleSwitch />
      </div>
    </div>
  );
};

export default Navbar;
