import React from 'react';
import styled from 'styled-components';
import { FormProps, message } from 'antd';
import { Button, Form, Input } from 'antd';
import logo from '../../../components/assets/logos/nobis_horizontal.png';
import { Typography } from 'antd';

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100%; 
`;

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.username,
        password: values.password
      })
    };

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/digital_partners/login', options)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('digitalPartnerToken', response.token)
        localStorage.setItem('digitalPartnerUuid', response.uuid)

        window.location.href = '/parceiro-digital/'
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: 'Email ou senha incorretos',
        });
      });
  };

  return (
    <CenteredContainer>
      {contextHolder}
      <img src={logo} style={{ width: '300px', margin: '20px' }} />
      <Title level={2}>Parceiro Digital</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="username"
          rules={[{ required: true, message: 'Por favor insira seu e-mail!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
      <p>
        Não tem uma conta? <a href="/parceiro-digital/cadastrar">Cadastre-se</a>
      </p>
    </CenteredContainer>
  )
};

export default App;