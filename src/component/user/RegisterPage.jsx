import React, { useState, useContext } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    address: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, get_username } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/core/register/", form);
      const loginRes = await api.post("/api/token/", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("access", loginRes.data.access);
      localStorage.setItem("refresh", loginRes.data.refresh);
      setIsAuthenticated(true);
      get_username && get_username();
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.password ||
        err.response?.data?.username ||
        err.response?.data?.email ||
        "Registration failed. Please check your data."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Sign Up</h2>
              <p className="text-secondary small">Create your account</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input name="first_name" className="form-control" placeholder="First Name" value={form.first_name} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <input name="last_name" className="form-control" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
                </div>
              </div>
              <div className="mb-3">
                <input name="username" className="form-control" placeholder="Username" value={form.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input name="password" type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <input name="password2" type="password" className="form-control" placeholder="Confirm Password" value={form.password2} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <input name="phone_number" className="form-control" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input name="city" className="form-control" placeholder="City" value={form.city} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <input name="state" className="form-control" placeholder="State" value={form.state} onChange={handleChange} />
                </div>
              </div>
              <div className="mb-3">
                <input name="address" className="form-control" placeholder="Address" value={form.address} onChange={handleChange} />
              </div>
              <div className="d-grid gap-2 mb-4">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="small text-secondary">
                Already have an account?{' '}
                <a href="/login" className="text-primary text-decoration-none">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
