import React from 'react';
import { Card, Typography } from 'antd';
import PostForm from '../../../components/forum/createPost';
import Prestador from '../../../components/prestador/footer';
import Cliente from '../../../components/cliente/footer';
import { Link } from 'react-router-dom';

export default function Classes() {
  const isClient = localStorage.getItem('isClient');
  return (
    <>
      <div className='container'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to={"/forum"} style={{ color: 'black' }}><h2>Fórum Nobis</h2></Link>
        </div>
        <br />
        <Card title="Criar Post">
          <PostForm />
        </Card>
      </div>
      {isClient === '1' ? <Cliente /> : <Prestador />}
    </>
  )
}