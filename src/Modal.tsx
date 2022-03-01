import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${rgba("#dddddd", 0.5)};
`;

const Modal: React.FC = ({ children }) => {
  const root = document.getElementById("modal")!;
  const ModalJSX = <Background>{children}</Background>;

  return ReactDOM.createPortal(ModalJSX, root);
};

export default Modal;
