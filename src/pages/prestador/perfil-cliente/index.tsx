import React, { useState, useEffect } from 'react';
import Dados from '../../../components/prestador/perfil-cliente/dados-pessoais';
import Avaliacoes from '../../../components/prestador/perfil-cliente/avaliacoes';
import Footer from '../../../components/prestador/footer';

export default function Inicio() {
  const url = window.location.href;
  const uuid = url.split('/cliente/')[1];
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for UUID:', uuid);
        const response = await fetch(`https://brenno-envoriment-node.1pc5en.easypanel.host/users/profile/${uuid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log('Data received:', data);
        setDados(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dados) {
    return <p>No data available</p>;
  }

  const clientRatings = dados.clientRatings || [];

  // Calculando a nota média
  const averageRating = clientRatings.length
    ? (
        clientRatings.reduce((acc, curr) => acc + curr.helpfulness + curr.respect, 0) / (clientRatings.length * 2)
      ).toFixed(1)
    : 0;

  const prestativoRating = clientRatings.length ? clientRatings[0].helpfulness : 0;
  const respeitosoRating = clientRatings.length ? clientRatings[0].respect : 0;

  return (
    <>
      <div className='container'>
        <Dados
          foto={dados.avatar}
          nome={dados.fullName}
          nota={Number(averageRating)}
        />
        <br />
        <Avaliacoes
          prestativo={Number(prestativoRating)}
          respeitoso={Number(respeitosoRating)}
        />
        <br />
        {/*<Servicos />*/}
      </div>
      <br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
}