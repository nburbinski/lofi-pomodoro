import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [access_token, setAccessToken] = useState(null);
  const [refresh_token, setRefreshToken] = useState(null);
  const [expires_in, setExpiresIn] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000/login", {
        code: code,
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
        window.history.pushState(null, null, "/");
      })
      .catch(() => {
        window.location = "http://localhost:1234";
      });
  }, [code]);

  useEffect(() => {
    if (!refresh_token || !expires_in) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3000/refresh", {
          refresh_token: refresh_token,
        })
        .then((res) => {
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
        });
    }, expires_in * 1000);
    return () => clearInterval(interval);
  }, [refresh_token, expires_in]);

  return access_token;
}
