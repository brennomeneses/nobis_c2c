import styled, { css } from 'styled-components';
import { Badge, Card, theme, Tooltip } from "antd";
import {
  VideoCameraAddOutlined,
  PlusCircleOutlined,
  FileDoneOutlined,
  UploadOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../../../../components/assets/schemas/baseUrl';

type TBigButtom = {
  disabled: boolean;
}

const VideosContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const BigButtom = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: center;
    height: 200px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 0 3px 0 grey;
    align-items: center;
    text-align: center;
    cursor: pointer;
    ${({ disabled }) =>
    disabled && css`
        cursor: not-allowed;
        opacity: 0.5;
        box-shadow: none;
      `}
`

const Videos = () => {
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Meta } = Card;

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
      }}
    >
      <h1>Nobis Learning</h1>
      <Link to="/parceiro-digital/learning/videos/todos">
        <h2>Meus Vídeos <ExportOutlined /></h2>
      </Link>
      <VideosContainer>
        {data && (
          <>
            {data.length === 0 ? (
              <div
                style={{
                  padding: '17vh 0'
                }}
              >
                Nenhum vídeo encontrado
              </div>
            ) : data.slice(0, 3).map((video) => (
              <>
                <Card
                  hoverable
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
              </>
            ))}
          </>
        )}
      </VideosContainer>
      <h2>
        Ações
      </h2>
      <VideosContainer>
        <Link to="/parceiro-digital/learning/videos/novo">
          <BigButtom>
            <VideoCameraAddOutlined
              style={{ fontSize: '50px' }}
            />
            Postar Video-aula
          </BigButtom>
        </Link>
        <Link to="/parceiro-digital/learning/playlists/novo">
          <BigButtom>
            <PlusCircleOutlined
              style={{ fontSize: '50px' }}
            />
            Criar Trilha de Aprendizado
          </BigButtom>
        </Link>
        <Tooltip title="Em breve">
          <BigButtom disabled={true}>
            <FileDoneOutlined
              style={{ fontSize: '50px' }}
            />
            Criar Quiz
          </BigButtom>
        </Tooltip>
        <Link to="/parceiro-digital/learning/documentos">
          <BigButtom>
            <UploadOutlined
              style={{ fontSize: '50px' }}
            />
            Upload de documentos
          </BigButtom>
        </Link>
      </VideosContainer>
    </div>
  )
}

export default Videos