import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-300" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white" onClick={onConfirm}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
