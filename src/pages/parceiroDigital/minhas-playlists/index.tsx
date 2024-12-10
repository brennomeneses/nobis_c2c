import { Badge, Card, Modal, theme, Select, Spin, Button, FloatButton } from "antd";
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
        const projectOptions = response.map((project: Record<string, string>) => ({
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
        <Link to="/parceiro-digital/learning/playlists/novo">
          <MobileButtom>
            <FloatButton icon={<PlusOutlined />} type="primary" />
          </MobileButtom>
        </Link>
        <Header>
          <h1>Trilhas de Aprendizagem</h1>
          <Link to="/parceiro-digital/learning/playlists/novo">
            <Button type="primary" icon={<PlusOutlined />}>
              Nova Trilha
            </Button>
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
            setProject(value); // Define o projeto selecionado
            fetchPlaylists(value); // Faz o fetch das playlists
          } else {
            setData(null); // Limpa os dados se nenhum projeto for selecionado
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
            <div style={{ marginTop: 16 }}>
              <h4>Tags:</h4>
              {playlist.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  count={tag.name}
                  color={tag.color || '#f50'}
                  style={{ marginRight: 8 }}
                />
              ))}
            </div>
          </Card>
        ))
      ) : (
        <h3 style={{ color: "white" }}>Selecione um projeto para ver as trilhas de aprendizagem<br/>Selecione um projeto para ver as trilhas de aprendizagem</h3>
      )}
    </div>
  );
};

export default MeusVideos;
