import { useEffect } from "react";
import { reducerCases } from "../../utils/Constants";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import CurrentSong from "./CurrentSong";
import Controls from "./Controls";

export default function MusicPlayer() {
  const [{ access_token, currently_playing }, dispatch] = useStateProvider();

  useEffect(async () => {
    getCurrentlyPlaying();
  }, [access_token, dispatch]);

  const getCurrentlyPlaying = async () => {
    // res not accurate until 2nd run
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 204 && res.data === "") {
        // no song playing
        await playPlaylist();
      }

      const item = res.data.item;
      if (currently_playing && item.name === currently_playing.name) {
        continue;
      } else {
        dispatch({
          type: reducerCases.SET_CURRENTLY_PLAYING,
          payload: {
            name: item.name,
            artists: item.artists,
            album: item.album.name,
            albumArt: item.album.images[0].url,
            uri: item.uri,
          },
        });
        dispatch({
          type: reducerCases.SET_IS_PLAYING,
          payload: res.data.is_playing,
        });
        break;
      }
    }
  };

  const playPlaylist = async () => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          context_uri:
            "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM?si=28fcc9be84204847",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "10px 15px",
        width: "33%",
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
      }}
    >
      <CurrentSong />
      <Controls getCurrentlyPlaying={getCurrentlyPlaying} />
    </div>
  );
}
