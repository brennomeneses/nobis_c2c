import React, { useState, useEffect } from 'react';
import { SendOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, Button, Space, Form, message, Upload, Modal } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import type { FormProps } from 'antd';
import { socket } from '../../../socket';
import styled from 'styled-components';
import baseUrl from '../../assets/schemas/baseUrl';

const ResponsiveInput = styled(Input)`
  width: 25vw;

  @media (max-width: 768px) {
    width: 50vw;
  }
`;

type FieldType = {
  msg?: string;
  file?: UploadFile;
};

interface EnviarProps {
  status: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const App: React.FC<EnviarProps> = ({ status, inputValue, setInputValue }) => {
  const [userFile, setUserFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageToSend, setMessageToSend] = useState<FieldType | null>(null);

  useEffect(() => {
    form.setFieldsValue({ msg: inputValue }); // Atualiza o campo msg quando inputValue muda
  }, [inputValue]);

  const url = window.location.href;
  const uuid = url.split('/chat/')[1] || url.split('/chat-servico/')[1];

  const [form] = Form.useForm();

  const showWarningModal = (values: FieldType) => {
    setMessageToSend(values);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (messageToSend) {
      socket.emit('message', {
        message: messageToSend.msg,
        messageRoomUuid: uuid,
        userUuid: localStorage.getItem('userUuid'),
        filename: userFile,
      });
      setUserFile(null);
      form.resetFields(['msg', 'file']);
      setMessageToSend(null);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setMessageToSend(null);
    setIsModalVisible(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const phoneRegex = /(\+?\d{1,4}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?(\d{4,5}[\s-]?\d{4})/g;

    if (phoneRegex.test(values.msg || '')) {
      showWarningModal(values);
    } else {
      socket.emit('message', {
        message: values.msg,
        messageRoomUuid: uuid,
        userUuid: localStorage.getItem('userUuid'),
        filename: userFile,
      });
      setUserFile(null);
      form.resetFields(['msg', 'file']);
    }
  };

  const props: UploadProps = {
    name: 'file',
    maxCount: 1,
    action: `${baseUrl}/messages`,
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
    onChange(info) {
      setLoading(true);
      if (info.file.status === 'done') {
        setUserFile(info.file.response);
        setLoading(false);
      } else if (info.file.status === 'error') {
        message.error(`Erro ao anexar ${info.file.name}. Por favor, tente novamente.`);
        setLoading(false);
      }
    },
    onRemove() {
      setUserFile(null);
    },
  };

  return (
    <>
      {status !== 'completed' ? (
        <div style={{ width: '100%' }}>
          <Space style={{ width: '100%' }}>
            <Form form={form} name="basic" onFinish={onFinish}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2%', alignItems: 'flex-end' }}>
                <Form.Item<FieldType>
                  name="msg"
                  rules={[
                    {
                      validator: (_, value) => {
                        const file = form.getFieldValue('file');
                        if (!value && !file) {
                          return Promise.reject('Escreva uma mensagem ou selecione um arquivo!');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <ResponsiveInput
                    autoComplete="off"
                    className="chatInput"
                    placeholder="Escreva uma mensagem..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Form.Item>
                <Form.Item<FieldType> name="file">
                  <Upload {...props}>
                    <Button className="btnPC">
                      <UploadOutlined /> Selecionar Arquivo
                    </Button>
                    <Button className="btnCel">
                      <UploadOutlined />
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    disabled={loading}
                    htmlType="submit"
                    className="btnPC"
                    style={{ backgroundColor: '#4C3779' }}
                  >
                    Enviar
                  </Button>
                  <Button type="primary" htmlType="submit" className="btnCel" style={{ backgroundColor: '#4C3779' }}>
                    <SendOutlined />
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Space>
        </div>
      ) : (
        <>
          <br />
          Não é possível enviar mais mensagens pois este serviço já foi concluído.
          <br />
          <br />
          <br />
        </>
      )}

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined style={{ color: 'orange', marginRight: 8 }} /> Atenção
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Enviar mesmo assim"
        cancelText="Cancelar"
        okButtonProps={{ style: { backgroundColor: '#4C3779', borderColor: '#4C3779', color: 'white' } }}
        cancelButtonProps={{ style: { borderColor: '#4C3779', color: '#4C3779' } }}
      >
        <p>
          Você está prestes a enviar uma mensagem contendo um número de telefone. Para sua segurança, orientamos que
          permaneça na Plataforma durante todas as etapas da negociação.
          <br />
          <br />
          Deseja prosseguir?
        </p>
      </Modal>
    </>
  );
};

export default App;
