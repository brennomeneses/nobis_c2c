import React, { useState, useEffect } from 'react';
import Chat from '../../../components/prestador/chats/chat';
import Footer from '../../../components/prestador/footer';
import { Divider } from 'antd';
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile'
import baseUrl from '../../../components/assets/schemas/baseUrl';

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const userUuid = localStorage.getItem('userUuid');
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState(null);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(baseUrl + '/services/rooms/all', options)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSalas(data);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format received from API');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
      });
  }, [authToken]);

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div className='container'>
        <h2>Serviços em andamento</h2>
        <Divider />
        {error && <p>{error}</p>}
        {Array.isArray(salas) && salas
          .filter(s => s.service.status === 'active' && s.user[1]?.uuid !== userUuid)
          .map(sala => (
            <Chat
              key={sala.uuid}
              nome={sala.user[1]?.fullName}
              foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${sala.user[1]?.avatar}`} 
              msg={sala.messages && sala.messages.length > 0 ? sala.messages[0].content : ''}
              uuid={sala.uuid}
              date={new Date(sala.updatedAt).toLocaleDateString()}
            />
          ))}
        <br /><br /><br />
        <h2>Serviços concluídos</h2>
        <Divider />
        {error && <p>{error}</p>}
        {Array.isArray(salas) && salas
          .filter(s => s.service.status === 'completed' && s.user[1]?.uuid !== userUuid)
          .map(sala => (
            <Chat
              key={sala.uuid}
              nome={sala.user[1]?.fullName}
              foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${sala.user[1]?.avatar}`} 
              msg={sala.messages && sala.messages.length > 0 ? sala.messages[0].content : ''}
              uuid={sala.uuid}
              date={new Date(sala.updatedAt).toLocaleDateString()}
            />
          ))}
      </div>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
}