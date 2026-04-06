// Modal — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy — Portal-based
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
export default function Modal_24BCE0965({ isOpen_raghavaReddy, onClose_24BCE0965, children, title_raghavaReddy }) {
  if (!isOpen_raghavaReddy) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose_24BCE0965} id="modal-24BCE0965">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title_raghavaReddy || 'Modal — 24BCE0965'}</h3>
          <button className="modal-close" onClick={onClose_24BCE0965}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
Modal_24BCE0965.propTypes = { isOpen_raghavaReddy: PropTypes.bool.isRequired, onClose_24BCE0965: PropTypes.func.isRequired, children: PropTypes.node, title_raghavaReddy: PropTypes.string };
