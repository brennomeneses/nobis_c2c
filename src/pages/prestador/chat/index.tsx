import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/prestador/chat/header';
import Aviso from '../../../components/prestador/chat/aviso';
import Finalizar from '../../../components/prestador/chat/finalizar';
import Enviar from '../../../components/cliente/chat/enviarMsg';
import Sugestoes from '../../../components/prestador/chat/sugestoes'
import Footer from '../../../components/prestador/footer';
import { socket } from '../../../socket';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import baseUrl from '../../../components/assets/schemas/baseUrl';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FixedHeader = styled(Header)`
  flex-shrink: 0;
`;

const FixedFooter = styled(Footer)`
  flex-shrink: 0;
`;

const ChatContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSender ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageBox = styled.div`
  background-color: ${props => props.isSender ? '#F0EAFF' : '#f1f0f0'};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
`;

const SenderName = styled.b`
  margin-bottom: 5px;
`;

const EnviarContainer = styled.div`
  flex-shrink: 0;
  background-color: #fff;
  padding: 0 0 50px 0;
  margin: 0 auto;
  margin-bottom: 30px;
  border-top: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 0 0 30px 0; // Diminui o padding em telas menores
    margin-bottom: 20px;  // Ajusta a margem inferior
  }
`;

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const [msg, setMessages] = useState([]);
  const [serviceUUID, setserviceUUID] = useState([]);
  const [finalizarVisible, setFinalizarVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const url = window.location.href;
  const uuid = url.split('/chat/')[1];

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [msg]);

  function handleResponse(response) {
    setMessages(response);
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`${baseUrl}/services/room/${uuid}/status`, options)
      .then(response => response.json())
      .then(data => {
        setserviceUUID(data.service.uuid);
        console.log(data);
        const userData = {
          fullName: data.user[1]?.fullName,
          avatar: data.user[1]?.avatar,
          status: data.service.status,
          uuid: data.user[1]?.uuid,
          prestadorName: data.user[0]?.fullName
        };
        setUserData(userData);
      })
      .catch(err => console.error(err));

    // Emite o evento de chat do usuário
    socket.emit('user:chat', {
      userUuid: localStorage.getItem('userUuid'),
      messageRoomUuid: uuid,
    }, (response) => {
      handleResponse(response);
    });

    // Listener para erros de conexão
    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    // Listener para novas mensagens
    socket.on('message', (response) => {
      setMessages(prevMessages => [...prevMessages, response]);
    });

    scrollToBottom()

    return () => {
      socket.off('connect_error');
      socket.off('message');
    };
  }, [authToken, uuid]);

  const userUuid = localStorage.getItem('userUuid');

  function fecharChat() {
    setFinalizarVisible(true);
  }

  function cancelar() {
    setFinalizarVisible(false);
  }

  function preencherInfo() {
    window.location.href = `/servico-finalizado/${serviceUUID}`;
  }

  const UploadContainer = ({ message }: { message: any }) => {
    const { filename } = message;
    const regex = /^.*\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp)$/i
    if (regex.test(filename))
      return (<Image style={{
        maxWidth: 300
      }} src={`${baseUrl}/uploads/${filename}`} />)
    else
      return (<a
        href={`${baseUrl}/uploads/${filename}`}
        download
      >
        <Button type="dashed" icon={<DownloadOutlined />}>
          {filename}
        </Button>
      </a>)
  }

  return (<>
    <Container className='containerChat'>
      {userData && (
        <FixedHeader onClick={fecharChat} nome={userData.fullName} foto={`${baseUrl}/uploads/${userData.avatar}`} status={userData.status} uuid={userData.uuid} loggedUserName={userData.prestadorName} />
      )}
      {!finalizarVisible ? (
        <>
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
          {userData && userData.status !== "completed" && <Sugestoes onSuggestionClick={setInputValue} />}
          <EnviarContainer>
            {userData && <Enviar inputValue={inputValue} setInputValue={setInputValue} status={userData.status} />}
          </EnviarContainer>
        </>
      ) : (
        <Finalizar cancelar={cancelar} confirmar={preencherInfo} />
      )}
      
    </Container>
    <FixedFooter />
  </>
  );
}