import {
  Link,
  Outlet,
} from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-72 bg-black border-r border-slate-800 p-6">
        <h1 className="text-5xl font-bold text-blue-500 mb-12">
          GigFlow
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl text-xl"
          >
            Dashboard
          </Link>

          <Link
            to="/leads"
            className="bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl text-xl"
          >
            Leads
          </Link>

          <Link
            to="/users"
            className="bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl text-xl"
          >
            Users
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10 bg-[#020617]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;