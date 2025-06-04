import React, { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const EditProfileModal = ({ userInfo, onHide, onSuccess }) => {
  const [form, setForm] = useState({
    first_name: userInfo.first_name || "",
    last_name: userInfo.last_name || "",
    email: userInfo.email || "",
    phone_number: userInfo.phone_number || "",
    city: userInfo.city || "",
    state: userInfo.state || "",
    address: userInfo.address || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowConfirm(true);
  }

  async function handleConfirmUpdate() {
    setLoading(true);
    setError("");
    setShowConfirm(false);
    try {
      await api.patch("/core/update_biodata/", form);
      toast.success("Biodata updated successfully!");
      if (onSuccess) onSuccess();
      onHide();
    } catch (err) {
      setError("Failed to update biodata. Make sure the data is valid.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="modal show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.3)"}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title"><i className="bi bi-person-lines-fill me-2"></i>Edit Profile</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="modal-body p-4">
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">First Name</label>
                    <input name="first_name" className="form-control rounded-pill" value={form.first_name} onChange={handleChange} placeholder="First Name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Last Name</label>
                    <input name="last_name" className="form-control rounded-pill" value={form.last_name} onChange={handleChange} placeholder="Last Name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control rounded-pill" value={form.email} onChange={handleChange} placeholder="Email" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Phone</label>
                    <input name="phone_number" className="form-control rounded-pill" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">City</label>
                    <input name="city" className="form-control rounded-pill" value={form.city} onChange={handleChange} placeholder="City" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">State</label>
                    <input name="state" className="form-control rounded-pill" value={form.state} onChange={handleChange} placeholder="State" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input name="address" className="form-control rounded-pill" value={form.address} onChange={handleChange} placeholder="Address" />
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between px-4 pb-4 pt-2 border-0">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={onHide} disabled={loading}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : <i className="bi bi-save me-2"></i>}
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showConfirm && (
        <div className="modal show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.3)"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header bg-warning text-dark rounded-top-4">
                <h5 className="modal-title"><i className="bi bi-exclamation-triangle me-2"></i>Confirm Update</h5>
              </div>
              <div className="modal-body text-center">
                <p>Are you sure you want to update your profile data?</p>
              </div>
              <div className="modal-footer d-flex justify-content-between px-4 pb-4 pt-2 border-0">
                <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowConfirm(false)} disabled={loading}>Cancel</button>
                <button className="btn btn-warning rounded-pill px-4" onClick={handleConfirmUpdate} disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : <i className="bi bi-check-circle me-2"></i>}
                  {loading ? "Updating..." : "Yes, Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
