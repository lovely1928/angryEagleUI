import Modal from "react-modal";

import React from "react";

const CustomModal = ({ isOpen, onClose2, children, customStyles }) => {
  let styles = {
    overlay: { zIndex: 1000, "background-color": "#212529a3" },
    content: { ...customStyles },
  };
  return (
    <Modal style={styles} isOpen={isOpen} onRequestClose={() => onClose2()}>
      {children}
    </Modal>
    // <div
    //   onClick={onClose}
    //   className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
    // >
    //   <div
    //     className="bg-white max-h-[600px] h-[400px] w-240 overflow-auto mx-auto p-2 border-2 border-black rounded-lg shadow-lg"
    //   >
    //     {children}
    //   </div>
    // </div>
  );
};

export default CustomModal;
