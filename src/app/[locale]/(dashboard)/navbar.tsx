import UserButton from "@/app/features/auth/components/user-button";
import LocaleSwitch from "@/components/localeSwitch";

const Navbar = () => {
  return (
    <div className="w-full flex items-center p-4 h-[68px]">
      <div className="ml-auto gap-4 flex items-center justify-center">
        <UserButton />
        <LocaleSwitch />
      </div>
    </div>
  );
};

export default Navbar;
