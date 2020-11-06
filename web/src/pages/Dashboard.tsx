import React from "react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import api from "../services/api";
import "../styles/pages/dashboard.css";
import asideLogo from '../images/dashboard-logo.svg';

import { Link } from "react-router-dom";

import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { Map, TileLayer, Marker } from "react-leaflet";

import happyMapIcon from '../utils/mapIcon';
 
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

        <Link to="/" className="logout"><FiPower size={30}/></Link>

      </aside>

      <div className="dashboard">
        <header>
          <h1 className="title">Orfanatos cadastrados</h1>
          <span className="orphanages-number">2 orfanatos</span>
        </header>

        <div className="orphanages-list">
          <div className="orphanage">
          <Map
                center={[-3.7491403, -38.5568483]}
                zoom={16}
                style={{ width: "100%", height: 227 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[-3.7491403, -38.5568483]}
                />
              </Map>
            <div className="actions">
              <h1>Orf. Esperança</h1>

              <div className="buttons">
                <Link to='/orphanages/create' className="edit-orphanage"></Link>
                <div className="delete-orphanage"></div>
              </div>

            </div>
          </div>
          
        </div>

      </div>
      
    </div>
  ) : (
    <h1>nao logado</h1>
  );
}
