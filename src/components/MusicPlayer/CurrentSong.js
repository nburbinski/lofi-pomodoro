import React from "react";
import { useStateProvider } from "../../utils/StateProvider";

export default function CurrentSong() {
  const [{ currently_playing }] = useStateProvider();

  console.log(currently_playing);
  return (
    <div>
      {currently_playing && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "5px",
            }}
          >
            <a href={currently_playing.uri ?? ""}>
              <img
                src={currently_playing.albumArt ?? ""}
                alt="album art"
                height="100px"
              ></img>
            </a>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "10px",
              }}
            >
              <p
                style={{
                  marginTop: "2px",
                  marginBottom: "2px",
                  fontWeight: "bold",
                }}
              >
                {currently_playing.name ?? ""}
              </p>
              <p
                style={{
                  marginTop: "2px",
                  marginBottom: "2px",
                  fontSize: "small",
                }}
              >
                {currently_playing.artists
                  ? currently_playing.artists
                      .map((artist) => artist.name)
                      .join(", ")
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
