import React from "react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import api from "../services/api";

interface User {
  id: number;
  email: string;
  orphanages: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }>;
}

export default function Dashboard() {
  const [token, setToken] = useState<any>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = sessionStorage.getItem("@session_token");

    if (token) {
      setToken(token);
      const decoded = jwt.verify(token, "secret");

      api.get(`/users/${decoded.id}`).then((response) => {
        setUser(response.data);
      });
    }
  }, [token]);

  return token ? (
    <div className="user-container" style={{ color: "#000" }}>
      <h1>logado</h1>
    </div>
  ) : (
    <h1>nao logado</h1>
  );
}
