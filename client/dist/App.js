import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import OffcanvasMenu from './components/OffcanvasMenu.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import PersonalInfoView from './components/PersonalInfoView.js';
import ReservationView from './components/ReservationView.js';
//import MenuView from './components/MenuView.js';
//import RewardsView from './components/RewardsView.js';
import Dashboard from './components/Dashboard.js';

function App() {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).show();
  };

  const handleLogout = () => {
    setUser(null);
    setMode('login');
  };

  const handleNavigate = (target) => {
    setMode(target);
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, { user: user, onToggleMenu: toggleMenu }),
    user && React.createElement(OffcanvasMenu, { user: user, onNavigate: handleNavigate, onLogout: handleLogout }),
    !user
      ? mode === 'login'
        ? React.createElement(LoginForm, { onSuccess: (u) => { setUser(u); setMode('dashboard'); }, onSwitch: () => setMode('signup') })
        : React.createElement(SignUpForm, { onSuccess: () => setMode('login'), onSwitch: () => setMode('login') })
      : {
          dashboard: React.createElement(Dashboard, { user: user }),
          personalInfo: React.createElement(PersonalInfoView, { user: user, onUpdate: setUser }),
          reservation: React.createElement(ReservationView, {user: user}),
          //menu: React.createElement(MenuView),
          //rewards: React.createElement(RewardsView)
        }[mode]
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(React.createElement(App));