import React, { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  HashtagIcon,
  InformationCircleIcon,
  TrophyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unsetCredentials } from "../../Utils/AuthSlice";
import { useGetRewardsQuery } from "../../app/Services/betHistory";
import {
  CircleStackIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { format, formatFixed } from "indian-number-format";
import numeral from "numeral";
import { baseApi } from "../../app/Services/baseApi";
import { isAdmin } from "../../Utils/Helpers";
import AdminBanner from "../../Components/Banner/AdminBanner";

function Header() {
  const token = useSelector((state) => state.auth.JWTtoken);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-20 w-full border-b border-[#f9d274]/20 bg-[linear-gradient(110deg,rgba(9,22,36,0.92),rgba(9,18,30,0.8))] text-white shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <nav
            className="flex items-center justify-between p-4 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1 flex-row">
              <Link to="/" className="-m-1.5 p-1.5 flex">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-14 w-auto rounded border border-[#f9d274]/60 bg-white/95 shadow-[0_0_20px_rgba(249,210,116,0.24)]"
                  src="/TplLogo.png"
                  alt=""
                />
                <div className="ml-3 text-left text-white">
                  <p className="text-2xl font-black tracking-[0.06em]">
                    TOLARAM
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#f5dea0]">
                    Premier League
                  </p>
                </div>
              </Link>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end text-white">
              {token ? (
                <div className="flex gap-1">
                  <Wallet />
                  <CustomMenu />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full border border-[#f9d274]/65 bg-[#f9d274] px-7 py-2 text-sm font-bold uppercase tracking-[0.15em] leading-6 text-[#1a1304] transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#ffe39a] hover:shadow-[0_0_24px_rgba(249,210,116,0.45)]"
                >
                  Log in
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      {isAdmin(token) && isAdminRoute ? <AdminBanner /> : <></>}
    </>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
  _w;
}
const CustomMenu = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.JWTtoken);

  return (
    <div className="flex flex-shrink-0 self-center">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full border border-[#f9d274]/30 bg-[#0b1b2b]/70 p-2 text-gray-400 transition hover:border-[#f9d274]/75 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon
              className="h-6 w-6 text-[#f8e4ae]"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-[#f9d274]/25 bg-[#071321] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/rules"}
                    className={classNames(
                      active ? "bg-gray-800 text-gray-100" : "text-gray-200",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <HashtagIcon className="mr-3 h-5 w-5 text-gray-100" />
                    <span>Rules</span>
                  </Link>
                )}
              </Menu.Item>

              {isAdmin(token) ? (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"/admin/dashboard"}
                      className={classNames(
                        active ? "bg-gray-800 text-gray-100" : "text-gray-200",
                        "flex px-4 py-2 text-sm"
                      )}
                    >
                      <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Admin</span>
                    </Link>
                  )}
                </Menu.Item>
              ) : (
                <></>
              )}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/discussions"}
                    className={classNames(
                      active ? "bg-gray-800 text-gray-100" : "text-gray-200",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Discussions</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      dispatch(baseApi.util.resetApiState());
                      dispatch(unsetCredentials());
                    }}
                    className={classNames(
                      active ? "bg-gray-800 text-gray-100" : "text-gray-200",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <ArrowRightStartOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Log out</span>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const Wallet = () => {
  const { data: rewards, isLoading, isError } = useGetRewardsQuery();

  const totalPoints = rewards?.totalPoints
    ? numeral(parseFloat(rewards.totalPoints)).format("0,0")
    : 0;

  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-full border border-[#f9d274]/55 bg-[#081523]/90 px-3 py-1 text-sm font-medium shadow-[0_0_20px_rgba(249,210,116,0.14)]">
      <CircleStackIcon className="h-5 w-5 text-yellow-500" />
      <span
        className={`font-bold ${
          parseFloat(rewards?.totalPoints) < 0
            ? "text-red-500"
            : "text-[#8ce99a]"
        }`}
      >
        {totalPoints}
      </span>
    </span>
  );
};
export default Header;
