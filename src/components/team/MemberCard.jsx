// MemberCard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const moodIcons_24BCE0965 = {
  'confused': '😕', 'frustrated': '😤', 'confident': '💪',
  'blocked': '🚧', 'resolved-in-head': '💡',
};

export default function MemberCard_24BCE0965({ member_raghavaReddy, mood_24BCE0965 }) {
  const navigate = useNavigate();
  const initials_24BCE0965 = member_raghavaReddy.name_raghavaReddy.split(' ').map(n => n[0]).join('');
  return (
    <div className="member-card" onClick={() => navigate(`/bugs?assignee=${member_raghavaReddy.id}`)} id={`member-${member_raghavaReddy.id}`}>
      <div className="member-avatar" style={{ background: member_raghavaReddy.avatar }}>
        {initials_24BCE0965}
        {mood_24BCE0965 && (
          <div className="member-mood-badge" title={`Dominant mood: ${mood_24BCE0965}`}>
            {moodIcons_24BCE0965[mood_24BCE0965] || '❓'}
          </div>
        )}
      </div>
      <div className={`member-online ${member_raghavaReddy.isOnline ? 'online' : 'offline'}`} />
      <h4 className="member-name">{member_raghavaReddy.name_raghavaReddy}</h4>
      <span className="member-role-badge">{member_raghavaReddy.role}</span>
      <div className="member-stats">
        <div className="member-stat"><span className="member-stat-val">{member_raghavaReddy.bugsAssigned}</span><span className="member-stat-label">Assigned</span></div>
        <div className="member-stat"><span className="member-stat-val">{member_raghavaReddy.bugsResolved}</span><span className="member-stat-label">Resolved</span></div>
      </div>
    </div>
  );
}
MemberCard_24BCE0965.propTypes = {
  member_raghavaReddy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name_raghavaReddy: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['Admin','Developer','Tester','Designer']).isRequired,
    bugsAssigned: PropTypes.number,
    bugsResolved: PropTypes.number,
    isOnline: PropTypes.bool,
    avatar: PropTypes.string,
  }).isRequired,
  mood_24BCE0965: PropTypes.string,
};
