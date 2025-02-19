import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Modal, Button } from 'antd'; // Importando o Modal e Button do Ant Design
import Header from '../../../components/cliente/index/header';
import HeaderMobile from '../../../components/cliente/index/headerCel';
import Dados from '../../../components/cliente/perfil-prestador/dados-pessoais';
import Servico from '../../../components/cliente/perfil-prestador/dados-servico';
import Portfolio from '../../../components/cliente/perfil-prestador/portfolio';
import Solicitar from '../../../components/cliente/perfil-prestador/solicitar';
import Footer from '../../../components/cliente/footer';
import reduceRating from '../../../components/assets/schemas/reduceRating';
import Afiliacoes from '../../../components/cliente/perfil-prestador/afiliacoes';
import baseUrl from '../../../components/assets/schemas/baseUrl';

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const userUuid = localStorage.getItem('userUuid');
  const url = window.location.href;
  const uuid = url.split('/prestador/')[1];

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [dadosPrestador, setDadosPrestador] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla a visibilidade do modal

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    fetch(`${baseUrl}/users/profile/${uuid}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDadosPrestador(response[0]);
      })
      .catch((err) => console.error(err));
  }, [uuid]);

  if (!dadosPrestador) {
    return null;
  }

  function solicitarServico() {
    setDisableButton(false);

    const service = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    fetch(`${baseUrl}/services/${uuid}`, service)
      .then((response) => response.json())
      .then((response) => {
        window.location.href = `/chat/${response.room}`;
      })
      .catch((err) => console.error(err));
  }

  // Função para abrir o modal
  function handleSolicitarClick() {
    setIsModalVisible(true);
  }

  // Função para fechar o modal
  function handleCancel() {
    setIsModalVisible(false);
  }

  // Função para seguir o fluxo ao clicar "Entendi"
  function handleOk() {
    setIsModalVisible(false);
    solicitarServico(); // Chama a função para solicitar o serviço
  }

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div className='container'>
        <Dados
          nome={dadosPrestador.fullName}
          foto={`${baseUrl}/uploads/${dadosPrestador.avatar}`}
          profissao={dadosPrestador.role}
          nota={
            dadosPrestador.clientRatings.length <= 0
              ? 0
              : reduceRating(dadosPrestador.clientRatings)
          }
          bio={dadosPrestador.about}
          badges={dadosPrestador.badges}
          deficiency={dadosPrestador.deficiency}
          birthContry={dadosPrestador.birthContry}
          birthdate={dadosPrestador.birthdate}
          oficialDev={dadosPrestador.oficialDev}
        />
        <br />
        
        <h3>Informações do Serviço</h3>
        <Servico
          orcamento={dadosPrestador.budget}
          pagamento={dadosPrestador.payments}
          distancia={parseFloat(dadosPrestador.distance).toFixed(2)}
          deficiencia={dadosPrestador.deficiency}
          opRad={dadosPrestador.operationRadius}
        />
        {dadosPrestador.portfolioUrl ? (
          <>
            <h3>Portifólio de serviços e produtos:</h3>
            <a href={dadosPrestador.portfolioUrl}>{dadosPrestador.portfolioUrl}</a>
          </>
        ) : (<></>)}
        <br />
        {dadosPrestador.projects && dadosPrestador.projects.length > 0 && (
          <>
            <h3>Afiliações a Projetos</h3>
            <Afiliacoes partners={[
        ...new Map(dadosPrestador.projects.map((p) => [p.id, p])).values(),
      ]} />
            <br />
          </>
        )}
        {dadosPrestador.portifolios && dadosPrestador.portifolios.length > 0 && (
          <>
            <h3>Portfólio</h3>
            <Portfolio />
            <br />
          </>
        )}
        {uuid !== userUuid && (
          <>
            {disableButton ? (
              <Solicitar onClick={handleSolicitarClick} />
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      {/* Modal Ant Design */}
      <Modal
        title="Atenção"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Entendi"
        cancelText="Cancelar"
      >
        <p>
          A Nobis não é um marketplace, e a responsabilidade pelo serviço é
          inteiramente do prestador. Deseja continuar?
        </p>
      </Modal>

      <Footer />
    </>
  );
}