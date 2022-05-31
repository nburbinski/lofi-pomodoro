import React from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constants";

export default function Controls({ getCurrentlyPlaying }) {
  const [{ access_token, isPlaying }, dispatch] = useStateProvider();

  const play = async () => {
    if (isPlaying) {
      await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: reducerCases.SET_IS_PLAYING, payload: false });
    } else {
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: reducerCases.SET_IS_PLAYING, payload: true });
    }
  };

  const skipTrack = async () => {
    await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    getCurrentlyPlaying();
  };

  const backTrack = async () => {
    await axios.post(
      "https://api.spotify.com/v1/me/player/previous",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    getCurrentlyPlaying();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "50%",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <button
        style={{
          backgroundColor: "lightblue",
          color: "inherit",
          border: "none",
          padding: "0",
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
        }}
        tabIndex={0}
        onClick={backTrack}
      >
        <i className="fas fa-2x fa-step-backward"></i>
      </button>
      <button
        style={{
          backgroundColor: "lightblue",
          color: "inherit",
          border: "none",
          padding: "0",
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
        }}
        tabIndex={0}
        onClick={play}
      >
        {isPlaying ? (
          <i className="fa-solid  fa-2x fa-pause"></i>
        ) : (
          <i className="fa-solid  fa-2x fa-play"></i>
        )}
      </button>
      <button
        style={{
          backgroundColor: "lightblue",
          color: "inherit",
          border: "none",
          padding: "0",
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
        }}
        tabIndex={0}
        onClick={skipTrack}
      >
        <i className="fas fa-2x fa-step-forward"></i>
      </button>
    </div>
  );
}
