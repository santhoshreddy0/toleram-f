import React from "react";
import { Link } from "react-router-dom";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import "../../../styles/matches.css";

function Matches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();
  console.log(matches);

  if (isLoading) {
    return <Loader />;
  }
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = dateTime.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };
  const filteredMatches = matches.matches.filter(
    (match) => match.can_show === "1"
  );

  return (
    <>
      <MenuTabs>
        <div className="matches-container">
          {filteredMatches.map((match) => (
            <div key={match.id} className="match">
              <Link to={`/matches/${match.id}`} className="match-link">
                <div className="shadow-xl">
                  <div className="team">
                    <img
                      src={match.team_one_logo}
                      alt={match.team_one_name}
                      className="team-image"
                    />
                    <p className="team-name">{match.team_one_name}</p>
                  </div>
                  <div>
                    <div className="vs">
                      <img src="/vs.png" alt="VS" className="vs-image" />
                    </div>
                    <div className="match-details">
                      <p className="match-date-time">
                        {formatDateTime(match.match_time)}
                      </p>
                    </div>
                  </div>
                  <div className="team">
                    <img
                      src={match.team_two_logo}
                      alt={match.team_two_name}
                      className="team-image"
                    />
                    <p className="team-name">{match.team_two_name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </MenuTabs>
    </>
  );
}

export default Matches;
