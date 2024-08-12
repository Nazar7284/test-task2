import React from "react";

interface IMyBtn {
  onClick: () => void;
  isDisabled: boolean;
  label: string;
  color?: string;
}

const MyBtn: React.FC<IMyBtn> = ({ onClick, isDisabled, label, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white ${
        isDisabled ? "bg-gray-600" : `${color ? color : "bg-blue-400"}`
      }`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default MyBtn;
