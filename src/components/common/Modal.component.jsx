import Modal from "react-modal";

import React from "react";

const CustomModal = ({ isOpen, onClose2, children, customStyles }) => {
  let styles = {
    overlay: { zIndex: 1000, "background-color": "#212529a3" },
    content: { width: "50%", margin: "auto", ...customStyles },
  };
  return (
    <Modal style={styles} isOpen={isOpen} onRequestClose={() => onClose2()}>
      {children}
    </Modal>
  );
};

export default CustomModal;
