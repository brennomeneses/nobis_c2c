import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme, Select, Typography } from 'antd';
import type { CollapseProps } from 'antd';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import Footer from '../../../components/prestador/footer';
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile';

const { Title } = Typography;
const { Option } = Select;

const BodyContainer = styled.div`
  padding: 24px;
`;

export default function Comunicados() {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState('all');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { token } = theme.useToken();

  const authToken = localStorage.getItem('authToken');

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        Authorization: `Bearer ${authToken}`,
      },
    };

    fetch(
      'https://brenno-envoriment-platform-server-testing.1pc5en.easypanel.host/users/project/messages',
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setFilteredData(response);

        // Extrair nomes de projetos únicos para o filtro
        const uniqueProjects = [
          ...new Set(response.map((msg) => msg.project?.title || 'Projeto não especificado')),
        ];
        setProjects(uniqueProjects);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleFilterChange = (value) => {
    setSelectedProject(value);
    if (value === 'all') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((msg) => (msg.project?.title || 'Projeto não especificado') === value));
    }
  };

  const linkify = (text: string | undefined) => {
    if (!text || typeof text !== 'string') {
      return null;
    }

    const urlPattern =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b[-A-Z0-9+&@#\/%?=~_|!:,.;]+[.][a-z]{2,}\b)/gi;

    return text.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a
          key={index}
          href={part.startsWith('http') ? part : 'http://' + part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) =>
    filteredData.map((msg, i) => {
      const content = msg.message || 'Conteúdo não disponível';
      const projectName = msg.project?.title || 'Projeto não especificado';

      return {
        key: i,
        label: (
          <>
            <b>{msg.title}</b> - {new Date(msg.createdAt).toLocaleDateString('pt-BR')}
          </>
        ),
        children: (
          <>
          <p style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {linkify(content)}
          </p>
            <p>
              <b>Projeto: {projectName}</b>
            </p>
            <p>
              {msg.files && msg.files.length > 0 && <b>Anexos:<br /></b>}
              {msg.files?.map((file, index) => (
                <React.Fragment key={index}>
                  <a
                    href={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${file.filename}`}
                    target='_blank'
                  >
                    {file.originalFilename}
                  </a>
                  <br />
                </React.Fragment>
              ))}
            </p>
          </>
        ),
        style: panelStyle,
      };
    });

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <BodyContainer>
        <div className="container">
          <Title level={2}>Mensagens do parceiro digital</Title>
          <div style={{ marginBottom: 16 }}>
            <Select
              value={selectedProject}
              onChange={handleFilterChange}
              style={{ width: 300 }}
              placeholder="Filtrar por projeto"
            >
              <Option value="all">Todos os projetos</Option>
              {projects.map((project, index) => (
                <Option key={index} value={project}>
                  {project}
                </Option>
              ))}
            </Select>
          </div>
          {filteredData && filteredData.length > 0 ? (
            <Collapse
              bordered={false}
              defaultActiveKey={[0]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{ background: token.colorBgContainer }}
              items={getItems(panelStyle)}
            />
          ) : (
            <p>Nenhuma mensagem encontrada no momento.</p>
          )}
        </div>
      </BodyContainer>
      <Footer />
    </>
  );
}
