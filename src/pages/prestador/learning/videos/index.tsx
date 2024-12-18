import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card, Modal, theme, Divider } from "antd";
import Footer from '../../../../components/prestador/footer';
import baseUrl from '../../../../components/assets/schemas/baseUrl';
import YouTube, { YouTubeEvent } from 'react-youtube';

const { Meta } = Card;
const { confirm } = Modal;

export default function MeusVideos() {
  const [videoLink, setVideoLink] = useState('');
  const [watchTime, setWatchTime] = useState(0); // Total watch time in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState(null);
  const startTimeRef = useRef(0); // To store when the user starts watching

  const navigate = useNavigate();
  const { uuid } = useParams();

  const token = localStorage.getItem('authToken');
  const isClient = localStorage.getItem('isClient');

  let startedAt = new Date();

  const handleStateChange = (event: YouTubeEvent) => {
    const player = event.target;
    const playerState = player.getPlayerState();

    if (playerState === 1) { // 1 is PLAYING
      setIsPlaying(true);
      startTimeRef.current = player.getCurrentTime();
    }

    if (playerState === 2 || playerState === 0) { // 2 is PAUSED, 0 is ENDED
      setIsPlaying(false);
      const currentTime = new Date();
      const difference = currentTime.getTime() - startedAt.getTime();

      setWatchTime((prevWatchTime) => prevWatchTime + difference); // Time in milliseconds
      startedAt = new Date();
    }
  };

  const handleFinish = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        videoSecconds: watchTime / 1000
      })
    };

    fetch(`${baseUrl}/learning/video/commit/${uuid}`, options)
      .then(response => response.json())
      .then(() => {
        navigate('/prestador/videos');
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!token || token === 'undefined') {
      navigate('/');
    }

    if (isClient === '1') {
      navigate('/inicio');
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`${baseUrl}/learning`, options)
      .then(response => response.json())
      .then(response => setVideos(response))
      .catch(err => console.error(err));
  }, [navigate, token, isClient]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      handleFinish();
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const generateModal = (data) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const videoId = data.link.match(regex)[1];

    confirm({
      width: "100%",
      content: (
        <>
          <YouTube
            videoId={videoId}
            onStateChange={handleStateChange}
          />
          <Divider />
          <h3>O que você achou deste vídeo?</h3>
          <Button type="primary" onClick={handleFinish} style={{ marginTop: '20px' }}>
            Marcar vídeo-aula como assistida
          </Button>
        </>
      )
    });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
    <h2>Vídeos de projetos</h2>
      <div
        style={{
          paddingTop: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        
        {videos ? (
          videos.map((video) => (
            <Card
              hoverable
              onClick={() => generateModal(video)}
              style={{ width: 300, height: 270, marginBottom: 16 }}
              cover={<img alt="example" src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${video.thumbnail}`} />}
            >
              <Meta title={video.title} />
              {video.tags.map((tag) => (
                <Badge
                  className="badges-videos"
                  count={tag.name}
                  color={tag.color || "#f50"}
                  style={{ marginRight: 4 }}
                />
              ))}
            </Card>
          ))
        ) : (
          <h1>Carregando...</h1>
        )}
      </div>
    <Footer />
    </>
  );
}
