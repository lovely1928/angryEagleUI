
// // Modal.js

// import React from "react";

// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div
//             onClick={onClose}
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background: "rgba(0, 0, 0, 0.5)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         >
//             <div
//                 style={{
//                     background: "white",
//                     height: 150,
//                     width: 240,
//                     margin: "auto",
//                     padding: "2%",
//                     border: "2px solid #000",
//                     borderRadius: "10px",
//                     boxShadow: "2px solid black",
//                 }}
//             >
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Modal;



import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="bg-white h-150 w-240 mx-auto p-2 border-2 border-black rounded-lg shadow-lg" ƒ s >
                {children}
            </div>
        </div>
    );
};

export default Modal;
