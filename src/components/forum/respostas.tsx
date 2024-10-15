import React from 'react';
import { Card, Divider } from 'antd';

const Case = ({ nome, descricao, data, hora, foto }) => (
  <>
    <Card>
      <div className="caseHeader">
        <div className="userInfo">
          <img src={foto} className="userImage" alt="User" />
          <p className="userName">{nome}</p>
        </div>
        <div className="postInfo">
          Postado em: {data} às {hora}
        </div>
      </div>
      <Divider />
      <p className="descriptionText">{descricao}</p>
    </Card>
  </>
);

export default Case;
