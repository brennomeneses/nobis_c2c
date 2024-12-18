import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import Header from '../../components/prestador/index/header';
import Footer from '../../components/prestador/footer';
import baseUrl from '../../components/assets/schemas/baseUrl';
import YouTube, { YouTubeEvent } from 'react-youtube';

export default function Inicio() {
  const [videoLink, setVideoLink] = useState('');
  const [watchTime, setWatchTime] = useState(0);  // Total watch time in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const startTimeRef = useRef(0);  // To store when the user starts watching

  let startedAt = new Date();

  const handleStateChange = (event: YouTubeEvent) => {
    const player = event.target;
    const playerState = player.getPlayerState();

    if (playerState === 1) {  // 1 is PLAYING
      setIsPlaying(true);
      startTimeRef.current = player.getCurrentTime();
    }

    if (playerState === 2 || playerState === 0) {  // 2 is PAUSED, 0 is ENDED
      setIsPlaying(false);
      const currentTime = new Date();
      const difference = currentTime.getTime() - startedAt.getTime();

      setWatchTime((watchTime + difference)); // is in milisseconds
      startedAt = new Date();
    }
  };


  const navigate = useNavigate();
  let { uuid } = useParams();

  const isClient = localStorage.getItem('isClient');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'undefined') {
      navigate('/');
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer oat_MzAx.WGRmaUlQcWtMcmctUXg4cEJFSGN5VFZQN1JwcjNnbzJ0eTFscHdYXzQyODkyNjY4MDI'
      }
    };

    fetch(`${baseUrl}/learning/${uuid}`, options)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

          const videoId = data[0].link.match(regex)[1];

          const embedLink = videoId;

          setVideoLink(embedLink);
        }
      })
      .catch(err => console.error(err));
  }, [navigate]);

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
      .then(response => {
        console.log(response)
        navigate('/prestador/videos');
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log("User is leaving the page.");
      handleFinish();
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (isClient === '1') {
    navigate('/inicio');
  }

  return (
    <>
      <Header />
      <br /><br /><br /><br /><br />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {watchTime}
        {videoLink && (
          <YouTube
            videoId={videoLink}
            onStateChange={handleStateChange}
          />
        )}
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleFinish}>
            Marcar vídeo-aula como assistida
          </Button>
        </div>
      </div>
      <br/><br/><br/><br/> <br/><br/><br/>
      <Footer />
    </>

  );
}