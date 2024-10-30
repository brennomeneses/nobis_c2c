import React, { useState } from 'react';
import { Typography, Divider, Button } from 'antd';
import Prestador from '../../components/prestador/footer';
import Cliente from '../../components/cliente/footer';
import PrestadorH from '../../components/prestador/index/header';
import ClienteH from '../../components/cliente/index/header';
import logo from '../../components/assets/logos/nobis_horizontal.png';
import iphone from '../../components/assets/imgs/iphone.png';
import android from '../../components/assets/imgs/android.png';

import { useMediaQuery } from 'react-responsive';
import HeaderCMobile from '../../components/cliente/index/headerCel';
import HeaderPMobile from '../../components/prestador/index/headerMobile';

const { Title, Paragraph } = Typography;

export default function Classes() {
  const isClient = localStorage.getItem('isClient');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // Função para iniciar o Text-to-Speech
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Define para português
    speechSynthesis.speak(utterance);
  };

  function redirect() {
    window.location.href = "/";
  }

  return (
    <>
      {isClient === null ? (
        <div style={{ paddingTop: "1.5%", paddingBottom: "0", paddingLeft: "5%", paddingRight: "5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={logo} style={{ height: "50px" }} alt="Logo" />
          <Button onClick={redirect}>Login</Button>
        </div>
      ) : (
        isClient === '1' ? (isMobile ? <HeaderCMobile /> : <ClienteH />) : (isMobile ? <HeaderPMobile /> : <PrestadorH />)
      )}
      <br/><br/><br/>
      <div className='container' style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={1}>Perguntas Frequentes</Title>
        <Divider />

        <Title level={3}>1. Onde encontro meu CEP?</Title>
        <Button onClick={() => speakText('O CEP (Código de Endereçamento Postal) é um número que identifica sua localização. Para encontrá-lo, você pode Consultar uma correspondência antiga, Perguntar a um vizinho ou pesquisar na internet.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          O CEP (Código de Endereçamento Postal) é um número que identifica sua localização. Para encontrá-lo, você pode:
        </Paragraph>
        <ul>
          <li>Consultar uma correspondência antiga.</li>
          <li>Perguntar a um vizinho.</li>
          <li>Pesquisar na internet.</li>
        </ul>
        <Divider />

        <Title level={3}>2. O que fazer se meu celular avisar que não tem memória disponível para finalizar o cadastro?</Title>
        <Button onClick={() => speakText('Se está tendo dificuldades para finalizar o formulário e entrar na plataforma, uma solução simples é limpar o cache do aparelho.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Se está tendo dificuldades para finalizar o formulário e entrar na plataforma.
        </Paragraph>
        <Title level={3}>Android:</Title>
        <Button onClick={() => speakText('No Android, vá em "Configurações", selecione "Armazenamento", escolha o aplicativo e clique em "Limpar cache".')}>
          🔊 Ouvir
        </Button>
        <ul>
          <li>Vá em "Configurações". </li>
          <li>Selecione "Armazenamento". </li>
          <li>Escolha o aplicativo que deseja limpar e clique em "Limpar cache".</li>
        </ul>
        <Title level={3}>iPhone:</Title>
        <Button onClick={() => speakText('No iPhone, vá em "Ajustes", selecione "Geral", escolha o aplicativo e toque em "Apagar App".')}>
          🔊 Ouvir
        </Button>
        <ul>
          <li>Vá em "Ajustes". </li>
          <li>Selecione "Geral". </li>
          <li>Escolha o aplicativo e toque em "Apagar App".</li>
        </ul>
        <Divider />

        <Title level={3}>3. Como ativar a função de ditado para preencher o formulário com voz?</Title>
        <Button onClick={() => speakText('Se preferir usar a voz para preencher o formulário, você pode ativar o recurso de ditado no seu celular.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Se preferir usar a voz para preencher o formulário, você pode ativar o recurso de ditado no seu celular.
        </Paragraph>
        <Title level={3}>Android:</Title>
        <Button onClick={() => speakText('No Android, acesse o teclado e toque no ícone de microfone.')}>
          🔊 Ouvir
        </Button>
        <ul>
          <li>Acesse o teclado.</li>
          <li>Toque no ícone de microfone.</li>
        </ul>
        <img src={android} alt="Android example" />
        <Title level={3}>iPhone:</Title>
        <Button onClick={() => speakText('No iPhone, abra o teclado e toque no ícone de microfone.')}>
          🔊 Ouvir
        </Button>
        <ul>
          <li>Abra o teclado.</li>
          <li>Toque no ícone de microfone.</li>
        </ul>
        <img src={iphone} alt="iPhone example" />
        <Divider />

        <Title level={3}>4. Tutorial da Plataforma</Title>
    
        <Title level={3}>Para Clientes</Title>
        
        <Title level={4}>1. Escolhendo o Prestador</Title>
        <Button onClick={() => speakText('Verifique o perfil do prestador, incluindo avaliações de outros clientes, fotos dos serviços e especializações. Quanto melhor a avaliação, mais garantia de qualidade você tem!')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Verifique o perfil do prestador, incluindo avaliações de outros clientes, fotos dos serviços e especializações. Quanto melhor a avaliação, mais garantia de qualidade você tem!
        </Paragraph>

        <Title level={4}>2. Iniciando uma Conversa</Title>
        <Button onClick={() => speakText('Clique no botão “Conversar” para iniciar o chat com o prestador. Seja direto e explique o que precisa.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Clique no botão “Conversar” para iniciar o chat com o prestador. Seja direto e explique o que precisa. Por exemplo, “Oi, gostaria de saber mais sobre o serviço X” é um bom começo.
        </Paragraph>

        <Title level={4}>3. Negociando o Serviço</Title>
        <Button onClick={() => speakText('No chat, você pode negociar valores, combinar horários e esclarecer dúvidas. Fique à vontade para alinhar todos os detalhes antes de fechar o serviço.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          No chat, você pode negociar valores, combinar horários e esclarecer dúvidas. Fique à vontade para alinhar todos os detalhes antes de fechar o serviço.
        </Paragraph>

        <Title level={4}>4. Confirmando Pagamento e Finalização</Title>
        <Button onClick={() => speakText('Depois que o serviço for concluído, vá ao seu histórico e confirme o pagamento pelo aplicativo.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Depois que o serviço for concluído, vá ao seu histórico e confirme o pagamento pelo aplicativo. Isso mantém o registro do serviço e ajuda o prestador a saber que o trabalho foi aprovado!
        </Paragraph>

        <Title level={4}>5. Deixando uma Avaliação</Title>
        <Button onClick={() => speakText('Avalie o serviço prestado. Isso ajuda outros clientes e valoriza o trabalho dos prestadores qualificados.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Avalie o serviço prestado. Isso ajuda outros clientes e valoriza o trabalho dos prestadores qualificados. Seja sincero e compartilhe sua experiência!
        </Paragraph>

        <Divider />

        <Title level={3}>Para Prestadores de Serviços</Title>
        
        <Title level={4}>1. Criando um Perfil Atraente</Title>
        <Button onClick={() => speakText('Capriche no seu perfil! Adicione uma foto, uma descrição dos serviços e suas especialidades.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Capriche no seu perfil! Adicione uma foto, uma descrição dos serviços e suas especialidades. Quanto mais informações claras e fotos de qualidade, mais clientes você atrai.
        </Paragraph>

        <Title level={4}>2. Respondendo aos Clientes</Title>
        <Button onClick={() => speakText('Sempre que um cliente entrar em contato, responda rapidamente para não perder a oportunidade.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Sempre que um cliente entrar em contato, responda rapidamente para não perder a oportunidade. Use saudações simples, como as disponibilizadas na seleção automática.
        </Paragraph>

        <Title level={4}>3. Negociação e Alinhamento</Title>
        <Button onClick={() => speakText('No chat, converse abertamente sobre preços, disponibilidade e condições do serviço.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          No chat, converse abertamente sobre preços, disponibilidade e condições do serviço. Seja claro e transparente para evitar mal-entendidos.
        </Paragraph>

        <Title level={4}>4. Confirmação de Serviço e Pagamento</Title>
        <Button onClick={() => speakText('Após concluir o serviço, lembre o cliente de confirmar o pagamento no aplicativo.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Após concluir o serviço, lembre o cliente de confirmar o pagamento no aplicativo e deixar uma avaliação positiva!
        </Paragraph>

        <Title level={4}>5. Organizando Seus Serviços</Title>
        <Button onClick={() => speakText('Utilize o histórico de transações para acompanhar seus trabalhos e pagamentos.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Utilize o histórico de transações para acompanhar seus trabalhos e pagamentos, mantendo tudo organizado e de fácil acesso.
        </Paragraph>

        <Title level={4}>6. Deixando uma Avaliação</Title>
        <Button onClick={() => speakText('Avalie o cliente! Isso ajuda outros prestadores e demonstra uma interação agradável.')}>
          🔊 Ouvir
        </Button>
        <Paragraph style={{ fontSize: "18px" }}>
          Avalie o cliente! Isso ajuda outros prestadores e demonstra uma interação agradável e genuína. Seja sincero e compartilhe sua experiência!
        </Paragraph>

        <Divider />

        <Paragraph style={{ fontSize: "16px" }}>
          Caso ainda tenha dúvidas, entre em contato com nosso suporte!
        </Paragraph>
      </div>

      {isClient === null ? null : isClient === '1' ? <Cliente /> : <Prestador />}
    </>
  );
}
