import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=1447d3721a724f8cb2ab60d1e39a00a8&response_type=code&redirect_uri=http://localhost:1234&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  const handleClick = () => {
    const client_id = "1447d3721a724f8cb2ab60d1e39a00a8";
    const redirect_uri = "http://localhost:1234";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify",
      "user-read-playback-state",
      "user-modify-playback-state",
    ].join(" ");

    window.location.href = `${apiUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`;
  };
  return (
    <div>
      <button onClick={handleClick}> Login To Spotify</button>
    </div>
  );
}
