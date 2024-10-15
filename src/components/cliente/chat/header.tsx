import React, { useState } from 'react';
import { Divider, Modal, Form, Input, Button, Tooltip } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

interface Props {
  nome: string;
  foto: string;
  loggedUserName: string; // Nome do usuário logado
}

const ChatHeader: React.FC<Props> = ({ nome, foto, loggedUserName }) => {
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
    <>
      <div className="chatHeader">
        <div className="chatHeaderImg">
          <img src={foto} className="chatHeaderImgSize" alt="Foto do usuário" />
        </div>
        <div className="chatHeaderName">
          <h2 className="chatHeaderNameText">{formatName(nome)}</h2>
        </div>
        <Tooltip title="Reportar Comportamento Suspeito">
          <Button 
            className="reportBtn"
            danger 
            type="default" 
            icon={<WarningOutlined />} 
            onClick={showModal} // Chama o modal ao clicar
          >
            Reportar Usuário
          </Button> 
        </Tooltip>
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
    </>
  );
};

export default ChatHeader;