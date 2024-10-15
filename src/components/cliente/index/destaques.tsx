import React from 'react';
import imagem from '../../assets/imgs/prestador.png';
import baseUrl from '../../assets/schemas/baseUrl';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';

const App: React.FC = () => {
  const authToken = localStorage.getItem('authToken');

  const [highlights, setHightlights] = React.useState(null);

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`${baseUrl}/users/highlights/3/interval/30`, options)
      .then(response => response.json())
      .then(response => setHightlights(response))
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      <h1 className="titulo">Destaques da semana <StarFilled style={{ fontSize: "18px", color: "#4C3779" }} /></h1>
      <div className="destaques">
        {highlights && (
          <>
            {
              highlights.map(users => (
                <Link to={`/prestador/${users.uuid}`}>
                  <Card style={{ marginBottom: "2%" }}>
                    <div className="destaque">
                      <div className="destaqueImg">
                        <img
                          style={{
                            borderRadius: '100%',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                          src={`${baseUrl}/uploads/${users.avatar}`} />
                      </div>
                      <div className="destaquePrestador">
                        <h2>{users.fullName}</h2>
                        <h3>{users.role}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            }
          </>
        )}
      </div>
    </>
  )
};

export default App;