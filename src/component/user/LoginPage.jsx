import React, { useContext, useState } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


export default function LoginPage() {
  const {setIsAuthenticated, get_username} = useContext(AuthContext)

  const location = useLocation()
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const userInfo = { username, password };
    
    api.post("api/token/", userInfo)
      .then(res => {
        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)
        setUsername('')
        setPassword('')
        setIsAuthenticated(true)
        get_username()

        const from = location?.state?.from.pathname || "/"
        navigate(from, {replace:true})
      })
      .catch(err => {
        console.log(err.message);
        setError('Login failed. Please check your credentials.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <p className="text-secondary small">Please enter your details</p>
              <h2 className="fw-bold">Welcome back</h2>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="visually-hidden">Email address</label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="d-flex justify-content-between mb-4 align-items-center">
                <a href="#" className="text-primary small text-decoration-none">Forgot password</a>
              </div>

              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="position-relative mb-4">
              <hr className="my-4" />
            </div>

            <div className="d-grid gap-2 mb-4">
              <button className="btn btn-outline-secondary" type="button">
                <div className="d-flex align-items-center justify-content-center">
                  <svg className="me-2" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </div>
              </button>
            </div>

            <div className="text-center">
              <p className="small text-secondary">
                Don't have an account?{" "}
                <a href="/register" className="text-primary text-decoration-none">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}