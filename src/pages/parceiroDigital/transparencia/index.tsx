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
            <Header>
                <h1>Documentos de Transparência de Projeto</h1>
                <Link to="enviar-documentos">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Adicionar arquivo
                    </Button>
                </Link>
            </Header>
        </div>
      </>
    );
  };
  
  export default ListDocuments;