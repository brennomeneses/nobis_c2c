import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag, Button, Card, Modal, theme, Divider, Rate } from "antd";

import baseUrl from '../../../../components/assets/schemas/baseUrl';

const { Meta } = Card;

export default function MeusVideos() {
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [trilhas, setTrilhas] = useState([]);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isDocModalVisible, setIsDocModalVisible] = useState(false);
  const [isTrilhaModalVisible, setIsTrilhaModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [currentTrilha, setCurrentTrilha] = useState(null);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const token = localStorage.getItem('authToken');
  const isClient = localStorage.getItem('isClient');

  const [ratings, setRatings] = useState({
    applicability: 0,
    understanding: 0,
    development: 0,
    income: 0,
    opportunities: 0,
  });

  const handleRateChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratings),
    };
  
    try {
      const response = await fetch(
        `https://brenno-envoriment-platform-server-testing.1pc5en.easypanel.host/videos/rate/${currentVideo.videoUuid}`,
        options
      );
      const result = await response.json();
      console.log(result);
      alert('Avaliação enviada com sucesso!');
      
      // Resetando as classificações para garantir que o Rate visual seja limpo
      setRatings({
        applicability: 0,
        understanding: 0,
        development: 0,
        income: 0,
        opportunities: 0,
      });
  
      // Recarregar a página após o envio da avaliação
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar a avaliação. Tente novamente.');
    }
  };
  

  const handleDocSubmit = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratings),
    };
  
    try {
      const response = await fetch(
        `https://brenno-envoriment-platform-server-testing.1pc5en.easypanel.host/documents/rate/${currentDoc.docUuid}`,
        options
      );
      const result = await response.json();
      console.log(result);
      alert('Avaliação enviada com sucesso!');
      setRatings({
        applicability: 0,
        understanding: 0,
        development: 0,
        income: 0,
        opportunities: 0,
      });
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert('Erro ao enviar a avaliação. Tente novamente.');
    }
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
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch vídeos
    fetch(`${baseUrl}/users/project/videos`, options)
      .then((response) => response.json())
      .then((response) => setVideos(response))
      .catch((err) => console.error(err));

    // Fetch documentos
    fetch(`${baseUrl}/digital_partners/projects/all/documents`, options)
      .then((response) => response.json())
      .then((response) => setDocs(response))
      .catch((err) => console.error(err));

    // Fetch trilhas de aprendizagem
    fetch(`${baseUrl}/learning/create`, options)
      .then(response => response.json())
      .then(response => setTrilhas(response))
      .catch(err => console.error(err));
  }, [navigate, token, isClient]);

  const openVideoModal = (video) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const videoId = video.link.match(regex)[1];
    setCurrentVideo({ videoId, video, videoUuid: video.uuid });
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setCurrentVideo(null);
    setRatings({
      applicability: 0,
      understanding: 0,
      development: 0,
      income: 0,
      opportunities: 0,
    });
  };
  

  const openDocModal = (doc) => {
    setCurrentDoc({ doc, docUuid: doc.filename }); // Enviando um único objeto
    setIsDocModalVisible(true);
  };
  
  const closeDocModal = () => {
    setIsDocModalVisible(false);
    setCurrentDoc(null);
    setRatings({
      applicability: 0,
      understanding: 0,
      development: 0,
      income: 0,
      opportunities: 0,
    });
  };
  

  const renderDocContent = (doc) => {
    const fileUrl = `${baseUrl}/uploads/${doc.doc.filename}`;
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(doc.doc.filename);
    const isPdf = /\.pdf$/i.test(doc.doc.filename);

    if (isImage) {
      return <img src={fileUrl} alt={doc.originalFilename} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />;
    } else if (isPdf) {
      return (
        <iframe
          src={fileUrl}
          title={doc.originalFilename}
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      );
    } else {
      return (
        <p>
          O tipo deste documento não é suportado para visualização. Você pode baixá-lo abaixo.
        </p>
      );
    }
  };

  const openTrilhaModal = (trilha) => {
    setCurrentTrilha(trilha);
    setIsTrilhaModalVisible(true);
  };

  const closeTrilhaModal = () => {
    setIsTrilhaModalVisible(false);
    setCurrentTrilha(null);
  };

  const renderTrilhaContent = (trilha) => {
    return (
      <>
        {trilha?.videos?.length > 0 ? (
          <div key={trilha.id}>
            <h4>Vídeos</h4>
            {trilha.videos.map((video) => (
              <Card
                key={`${trilha.id}-${video.uuid}`}
                hoverable
                style={{ width: '100%', marginBottom: '16px' }}
                cover={
                  <img
                    alt={video.title}
                    src={
                      video.thumbnail
                        ? `${baseUrl}/uploads/${video.thumbnail}`
                        : 'https://via.placeholder.com/300'
                    }
                    style={{ height: '400px', objectFit: 'cover' }}
                    onClick={() => {
                      openVideoModal(video);
                      closeTrilhaModal();
                    }}
                  />
                }
              >
                <Meta title={video.title} />
              </Card>
            ))}
          </div>
        ) : (
          <p>Nenhum vídeo associado a esta trilha por enquanto.</p>
        )}
  
        <Divider />
  
        <h4>Documentos</h4>
        {trilha.files?.length > 0 ? (
          trilha.files.map((file) => (
            <Card
              key={file.id}
              hoverable
              style={{ width: '100%', marginBottom: '16px' }}
              onClick={() => {
                openDocModal(file);
                closeTrilhaModal();
              }}
            >
              <Meta title={file.originalFilename} />
            </Card>
          ))
        ) : (
          <p>Nenhum documento associado a esta trilha por enquanto.</p>
        )}
      </>
    );
  };
  
  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {/* Modal para Vídeos */}
      <Modal
        visible={isVideoModalVisible}
        onCancel={closeVideoModal}
        maskClosable={true}
        footer={null}
        width={800}
      >
        {currentVideo && (
          <div style={{ textAlign: 'center' }}>
            <iframe
              title="Video"
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
              frameBorder="0"
              allowFullScreen
            />
            <Divider />
            <h3>Nos ajude a melhorar a qualidade do conteúdo!</h3>
            <p>O conteúdo pode ser aplicado na sua atividade?</p>
            <Rate onChange={(value) => handleRateChange('applicability', value)} /><br />
            <p>Teve facilidade para compreender o conteúdo apresentado?</p>
            <Rate onChange={(value) => handleRateChange('understanding', value)} /><br />
            <p>Pode te auxiliar a melhorar a forma como você desenvolve seu trabalho?</p>
            <Rate onChange={(value) => handleRateChange('development', value)} /><br />
            <p>Com esse conteúdo você poderá aumentar sua renda?</p>
            <Rate onChange={(value) => handleRateChange('income', value)} /><br />
            <p>Conseguiu identificar oportunidades depois de estudar os conteúdos?</p>
            <Rate onChange={(value) => handleRateChange('opportunities', value)} /><br />
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              Enviar
            </Button>
          </div>
        )}
      </Modal>

      {/* Modal para Documentos */}
      <Modal
        visible={isDocModalVisible}
        onCancel={closeDocModal}
        maskClosable={true}
        width={800}
        footer={null}
      >
        {currentDoc && (
          <div style={{ textAlign: 'center' }}>
            <h3>{currentDoc.originalFilename}</h3>
            <Divider />
            {renderDocContent(currentDoc)}
            <br/>
            <Button
              type="primary"
              href={`${baseUrl}/uploads/${currentDoc.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar Documento
            </Button>
            <br/>
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
            <Divider />
            <h3>Nos ajude a melhorar a qualidade do conteúdo!</h3>
            <p>O conteúdo pode ser aplicado na sua atividade?</p>
            <Rate onChange={(value) => handleRateChange('applicability', value)} /><br />
            <p>Teve facilidade para compreender o conteúdo apresentado?</p>
            <Rate onChange={(value) => handleRateChange('understanding', value)} /><br />
            <p>Pode te auxiliar a melhorar a forma como você desenvolve seu trabalho?</p>
            <Rate onChange={(value) => handleRateChange('development', value)} /><br />
            <p>Com esse conteúdo você poderá aumentar sua renda?</p>
            <Rate onChange={(value) => handleRateChange('income', value)} /><br />
            <p>Conseguiu identificar oportunidades depois de estudar os conteúdos?</p>
            <Rate onChange={(value) => handleRateChange('opportunities', value)} /><br />
            <Button
              type="primary"
              onClick={handleDocSubmit}
              style={{ marginTop: '20px' }}
            >
              Enviar
            </Button>
        </div>
      </Modal>

      {/* Modal para Trilhas */}
      <Modal
        visible={isTrilhaModalVisible}
        onCancel={closeTrilhaModal}
        maskClosable={true}
        footer={null}
        width={800}
        title={currentTrilha?.name || "Detalhes da Trilha"}
      >
        {currentTrilha && (
          <div>
            <h2>{currentTrilha.title}</h2>
            <Divider />
            {renderTrilhaContent(currentTrilha)}
          </div>
        )}
      </Modal>

    
      <Divider/>
      <h2>Trilhas de Aprendizagem</h2>
      <Divider/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {trilhas?.length > 0 ? (
          trilhas.map((trilha) =>
            trilha.playlists.map((playlist) => (
              <Card
                key={playlist.id}
                hoverable
                style={{ width: 300 }}
                onClick={() => openTrilhaModal(playlist)}
              >
                <Meta
                  title={`Trilha: ${playlist.name}`}
                  description={<>
                    Criado em: {new Date(playlist.createdAt).toLocaleDateString('pt-BR')}
                    <br />
                    {`Projeto: ${trilha.title}` || 'Projeto não definido'}
                  </>}
                />
              </Card>
            ))
          )
        ) : (
          <p>Nenhuma trilha encontrada.</p>
        )}
      </div>

      <Divider />

      <h2>Vídeos de projetos</h2>

      <Divider/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {videos?.length > 0 ? (
          videos.map((video) => (
            <Card
              key={video.uuid}
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt={video.title}
                  src={
                    video.thumbnail
                      ? `${baseUrl}/uploads/${video.thumbnail}`
                      : 'https://via.placeholder.com/300'
                  }
                  style={{cursor: 'pointer', height: '150px', objectFit: 'cover'}}
                />
              }
              onClick={() => openVideoModal(video)}
            >
              <Meta title={video.title}
              description={
                <>
                  Criado em: {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                  <br />
                  {video.project ? `Projeto: ${video.project.title}` : 'Projeto não definido'}
                  
                </>
              } />
            </Card>
          ))
        ) : (
          <p>Nenhum vídeo encontrado.</p>
        )}
      </div>

      <Divider />

      <h2>Documentos de projetos</h2>
      <Divider/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {docs?.length > 0 ? (
          docs.map((doc) => (
            <Card
              key={doc.id}
              hoverable
              style={{ width: 300 }}
              onClick={() => openDocModal(doc)}
            >
              <Meta
                title={doc.originalFilename}
                description={
                  <>
                    Criado em: {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    <br />
                    {/* {doc.projectId || 'Projeto não definido'} */}
                  </>
                }
              />
            </Card>
          ))
        ) : (
          <p>Nenhum documento encontrado.</p>
        )}
      </div>
      <br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}
