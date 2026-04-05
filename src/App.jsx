import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider_24BCE0965, AuthContext_24BCE0965 } from './context/AuthContext';
import { BugProvider_24BCE0965 } from './context/BugContext';
import { NotifProvider_24BCE0965 } from './context/NotifContext';

import Landing_24BCE0965 from './pages/Landing';
import Login_24BCE0965 from './pages/Login';
import Register_24BCE0965 from './pages/Register';
import Dashboard_24BCE0965 from './pages/Dashboard';
import Projects_24BCE0965 from './pages/Projects';
import AllBugs_24BCE0965 from './pages/AllBugs';
import KanbanBoard_24BCE0965 from './pages/KanbanBoard';
import ReportBug_24BCE0965 from './pages/ReportBug';
import BugDetail_24BCE0965 from './pages/BugDetail';
import SmartSearch_24BCE0965 from './pages/SmartSearch';
import Analytics_24BCE0965 from './pages/Analytics';
import { Notifications_24BCE0965, Team_24BCE0965, ActivityLog_24BCE0965, Settings_24BCE0965, Profile_24BCE0965, Portfolio_24BCE0965 } from './pages/PagesCombined';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext_24BCE0965);
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider_24BCE0965>
      <BugProvider_24BCE0965>
        <NotifProvider_24BCE0965>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing_24BCE0965 />} />
              <Route path="/login" element={<Login_24BCE0965 />} />
              <Route path="/register" element={<Register_24BCE0965 />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard_24BCE0965 /></PrivateRoute>} />
              <Route path="/projects" element={<PrivateRoute><Projects_24BCE0965 /></PrivateRoute>} />
              <Route path="/bugs" element={<PrivateRoute><AllBugs_24BCE0965 /></PrivateRoute>} />
              <Route path="/bugs/:id" element={<PrivateRoute><BugDetail_24BCE0965 /></PrivateRoute>} />
              <Route path="/kanban" element={<PrivateRoute><KanbanBoard_24BCE0965 /></PrivateRoute>} />
              <Route path="/report" element={<PrivateRoute><ReportBug_24BCE0965 /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><SmartSearch_24BCE0965 /></PrivateRoute>} />
              <Route path="/analytics" element={<PrivateRoute><Analytics_24BCE0965 /></PrivateRoute>} />
              <Route path="/notifications" element={<PrivateRoute><Notifications_24BCE0965 /></PrivateRoute>} />
              <Route path="/team" element={<PrivateRoute><Team_24BCE0965 /></PrivateRoute>} />
              <Route path="/activity" element={<PrivateRoute><ActivityLog_24BCE0965 /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings_24BCE0965 /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile_24BCE0965 /></PrivateRoute>} />
              <Route path="/portfolio" element={<Portfolio_24BCE0965 />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </NotifProvider_24BCE0965>
      </BugProvider_24BCE0965>
    </AuthProvider_24BCE0965>
  );
}
