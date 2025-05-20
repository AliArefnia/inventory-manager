import { Outlet, NavLink } from "react-router-dom";

function dashboard() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6 text-center">Inventory App</h1>
        <nav className="space-y-4 flex flex-col items-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Settings
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Products
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">login</button>
            <span className="text-gray-800">role</span>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default dashboard;
