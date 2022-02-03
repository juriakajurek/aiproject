import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

import bcrypt from 'bcryptjs';
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';

export const LoginComponent = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordHash, setPasswordHash] = useState(undefined);
  useEffect(() => {
    console.log(password);
  });
  return (
    <div className="show col-lg-6 px-lg-4">
      <div className="card">
        <div className="card-header px-lg-5">
          <div className="card-heading text-primary">Logowanie</div>
        </div>
        <div className="card-body p-lg-5">
          <form id="loginForm" action="index.html">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingInput"
                type="email"
                placeholder="name@example.com"
                required
                value={username}
                onChange={(val) => setUsername(val.target.value)}
              />
              <label for="floatingInput">Adres email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="floatingPassword"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(val) => setPassword(val.target.value)}
              />
              <label for="floatingPassword">Hasło</label>
            </div>
            <div className="form-check mb-3 remember-me">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label className="form-check-label mx-2 mt-1" for="remember">
                Zapamiętaj mnie
              </label>
            </div>
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={() => {
                bcrypt.hash(
                  myPlaintextPassword,
                  saltRounds,
                  function (err, hash) {
                    err ? console.log(err) : console.log(hash);
                  },
                );
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="card-footer px-lg-5 py-lg-4">
          <div className="text-sm text-muted">
            Nie masz jeszcze konta?{' '}
            <a href="#" onClick={props.makeRegisterVisible}>
              Zarejestruj się
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
