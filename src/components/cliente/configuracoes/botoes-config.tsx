import React from 'react';
import { UserOutlined, CommentOutlined, LogoutOutlined, HistoryOutlined, QuestionCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

const App: React.FC = () => {

  const uuid = localStorage.getItem('userUuid');
  
  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isClient');
    localStorage.removeItem('userUuid');
  }
  
  return(
  <>
    <div className="botoes">
      <Divider />
      <br/>
      <Link to={`/meu-perfil/${uuid}`} style={{ color: "black" }}><UserOutlined /> Meus dados </Link>
      <br/><br/>
      <Divider />
      <br/>
      <Link to={"/chats"} style={{ color: "black" }}><CommentOutlined /> Chats</Link>
      <br/><br/>
      <Divider />
      <br/>
      <Link to={"/historico"} style={{ color: "black" }}><HistoryOutlined /> Histórico de serviços contratados</Link>
      <br/><br/>
      <Divider />
      <br/>
      <Link to={"/forum"} style={{ color: "black" }}><SnippetsOutlined /> Acessar o Fórum Nobis</Link>
      <br/><br/>
      <Divider />
      <br/>
      <Link to={"/faq"} style={{ color: "black" }}>
        <QuestionCircleOutlined /> Perguntas Frequentes
      </Link>
      <br /><br />
      <Divider />
      <br />
      <Link to={"/"} style={{ color: "black" }} onClick={logout}><LogoutOutlined /> Sair</Link>
      <br/><br/>
      <Divider />
    </div>
  </>
)};

export default App;