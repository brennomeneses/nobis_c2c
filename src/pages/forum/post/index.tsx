import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Post from '../../../components/forum/postPage';
import Responder from '../../../components/forum/enviarResposta'
import Resposta from '../../../components/forum/respostas'
import Prestador from '../../../components/prestador/footer';
import Cliente from '../../../components/cliente/footer';
import baseUrl from '../../../components/assets/schemas/baseUrl';

export default function Classes() {
  const authToken = localStorage.getItem('authToken');
  const url = window.location.href;
  const uuid = url.split('/post/')[1];

  const [post, setPost] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const isClient = localStorage.getItem('isClient');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch(`${baseUrl}/forums/${uuid}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setPost(response);
        setRespostas(response.answers);
      })
      .catch(err => console.error(err));
  }, [uuid]);

  return (
    <>
      <div className='container'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to={"/forum"} style={{ color: 'black' }}><h2>Fórum Nobis</h2></Link>
        </div>
        <br />
        {post ? (
          <Post
            key={post.id} // Certifique-se de que cada item tenha uma chave única
            titulo={post.name}
            descricao={post.description}
            data={new Date(post.createdAt).toLocaleDateString()}
            hora={new Date(post.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            op={post.user.fullName}
            foto={`${baseUrl}/uploads/${post.user.avatar}`}
          />
        ) : (
          <p>Carregando...</p>
        )}
        <h4>{respostas.length} Comentários</h4>
        <Responder />
        <br/><br/>
        {respostas.length > 0 ? (
          respostas.map(resposta => (
            <>
              <Resposta
                descricao={resposta.content}
                nome={resposta.user.fullName}
                data={new Date(resposta.createdAt).toLocaleDateString()}
                hora={new Date(resposta.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                foto={`${baseUrl}/uploads/${resposta.user.avatar}`}
              />
              <br/><br/>
            </>
          ))
        ) : (
          <p>Seja o primeiro a comentar!</p>
        )}
      </div>
      <br/><br/><br/><br/>
      {isClient === '1' ? <Cliente /> : <Prestador />}
    </>
  );
}