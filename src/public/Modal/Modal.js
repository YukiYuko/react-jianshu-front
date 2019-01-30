import React from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import "./style.less"

const rootEle = document.body;

const Text = () => (
  <div className="uz-modal-text">
    默认提示
  </div>
);

const Modal = (props) => createPortal(
  <div className="uz-modal">
    <div className="uz-modal-bg"/>
    <div className="uz-modal-fixer">
      <div className="uz-modal-outer">
        {
          props.close && <div className="uz-modal-close">
            <img onClick={() => props.closeFun()} src={require("./close.png")} alt="关闭"/>
          </div>
        }
        <div className="uz-modal-content">
          {
            props.children ? props.children : <Text/>
          }
        </div>
        <div className="uz-modal-toolbar flex justify-center">
          {
            props.type === "confirm" && <a href="/" className="uz-modal-button danger">取消</a>
          }
          <a href="/" className="uz-modal-button">确定</a>
        </div>
      </div>
    </div>
  </div>,
  rootEle
);

Modal.propTypes = {
  type: PropTypes.string,
  close: PropTypes.bool,
  closeFun: PropTypes.fun
};
Modal.defaultProps = {
  type: "confirm",
  close: true
};

export default Modal