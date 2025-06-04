import React from 'react';
import { FaBoxOpen, FaRegSmile } from 'react-icons/fa';

const OrderHistory = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex align-items-center" style={{ minHeight: 70 }}>
          <FaBoxOpen size={28} className="me-2" />
          <h5 className="mb-0">Order History</h5>
        </div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 320 }}>
          <FaRegSmile size={64} className="text-primary mb-3" />
          <h4 className="fw-semibold mb-2 text-center">No Orders Yet</h4>
          <p className="text-muted mb-4 text-center" style={{ maxWidth: 350 }}>
            You haven't placed any orders yet.
            <br />
            Start shopping and your orders will appear here!
          </p>
          <a href="/" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
