import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import Busca from '../../../components/cliente/busca/barra-busca';
import Avisos from '../../../components/cliente/busca/avisos';
import Categorias from '../../../components/cliente/busca/categorias';
import Footer from '../../../components/cliente/footer';
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/cliente/index/header';
import HeaderMobile from '../../../components/cliente/index/headerCel';
import Card from '../../../components/cliente/busca/prestadores';

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const [profissao, setProfissao] = React.useState(null);
  const [prestadores, setPrestadores] = React.useState([]);
  const [mostrarCards, setMostrarCards] = React.useState(false);
  const [mensagem, setMensagem] = React.useState('');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Hook para capturar o parâmetro da URL
  const location = useLocation();

  // Captura o valor de 'servico' da URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const servico = params.get('servico');
    if (servico) {
      handleSearchSubmit(servico); // Realiza a busca automaticamente com o serviço
    }
  }, [location]);

  const handleSearchSubmit = (selectedService) => {
    setProfissao(selectedService);
  };

  React.useEffect(() => {
    if (profissao) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ role: profissao })
      };

      fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users/find', options)
        .then(response => response.json())
        .then(response => {
          setPrestadores(response);
          setMostrarCards(response.length > 0);
          setMensagem(response.length > 0 ? '' : (
            <>
              <Alert
                message="Nenhum prestador encontrado"
                description="No momento, não há prestadores cadastrados para este serviço."
                type="info"
              />
              <br />
            </>
          ));
        })
        .catch(err => {
          console.error(err);
          setMensagem('Ocorreu um erro ao buscar prestadores.');
        });
    } else {
      setPrestadores([]);
      setMostrarCards(false);
      setMensagem('');
    }
  }, [profissao]);

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <br /><br />
      <div className='container'>
        <Busca onSearchSubmit={handleSearchSubmit} />
        <br />
        {mensagem && (
          <div className="mensagem-aviso">
            {mensagem}
          </div>
        )}
        {!mostrarCards && (<><Avisos /><Categorias /></>)}
        {mostrarCards && (
          <>
            {prestadores.map((prestador) => (
              <Link to={`/prestador/${prestador.uuid}`} key={prestador.id}>
                <Card
                  nome={prestador.fullName}
                  foto={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${prestador.avatar}`}
                  servico={prestador.role}
                  nota={prestador.clientRatings.lenght === 0 ?
                    "Cliente não possui avaliações"
                    : prestador.clientRatings.reduce((acc, rating) => acc + ((rating.payment + rating.helpfulness + rating.respect) / 3), 0) / prestador.clientRatings.length}
                  distancia={`${prestador.distance.toFixed(0)}km`}
                  trabalhoRemoto={prestador.remoteWork}
                />
              </Link>
            ))}
          </>
        )}
        <br /><br />
      </div>
      <Footer />
    </>
  );
}