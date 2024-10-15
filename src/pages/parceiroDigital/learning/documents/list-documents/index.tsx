import { DownloadOutlined, FileExcelOutlined, FileImageOutlined, FileOutlined, FilePdfOutlined, FilePptOutlined, FileWordOutlined, FileZipOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, FloatButton, List, notification, theme } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../../../../components/assets/schemas/baseUrl";
import styled from "styled-components";

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
`

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

`

const ListDocuments = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = localStorage.getItem('digitalPartnerToken');

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`${baseUrl}/digital_partners/file`, options)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }, [])

  const Title = ({ item }) => {
    const { filename } = item;

    const imageFormatsRegex = /(gif|png|jpg|jpeg|bmp|tiff|webp)$/i;
    const excelCsvFormatsRegex = /(xls|xlsx|csv)$/i;
    const wordFormatsRegex = /(doc|docx)$/i;
    const powerpointFormatsRegex = /(ppt|pptx)$/i;
    const compressedFormatsRegex = /(zip|rar|tar|gz|7z)$/i;


    const [, ext] = filename.split(".");

    const icon = ext === "pdf" ? <FilePdfOutlined /> :
      wordFormatsRegex.test(ext) ? <FileWordOutlined /> :
        excelCsvFormatsRegex.test(ext) ? <FileExcelOutlined /> :
          powerpointFormatsRegex.test(ext) ? <FilePptOutlined /> :
            compressedFormatsRegex.test(ext) ? <FileZipOutlined /> :
              imageFormatsRegex.test(ext) ? <FileImageOutlined /> : <FileOutlined />
    return (<TitleStyled>{icon} {item.name}</TitleStyled>);
  }

  return (
    <div
      style={{
        padding: 24,
        minHeight: "83vh",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
      }}
    >
      <Link to="/parceiro-digital/learning/documentos/novo">
        <MobileButtom>
          <FloatButton icon={<PlusOutlined />} type="primary" />
        </MobileButtom>
      </Link>
      <Header>
        <h1>Documentos de parceiro digital</h1>
        <Link to="/parceiro-digital/learning/documentos/novo">
          <Button type="primary" icon={<PlusOutlined />}>
            Adicionar arquivo
          </Button>
        </Link>
      </Header>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={(<Title item={item} />)}>
              <a href={`${baseUrl}/download/${item.filename}`} download={`${item.originalFilename}`}>{item.originalFilename} <DownloadOutlined /></a>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ListDocuments;