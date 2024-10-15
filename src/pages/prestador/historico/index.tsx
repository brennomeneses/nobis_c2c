import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import Historico from '../../../components/prestador/historico/servicos-finalizados'
import Footer from '../../../components/prestador/footer'
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile'
import { Divider } from 'antd';

export default function Inicio() {
  const [solicitacao, setSolicitacao] = useState([]);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    getSolicitacoes();
  }, []);

  function getSolicitacoes() {
    const authToken = localStorage.getItem('authToken');

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/services', options)
      .then(response => response.json())
      .then(response => setSolicitacao(response))
      .catch(err => console.error(err));
  }

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div className='container'>
        <center><h3>Histórico de serviços</h3></center>
        <Divider />
        <br />
        {solicitacao
          .filter(s => s.status === 'completed')
          .map((solicitacao, index) => (
            <Historico
              nome={solicitacao.client.fullName}
              valor={(solicitacao.price)}
              pagamento={solicitacao.paymentMethod}
              data={solicitacao.createdAt}
              servico={solicitacao.description}
              uuid={solicitacao.room.uuid}
            />
          ))}
        <br /><br /><br /><br />
      </div>
      <br /><br /><br /><br />
      <Footer />
    </>
  )
}