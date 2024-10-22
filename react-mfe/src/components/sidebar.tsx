import { NavLink, useNavigate } from "react-router-dom";
import { FiBriefcase, FiInfo, FiLogOut, FiUsers } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { USER_TOKEN_STORAGE_KEY } from "../constants";
import { User } from "../types/user";

const menu = [
  {
    to: "/about",
    label: "Sobre",
    icon: <FiInfo size={24} />,
  },
  {
    to: "/partners",
    label: "Parceiros",
    icon: <FiUsers size={24} />,
  },
  {
    to: "/companies",
    label: "Empresas",
    icon: <FiBriefcase size={24} />,
  },
];

export function Sidebar() {
  const [user, setUser] = useState<null | User>(null);
  const navigate = useNavigate();
  const hasMountedRef = useRef(false);
  const currentYear = new Date().getFullYear();

  function handleGetLoggedUser() {
    const storedUser = localStorage.getItem(USER_TOKEN_STORAGE_KEY);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;

      setUser(parsedUser);

      if (Date.now() > parsedUser.expiresAt && !parsedUser.remember) {
        navigate("/", { replace: true });
      }
    }

    if (hasMountedRef.current) {
      navigate("/", { replace: true });
    }
  }

  function handleLogout() {
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY);

    setUser(null);

    navigate("/", { replace: true });
  }

  function handleHasMounted() {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
    }
  }

  useEffect(handleGetLoggedUser, []);

  useEffect(handleHasMounted, []);

  return (
    <aside className="py-[2.5rem] shrink-0 px-[1.5rem] gap-[.75rem] bg-white flex flex-col w-[15.25rem]">
      <div className="flex flex-col gap-[0.5rem] items-center mb-[1.5rem]">
        <img
          src="https://cdn.prod.website-files.com/5f778340ed26b167bd087abe/6344597814a5fd82d686b41b_teddy%20bear.png"
          className="rounded-full w-[4rem] h-[4rem] object-contain"
        />

        <h1>@{user?.username}</h1>
      </div>

      {menu.map(({ label, to, icon }) => {
        return (
          <NavLink
            key={to}
            to={to}
            className="[&.active]:bg-[#575756] flex items-center gap-[0.5rem] [&.active]:text-white p-[0.75rem] rounded text-[#575756] font-[500] hover:bg-[#5757565a]"
          >
            {icon}

            {label}
          </NavLink>
        );
      })}

      <div className="mt-auto flex flex-col gap-[1rem]">
        <button
          type="button"
          className="p-[0.75rem] flex items-center gap-[0.5rem] text-[#575756] font-[500] self-start"
          onClick={handleLogout}
        >
          <FiLogOut size={24} />
          Sair
        </button>

        <small className="text-[#808080] self-center">
          Ítalo Braga | {currentYear}
        </small>
      </div>
    </aside>
  );
}
