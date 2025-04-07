import React, { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  HashtagIcon,
  UserIcon,
  
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
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

function Header() {
  const token = useSelector((state) => state.auth.JWTtoken);
  return (
    <div>
      {" "}
      <header className=" inset-x top-0 z-50 bg-red-600 text-white">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 flex-row">
            <Link to="/" className="-m-1.5 p-1.5 flex">
              <span className="sr-only">Your Company</span>
              <img
                className="h-14 w-auto bg-white rounded "
                src="/new_tpl_logo.png"
                alt=""
              />
              <div className="text-white font-bold text-xl ml-3 text-center align-baseline text-left">
                {" "}
                TOLARAM <br />
                <span className="text-sm">Premier League </span>
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
                onClick={() => setMobileMenuOpen(false)}
                to="/login"
                className="text-xl font-semibold leading-6 border-2 border-white rounded-lg p-2"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");_w
}
const CustomMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-shrink-0 self-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            {/* <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
            <EllipsisVerticalIcon
              className="h-6 w-6 text-white"
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/rules"}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <HashtagIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Rules</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/admin"}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                    <span>Admin</span>
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
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
  // formatFixed(rewards?.totalPoints , 2)
  const totalPoints = rewards?.totalPoints
    ? numeral(parseFloat(rewards?.totalPoints)).format("0,0.00")
    : 0;
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-lg px-2 py-1 text-sm font-medium  border bg-white">
      {/* <span className="">Wallet: </span> */}
      <CircleStackIcon className="h-5 w-5 text-yellow-500 " />
      <span
        className={`text-bold ${
          totalPoints < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {totalPoints}
      </span>
    </span>
  );
};
export default Header;
