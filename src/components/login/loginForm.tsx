import React from 'react';
import { Input, Button, Divider, Modal, Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logos/nobis_principal_branca.png';
import baseUrl from '../assets/schemas/baseUrl';

const RegistrationForm = ({onLoginSuccess}) => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, contextHolderMessage] = message.useMessage();

  function login(values: {
    email: string;
    password: string;
  }) {
    const email = values.email;
    const pwd = values.password;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"email":"${email}","password":"${pwd}"}`
    };

    fetch(baseUrl + '/login', options)
      .then(async response => {
        if (!response.ok) {
          // Handle error response
          const errorText = await response.text(); // read the error message as text

          throw new Error(errorText); // throw the error to be caught in the catch block
        }
        return response.json(); // return the successful response as JSON
      })
      .then(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userUuid', response.uuid);
        localStorage.setItem('isClient', response.isClient);
        window.location.href = `/inicio`;
      })
      .catch(err => {
        if(err.message === 'Invalid Email' || err.message === 'Invalid Password'){
          messageApi.open({
            type: 'error',
            content: 'E-mail ou senha incorretos',
          });
          return;
        }
        messageApi.open({
          type: 'error',
          content: 'Erro interno, tente novamente mais tarde.',
        });
        console.log(err)
      });
  }
  
  const forgotPassowrd = () => {
    const onFinish = (values: any) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email
        })
      };

      fetch(`${baseUrl}/users/code/password`, options)
        .then(async response => {
          if (!response.ok) {
            // Handle error response
            const errorText = await response.text(); // read the error message as text

            if (errorText === 'User not found')
              modal.error({
                title: "Erro",
                content: (<p>Usuário não encontrado</p>)
              })

            throw new Error(errorText); // throw the error to be caught in the catch block
          }
          return response.json(); // return the successful response as JSON
        })
        .then(async response => {
          const confirm = await modal.success({
            title: "Email enviado",
            content: <p>Cheque sua caixa de email para inserir o codigo na pagina a seguir</p>
          })

          if (confirm) {
            navigate('/esqueci-senha');
          }
        })
        .catch(err => console.error(err));
    }

    modal.info({
      title: 'Esqueceu a senha?',
      okText: "Fechar",
      content: (
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <p>Enviaremos um email com codigo (e também link) para a redefinição da sua senha na plataforma</p >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor coloque o seu email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form >
      ),
    });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {contextHolder}
      {contextHolderMessage}
      <div style={{ marginBottom: '5%' }}>
        <br /><br /><br /><br /><br /><br /><br />
        <img src={logo} style={{ height: '200px' }} />
      </div>
      <p style={{ textAlign: "left", color: "white", fontWeight: "500" }}>Login</p>
      <Form
        onFinish={login}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor coloque o seu email!' },
          ]}
          style={{ marginBottom: '10px' }}
        >
          <Input
            placeholder="Insira seu e-mail"
            style={{ width: '300px'}}
            id="email"
            
            />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Por favor coloque a sua senha!' },
          ]}
          style={{ marginBottom: '20px' }}
        >
          <Input.Password
            placeholder="Insira sua senha"
            style={{ width: '300px'}}
            id="pwd"
            
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType='submit'
            block
            style={{ backgroundColor: '#FFAB00', borderColor: '#FFAB00', width: '300px' }}
          >
            Continuar
          </Button>
        </Form.Item>
      </Form>
      <br />
      <a href="#" onClick={() => forgotPassowrd()} className="text" style={{ textDecoration: "underline" }}>Esqueci minha senha</a>
      <Divider style={{ backgroundColor: '#624B7B' }} />
      <p className="text">Ainda não possui conta? <Link to={'/cadastro'} style={{ color: "white", textDecoration: "underline" }}>Cadastre-se aqui</Link></p>
      <br />
      <p style={{ width: '300px', textAlign: 'center', color: "#624B7B" }}>Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Nobis e de suas afiliadas, no número cadastrado.</p>
    </div>
  );
};

export default RegistrationForm;