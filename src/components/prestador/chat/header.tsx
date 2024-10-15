import React, { useState } from 'react';
import { Divider, Button, ConfigProvider, Modal, Form, Input, Tooltip } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const App: React.FC<{ nome: string; foto: string; onClick: () => void; status: string; uuid: string; loggedUserName: string }> = ({ nome, foto, onClick, status, uuid, loggedUserName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para processar o nome
  const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length > 2) {
      return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
    }
    return fullName;
  };

  // Funções para abrir e fechar o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBorderColor: "#4C3779",
            defaultColor: "#4C3779",
            defaultHoverBorderColor: "#4C3779",
            defaultHoverColor: "#4C3779",
            defaultHoverBg: "#f5f0ff"
          },
        },
      }}
    >
      <>
        <div className="chatHeader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Link to={`/cliente/${uuid}`} style={{ display: 'flex', alignItems: 'center', flex: 1, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div className="chatHeaderImg">
                <img src={foto} className="chatHeaderImgSize" alt={`${nome}'s avatar`} />
              </div>
              <div style={{ marginLeft: "3%", marginRight: "5%", color: "black", flexGrow: 1 }} className="chatHeaderName">
                <h2 className="chatHeaderNameText">{formatName(nome)}</h2>
              </div>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "baseline" }}>
            {status === 'active' && (
              <div onClick={onClick} style={{ cursor: "pointer", flexShrink: 0, marginTop: '10px' }}>
                <Button size='large'><CheckCircleOutlined /> Finalizar serviço</Button>
              </div>
            )}

            {/* Botão de denúncia */}
            <Tooltip title="Reportar Comportamento Suspeito">
              <Button
                className="reportBtn"
                danger
                size='large'
                style={{ marginLeft: "10px" }}
                type="default"
                icon={<WarningOutlined />}
                onClick={showModal} // Chama o modal ao clicar
              >
                Reportar Usuário
              </Button>
            </Tooltip>
          </div>

          
        </div>

        <Divider />

        {/* Modal de Report */}
        <Modal
          title="Reportar Usuário"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {/* Formulário para enviar a denúncia */}
          <Form
            action="https://formsubmit.co/marinacbraga@hotmail.com"
            method="POST"
            layout="vertical"
          >
            {/* Campos ocultos com os nomes */}
            <input type="hidden" name="loggedUserName" value={loggedUserName} />
            <Form.Item label="Usuário reportado" required>
              <Input name="reportedUserName" value={nome} readOnly />
            </Form.Item>
            <Form.Item label="Motivo da Denúncia" required>
              <Input.TextArea name="reportReason" rows={4} placeholder="Descreva o motivo da denúncia" required />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar Denúncia
            </Button>
          </Form>
        </Modal>

        <style jsx>{`
          @media (max-width: 768px) {
            .chatHeader {
              flex-direction: column; /* Stack elements vertically */
              align-items: flex-start;
            }

            .chatHeaderImgSize {
              width: 50px; /* Adjust image size for mobile */
              height: 50px;
              border-radius: 50%;
            }

            .chatHeaderNameText {
              font-size: 1.2rem; /* Adjust font size for mobile */
            }

            Button {
              width: 100%; /* Make button take full width on mobile */
              margin-top: 10px;
            }

            .chatHeaderName {
              margin-left: 10px; /* Reduce margin for mobile */
            }
          }
        `}</style>
      </>
    </ConfigProvider>
  );
};

export default App;