"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { BiBook, BiLineChart } from "react-icons/bi";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BsController } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import SidebarLink from "./sidebar-link";
import { IRootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ImgLoader } from "@/helpers/helper";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logout } from "@/redux/auth/authSlice";
import { ThreeDots } from "react-loader-spinner";
import { BiError } from "react-icons/bi";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [expanded, setExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const pathname = usePathname();

  const { user, authLoading, isLogged } = useSelector(
    (store: IRootState) => store.user
  );
  console.log("USER: ", user);
  if (!pathname.includes("/learn")) return <div className="w-0"></div>;

  return (
    <header className="z-20 border-r bg-white transition-all">
      <nav className="sticky top-0 h-full max-h-[100svh] flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300">
        {/* logo & toggle*/}
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
          {/* <button
            type='button'
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Close' : 'Open'}
            className='w-10 h-10 rounded-md bg-main text-mainTxt flex items-center justify-center focus-visible:outline-main focus-visible:bg-white focus-visible:text-main hover:bg-white border-2 hover:border-main hover:text-main transition duration-300'
          >
            {expanded ? (
              <LuChevronFirst size={20} />
            ) : (
              <LuChevronLast size={20} />
            )}
          </button> */}

          {/* alternative toggle */}
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
        {(isLogged && !user.gradeLevel) ||
          (!user.educationLevel && (
            <button
              onClick={() => {
                router.push("/kyc");
              }}
              className="flex py-1 px-1 rounded-sm text-sm justify-center border-[1px] border-black bg-rose-300/50 text-black font-semibold items-center gap-3"
            >
              Action Required <BiError size={25} color="orangered" />
            </button>
          ))}

        {/* main nav */}
        <ul className="flex flex-col gap-4 min-w-full py-4">
          <SidebarLink
            path="/learn"
            text="Learn"
            icon={<BiBook size={25} className="group-hover:text-main" />}
            expanded={expanded}
          />
          <SidebarLink
            path="/learn/performance"
            text="Performance"
            icon={
              <BiLineChart
                size={25}
                className="group-hover:text-main justify-self-center"
              />
            }
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
            icon={<BsController size={25} className="group-hover:text-main" />}
            expanded={expanded}
          />
          <SidebarLink
            path="/learn/help"
            text="Help"
            icon={<MdHelpOutline size={25} className="group-hover:text-main" />}
            expanded={expanded}
          />
        </ul>

        {/* user details / profile */}
        {authLoading ? (
          <div className="w-full flex justify-center items-center border-t">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#8a4c7d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : isLogged ? (
          <div className="border-t flex pt-2">
            <Image
              src={user.profile_picture ?? ""}
              alt="profile"
              width={20}
              height={20}
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
              className={`overflow-hidden absolute p-2 bg-white z-10 transition-all duration-300 w-full left-full bottom-2 shadow-md rounded-md ${
                expanded && showMore
                  ? "visible -translate-x-0 py-2 opacity-100"
                  : "invisible -translate-x-3 opacity-0"
              }`}
            >
              <button
                type="button"
                className="w-full bg-main text-mainTxt text-center px-4 py-1.5 rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="w-full bg-main text-mainTxt text-center px-4 py-1.5 rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Sidebar;
