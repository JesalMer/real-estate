import React from "react";
import { useNavigate } from "react-router-dom";
import "./TokenPaymentPage.css"; // Create this CSS file

const TokenPaymentPage = () => {
    const navigate = useNavigate();

    const handleProceedPayment = () => {
        alert("Redirecting to Payment Gateway..."); // Replace with actual payment logic
    };

    return (
        <div className="payment-overlay">
            <div className="payment-card">
                <p className="non-refundable">🏡 Reserve Your Dream Home! Pay the token amount to lock in your property today,Your booking is secured after payment. No refunds will be issed.</p>
                <img 
                    src="/images/pay.jpg" 
                    alt="Payment Logo" 
                    className="payment-logo" 
                />
                <button className="proceed-payment-btn" onClick={handleProceedPayment}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default TokenPaymentPage;
