import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, List, theme, Badge, Select, SelectProps, notification } from 'antd';
import baseUrl from '../../../../components/assets/schemas/baseUrl';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  projects?: string;
};

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
`

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [project, setProject] = useState("");
  const [playlistName, setplaylistName] = "";
  const [projects, setProjects] = useState<SelectProps['options']>([]);

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
      .then(response => {
        setData(response)
      })
      .catch(err => console.error(err));

      fetch('https://api-protocol.nobisapp.com.br/digital_partners/file', options)
      .then(response => response.json())
      .then(response => setDocuments(response))
      .catch(err => console.error(err));
  }, [])

  const onFinish = values => {
    setLoading(true);
  
    const payload = {
      name: values.playlistName,
      projects: project, // Projetos selecionados
      videos: selectedVideos, // UUIDs dos vídeos selecionados
      tags: values.tags || [], // Tags selecionadas
      files: selectedDocuments, // UUIDs dos documentos selecionados
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
  
    fetch(`${baseUrl}/digital_partners/projects/post/playlist`, options)
      .then(response => {
        if (response.status === 200) {
          return response.json(); // Processar o corpo da resposta
        } else {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
      })
      .then(responseData => {
        notification.success({
          message: 'Sucesso!',
          description: 'Playlist criada com sucesso!',
          placement: 'topRight',
        });
        navigate("/parceiro-digital/learning/playlists");
      })
      .catch(err => {
        notification.error({
          message: 'Erro!',
          description: `Não foi possível criar a playlist: ${err.message}`,
          placement: 'topRight',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };  

  const onVideoChange = (checkedValues) => {
    setSelectedVideos(checkedValues);
  };

  const onDocumentChange = (checkedValues) => {
    setSelectedDocuments(checkedValues);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

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

  /*
  data.map((video) => (
    {
      id: video.uuid,
      name: video.title,
      tags: video.tags,
      thumbnail: video.thumbnail
    }
  ))
  */

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
      }}
    >
      <h1>Criar Trilha de Aprendizagem</h1>
      {data && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="playlistName"
            label="Nome da Trilha de Aprendizagem"
            rules={[{ required: true, message: 'Por favor insira um nome!' }]}
          >
            <Input placeholder="Insira o Nome da Trilha de Aprendizagem" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Projetos"
            name="projects"
            rules={[{ required: true, message: 'Selecione ao menos um projeto' }]}
          >
            <Select
              allowClear
              mode="multiple"
              notFoundContent="Nenhum projeto encontrado"
              style={{ width: '100%' }}
              placeholder="Selecione o projeto para enviar o vídeo"
              options={projects}
              onChange={(value) => {
                if (value.length > 0) {
                  setProject(value);
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
            />
          </Form.Item>

          <Form.Item
            name="videos"
            label="Videos"
            style={{
              width: "100%"
            }}
            rules={[{ required: true, message: 'Por favor selecione pelo menos um vídeo!' }]}
          >
            <Checkbox.Group
              onChange={onVideoChange}>
              <List
                style={{
                  width: "100%"
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item
                    key={item.uuid}
                    style={{
                      width: '100%',
                      justifyContent: 'inherit'
                    }}
                  >
                    <Checkbox value={item.uuid}></Checkbox>
                    <img style={{
                      margin: "0 20px 0 20px",
                      borderRadius: "20px"
                    }} src={`${baseUrl}/uploads/${item.thumbnail}`} width={200} height={200} />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <h2>{item.title}</h2>
                      <div
                        style={{
                          margin: "0 20px 0 20px",
                        }}
                      >
                        {item.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className="badges-videos"
                            count={tag.name}
                            color={tag.color ? tag.color : "#f50"}
                          />))}
                      </div>

                    </div>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="documents"
            label="Documentos"
            style={{
              width: "100%",
            }}
            rules={[{ required: true, message: 'Por favor selecione pelo menos um documento!' }]}>
            <Checkbox.Group
              onChange={onDocumentChange}
              value={selectedDocuments}
            >
              <List
                style={{
                  width: "100%",
                }}
                dataSource={documents}
                renderItem={doc => (
                  <List.Item
                    key={doc.filename}
                    style={{
                      width: '100%',
                      justifyContent: 'inherit',
                    }}
                  >
                    <Checkbox value={doc.filename}></Checkbox>
                    <div
                      style={{
                        margin: "0 20px 0 20px",
                      }}
                    >
                      <h3>{doc.name} - {doc.originalFilename}</h3>
                    </div>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Criar Trilha de Aprendizagem
            </Button>
          </Form.Item>
        </Form>
      )}

    </div>
  )
}

export default CreatePlaylist