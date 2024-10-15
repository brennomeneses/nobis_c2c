import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Badge, List, Avatar, Alert, Button } from 'antd';
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile'
import Footer from '../../../components/prestador/footer';
import baseUrl from '../../../components/assets/schemas/baseUrl';
import '../../../App.css';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

export default function VideosPrestador() {
  const [playlists, setPlaylist] = useState([]);
  const [videos, setVideos] = useState([]);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const token = localStorage.getItem('authToken')
  const userUuid = localStorage.getItem('userUuid')

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`${baseUrl}/learning/playlist`, options)
      .then(response => response.json())
      .then(response => setPlaylist(response))
      .catch(err => console.error(err));

    fetch(`${baseUrl}/learning`, options)
      .then(response => response.json())
      .then(response => setVideos(response))
      .catch(err => console.error(err));
  }, []);

  const dataResponse = () => playlists.map((playlist) => ({
    href: `google.com`,
    title: playlist.name,
    avatar: playlist.digitalPartner.profilePicture ? `${baseUrl}/uploads/${playlist.digitalPartner.profilePicture}` : `https://api.dicebear.com/9.x/icons/svg?randomizeIds=false&seed=${playlist.digitalPartner.uuid}&icon=flower2`,
    description: playlist.digitalPartner.orgName,
    thumbnail: `${playlist.videos.length ? `${baseUrl}/uploads/${playlist.videos[0].thumbnail}` : 'https://fakeimg.pl/600x400?text=Image+Error&font=noto'}`
  }))

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: "repeat-y" }}>
        <div className='container'>
          <h1>Trilhas de Aprendizado</h1>
          {playlists && (
            <>
              {playlists.length > 0 ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  dataSource={dataResponse()}
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}
                      extra={
                        <img
                          height={150}
                          alt="logo"
                          src={item.thumbnail}
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Alert
                  message="Nenhuma Trilha de Aprendizado encontrada"
                  showIcon
                  description='Nosso algoritimo não conseguiu lhe recomendar nenhuma trilha de aprendizado. Atualize a sua descrição para que possamos te recomendar trilhas de aprendizado de acordo com suas preferências.'
                  type="info"
                  action={
                    <Link to={`/perfil-prestador/${userUuid}`}>
                      <Button size="small" type='link'>
                        Atualizar descrição
                      </Button>
                    </Link>
                  }
                />
              )}
            </>
          )}


          <h1>Videos</h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly'
            }}
          >
            {videos && (
              <>
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <Link to={`/video/${video.uuid}`}>
                      <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${video.thumbnail}`} />}
                      >
                        <Card.Meta title={video.title} />
                        {
                          video.tags.map((tag) => (
                            <Badge
                              className="badges-videos"
                              count={tag.name}
                              color={tag.color ? tag.color : "#f50"}
                            />
                          ))
                        }
                      </Card>
                    </Link>
                  ))
                ) : (
                  <>
                    <Alert
                      message="Nenhum vídeo encontrado"
                      showIcon
                      description='Nosso algoritimo não conseguiu lhe recomendar nenhum vídeo, recomendamos que você atualize a sua descrição para que possamos te recomendar vídeos de acordo com suas preferências.'
                      type="info"
                      action={
                        <Link to={`/perfil-prestador/${userUuid}`}>
                          <Button size="small" type='link'>
                            Atualizar descrição
                          </Button>
                        </Link>
                      }
                    />
                  </>
                )}
              </>
            )}

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}