import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function PanelLayout() {
  return (
    <>
      <div className="bg-[#F1F1F1] flex h-screen">
        <Sidebar />

        <div className="flex flex-col p-[5%] w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
