import React, { useEffect, useState } from 'react';
import imagem from '../../assets/imgs/prestador.png';
import baseUrl from '../../assets/schemas/baseUrl';

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

    fetch(baseUrl + '/users', options)
      .then(response => response.json())
      .then(response => setUserData(response))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <>
      {userData && (
        <div className="destaque">
          <div className="destaqueImg">
            <img className="iconPesquisa" src={`${baseUrl}/uploads/${userData.user.avatar}`} />
          </div>
          <div className="destaquePrestador">
            {userData && (
              <>
                <h2>{userData.user.fullName}</h2>
                <h3>{'Cliente'}</h3>
              </>
            )}
          </div>
        </div>
      )
      }
    </>
  );
}

export default App;