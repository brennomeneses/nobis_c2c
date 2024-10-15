import React from 'react';
import { Card } from 'antd';

const Case = ({ titulo, descricao, data, op, hora, foto }) => (
  <>
    <Card 
      title={<span>Postado em: {data} às {hora}</span>}
    >
      
      <div style={{ display: "flex" , alignItems: "center" }}>
        <img src={foto} style={{ width: "30px", height: "30px", borderRadius: "100%", objectFit: "cover", marginRight: "1%" }} /><p style={{ flexShrink: "0", fontSize:"15px", fontWeight:"700" }}>{op} disse:</p>
      </div>
      <p style={{ fontSize:"18px", fontWeight: "600" }}>{titulo}</p>
      <p style={{ fontSize:"16px" }}>{descricao}</p>
    </Card>
  </>
);

export default Case;