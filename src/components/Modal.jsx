import React from "react";

const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  if (!isOpen) return null;

  const sizeModal = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",

    full: "w-full max-w-6xl",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${sizeModal[size]}`}
      >
        <div className="flex justify-between items-center mb-3 p-3 bg-black rounded-t-md">
          <h2 className="text-lg font-bold text-white p-1">{title}</h2>
          <button
            onClick={onClose}
            className="text-black-200 font-extrabold bg-white shadow-xl border-2 border-gray-200 p-1 px-3 rounded-md hover:bg-red-500 hover:text-white"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
