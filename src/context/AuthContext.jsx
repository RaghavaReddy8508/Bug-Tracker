// ============================================================
// AuthContext — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// useContext, createContext, Provider
// ============================================================

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext_24BCE0965 = createContext(null);

export function AuthProvider_24BCE0965({ children }) {
  const [user_raghavaReddy, setUser_raghavaReddy] = useState(() => {
    try {
      const stored = localStorage.getItem('bugtrackr_user_24BCE0965');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user_raghavaReddy) {
      localStorage.setItem('bugtrackr_user_24BCE0965', JSON.stringify(user_raghavaReddy));
    } else {
      localStorage.removeItem('bugtrackr_user_24BCE0965');
    }
  }, [user_raghavaReddy]);

  const login_24BCE0965 = (email_raghavaReddy, password_raghavaReddy) => {
    // Get registered users from localStorage
    const registeredUsers_24BCE0965 = JSON.parse(localStorage.getItem('bugtrackr_registered_users_24BCE0965') || '[]');
    
    // Check registered users first
    const foundUser_raghavaReddy = registeredUsers_24BCE0965.find(
      u => u.email === email_raghavaReddy && u.password === password_raghavaReddy
    );

    if (foundUser_raghavaReddy) {
      const { password: _password, ...userWithoutPassword_24BCE0965 } = foundUser_raghavaReddy;
      setUser_raghavaReddy(userWithoutPassword_24BCE0965);
      console.log(`✅ Login successful — 24BCE0965 Raghava Reddy — user: ${foundUser_raghavaReddy.name_raghavaReddy}`);
      return { success: true };
    }
    
    // Default demo login
    if (email_raghavaReddy === 'raghava@bugtrackr.dev' && password_raghavaReddy === '24BCE0965') {
      const demoUser_raghavaReddy = {
        id: 'user_24BCE0965',
        name_raghavaReddy: 'Raghava Reddy',
        email: 'raghava@bugtrackr.dev',
        role: 'Admin',
        avatar: '#3b5bdb',
      };
      setUser_raghavaReddy(demoUser_raghavaReddy);
      console.log('✅ Demo login — 24BCE0965 Raghava Reddy');
      return { success: true };
    }

    console.log('❌ Login failed — 24BCE0965 Raghava Reddy');
    return { success: false, error: 'Invalid email or password — 24BCE0965' };
  };

  const register_24BCE0965 = (userData_raghavaReddy) => {
    const registeredUsers_24BCE0965 = JSON.parse(localStorage.getItem('bugtrackr_registered_users_24BCE0965') || '[]');
    
    // Check if email exists
    if (registeredUsers_24BCE0965.find(u => u.email === userData_raghavaReddy.email)) {
      return { success: false, error: 'Email already registered — 24BCE0965' };
    }

    const newUser_raghavaReddy = {
      id: `user_${Date.now()}`,
      ...userData_raghavaReddy,
      avatar: '#3b5bdb',
    };

    registeredUsers_24BCE0965.push(newUser_raghavaReddy);
    localStorage.setItem('bugtrackr_registered_users_24BCE0965', JSON.stringify(registeredUsers_24BCE0965));

    const { password: _password, ...userWithoutPassword_24BCE0965 } = newUser_raghavaReddy;
    setUser_raghavaReddy(userWithoutPassword_24BCE0965);
    console.log(`✅ Register successful — 24BCE0965 Raghava Reddy — new user: ${newUser_raghavaReddy.name_raghavaReddy}`);
    return { success: true };
  };

  const logout_24BCE0965 = () => {
    setUser_raghavaReddy(null);
    localStorage.removeItem('bugtrackr_user_24BCE0965');
    console.log('👋 Logout — 24BCE0965 Raghava Reddy');
  };

  const updateProfile_24BCE0965 = (updates_raghavaReddy) => {
    setUser_raghavaReddy(prev => ({ ...prev, ...updates_raghavaReddy }));
    console.log('✏️ Profile updated — 24BCE0965 Raghava Reddy');
  };

  return (
    <AuthContext_24BCE0965.Provider
      value={{
        user: user_raghavaReddy,
        login_24BCE0965,
        register_24BCE0965,
        logout_24BCE0965,
        updateProfile_24BCE0965,
      }}
    >
      {children}
    </AuthContext_24BCE0965.Provider>
  );
}
