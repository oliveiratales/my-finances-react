import Modal from "react-modal";
import PropTypes from "prop-types";
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

// Prop-Types
CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
