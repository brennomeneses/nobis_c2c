import { Badge, Card, Modal, theme, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionar
import baseUrl from "../../../components/assets/schemas/baseUrl";

const { Meta } = Card;

const MeusVideos = () => {
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const navigate = useNavigate(); // Hook de navegação do React Router

  const token = localStorage.getItem("digitalPartnerToken");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${baseUrl}/videos`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, [token]);

  const openModal = (video) => {
    setCurrentVideo(video);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentVideo(null);
  };

  const deleteVideo = (videoId) => {
    Modal.confirm({
      title: "Tem certeza que deseja deletar este vídeo?",
      content: "Essa ação não pode ser desfeita.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk: () => {
        const options = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(`${baseUrl}/videos/${videoId}`, options)
          .then((response) => {
            if (response.ok) {
              setData((prevData) =>
                prevData.filter((video) => video.id !== videoId)
              );
              message.success("Vídeo deletado com sucesso!");
              closeModal();
              navigate("/parceiro-digital/learning/videos"); // Redirecionar
            } else {
              message.error("Falha ao deletar o vídeo. Tente novamente.");
            }
          })
          .catch((err) => {
            console.error(err);
            message.error("Erro ao deletar o vídeo.");
          });
      },
    });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={
          currentVideo ? (
            <Button
              type="primary"
              danger
              onClick={() => deleteVideo(currentVideo.uuid)}
            >
              Deletar Vídeo
            </Button>
          ) : null
        }
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

      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data ? (
          <>
            {data.map((video) => (
              <Card
                hoverable
                key={video.id}
                onClick={() => openModal(video)}
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src={`${baseUrl}/uploads/${video.thumbnail}`}
                  />
                }
              >
                <Meta title={video.title} />
                {video.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    className="badges-videos"
                    count={tag.name}
                    color={tag.color || "#f50"}
                  />
                ))}
              </Card>
            ))}
          </>
        ) : (
          <h1> Loading </h1>
        )}
      </div>
    </>
  );
};

export default MeusVideos;
