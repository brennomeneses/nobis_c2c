import React from 'react';
import { Typography, Divider, Button } from 'antd';
import Prestador from '../../components/prestador/footer';
import Cliente from '../../components/cliente/footer';
import PrestadorH from '../../components/prestador/index/header';
import ClienteH from '../../components/cliente/index/header';
import logo from '../../components/assets/logos/nobis_horizontal.png'

import { useMediaQuery } from 'react-responsive';
import HeaderCMobile from '../../components/cliente/index/headerCel'
import HeaderPMobile from '../../components/prestador/index/headerMobile'

const { Title, Paragraph } = Typography;

export default function Classes() {
  const isClient = localStorage.getItem('isClient');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  function redirect () {
    window.location.href="/";
  }

  return (
    <>
      {isClient === null ? (
        <>
          <div style={{ paddingTop: "1.5%", paddingBottom: "0", paddingLeft: "5%", paddingRight: "5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <img src={logo} style={{ height: "50px" }} />
            </div>
            <div>
              <Button onClick={redirect}>Login</Button>
            </div>
          </div>
          <Divider style={{ marginBottom: "-5%" }} />
          <br /><br /><br />
        </>
      ) : (
        <>
          {isClient === '1' ? (isMobile ? <HeaderCMobile /> : <ClienteH />) : (isMobile ? <HeaderPMobile /> : <PrestadorH />)}
        </>
      )}

      <div className='container' style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <br /><br />
        <h1>Perguntas Frequentes</h1>
        <br />
        <Divider />
        <Title level={3}>1. Onde encontro meu CEP?</Title>
        <Paragraph style={{ fontSize: "18px" }}>
          O CEP (Código de Endereçamento Postal) é um número que identifica sua localização. Para encontrá-lo, você pode:
        </Paragraph>
        <ul>
          <li>Consultar uma correspondência antiga: Verifique cartas ou faturas que recebeu. O CEP geralmente está no envelope.</li>
          <li>Perguntar a um vizinho: Eles provavelmente têm o mesmo CEP que você.</li>
          <li>Usar a internet: Visite o site dos Correios ou pesquise no Google "CEP + seu endereço".</li>
        </ul>

        <Divider />

        <Title level={3}>2. O que fazer se meu celular avisar que não tem memória disponível para finalizar o cadastro?</Title>
        <Paragraph style={{ fontSize: "18px" }}>
          Se está tendo dificuldades para finalizar o formulário e entrar na plataforma, uma solução simples é limpar o cache do aparelho. O cache são arquivos temporários que ficam acumulados e podem ocupar bastante espaço.
        </Paragraph>
        <Paragraph style={{ fontSize: "18px" }}>
          Para limpar o cache:
        </Paragraph>
        <Title level={3}>Android:</Title>
        <ul>
          <li>Vá em "Configurações".</li>
          <li>Selecione "Armazenamento" ou "Aplicativos".</li>
          <li>Escolha o aplicativo que deseja limpar e clique em "Limpar cache".</li>
        </ul>
        <Title level={3}>iPhone:</Title>
        <ul>
          <li>Vá em "Ajustes".</li>
          <li>Selecione "Geral".</li>
          <li>Vá em "Armazenamento do iPhone".</li>
          <li>Escolha o aplicativo e toque em "Apagar App" ou "Descarregar App".</li>
        </ul>
        <Paragraph style={{ fontSize: "18px" }}>
          No caso do iPhone, verifique se o app é pouco utilizado/não possui arquivos importantes antes de "Descarregar App".
        </Paragraph>
        <Divider />
        <Paragraph style={{ fontSize: "16px" }}>
          Caso ainda tenha dúvidas, entre em contato com nosso suporte, e ficaremos felizes em ajudar!
        </Paragraph>
      </div>

      <br /><br /><br /><br /><br /><br />
      {isClient === null ? null : isClient === '1' ? <Cliente /> : <Prestador />}
    </>
  );
}
