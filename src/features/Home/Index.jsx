import React from "react";
import { teams } from "../../Data/teams";
import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="pt-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl capitalize">
              Tolaram Premier League
            </h1>
            {/* <p className="mt-6 text-sm md:text-lg leading-8 text-gray-600">
              Get ready to witness the clash of cricketing talents as our
              employees showcase their skills, passion, and competitive spirit
              on the grandest stage.
              <br />
              Stay tuned for updates, fixtures, and match highlights as we
              embark on this thrilling journey of the Tolaram Premier League.
              Let the games begin!
            </p> */}
            {/* <Link
              to={'/login'}
              type="button"
              className="mt-16 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </Link> */}
            <div className="mt-14 flex items-center justify-center gap-x-3">
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="font-bold text-2xl my-3">Match Schedule</div>
        <div className="relative">
          <HomeMatches />
        </div>
      </div> */}
      {/* Logo cloud */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
        <div className="font-bold text-2xl my-3">TPL teams</div>

        <div className="mx-auto grid max-w-lg grid-cols-2 md:grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5 mb-5">
          {teams.slice(1).map((t) => (
            <div className="flex-col">
              <img
                className=" inline-block h-36 md:h-60 w-60 rounded-full"
                src={`${t.image}`}
                alt="team"
                width={158}
                height={48}
              />
              <div className="text-sm text-gray-400">{t?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Index;
