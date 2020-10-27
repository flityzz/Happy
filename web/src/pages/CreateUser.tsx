
import React, { FormEvent, useState} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link} from "react-router-dom";
import LoginBackground from "../components/LoginBackground";
import api from '../services/api'

import "../styles/pages/createuser.css";

export default function CreateUser({ history }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleCreateAccount(event: FormEvent) {
    event.preventDefault();

    api.post('/users', {
        email: email,
        password: password
    })
    
    alert('conta criada com sucesso')

    history.push('/login')
  }

  return (
    <div id="create-user-container">
      <LoginBackground />

      <aside>
        <Link to="/" className="return">
          <FiArrowLeft color="#15C3D6" size={24} />
        </Link>

        <form onSubmit={handleCreateAccount} className="create-wrapper">
          <h1>Criar uma conta</h1>

          <label htmlFor="email">
            <span>E-mail</span>
          </label>
          {email !== "" ? (
            <input
              type="email"
              id="email"
              value={email}
              className="avaliableInput"
              onChange={(event) => setEmail(event.target.value)}
            />
          ) : (
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}

          <label htmlFor="password">
            <span>Senha</span>
          </label>
          {password !== "" ? (
            <input
              type="password"
              id="password"
              value={password}
              className="avaliableInput"
              onChange={(event) => setPassword(event.target.value)}
            />
          ) : (
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}

          {password === "" ? (
            <button className="enter-not-avaliable" disabled>
              Criar Conta
            </button>
          ) : (
            <button className="enter">Criar Conta</button>
          )}

        </form>
      </aside>
    </div>
  );
}
