import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const mockRFQs = [
  { id: 1, itemName: "Steel Pipes", quantity: 100, status: "Pending" },
  { id: 2, itemName: "Wood Panels", quantity: 50, status: "Approved" },
];

const hasPaidForRFQ = () => {
  return localStorage.getItem("rfq_paid") === "true";
};

const processPayment = () => {
  localStorage.setItem("rfq_paid", "true");
  return true;
};

const RFQManagement = () => {
  const [rfqs] = useState(mockRFQs);
  const [canCreateRFQ, setCanCreateRFQ] = useState(hasPaidForRFQ());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCanCreateRFQ(hasPaidForRFQ());
  }, []);

  const handleUpgrade = () => {
    if (processPayment()) {
      setCanCreateRFQ(true);
      setShowUpgradeModal(false);
      navigate("/buyer-dashboard/rfq/RFQForm");
    }
  };

  const handleCreateRFQClick = () => {
    if (!canCreateRFQ) {
      setShowUpgradeModal(true);
    } else {
      navigate("/RFQForm");
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
      <div className="flex space-x-4">
        <h2 className="text-3xl font-bold mb-6">My RFQs</h2>
      </div>

      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold">{rfq.itemName}</h3>
            <p>Quantity: {rfq.quantity}</p>
            <p>
              Status: <span className="font-medium">{rfq.status}</span>
            </p>
            <div className="mt-2 space-x-4">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={handleCreateRFQClick}
        >
          Create New RFQ
        </button>
      </div>

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Upgrade Required</h3>
            <p className="mb-4">
              Creating new RFQs is a paid feature. Upgrade your account with a
              one-time payment to access it.
            </p>
            <button
              onClick={handleUpgrade}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Upgrade for $50
            </button>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="ml-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQManagement;
