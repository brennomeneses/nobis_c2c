import React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

interface AppProps {
  nome: string;
  foto: string;
  msg: string;
  uuid: string;
  date: string;
}

// Função para pegar o primeiro e último nome
const formatName = (nome: string) => {
  const nameParts = nome.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`; // Primeiro e último nome
  }
  return nome; // Se só tiver um nome, retorna ele mesmo
};

const App: React.FC<AppProps> = ({ nome, foto, msg, uuid, date }) => (
  <Link to={`/chat/${uuid}`} className="linkContainer">
    <div className="chatCard">
      <div className="chatCardContent">
        <div className="chatCardImg">
          <img src={foto} className="iconPesquisa" alt="Foto do prestador" />
        </div>
        <div className="chatCardPrestador">
          <h2>{formatName(nome)}</h2> {/* Exibe apenas o primeiro e último nome */}
          <h3>{msg}</h3>
        </div>
      </div>
      <div className="chatCardStatus">
        <p className="statusText">Última mensagem enviada: {date}</p>
      </div>
    </div>
    <Divider />
  </Link>
);

export default App;