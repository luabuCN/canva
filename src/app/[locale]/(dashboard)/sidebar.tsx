import { Logo } from "./logo";
import SidebarRoutes from "./sidebar-route";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
      <Logo />
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
