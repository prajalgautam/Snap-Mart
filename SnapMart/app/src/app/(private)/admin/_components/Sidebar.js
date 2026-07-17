import Logo from "@/components/Logo";
import { adminMenu } from "@/constants/routes";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Logout from "./Logout";
import { usePathname } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { ROLE_ADMIN } from "@/constants/userRoles";

const Sidebar = () => {
  const pathName = usePathname();
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.roles?.includes(ROLE_ADMIN);

  const bgClass = isAdmin
    ? "h-full px-3 py-4 overflow-y-auto bg-slate-950 border-e border-red-950/60 shadow text-slate-100 flex flex-col justify-between"
    : "h-full px-3 py-4 overflow-y-auto bg-teal-950 border-e border-teal-900/60 shadow text-teal-100 flex flex-col justify-between";

  const activeLinkClass = (isActive) => {
    if (isAdmin) {
      return isActive
        ? "bg-red-600 text-white font-bold shadow-md shadow-red-900/30"
        : "text-slate-300 hover:bg-slate-900 hover:text-white";
    } else {
      return isActive
        ? "bg-teal-600 text-white font-bold shadow-md shadow-teal-900/30"
        : "text-teal-300 hover:bg-teal-900 hover:text-white";
    }
  };

  const iconColorClass = (isActive) => {
    if (isAdmin) {
      return isActive ? "text-white" : "text-slate-400 group-hover:text-white";
    } else {
      return isActive ? "text-white" : "text-teal-400 group-hover:text-white";
    }
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className={bgClass}>
        <div>
          <div className="my-4 mx-2">
            <Logo />
            <div className="mt-3 text-center">
              {isAdmin ? (
                <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  🛡️ Admin Control
                </span>
              ) : (
                <span className="bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  🏪 Merchant Portal
                </span>
              )}
            </div>
          </div>
          <ul className="space-y-2 font-medium mt-6">
            {adminMenu.map((item) => {
              const isActive = pathName.startsWith(item.route);

              if (
                item.allowedRole &&
                (!user || !user.roles?.includes(item.allowedRole))
              )
                return null;

              return (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className={`flex items-center px-3 py-2 rounded-xl text-sm transition-all group ${activeLinkClass(isActive)}`}
                  >
                    <item.Icon
                      className={`w-5 h-5 transition duration-75 ${iconColorClass(isActive)}`}
                    />
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-2 font-medium border-t border-white/10 mt-2 py-2">
          <ThemeSwitcher />
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
