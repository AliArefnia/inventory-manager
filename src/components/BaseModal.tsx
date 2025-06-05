import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BaseModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg w-full max-w-lg p-6 pt-12  relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl cursor-pointer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
