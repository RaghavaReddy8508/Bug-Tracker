// BugRow — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SeverityBadge_24BCE0965 from './SeverityBadge';
import StatusBadge_24BCE0965 from './StatusBadge';
import { BugContext_24BCE0965 } from '../../context/BugContext';
import { format } from 'date-fns';

export default function BugRow_24BCE0965({ bug_raghavaReddy, showCheckbox_24BCE0965, checked_raghavaReddy, onCheck_24BCE0965 }) {
  const navigate = useNavigate();
  const { state } = useContext(BugContext_24BCE0965);
  const assignee = state.team.find(m => m.id === bug_raghavaReddy.assignee);

  return (
    <tr className="bug-row" onClick={() => navigate(`/bugs/${bug_raghavaReddy.id}`)}>
      {showCheckbox_24BCE0965 && (
        <td onClick={e => e.stopPropagation()}>
          <input type="checkbox" checked={checked_raghavaReddy} onChange={() => onCheck_24BCE0965(bug_raghavaReddy.id)} />
        </td>
      )}
      <td className="bug-row-id">{bug_raghavaReddy.id.replace('bug_', 'BUG-')}</td>
      <td className="bug-row-title">{bug_raghavaReddy.title_raghavaReddy}</td>
      <td><SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} /></td>
      <td><StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} /></td>
      <td className="bug-row-assignee">
        {assignee && (
          <div className="bug-card-assignee">
            <div className="mini-avatar" style={{ background: assignee.avatar }}>{assignee.name_raghavaReddy[0]}</div>
            <span>{assignee.name_raghavaReddy}</span>
          </div>
        )}
      </td>
      <td className="bug-row-date">{format(new Date(bug_raghavaReddy.createdAt), 'MMM d')}</td>
    </tr>
  );
}

BugRow_24BCE0965.propTypes = {
  bug_raghavaReddy: PropTypes.object.isRequired,
  showCheckbox_24BCE0965: PropTypes.bool,
  checked_raghavaReddy: PropTypes.bool,
  onCheck_24BCE0965: PropTypes.func,
};
