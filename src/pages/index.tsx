import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClienteInicio from '../pages/cliente/';
import PrestadorInicio from '../pages/prestador/';

export default function Inicio() {
  const isClient = localStorage.getItem('isClient');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'undefined') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      {isClient === '1' ? <ClienteInicio /> : <PrestadorInicio />}
    </>
  );
}
