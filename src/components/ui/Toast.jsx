// Toast — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
export default function Toast_24BCE0965({ message_raghavaReddy, type_24BCE0965, onClose_raghavaReddy }) {
  useEffect(() => { const t = setTimeout(onClose_raghavaReddy, 3000); return () => clearTimeout(t); }, [onClose_raghavaReddy]);
  return (
    <div className={`toast toast-${type_24BCE0965 || 'success'}`} id="toast-24BCE0965">
      <span>{type_24BCE0965 === 'error' ? '❌' : '✅'} {message_raghavaReddy}</span>
      <button className="toast-close" onClick={onClose_raghavaReddy}>✕</button>
    </div>
  );
}
Toast_24BCE0965.propTypes = { message_raghavaReddy: PropTypes.string.isRequired, type_24BCE0965: PropTypes.oneOf(['success','error']), onClose_raghavaReddy: PropTypes.func.isRequired };
