import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  PackageSearch,
  LayoutList,
  SquarePlus,
  ArrowBigDownDash,
  Menu,
  X,
} from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import BaseButton from "../components/baseButton_temp";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard></LayoutDashboard>,
    },
    {
      to: "/products",
      label: "Products",
      icon: <PackageSearch></PackageSearch>,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: <LayoutList></LayoutList>,
    },
    {
      to: "/newProduct",
      label: "New Product",
      icon: <SquarePlus></SquarePlus>,
    },
    {
      to: "/lowStockProducts",
      label: "Low Stock",
      icon: <ArrowBigDownDash></ArrowBigDownDash>,
    },
  ];
  const [isDark, setIsDark] = useDarkMode();

  const isLoggedIn = true;
  const location = useLocation();
  const activeNavItem = navItems.find((item) =>
    location.pathname.startsWith(item.to)
  );
  const currentTitle = activeNavItem?.label || "Dashboard";

  return (
    <div className="h-screen flex bg-gray-50 relative overflow-hidden dark:bg-black ">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 md:min-h-fit h-screen w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out border-r-4 rounded-r-xl border-black/75 dark:border-white/75 
        ${sidebarOpen ? "translate-x-0 md:relative " : "-translate-x-full "} 
         flex-shrink-0 dark:bg-dark-secondary-elevated`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase dark:text-gray-200">
            Inventory App
          </h1>
          <nav className="space-y-2">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex  px-4 py-2  rounded-lg transition-colors  ${
                    isActive
                      ? "bg-gray-200 font-semibold dark:text-black"
                      : "text-gray-600 hover:bg-gray-100  dark:text-gray-200 dark:hover:text-gray-800"
                  }`
                }
              >
                <span className="mx-2">{icon}</span> <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overla */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 dark:bg-dark-main">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center dark:bg-dark-secondary-elevated ">
          <div className="flex items-center gap-2">
            <BaseButton
              className="text-gray-700"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              {sidebarOpen ? (
                <X
                  size={24}
                  className="dark:text-white hover:scale-110 transition-all"
                />
              ) : (
                <Menu
                  size={24}
                  className="dark:text-white hover:scale-110 transition-all"
                />
              )}
            </BaseButton>
            <h2 className="text-xl text-gray-800 dark:text-gray-200">
              {currentTitle}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <span className="text-sm font-medium text-gray-700 dark:text-neutral-200">
                Admin
              </span>
            ) : (
              <BaseButton className="text-sm text-neutral-700 hover:text-black hover:scale-110 dark:text-neutral-200 dark:hover:text-neutral-400">
                Login
              </BaseButton>
            )}
            <BaseButton
              onClick={() => setIsDark(!isDark)}
              className="px-3 py-1 border rounded dark:border-neutral-500 dark:text-neutral-300 hover:scale-105"
            >
              {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </BaseButton>
          </div>
        </header>

        <main className="p-6 overflow-auto h-[calc(100vh-64px)] transform transition-transform duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
