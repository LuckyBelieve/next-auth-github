"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState();
  const [onTopPage, setOnTopPage] = useState(true);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
    if (window.scrollY === 0) {
      setOnTopPage(true);
    } else {
      setOnTopPage(false);
    }
  }, []);
  return (
    <nav className="py-5 px-8 border-b flex justify-between items-center z-10">
      <div>
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/assets/logo.svg"}
            width={30}
            height={30}
            alt="githview logo"
          />
          <h1 className=" font-semibold text-lg">GithView</h1>
        </Link>
      </div>
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={`/profile?email=${session?.user.email}`}>
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex">
        {session?.user ? (
          <div className="">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {/*  */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={`/profile?email=${session?.user.email}`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
