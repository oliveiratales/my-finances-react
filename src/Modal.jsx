import React from "react";
import Modal from "react-modal";
import "./Modal.css";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Erro"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">{children}</div>
    </Modal>
  );
};

export default CustomModal;
