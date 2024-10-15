import React from 'react';
import ClienteChats from '../../pages/cliente/chats';
import PrestadorChats from '../../pages/prestador/chats';

export default function Chats() {
  const isClient = localStorage.getItem('isClient');

  return (
    <>
      {isClient === '1' ? <ClienteChats /> : <PrestadorChats />}
    </>
  );
}
