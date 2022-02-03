import 'bootstrap/dist/css/bootstrap.min.css';

export const RegisterComponent = (props) => (
  <div className="hide">
    <div className="card">
      <div className="card-header px-lg-5">
        <div className="card-heading text-primary">Rejestracja</div>
      </div>
      <div className="card-body p-lg-5">
        <form action="index.html">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="username"
              type="email"
              placeholder="name@example.com"
              required
            />
            <label for="username">Pseudonim</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="email"
              placeholder="name@example.com"
              required
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
            />
            <label for="floatingPassword">Hasło</label>
          </div>
          <div className="form-check mb-3 remember-me">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              id="agree"
            />
            <label className="form-check-label mx-2 mt-1" for="agree">
              Zgadzam się korzystać z aplikacji odpowiedzialnie.
            </label>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              id="regidter"
              type="button"
              name="registerSubmit"
            >
              Zarejestruj
            </button>
          </div>
        </form>
      </div>
      <div className="card-footer px-lg-5 py-lg-4">
        <div className="text-sm text-muted">
          Masz już konto?{' '}
          <a href="#" onClick={props.makeLoginVisible}>
            Zaloguj się
          </a>
          .
        </div>
      </div>
    </div>
  </div>
);
