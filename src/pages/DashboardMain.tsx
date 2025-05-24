import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-40  top-0 left-0 md:min-h-fit h-screen w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0 md:relative " : "-translate-x-full "} 
         flex-shrink-0 `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Inventory App
          </h1>
          <nav className="space-y-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {label}
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-700"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Login
            </button>
            <span className="text-sm font-medium text-gray-700">Admin</span>
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
