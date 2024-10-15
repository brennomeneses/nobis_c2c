import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/cliente/chat/header';
import Aviso from '../../../components/cliente/chat/aviso';
import Enviar from '../../../components/cliente/chat/enviarMsg';
import Footer from '../../../components/cliente/footer';
import { socket } from '../../../socket';
import baseUrl from '../../../components/assets/schemas/baseUrl';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const FixedHeader = styled(Header)`
  flex-shrink: 0;
`;

const FixedFooter = styled(Footer)`
  flex-shrink: 0;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 5px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageContainer = styled.div<{ isSender: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSender ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageBox = styled.div<{ isSender: boolean }>`
  background-color: ${props => props.isSender ? '#F0EAFF' : '#f1f0f0'};
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const SenderName = styled.b`
  margin-bottom: 5px;
`;

const EnviarContainer = styled.div`
  flex-shrink: 0;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const [msg, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const url = window.location.href;
  const uuid = url.split('/chat/')[1];

  function handleResponse(response) {
    console.log('Response from server:', response);
    setMessages(response);
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`https://brenno-envoriment-node.1pc5en.easypanel.host/services/room/${uuid}/status`, options)
      .then(response => response.json())
      .then(data => {
        const userData = {
          fullName: data.user[0]?.fullName,
          avatar: data.user[0]?.avatar,
          status: data.service.status,
          nameClient: data.user[1]?.fullName
        };
        setUserData(userData);
      })
      .catch(err => console.error(err));

    socket.emit('user:chat', {
      userUuid: localStorage.getItem('userUuid'),
      messageRoomUuid: uuid,
    }, (response) => {
      console.log(response);
      handleResponse(response);
    });

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    socket.on('message', (response) => {
      setMessages(prevMessages => [...prevMessages, response]);
    });

    scrollToBottom();

    return () => {
      socket.off('connect_error');
      socket.off('message');
    };
  }, [authToken, uuid]);

  const userUuid = localStorage.getItem('userUuid');

  const UploadContainer = ({ message }: { message: any }) => {
    const { filename } = message;
    const regex = /^.*\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp)$/i;
    if (regex.test(filename)) {
      return (
        <Image
          style={{ maxWidth: 300 }}
          src={`${baseUrl}/uploads/${filename}`}
        />
      );
    } else {
      return (
        <a href={`${baseUrl}/uploads/${filename}`} download>
          <Button type="dashed" icon={<DownloadOutlined />}>
            {filename}
          </Button>
        </a>
      );
    }
  };

  return (
    <>
      <Container className='containerChat'>
        {userData && (
          <FixedHeader
            nome={userData.fullName}
            foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${userData.avatar}`}
            loggedUserName={userData.nameClient}
          />
        )}
        <ChatContainer>
          <Aviso />
          {msg && msg.map((message, index) => (
            <MessageContainer key={index} isSender={message.sender.uuid === userUuid}>
              <MessageBox isSender={message.sender.uuid === userUuid}>
                <SenderName>{message.sender.full_name}</SenderName>
                <p>{message.filename ? <UploadContainer message={message} /> : (<></>)}</p>
                <p>{message.content}</p>
              </MessageBox>
            </MessageContainer>
          ))}
          <div ref={messagesEndRef} />
        </ChatContainer>
        <EnviarContainer>
          {userData && <Enviar status={userData.status} />}
        </EnviarContainer>
      </Container>
      <FixedFooter />
    </>
  );
}