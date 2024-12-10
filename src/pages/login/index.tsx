import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/login/loginForm';
import { message } from 'antd';

export default function Inicio() {
  const navigate = useNavigate();
  const url = window.location.href;
  const pdCode = url.split('/cadastro/')[1]; // Extrai o código do projeto da URL

  const handleJoinProject = async (projectCode) => {
    const authToken = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(`https://brenno-envoriment-platform-server-testing.1pc5en.easypanel.host/users/into/project/${projectCode}`, {
        method: 'PUT',
        headers: {
          'User-Agent': 'insomnia/10.1.1',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const data = await response.json();
          message.success("Você entrou no projeto com sucesso!");
          console.log("Resposta do servidor:", data);
        } catch {
          const text = await response.text();
          message.success(`Você entrou no projeto com sucesso! Resposta: ${text}`);
        }
      } else {
        const errorText = await response.text();
        message.error(`Erro: ${errorText || "Falha ao entrar no projeto."}`);
      }
    } catch (error) {
      console.error("Erro ao entrar no projeto:", error);
      message.error("Erro ao processar a solicitação.");
    }
  };

  const onLoginSuccess = async () => {
    if (pdCode) {
      await handleJoinProject(pdCode); // Faz a associação ao projeto
    }
    navigate('/inicio'); // Redireciona para a tela inicial
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'undefined') {
      localStorage.clear();
    } else {
      navigate('/inicio');
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="container">
        <Login onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
