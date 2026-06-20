import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { handleClosePopup } from "../features/togglerSlice";

const ModalPopup = ({ children }) => {
  const dispatch = useDispatch();
  return createPortal(
    <div
      onClick={(e) => {
        if (e.target.id === "popup-container") {
          dispatch(handleClosePopup());
        }
      }}
      className="max-w-md fixed h-screen z-50 bg-black/50 backdrop-blur-xs w-full top-0 left-1/2 -translate-x-1/2 mx-auto flex items-center justify-center"
      id="popup-container"
    >
      {children}
    </div>,
    document.getElementById("popup"),
  );
};

export default ModalPopup;
