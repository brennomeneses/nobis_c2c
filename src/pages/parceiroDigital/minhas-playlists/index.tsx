import { Badge, Card, Modal, theme, Select, Spin, Button, FloatButton, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUrl from "../../../components/assets/schemas/baseUrl";
import styled from "styled-components";
import loading from '../../../components/assets/loading.gif';

const TitleStyled = styled.div`
  text-overflow: clip;
  white-space: normal;
  word-break: break-word;
  width: 70%;
  font-size: 14px;

  &:hover {
    text-overflow: clip;
    white-space: normal;
    word-break: break-word;
  }
`;

const MobileButtom = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  h1 {
    margin: 0;
  }

  a {
    margin-left: auto;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const { Meta } = Card;

const MeusVideos = () => {
  const [data, setData] = useState(null); // Armazena playlists
  const [project, setProject] = useState(''); // Projeto selecionado
  const [projects, setProjects] = useState([]); // Lista de projetos
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isDocModalVisible, setIsDocModalVisible] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  const token = localStorage.getItem('digitalPartnerToken');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    // Carrega a lista de projetos disponíveis
    fetch(`${baseUrl}/digital_partners/projects`, options)
      .then(response => response.json())
      .then(response => {
        const projectOptions = response.map((project) => ({
          label: project.title,
          value: project.uuid
        }));
        setProjects(projectOptions);
      })
      .catch(err => console.error(err));
  }, [token]);

  const fetchPlaylists = (selectedProject) => {
    setIsLoading(true); // Ativa o carregamento
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    fetch(`${baseUrl}/digital_partners/projects/${selectedProject}/playlist`, options)
      .then(response => response.json())
      .then(response => {
        setData(response); // Armazena playlists
        setIsLoading(false); // Finaliza o carregamento
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false); // Finaliza o carregamento mesmo em caso de erro
      });
  };

  const fetchPlaylistDetails = (playlistUuid) => {
    setIsLoading(true);
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    fetch(`${baseUrl}/playlists/${playlistUuid}`, options)
      .then(response => response.json())
      .then(response => {
        setCurrentPlaylist(response);
        setIsPlaylistModalVisible(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleDeletePlaylist = () => {
    if (!currentPlaylist) return;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    fetch(`${baseUrl}/playlists/${currentPlaylist.uuid}`, options)
      .then(response => {
        if (response.ok) {
          setData((prevData) =>
            prevData.filter((playlist) => playlist.uuid !== currentPlaylist.uuid)
          );
          setIsPlaylistModalVisible(false);
          setIsDeleteConfirmVisible(false);
          setCurrentPlaylist(null);
        }
      })
      .catch(err => console.error(err));
  };

  const renderPlaylistContent = () => {
    if (!currentPlaylist) return null;
    return (
      <>
        <h1>{currentPlaylist.name}</h1>
        <Divider />
        <h4>Vídeos:</h4>
        {currentPlaylist.videos.map((video) => (
          <Card
            key={video.uuid}
            hoverable
            style={{ marginBottom: 16 }}
            onClick={() => openVideoModal(video)}
            cover={
              <img
                alt={video.title}
                src={video.thumbnail ? `${baseUrl}/uploads/${video.thumbnail}` : 'https://via.placeholder.com/300'}
                style={{ objectFit: 'cover', height: 400 }}
              />
            }
          >
            <Meta title={video.title} />
          </Card>
        ))}
        {currentPlaylist.files?.length > 0 && (
          <>
            <Divider />
            <h4>Documentos:</h4>
            {currentPlaylist.files.map((file) => (
              <Card
              key={file.filename}
              hoverable
              style={{ marginBottom: 16 }}
              onClick={() => openDocModal(file)}
              >
                <Meta title={file.originalFilename} />
              </Card>
            ))}
          </>
        )}
      </>
    );
  };
  

  const openVideoModal = (video) => {
    setCurrentVideo(video);
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setCurrentVideo(null);
  };

  const openDocModal = (doc) => {
    setCurrentDoc(doc);
    setIsDocModalVisible(true);
  };

  const closeDocModal = () => {
    setIsDocModalVisible(false);
    setCurrentDoc(null);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Modal
        open={isVideoModalVisible}
        onCancel={closeVideoModal}
        footer={null}
        width="70%"
      >
        {currentVideo && (
          <iframe
            style={{
              width: "100%",
              height: "calc(70vh - 16px)",
            }}
            src={`https://www.youtube.com/embed/${currentVideo.link.match(
              /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            )[1]}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        )}
      </Modal>

      <Modal
        open={isDocModalVisible}
        onCancel={closeDocModal}
        footer={null}
        width="70%"
      >
        <div>
          <iframe
            src={`${baseUrl}/uploads/${currentDoc?.filename}`}
            style={{ width: "100%", height: "600px" }}
            title={currentDoc?.originalFilename}
          ></iframe>
        </div>
      </Modal>

      <Modal
        visible={isPlaylistModalVisible}
        onCancel={() => setIsPlaylistModalVisible(false)}
        footer={[
          <Button
            key="delete"
            danger
            onClick={() => setIsDeleteConfirmVisible(true)}
          >
            Excluir Trilha de Aprendizagem
          </Button>
        ]}
        width={800}
      >
        {renderPlaylistContent()}
      </Modal>

      <Modal
        open={isDeleteConfirmVisible}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        onOk={handleDeletePlaylist}
        okText="Excluir"
        cancelText="Cancelar"
      >
        Tem certeza que deseja excluir a trilha{" "}
        <b>{currentPlaylist?.name}</b>?
      </Modal>

      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <Header>
          <h1>Trilhas de Aprendizagem</h1>
          <Link to="/parceiro-digital/learning/playlists/novo">
            <Button type="primary" icon={<PlusOutlined />}>Nova Trilha</Button>
          </Link>
        </Header>
        <Select
          allowClear
          notFoundContent="Nenhum projeto encontrado"
          style={{ width: '100%', marginBottom: 24 }}
          placeholder="Selecione o projeto para visualizar as playlists"
          options={projects}
          onChange={(value) => {
            if (value) {
              setProject(value);
              fetchPlaylists(value);
            } else {
              setData(null);
            }
          }}
        />

        {isLoading ? (
          <Spin tip="Carregando...">
            <img src={loading} alt="Carregando..." style={{ height: 100 }} />
          </Spin>
        ) : data ? (
          data.map((playlist) => (
            <Card
              key={playlist.uuid}
              title={playlist.name}
              style={{
                width: 300,
                margin: '16px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              onClick={() => fetchPlaylistDetails(playlist.uuid)}
              cover={
                <img
                  alt="Capa do projeto"
                  src={`${baseUrl}/uploads/${playlist.project.image}`}
                  style={{ height: 150, objectFit: 'cover' }}
                />
              }
            >
              <Meta
                title={`Projeto: ${playlist.project.title}`}
                description={`Criado em: ${new Date(playlist.createdAt).toLocaleDateString()}`}
              />
            </Card>
          ))
        ) : (
          <h3>Selecione um projeto para visualizar suas trilhas de aprendizagem.</h3>
        )}
      </div>
    </>
  );
};

export default MeusVideos;
