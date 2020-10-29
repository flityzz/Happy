import React from "react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import api from '../services/api'

export default function Dashboard() {
  const [token, setToken] = useState<any>("");
  const [user, setUser] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("@session_token");

    if (token) {
      setToken(token);
      const decoded = jwt.verify(token, "secret");
      

    } 

  }, [token]);

  return token ? <h1>logado</h1> : <h1>nao logado</h1>;
}
