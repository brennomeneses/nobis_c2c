import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FileImageOutlined, 
  FileOutlined, 
  FilePdfOutlined, 
  FilePptOutlined, 
  FileWordOutlined, 
  FileZipOutlined, 
  PlusOutlined 
} from "@ant-design/icons";
import { Button, Card, FloatButton, List, Modal, theme, message } from "antd";
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

const ListDocuments = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = localStorage.getItem("digitalPartnerToken");

  const [data, setData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Estado para o item atual

  const showModal = (item) => {
    setCurrentItem(item); // Define o item atual ao abrir o modal
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setCurrentItem(null); // Limpa o item atual ao fechar
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentItem(null); // Limpa o item atual ao fechar
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${baseUrl}/digital_partners/file`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  const Title = ({ item }) => {
    const { filename } = item;

    const imageFormatsRegex = /(gif|png|jpg|jpeg|bmp|tiff|webp)$/i;
    const excelCsvFormatsRegex = /(xls|xlsx|csv)$/i;
    const wordFormatsRegex = /(doc|docx)$/i;
    const powerpointFormatsRegex = /(ppt|pptx)$/i;
    const compressedFormatsRegex = /(zip|rar|tar|gz|7z)$/i;

    const [, ext] = filename.split(".");

    const icon =
      ext === "pdf" ? (
        <FilePdfOutlined />
      ) : wordFormatsRegex.test(ext) ? (
        <FileWordOutlined />
      ) : excelCsvFormatsRegex.test(ext) ? (
        <FileExcelOutlined />
      ) : powerpointFormatsRegex.test(ext) ? (
        <FilePptOutlined />
      ) : compressedFormatsRegex.test(ext) ? (
        <FileZipOutlined />
      ) : imageFormatsRegex.test(ext) ? (
        <FileImageOutlined />
      ) : (
        <FileOutlined />
      );
    return (
      <TitleStyled>
        {icon} {item.name}
      </TitleStyled>
    );
  };

  const handleDelete = async () => {
    if (!currentItem) return;

    try {
      const response = await fetch(
        `${baseUrl}/digital_partners/projects/${currentItem.filename}/documents`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        message.success("Documento excluído com sucesso!");
        setData(data.filter((item) => item.filename !== currentItem.filename));
        handleCancel();
      } else {
        message.error("Erro ao excluir o documento.");
      }
    } catch (error) {
      console.error(error);
      message.error("Erro ao excluir o documento.");
    }
  };

  return (
    <>
      <div
        style={{
          padding: 24,
          minHeight: "83vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
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
        <br/><br/>
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
              <Card
                title={<Title item={item} />}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={() => showModal(item)} // Passa o item para o modal
              >
                <a
                  href={`${baseUrl}/download/${item.filename}`}
                  download={`${item.originalFilename}`}
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={item.originalFilename}
                >
                  {item.originalFilename} <DownloadOutlined />
                </a>
              </Card>
            </List.Item>
          )}
        />
      </div>

      {/* Modal para visualizar o documento */}
      <Modal
        title={`Visualizar Documento: ${currentItem?.originalFilename}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Fechar
          </Button>,
          <Button key="delete" danger onClick={handleDelete}>
            Excluir
          </Button>,
        ]}
        width={"90%"}
        style={{
          top: 50
        }}
      >
        <div>
          <iframe
            src={`${baseUrl}/uploads/${currentItem?.filename}`}
            style={{ width: "100%", height: "600px" }}
            title={currentItem?.originalFilename}
          ></iframe>
        </div>
      </Modal>
    </>
  );
};

export default ListDocuments;