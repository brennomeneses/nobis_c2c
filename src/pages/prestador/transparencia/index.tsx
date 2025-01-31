import { Breadcrumb, Collapse, ConfigProvider, Layout, Menu, Popover, Table, TableColumnsType, Tag, Typography, theme } from "antd";
import logo from '../../../components/assets/logos/nobis_horizontal_branca.png';
import home from '../../../components/assets/icons/home.png';
import chat from '../../../components/assets/icons/chat.png';
import config from '../../../components/assets/icons/configuracoes.png';
import broadcast from '../../../components/assets/icons/broadcast.png';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import baseUrl from "../../../components/assets/schemas/baseUrl";
import { FileOutlined, HistoryOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;

const ImageContainer = styled.div`
min-width: 120px;
height: 39px;
color: white;
cursor: pointer;
  font-size: 14px;
  display: flex;
  
  img {
    margin-right: 5px;
  }
  `;
  
  const TransparenciaPrestador = () => {
    const [image, setImage] = useState(null)
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('authToken')

    useEffect(() => {

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      fetch(baseUrl + '/learning', options)
      .then(response => response.json())
      .then(response => {
        console.log(response.digitalPartner.profilePicture)
        setImage(response.digitalPartner.profilePicture)
      })
      .catch(err => console.error(err));

      fetch(`${baseUrl}/digital_partners/transparency`, options)
        .then(response => response.json())
        .then(response => setDataSource(response))
        .catch(err => console.error(err));
    }, [])

    const columns: TableColumnsType<any> = [
      {
        title: 'Descrição',
        dataIndex: 'description',
        key: 'description',
        responsive: ['lg'],
      },
      {
        title: 'Descrição',
        dataIndex: 'description',
        key: 'description_mobile',
        responsive: ['xs'],
        render: (_, record) => (
          <div>
            {record.description} <br/>
            {record.projects.map((project: any) => (
              <Tag key={project.id}>{project.title}</Tag>
            ))}
            <p>Postado em: {new Date(record.createdAt).toLocaleString()}</p>
          </div>
        )
      },
      {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        responsive: ['md'],
      },
      {
        title: 'Postado em',
        dataIndex: 'createdAt',
        key: 'createdAt',
        responsive: ['md'],
        render: (_, record) => (
          <div>
            {new Date(record.createdAt).toLocaleString()}
          </div>
        )
      },
      {
        title: 'Projetos',
        dataIndex: 'projects',
        key: 'projects',
        responsive: ['md'],
        render: (_, record) => (
          <div>
            {record.projects.map((project: any) => (
              <Tag key={project.id}>{project.title}</Tag>
            ))}
          </div>
        ),
      },
      {
        title: 'Arquivos',
        dataIndex: 'uuid',
        key: 'files',
        render: (_, record) => (
          <>
          <Collapse>
            <Panel header="Arquivos"  key="1">
              {record.files.map((file: { id: number; filename: string; originalFilename: string }) => (
                <div key={file.id}>
                  <a href={`${baseUrl}/uploads/${file.filename}`} download={file.originalFilename} target="_blank" rel="noopener noreferrer">
                    <FileOutlined /> {file.originalFilename}
                  </a>
                </div>
              ))}
          </Panel>
        </Collapse>
        </>
        ),
      },
    ];
  
  
    const items = [{
      key: '/learning',
      label: 'Learning',
    }, {
      key: '/comunicados',
      label: 'Mensagens',
    }, {
      key: '/transparencia',
      label: 'Transparência',
    }].map((e) => ({ ...e, onClick: ({ key }) => navigate(key) }))

    const location = useLocation()

  return (
    <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#722ed1',
        },
      }}
    >
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0e0029'
          }}
        >
          <ImageContainer>
            {image && (<img src={`${baseUrl}/uploads/${image}`} style={{ height: '100%' }} />)}
            <img src={logo} style={{ height: '100%' }} />
          </ImageContainer>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
            items={items}
            theme='dark'
            style={{ flex: 1, minWidth: 0, backgroundColor: '#0e0029' }}
            />
        </Header>
        <Content style={{ padding: '50px 10px 150px 10px' }}>
          <Title level={2}>Transparencia</Title>
          <Table dataSource={dataSource} columns={columns} pagination={{
            position: ['topRight']
          }} />
        </Content>
        <Footer style={{ backgroundColor: 'white', padding: "2% 0.5% 3.5% 0.5%", bottom: "0", position: "fixed", height: "50px", width: "100vw", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <div className='icons'>
            <Popover content={"Página Inicial"}><Link to='/inicio'><img src={home} /></Link></Popover>
            <Popover content={"Projetos"}><Link to='/learning'><img src={broadcast} /></Link></Popover>
            <Popover content={"Chats de serviços"}><Link to='/chats'><img src={chat} /></Link></Popover>
            <Popover content={"Histórico de serviços"}><Link to='/historico' style={{ color: "black", fontSize: "21px" }}><HistoryOutlined /></Link></Popover>
            <Popover content={"Configurações"}><Link to='/configuracoes'><img src={config} /></Link></Popover>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>

    
    </>
  );
}

export default TransparenciaPrestador