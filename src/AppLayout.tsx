import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="ml-[250px] w-full">
        <Outlet />
      </main>
    </div>
  );
}
