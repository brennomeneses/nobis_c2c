import React, { useState, useEffect } from 'react';
import Chat from '../../../components/cliente/chats/chat';
import Footer from '../../../components/cliente/footer';
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/cliente/index/header'
import HeaderMobile from '../../../components/cliente/index/headerCel'
import { Divider } from 'antd';

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

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/services/rooms/all', options)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          console.log(data);
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

  const filteredSalas = salas.filter(sala => sala.user[0]?.uuid !== userUuid);

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div className='container'>
        <h2>Serviços em andamento</h2>
        <Divider />
        {error && <p>{error}</p>}
        {Array.isArray(filteredSalas) && filteredSalas
          .filter(s => s.service.status === 'active')
          .map(sala => (
          <Chat
            key={sala.uuid}
            nome={sala.user[0]?.fullName}
            foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${sala.user[0]?.avatar}`} 
            msg={sala.messages && sala.messages.length > 0 ? sala.messages[0].content : ''}
            uuid={sala.uuid}
            date={new Date(sala.updatedAt).toLocaleDateString()}
            status={sala.service.status}
          />
        ))}
        <br /><br /><br />
        <h2>Serviços concluídos</h2>
        <Divider />
        {error && <p>{error}</p>}
        {Array.isArray(filteredSalas) && filteredSalas
          .filter(s => s.service.status === 'completed')
          .map(sala => (
          <Chat
            key={sala.uuid}
            nome={sala.user[0]?.fullName}
            foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${sala.user[0]?.avatar}`} 
            msg={sala.messages && sala.messages.length > 0 ? sala.messages[0].content : ''}
            uuid={sala.uuid}
            date={new Date(sala.updatedAt).toLocaleDateString()}
            rating={sala.service.ratingQuality}
            serviceUUID={sala.service.uuid}
          />
        ))}
      </div>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
}