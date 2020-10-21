import React from "react";
import "../styles/pages/login.css";

import LoginBackground from "../components/LoginBackground";

export default function Login() {
  return (
    <div id="login-container">
      <LoginBackground />
      <aside>
        <div className="login-wrapper">
          <h1>Fazer Login</h1>

          <span>E-mail</span>
          <input type="text" />

          <span>Senha</span>
          <input type="password" />

          <div className="options">
            <div className="remember-me">
              <div className="checkbox"></div>
              <span>Lembrar-me</span>
            </div>

            <div className="forgot-password">
              <span>Esqueci minha senha</span>
            </div>
          </div>
          <button className="enter" type="submit">
            Entrar
          </button>
        </div>
      </aside>
    </div>
  );
}
