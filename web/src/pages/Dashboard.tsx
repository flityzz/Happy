import React from "react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import api from "../services/api";
import "../styles/pages/dashboard.css";
import asideLogo from '../images/dashboard-logo.svg';
import logOut from '../images/Voltar.svg';
import { Link } from "react-router-dom";

import { FiMapPin, FiAlertCircle } from 'react-icons/fi';
 
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
  const [user, setUser] = useState<User>(); //todas as info do user

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
    <div id="user-container">
      <aside>

        <div className="aside-logo"><img src={asideLogo} alt="logo"/></div>

        <div className="action-buttons">
          <div className="approved-orphanages"><FiMapPin size={30}/></div>
          <div className="pending-orphanages"><FiAlertCircle size={30}/></div>
        </div>

        <Link to="/" className="logout"><img src={logOut} alt="voltar"/></Link>

      </aside>
    </div>
  ) : (
    <h1>nao logado</h1>
  );
}
