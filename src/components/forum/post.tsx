import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons';

const Case = ({ title, user, date, uuid, comentarios, foto }) => (
  <Link to={`/post/${uuid}`}>
    <Card size="small" className='hoverClass'>
      <div className='caseContainer'>
        <div className='caseContent'>
          <p className='caseTitle'>{title}</p>
          <div className='userInfo'>
            <img src={foto} className='userImage' alt="User" />
            <p>{user}</p>
          </div>
        </div>
        <div className='caseDate'>
          <p>{date}</p>
        </div>
        <div className='commentSection'>
          <p><CommentOutlined /> {comentarios}</p>
        </div>
      </div>
    </Card>
  </Link>
);

export default Case;
