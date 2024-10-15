import React from 'react';
import ClienteChat from '../../pages/cliente/chat';
import PrestadorChat from '../../pages/prestador/chat';

export default function Chat() {
  const isClient = localStorage.getItem('isClient');

  return (
    <>
      {isClient === '1' ? <ClienteChat /> : <PrestadorChat />}
    </>
  );
}
