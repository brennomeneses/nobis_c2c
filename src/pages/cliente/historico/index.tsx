import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import Historico from '../../../components/cliente/historico/servicos-finalizados'
import Footer from '../../../components/cliente/footer'
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/cliente/index/header'
import HeaderMobile from '../../../components/cliente/index/headerCel'
import { Divider } from 'antd';
import baseUrl from '../../../components/assets/schemas/baseUrl';

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

    fetch(baseUrl + '/services', options)
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
              nome={solicitacao.user.fullName}
              valor={(solicitacao.price)}
              pagamento={solicitacao.paymentMethod}
              data={solicitacao.createdAt}
              servico={solicitacao.description}
              profissao={solicitacao.user.role}
              remoteWork={solicitacao.remoteWork}
              uuid={solicitacao.room.uuid}
            />
          ))}
        <br /><br /><br /><br />
      </div>
      <Footer />
    </>
  )
}