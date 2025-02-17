import '../../App.css';
import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Badge, Alert, Button } from 'antd';
import Header from '../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../components/prestador/index/headerMobile';
import Aviso from '../../components/prestador/index/aviso';
import Solicitados from '../../components/prestador/index/solicitacoes';
import Clube from '../../components/prestador/index/clube';
import Servicos from '../../components/prestador/index/servicos';
import Footer from '../../components/prestador/footer';
import reduceRating from '../../components/assets/schemas/reduceRating';
import bg from '../../components/assets/bgs/prestador.png';
import baseUrl from '../../components/assets/schemas/baseUrl';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const [solicitacao, setSolicitacao] = useState([]); // Define como array vazio inicialmente
  const [videos, setVideos] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const userUuid = localStorage.getItem('userUuid');

  useEffect(() => {
    getSolicitacoes();
    getVideos();
  }, []);

  function getSolicitacoes() {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`${baseUrl}/services`, options)
      .then(response => response.json())
      .then(response => {
        if (Array.isArray(response)) {
          setSolicitacao(response);
        } else {
          console.error('Resposta inesperada para getSolicitacoes:', response);
          setSolicitacao([]);
        }
      })
      .catch(err => {
        console.error(err);
        setSolicitacao([]);
      });
  }

  function getVideos() {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`${baseUrl}/learning`, options)
      .then(response => response.json())
      .then(response => {
        if (Array.isArray(response)) {
          setVideos(response);
        } else {
          console.error('Unexpected response format:', response);
          setVideos([]);
        }
      })
      .catch(err => {
        console.error(err);
        setVideos([]);
      });
  }

  const pendingServices = Array.isArray(solicitacao) ? solicitacao.filter(s => s.status === 'pending') : [];

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: "repeat-y" }}>
        <div className='container'>
          <br />

          {pendingServices.length === 0 ? (
            <Card>
              <Link to="/prestador/videos">
                <h1>Vídeos</h1>
              </Link>
              <Row gutter={24} style={{
                display: "flex",
                justifyContent: "center"
              }}>
                <p>
                  <Alert message="No momento você não possui solicitações de serviços. Que tal assistir à uma vídeo-aula profissionalizante de um de nossos parceiros digitais?" type="info" />
                </p>
                {videos && (
                  <>
                    {
                      videos.length > 0 ? (
                        <>
                          <div className="videos-container">
                            {videos.filter((_, i) => i <= 2).map((video) => (
                              <Link to={`/video/${video.uuid}`} key={video.uuid}>
                                <Card
                                  hoverable
                                  style={{ width: 200, margin: '0 10px 0 10px' }}
                                  cover={<img alt="example" src={`${baseUrl}/uploads/${video.thumbnail}`} />}
                                >
                                  <Card.Meta title={video.title} />
                                  {video.tags.map((tag) => (
                                    <Badge
                                      className="badges-videos"
                                      count={tag.name}
                                      color={tag.color ? tag.color : "#f50"}
                                      key={tag.name}
                                    />
                                  ))}
                                </Card>
                              </Link>
                            ))}
                          </div>

                          <style jsx>{`
                            .videos-container {
                              display: flex;
                              justify-content: center;
                            }

                            @media (max-width: 768px) {
                              .videos-container {
                                flex-direction: column;
                                align-items: center;
                              }

                              .ant-card {
                                margin: 10px 0;
                                width: 100%;
                                max-width: 300px;
                              }
                            }
                          `}</style>
                        </>
                      ) : (
                        <p>
                          <Alert
                            message="Nenhum vídeo encontrado"
                            showIcon
                            description={
                              <>
                                {'Nosso algoritimo não conseguiu lhe recomendar nenhum vídeo, recomendamos que você atualize a sua descrição para que possamos te recomendar vídeos de acordo com suas preferências.'}
                                <Link to={`/perfil-prestador/${userUuid}`}>
                                  <Button size="small" type='link'> Atualizar descrição </Button>
                                </Link>
                              </>}
                            type="info"
                          />
                        </p>)
                    }
                  </>
                )}
              </Row>
            </Card>
          ) : (
            <>
              <Card>
                <h1 className='titulo'>Solicitações de Serviços</h1>
                <Row gutter={24}>
                  {pendingServices.length > 0 ? (
                    pendingServices.map((solicitacao, index) => (
                      <Col xs={24}
                        sm={12}
                        md={8} key={index} style={{ marginBottom: '5%' }}>
                        <Solicitados
                          nome={solicitacao.client.fullName}
                          nota={reduceRating(solicitacao.client.clientRatings)}
                          serviceUUID={solicitacao.uuid}
                          foto={`${baseUrl}/uploads/${solicitacao.client.avatar}`}
                          chatroomUUID={solicitacao.room.uuid}
                        />
                      </Col>
                    ))
                  ) : (
                    <Aviso />
                  )}
                </Row>
              </Card>
              <br /><br /><br />
              <Card>
                <h1 className='titulo'>Serviços Ativos</h1>
                <Row gutter={24}>
                  {solicitacao
                    .filter(s => s.status === 'active')
                    .map((solicitacao, index) => (
                      <Col xs={24}
                        sm={12}
                        md={8} key={index} style={{ marginBottom: '5%' }}>
                        <Servicos
                          nome={solicitacao.client.fullName}
                          nota={reduceRating(solicitacao.client.clientRatings)}
                          foto={`${baseUrl}/uploads/${solicitacao.client.avatar}`}
                          chatroomUUID={solicitacao.room.uuid}
                        />
                      </Col>
                    ))}
                </Row>
              </Card>
            </>
          )}

          <br />
        </div>
        <br /><br /><br /><br /><br />
        <br />
        <Footer />
      </div>
    </>
  );
}
