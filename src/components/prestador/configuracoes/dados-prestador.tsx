import React, { useEffect, useState } from 'react';
import imagem from '../../assets/imgs/prestador.png';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users', options)
      .then(response => response.json())
      .then(response => setUserData(response))
      .catch(err => console.error(err));
  }, []);

  const getPlanoAtual = () => {
    if (!userData?.user?.subscriptionType) {
      return 'Gratuito';
    }
    switch (userData.user.subscriptionType) {
      case 'basic':
        return 'Simples';
      case 'premium':
        return 'Ilimitado';
      default:
        return 'Gratuito';
    }
  };

  useEffect(() => {
    if (userData) {
      const planoAtual = getPlanoAtual();
      localStorage.setItem('planoAtual', planoAtual);
    }
  }, [userData]);

  return (
    <>
      {userData && (
        <div className="destaque">
          <div className="destaqueImg">
            <img className="iconPesquisa" src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${userData.user.avatar}`} />
          </div>
          <div className="destaquePrestador">
            {userData && (
              <>
                <h2>{userData.user.fullName}</h2>
                <h3>{userData.user.isClient === 0 ? userData.user.role : 'Cliente'}</h3>
                <Link to={"/compra-creditos"} style={{ cursor: "pointer" }}>
                  <p style={{ fontWeight: "500", color: 'black' }}>
                    Créditos de serviço: {userData.tokens || 0} - Plano Atual: {getPlanoAtual()}
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
