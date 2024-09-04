import React, { useEffect, useRef, useState } from "react";
import videoBackground from "../assets/last-games.jpg";
import { Col, Row } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from "react-bootstrap";
import axios from "axios";

import lastGame1 from "../assets/last-games-1.jpg";
import lastGame2 from "../assets/last-games-2.jpg";
import lastGame3 from "../assets/last-games-3.jpg";
import lastGame4 from "../assets/last-games-4.jpg";
import lastGame5 from "../assets/last-games-5.jpg";
import lastGame6 from "../assets/last-games-6.jpg";
import lastGame7 from "../assets/last-games-7.jpg";

import ligaLogo from "../assets/crest/bih liga.png";
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
  name: string;
  logo: string;
}

interface League {
  id: number;
  sport_id: number;
  section_id: number;
  slug: string;
  name: string;
  logo: string;
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

export const LatestMatches = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pastMatchIndex, setPastMatchIndex] = useState<number | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const options = {
        method: "GET",
        url: "https://sportscore1.p.rapidapi.com/teams/4683/events",
        params: { page: "1" },
        headers: {
          "x-rapidapi-key":
            "3fcc40fb90msh5e5417aa2b3c53ep138fc7jsnc6cb7b292f67",
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

  const items: JSX.Element[] = [
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame7})` }}
      key={2}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 6] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 6].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 5].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 6].league.name}</p>
            <p>{matches[pastMatchIndex + 6].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 6].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 6].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame2})` }}
      key={2}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 5] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 5].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 5].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 5].league.name}</p>
            <p>{matches[pastMatchIndex + 5].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 5].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 5].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame4})` }}
      key={3}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 4] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 4].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 4].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 4].league.name}</p>
            <p>{matches[pastMatchIndex + 4].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 4].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 4].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame5})` }}
      key={4}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 3] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 3].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 4].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 3].league.name}</p>
            <p>{matches[pastMatchIndex + 3].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 3].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 3].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame3})` }}
      key={5}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 2] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 2].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 4].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 2].league.name}</p>
            <p>{matches[pastMatchIndex + 2].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 2].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 2].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame6})` }}
      key={6}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex + 1] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex + 1].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 4].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex + 1].league.name}</p>
            <p>{matches[pastMatchIndex + 1].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex + 1].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex + 1].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
    <div
      role="presentation"
      className="last-games-card-col"
      style={{ backgroundImage: `url(${lastGame1})` }}
      key={1}
    >
      {pastMatchIndex !== null && matches[pastMatchIndex ] && (
        <div className="last-games-content">
          <img 
            src={matches[pastMatchIndex].league.logo === "https://xscore.cc/resb/league/bosnia-herzegovina-premijer-liga.png" ? ligaLogo : matches[pastMatchIndex + 4].league.logo} 
            className="last-games-league-logo" 
            alt="League logo" 
          />
          <div className="last-games-teams">
            <p>{matches[pastMatchIndex].league.name}</p>
            <p>{matches[pastMatchIndex].start_at.slice(0, -8)}</p>
            <img
              src={matches[pastMatchIndex].home_team.logo}
              className="last-games-home-logo"
            />
            <img
              src={matches[pastMatchIndex].away_team.logo}
              className="last-games-away-logo"
            />
          </div>
          <Button className="btn btn-secondary">Images</Button>
        </div>
      )}
    </div>,
  ];

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  return (
    <div
      className="last-games"
      style={{ backgroundImage: `url(${videoBackground})` }}
    >
      <Row>
        <Col xs={9} className="last-games-col">
          <AliceCarousel
            ref={carouselRef}
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={{
              0: { items: 2.6 },
              568: { items: 2 },
              1024: { items: 5.2 },
            }}
            disableButtonsControls={true}
            disableDotsControls={true}
          />
        </Col>
        <Col xs={3} className="last-games-col">
          <h2 className="last-games-title">Last Games</h2>
        </Col>
        <div className="last-games-controller">
          <Button onClick={handlePrev} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-left"></i>
          </Button>
          <Button onClick={handleNext} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-right"></i>
          </Button>
          <a href="/#" className="last-games-controller-all-content-link">
            <i className="bi bi-arrow-bar-right"></i> View All content
          </a>
        </div>
      </Row>
    </div>
  );
};
