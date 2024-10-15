import React from 'react';
import ClienteHistorico from '../../pages/cliente/historico';
import PrestadorHistorico from '../../pages/prestador/historico';

export default function Historico() {
  const isClient = localStorage.getItem('isClient');

  return (
    <>
      {isClient === '1' ? <ClienteHistorico /> : <PrestadorHistorico />}
    </>
  );
}
