import React from 'react';
import { Card } from 'antd';
import img from '../../assets/imgs/chatImg.png';

const App: React.FC = () => (
  <>
    <center>
      <Card
        style={{
          width: '90%', // Use 90% da largura da tela no mobile
          maxWidth: 260, // Limite de largura para telas maiores
          textAlign: 'justify',
          alignContent: 'center',
          margin: '20px auto', // Centralizar o card
        }}
      >
        <p>Para garantir um ambiente respeitoso e agradável para todos, pedimos que você converse de maneira educada e civilizada.</p>
      </Card>
    </center>

    <style jsx>{`
      @media (max-width: 768px) {
        Card {
          width: 100%;
          margin: 10px;
        }
        .ant-card {
          width: 100%; /* O card ocupa quase toda a largura no mobile */
          margin: 1px;
          padding: 1px 1px !important; /* Reduz mais o padding vertical no mobile */
        }

        .ant-card p {
          font-size: 12px; /* Ajusta o tamanho da fonte para mobile */
        }
      }
    `}</style>
  </>
);

export default App;
