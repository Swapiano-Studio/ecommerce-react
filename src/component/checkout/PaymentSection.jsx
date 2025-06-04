const PaymentSection = () => {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h5 className="bg-dark text-white p-3 rounded mb-4">Payment Options</h5>
      <button className="btn btn-primary w-100 mb-2">Pay with PayPal</button>
      <button className="btn btn-warning w-100">Pay with Flutterwave</button>
    </div>
  );
};

export default PaymentSection;
