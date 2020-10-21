import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/login.css";
import { FiCheck, FiArrowLeft } from "react-icons/fi";

import LoginBackground from "../components/LoginBackground";

export default function Login() {
  const [remember_me, setRemember_me] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleCheckedClick() {
    if (remember_me === false) {
      setRemember_me(true);
    } else {
      setRemember_me(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log({
      email,
      password,
      remember_me,
    });
  }

  return (
    <div id="login-container">
      <LoginBackground />
      <aside>
        <Link to="/" className="return">
          <FiArrowLeft
            color="#15C3D6"
            style={{
              height: 24,
              width: 24,
            }}
          />
        </Link>
        <form className="login-wrapper" onSubmit={handleSubmit}>
          <h1>Fazer Login</h1>

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

          <div className="options">
            <div className="remember-me">
              {remember_me ? (
                <label className="check-box-true" onClick={handleCheckedClick}>
                  <FiCheck size={20} />
                </label>
              ) : (
                <label
                  className="check-box-false"
                  onClick={handleCheckedClick}
                ></label>
              )}
              <span>Lembrar-me</span>
            </div>
            <Link to="/" className="forgot-password">
              <span>Esqueci minha senha</span>
            </Link>
          </div>

          {password === "" ? (
            <button className="enter-not-avaliable" disabled>
              Entrar
            </button>
          ) : (
            <button className="enter">Entrar</button>
          )}
        </form>
      </aside>
    </div>
  );
}
