import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import sarajevoText from "../assets/SarajevoText.png";
import axios from "axios";

// Define the types
interface Score {
  current: number;
  display: number;
  period_1: number;
  period_2: number;
  normal_time: number;
}

interface Team {
  id: number;
  sport_id: number;
  category_id: number;
  venue_id: number;
  manager_id: number;
  name: string
}

interface League {
  id: number;
  sport_id: number;
  section_id: number;
  slug: string;
  name: string;
}

interface Season {
  id: number;
  league_id: number;
  slug: string;
  name: string;
  year_start: number;
}

interface Match {
  id: number;
  start_at: string;
  home_score: Score;
  away_score: Score;
  home_team: Team;
  away_team: Team;
  league: League;
  season: Season;
  status: string;
}

interface ApiResponse {
  data: Match[];
}

export const Matches = () => {
  const [pastMatchIndex, setPastMatchIndex] = useState<number | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [timeRemaining, setTimeRemaining] = useState('');

  const renderTeamName = (teamName: string) => {
    if (teamName === "FK Sarajevo") {
      return (
        <img src={sarajevoText} alt="Sarajevo" style={{ height: "30px" }} />
      );
    }
    return <h5>{teamName}</h5>;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      const options = {
        method: "GET",
        url: "https://sportscore1.p.rapidapi.com/teams/4683/events",
        params: { page: "1" },
        headers: {
          "x-rapidapi-key": "3fcc40fb90msh5e5417aa2b3c53ep138fc7jsnc6cb7b292f67",
          "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request<ApiResponse>(options);
        const matchesData = response.data.data;
        setMatches(matchesData);

        const now = new Date();
        let foundPastMatchIndex: number | null = null;

        for (let i = 0; i < matchesData.length; i++) {
          const match = matchesData[i];
          const startAt = new Date(match.start_at);

          if (startAt < now) {
            foundPastMatchIndex = i;
            break;
          }
        }

        setPastMatchIndex(foundPastMatchIndex);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (pastMatchIndex !== null && matches[pastMatchIndex]) {
        const matchStartTime = new Date(matches[pastMatchIndex-1].start_at).getTime();
        const now = new Date().getTime();
        const timeDifference = matchStartTime - now;

        if (timeDifference > 0) {
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeRemaining('0:00:00');
        }
      } else {
        setTimeRemaining('No match found');
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [pastMatchIndex, matches]);

  return (
    <div className="matches">
      <Row className="matches-row">
        <Col xs={5} className="matches-col">
          <h2 className="matches-col-title">Last matches:</h2>
          <div className="d-flex ml-auto">
            <div className="matches-col-details">
              <div className="matches-col-date">
              {pastMatchIndex !== null && matches[pastMatchIndex+1] ? (
                  <>
                    <p>{new Date(matches[pastMatchIndex+1].start_at).getDate()}</p>
                    <p>
                      {new Date(
                        matches[pastMatchIndex+1].start_at
                      ).toLocaleString("default", { month: "short" })}
                    </p>
                  </>
                ) : (
                  <>
                    <p>24</p>
                    <p>Aug</p>
                  </>
                )}
              </div>
              <div className="matches-col-result">
              {pastMatchIndex !== null && matches[pastMatchIndex+1] ? (
                  <>
                    <span>
                      {matches[pastMatchIndex+1].league.name}{" "}
                      {new Date(
                        matches[pastMatchIndex+1].start_at
                      ).toLocaleTimeString()}
                    </span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex+1].home_team.name)}
                      </p>
                      <p className="matches-col-goals">
                        {pastMatchIndex !== null && matches[pastMatchIndex+1] && matches[pastMatchIndex+1].home_score ? (
                          matches[pastMatchIndex+1].away_score.current
                        ) : (
                          <></>                          
                        )}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex+1].away_team.name)}
                      </p>
                      <p className="matches-col-goals">
                        {pastMatchIndex !== null && matches[pastMatchIndex+1] && matches[pastMatchIndex+1].away_score ? (
                          matches[pastMatchIndex+1].away_score.current
                        ) : (
                          <><br/>postponed</>  
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span>m:tel premier liga 20:45</span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Gosk gabela")}
                      </p>
                      <p className="matches-col-goals">1</p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Sarajevo")}
                      </p>
                      <p className="matches-col-goals">3</p>
                    </div>
                  </>
                )}
              </div>
              <div className="matches-col-date">
                {pastMatchIndex !== null && matches[pastMatchIndex] ? (
                  <>
                    <p>{new Date(matches[pastMatchIndex].start_at).getDate()}</p>
                    <p>
                      {new Date(
                        matches[pastMatchIndex].start_at
                      ).toLocaleString("default", { month: "short" })}
                    </p>
                  </>
                ) : (
                  <>
                    <p>24</p>
                    <p>Aug</p>
                  </>
                )}
              </div>
              <div className="matches-col-result">
                {pastMatchIndex !== null && matches[pastMatchIndex] ? (
                  <>
                    <span>
                      {matches[pastMatchIndex].league.name}{" "}
                      {new Date(
                        matches[pastMatchIndex].start_at
                      ).toLocaleTimeString()}
                    </span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex].home_team.name)}
                      </p>
                      <p className="matches-col-goals">
                        {matches[pastMatchIndex].home_score.current}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex].away_team.name)}
                      </p>
                      <p className="matches-col-goals">
                        {matches[pastMatchIndex].away_score.current}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span>m:tel premier liga 20:45</span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Gosk gabela")}
                      </p>
                      <p className="matches-col-goals">1</p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Sarajevo")}
                      </p>
                      <p className="matches-col-goals">3</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={7} className="matches-col">
          <h2>Next matches:</h2>
          <div className="matches-col-details">
            <div className="matches-col-date">
            {pastMatchIndex !== null && matches[pastMatchIndex-1] ? (
                  <>
                    <p>{new Date(matches[pastMatchIndex-1].start_at).getDate()}</p>
                    <p>
                      {new Date(
                        matches[pastMatchIndex-1].start_at
                      ).toLocaleString("default", { month: "short" })}
                    </p>
                  </>
                ) : (
                  <>
                    <p>24</p>
                    <p>Aug</p>
                  </>
                )}
            </div>
            <div className="matches-col-result">
            {pastMatchIndex !== null && matches[pastMatchIndex-1] ? (
                  <>
                    <span>
                      {matches[pastMatchIndex-1].league.name}{" "}
                      {new Date(
                        matches[pastMatchIndex-1].start_at
                      ).toLocaleTimeString()}
                    </span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex-1].home_team.name)}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName(matches[pastMatchIndex-1].away_team.name)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span>m:tel premier liga 20:45</span>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Gosk gabela")}
                      </p>
                      <p className="matches-col-goals"></p>
                    </div>
                    <div className="d-flex">
                      <p className="matches-col-team">
                        {renderTeamName("Sarajevo")}
                      </p>
                      <p className="matches-col-goals"></p>
                    </div>
                  </>
                )}
            </div>
            <div className="matches-col-timer">
              <h2 className="matches-col-timer-counter">
                {timeRemaining}
              </h2>
              <p className="matches-col-timer-date">
              {pastMatchIndex !== null && matches[pastMatchIndex-1] ? (
                  <>
                    <p>{new Date(matches[pastMatchIndex-1].start_at).getDate()}.
                      {new Date(
                        matches[pastMatchIndex-1].start_at
                      ).toLocaleString("default", { month: "short" })}
                    </p>
                  </>
                ) : (
                  <>
                    <p>24 Aug</p>
                  </>
                )}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
