import React, { useEffect, useState } from "react";
import "../index.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Name from "./CharacterName";

function Vehicle({ match }) {
  const [vehicle, setVehicle] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const override = css`
    display: block;
    margin: 20px auto;
  `;

  useEffect(() => {
    fetchVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVehicle = async () => {
    setIsLoading(true);
    const fetchVehicle = await fetch(
      `https://swapi.dev/api/vehicles/${match.params.id}`
    );
    const item = await fetchVehicle.json();
    setVehicle(item);
    setIsLoading(false);
  };

  //getting last number of the url link to get id matching params endpoint
  function getLastNumber(url) {
    var matches = url.match(/\d+/g);
    return matches[matches.length - 1];
  }

  return isLoading ? (
    <ClipLoader css={override} size={250} color={"yellow"} />
  ) : (
    <div className="vehicle-card">
      <ul>
        <li>Name: {vehicle && vehicle.name}</li>
        <li>Created in: {vehicle && Date(vehicle.created)}</li>
        <li>Model:{vehicle && vehicle.model}</li>
        <li>Manufacturer: {vehicle && vehicle.manufacturer}</li>
        <li>
          Pilots:
          {vehicle &&
            vehicle.pilots.map((pilot, index) => (
              <div key={index}>
                <Link to={`/Character/${getLastNumber(pilot)}`}>
                  <Name url={pilot} />
                </Link>
              </div>
            ))}
        </li>
      </ul>
    </div>
  );
}

export default Vehicle;
