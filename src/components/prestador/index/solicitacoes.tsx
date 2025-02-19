import React, { useState } from 'react';
import { Card, Modal, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import baseUrl from '../../assets/schemas/baseUrl';

const App: React.FC<{ foto: string, nome: string, nota: number, serviceUUID: string, chatroomUUID: string }> = ({ foto, nome, nota, serviceUUID, chatroomUUID }) => {
  const authToken = localStorage.getItem('authToken');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleServiceAction = (status: string) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ status })
    };

    fetch(`${baseUrl}/services/${serviceUUID}/status`, options)
      .then(response => {
        if (response.ok) {
          setIsModalOpen(false);
          if (status === 'active') {
            window.location.href = `/chat/${chatroomUUID}`;
          } else {
            setIsModalOpen(false);
          }
        } else if (response.status === 406) {
          return response.text().then(data => {
            message.error(`Ops! Você está sem créditos! Para aceitar esta e outras solicitações, basta assinar um de nossos planos.`);
          });
        } else {
          return response.text().then(data => {
            throw new Error(data || 'Falha ao atualizar o status');
          });
        }
      })
      .catch(err => {
        console.error(err);
        message.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      });
  };

  return (
    <>
      <Card bordered={true} onClick={showModal} style={{ cursor: "pointer" }}>
        <center>
          <div className="solicitacoes">
            <img src={foto} className='fotoSolicitacao' alt="Prestador" />
            <h3>{nome}</h3>
            <div className='rating'><StarFilled />{nota}</div>
          </div>

          <p>Cliente gostaria de <br /> solicitar um serviço.</p>
          <sup style={{ backgroundColor: "rgb(210, 191, 246)", borderRadius: "5%" }}>Clique para ver mais informações.</sup>
        </center>
      </Card>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <center>
          <div className="solicitacoes">
            <img src={foto} className='fotoSolicitacao' alt="Prestador" />
            <h3>{nome}</h3>
            <div className='rating'><StarFilled />{nota}</div>
          </div>

          <p>Cliente gostaria de entrar em <br /> contato para solicitar um serviço</p>

          <br />

          <button className="btnConfirmar" onClick={() => handleServiceAction('active')}>Aceitar</button>
          <br /><br />
          <button className="btnCancelar" onClick={() => handleServiceAction('cancelled')}>Rejeitar</button>

          <br />
        </center>
      </Modal>
    </>
  );
};

export default App;
