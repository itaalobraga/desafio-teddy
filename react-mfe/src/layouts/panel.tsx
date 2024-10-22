import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function PanelLayout() {
  return (
    <>
      <div className="bg-[#F1F1F1] flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col pl-[calc(15.25rem+5%)] pt-[2.5%] pb-[1rem] pr-[5%] w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
