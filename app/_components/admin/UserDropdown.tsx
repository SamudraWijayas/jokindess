"use client";

import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import Image from "next/image";
import Cookies from "js-cookie";

interface User {
  name: string;
  avatar?: string;
}

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.useRef<HTMLAnchorElement | null>(null);
  const popoverDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { cookie: `token=${Cookies.get("token")}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setUser(data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    fetchUser();
  }, []);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
      setDropdownPopoverShow(true);
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          if (dropdownPopoverShow) {
            closeDropdownPopover();
          } else {
            openDropdownPopover();
          }
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <Image
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/profil.jpg" // Default avatar jika tidak ada
              alt="User profile"
              width={48}
              height={48}
              priority
            />
          </span>
          <p className="pl-4 text-white">{user?.name || "Guest"}</p>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? "block" : "hidden"
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        <p className="text-sm py-2 px-4 font-bold w-full whitespace-nowrap text-blueGray-700">
          {user?.name || "Guest"}
        </p>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => e.preventDefault()}
        >
          Profile
        </a>
        <a
          href="#"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => e.preventDefault()}
        >
          Settings
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="/logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
