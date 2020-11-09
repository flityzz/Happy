import React from "react";

import "../styles/pages/deleteorphanage.css";
import deleteMessage from "../images/deleteMessage.svg";
import { Link } from "react-router-dom";

import api from "../services/api";

export default function DeleteOrphanage(props) {
  async function handleDeleteClick() {
    const { userId, orphanageId} = props.location.state
    await api.delete(`/users/${userId}/orphanages/${orphanageId}`);

    return alert("orfanato deletado");
  }

  return (
    <div id="container">
      <div className="options">
        <div className="button-delete" onClick={handleDeleteClick}>
          Excluir!
        </div>
        <span>Você tem certeza que quer excluir {props.location.state.name}?</span>
        <Link to="/dashboard" className="back">
          Voltar para o mapa
        </Link>
      </div>

      <img src={deleteMessage} alt="logo" />
    </div>
  );
}
