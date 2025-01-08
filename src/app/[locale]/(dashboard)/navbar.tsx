import UserButton from "@/app/features/auth/components/user-button";

const Navbar = () => {
  return (
    <div className="w-full flex items-center p-4 h-[68px]">
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
