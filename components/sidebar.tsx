"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { BiBook, BiLineChart, BiLogIn, BiLogOut } from "react-icons/bi";
import { LuChevronFirst } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { useRouter } from "next/navigation";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BsController } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import SidebarLink from "./sidebar-link";
import { IRootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ImgLoader } from "@/helpers/helper";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logout } from "@/redux/auth/authSlice";
import { BiError } from "react-icons/bi";
import Skeleton from "./skeleton";
import { GiBrain } from "react-icons/gi";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [expanded, setExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const { user, authLoading, isLogged } = useSelector(
    (store: IRootState) => store.user
  );

  return (
    <header className="max-md:hidden z-20 border-r bg-white transition-all">
      <nav className="sticky top-0 h-full max-h-[100svh] flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300">
        {/* logo*/}
        <div
          className={`relative flex ${
            expanded ? "gap-0" : "flex-col gap-4"
          } justify-between items-center`}
        >
          <Link href="/">
            <h1 className="text-main flex text-xl items-center font-bold">
              <Image src={logo} alt="" width={40} height={40} />
              <span
                className={`overflow-hidden transition-all uppercase ${
                  expanded ? "ml-4" : "w-0 ml-0"
                }`}
              >
                Octo
              </span>
            </h1>
          </Link>

          {/* toggle */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Close" : "Open"}
            className="absolute top-1 -right-10 w-7 h-8 rounded-r-md bg-white border-r border-y text-main flex items-center justify-center"
          >
            <LuChevronFirst
              size={20}
              className={`${
                !expanded ? "rotate-180" : ""
              } transition duration-500`}
            />
          </button>
        </div>

        {/* alert */}
        {!authLoading && isLogged && !user.gradeLevel && (
          <button
            onClick={() => {
              router.push("/auth/kyc");
            }}
            className="flex items-center p-2 rounded-md text-sm border border-main bg-main/20 text-altTxt "
          >
            <BiError size={25} color="orangered" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all ${
                expanded ? "ml-4" : "w-0 ml-0"
              }`}
            >
              Action Required
            </span>
          </button>
        )}

        {/* main nav */}
        {authLoading ? (
          <Skeleton type="profile" />
        ) : (
          <ul className="flex flex-col gap-4 min-w-full py-4">
            <SidebarLink
              path="/learn"
              text="Learn"
              icon={<BiBook size={25} className="group-hover:text-main" />}
              expanded={expanded}
            />
            <SidebarLink
              path="/learn/practice"
              text="Practice"
              icon={<GiBrain size={25} className="group-hover:text-main" />}
              expanded={expanded}
            />
            <SidebarLink
              path="/learn/lessons"
              text="Your Lessons"
              icon={
                <MdFormatListBulletedAdd
                  size={25}
                  className="group-hover:text-main"
                />
              }
              expanded={expanded}
            />
            <SidebarLink
              path="/learn/games"
              text="Games"
              icon={
                <BsController size={25} className="group-hover:text-main" />
              }
              expanded={expanded}
            />
            <SidebarLink
              path="/learn/help"
              text="Help"
              icon={
                <MdHelpOutline size={25} className="group-hover:text-main" />
              }
              expanded={expanded}
            />
          </ul>
        )}

        {/* user details / profile */}
        {authLoading ? (
          <Skeleton type="profile" />
        ) : isLogged ? (
          <div className="border-t flex pt-2">
            <Image
              src={user.profile_picture ?? ""}
              alt="profile"
              width={40}
              height={40}
              loader={ImgLoader}
              className="w-10 h-10 rounded-md bg-main text-mainTxt"
            />
            <div
              className={`relative
              flex justify-between items-center gap-4
              overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-main">
                  {user.firstName} {user.lastName}
                </h4>
                <span className="text-xs text-altTxt">{user.email}</span>
              </div>
              <button
                type="button"
                title="more"
                className=""
                onClick={() => setShowMore(!showMore)}
              >
                <MdMoreVert size={20} />
              </button>
            </div>

            {/* logout | theme switch */}
            <div
              className={`overflow-hidden absolute p-2 bg-white z-10 transition-all duration-300 w-fit left-full bottom-2 shadow-md rounded-md ${
                expanded && showMore
                  ? "visible -translate-x-0 py-2 opacity-100"
                  : "invisible -translate-x-3 opacity-0"
              }`}
            >
              <button
                type="button"
                className="w-full flex items-center gap-2 bg-main text-mainTxt text-center px-4 py-1.5 rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300"
                onClick={() => dispatch(logout())}
              >
                <BiLogOut size={25} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className={`tracking-widest text-mainTxt text-sm rounded-md p-2 font-medium flex items-center bg-main focus-visible:outline-main focus-visible:text-main $`}
          >
            <BiLogIn size={25} />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all ${
                expanded ? "ml-4" : "w-0 ml-0"
              }`}
            >
              Login
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Sidebar;
