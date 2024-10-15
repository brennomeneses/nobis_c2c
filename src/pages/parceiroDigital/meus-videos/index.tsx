import { Badge, Card, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import baseUrl from "../../../components/assets/schemas/baseUrl";

const { Meta } = Card;
const { confirm } = Modal;

const MeusVideos = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem('digitalPartnerToken');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`${baseUrl}/videos`, options)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, [])

  const generateModal = (data: any) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const videoId = data.link.match(regex)[1];
    confirm({
      width: "100%",
      content: <>
        <iframe
          style={{
            width: "100%",
            height: "calc(70vh - 16px)"
          }}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </>
    })
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      }}
    >
      {data ? (
        <>
          {data.map((video) => (
            <Card
              hoverable
              onClick={() => generateModal(video)}
              style={{ width: 300 }}
              cover={<img alt="example" src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${video.thumbnail}`} />}
            >
              <Meta title={video.title} />
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
          ))}
        </>
      ) : (<h1> Loading </h1>)}
    </div>
  )
}

export default MeusVideos;