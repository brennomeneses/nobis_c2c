import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/login/loginForm';

export default function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'undefined') {
      localStorage.clear();
    } else {
      navigate('/inicio');
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="container">
        <Login />
      </div>
    </div>
  );
}
