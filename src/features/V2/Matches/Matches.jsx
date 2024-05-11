import React from "react";
import { Link } from "react-router-dom";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import { FireIcon } from "@heroicons/react/20/solid";
// import "../../../styles/matches.css";

function Matches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();
  console.log(matches);

  if (isLoading) {
    return <Loader />;
  }
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateTime);
    const dateParts = formattedDate.split(" ");
    dateParts[0] = dateParts[0].substring(0, 3); // Truncate the month to the first 3 characters
    const truncatedDate = dateParts.join(" ");
    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${truncatedDate} ${formattedTime}`;
  };
  const filteredMatches = matches.matches.filter(
    (match) => match.can_show === "1",
  );

  return (
    <>
      <MenuTabs>
        <div className="matches-container flex flex-col">
          {filteredMatches.map((match) => {
            if (match.can_bet == "0") {
              return <></>;
            }
            return (
              <div
                key={match.id}
                className="match flex align-middle justify-center flex-col p-4 "
              >
                <Link
                  to={`/matches/${match.id}`}
                  className="bg-gray-800 rounded-xl relative"
                >
                  {match.can_bet == "1" && (
                    <div className="relative">
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 animate-ping" />
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 " />
                    </div>
                  )}

                  <div className="py-4">{match.match_title}</div>
                  <div className="shadow-xl flex align-middle justify-center px-1">
                    <div className="team flex flex-col align-middle my-3">
                      <img
                        className="inline-block h-32 w-24 rounded-full"
                        src={match.team_one_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_one_name}
                      </p>
                    </div>
                    <div>
                      <div className="vs flex justify-center align-middle">
                        <img src="/vs.png" alt="VS" className="vs-image w-16" />
                      </div>
                      <div className="match-details">
                        <p className="match-date-time m-0 text-center text-green-600 font-semibold">
                          {formatDateTime(match.match_time)}
                        </p>
                      </div>
                    </div>
                    <div className="team flex flex-col align-middle my-3">
                      <img
                        className="inline-block h-32 w-24 rounded-full"
                        src={match.team_two_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_two_name}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`${
                      match.can_bet == "1"
                        ? "bg-green-500 font-semibold text-lg"
                        : " bg-gray-500 "
                    } text-white w-full py-2 rounded-b-xl`}
                  >
                    {" "}
                    {match.can_bet == "1" ? "Bet Now" : "View Bets"}{" "}
                  </button>
                </Link>
              </div>
            );
          })}
          {filteredMatches.map((match) => {
            if (match.can_bet == "1") {
              return <></>;
            }
            return (
              <div
                key={match.id}
                className="match flex align-middle justify-center flex-col p-4 "
              >
                <Link
                  to={`/matches/${match.id}`}
                  className="bg-gray-800 rounded-xl relative"
                >
                  {match.can_bet == "1" && (
                    <div className="relative">
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 animate-ping" />
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 " />
                    </div>
                  )}

                  <div className="py-4">{match.match_title}</div>
                  <div className="shadow-xl flex align-middle justify-center px-1">
                    <div className="team flex flex-col align-middle">
                      <img
                        className="inline-block h-32 w-24 rounded-full"
                        src={match.team_one_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_one_name}
                      </p>
                    </div>
                    <div>
                      <div className="vs flex justify-center align-middle">
                        <img src="/vs.png" alt="VS" className="vs-image w-16" />
                      </div>
                      <div className="match-details">
                        <p className="match-date-time m-0 text-center text-green-600 font-semibold">
                          {formatDateTime(match.match_time)}
                        </p>
                      </div>
                    </div>
                    <div className="team flex flex-col align-middle my-3">
                      <img
                        className="inline-block h-32 w-24 rounded-full"
                        src={match.team_two_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_two_name}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`${
                      match.can_bet == "1"
                        ? "bg-green-500 font-semibold text-lg"
                        : " bg-gray-500 "
                    } text-white w-full py-2 rounded-b-xl`}
                  >
                    {" "}
                    {match.can_bet == "1" ? "Bet Now" : "View Bets"}{" "}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </MenuTabs>
    </>
  );
}

export default Matches;
