import React from 'react';
import ClienteConfiguracoes from '../../pages/cliente/configuracoes';
import PrestadorConfiguracoes from '../../pages/prestador/configuracoes';

export default function Configuracoes() {
  const isClient = localStorage.getItem('isClient');

  return (
    <>
      {isClient === '1' ? <ClienteConfiguracoes /> : <PrestadorConfiguracoes />}
    </>
  );
}
