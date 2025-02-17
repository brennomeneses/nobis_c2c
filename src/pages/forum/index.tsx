import React, { useState, useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import Post from '../../components/forum/post';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Prestador from '../../components/prestador/footer';
import Cliente from '../../components/cliente/footer';
import baseUrl from '../../components/assets/schemas/baseUrl';

export default function Classes() {
  const authToken = localStorage.getItem('authToken');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isClient = localStorage.getItem('isClient');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        };

        const response = await fetch(baseUrl + '/forums', options);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setPosts([]); // Set posts to an empty array in case of error
      }
    };

    fetchPosts();
  }, [authToken]);

  return (
    <>
      <div className='container'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={"/forum"} style={{ color: 'black' }}><h2>Fórum Nobis</h2></Link>
          <Link to="/criar-post" style={{ color: 'black', fontWeight: '500' }}>
            <EditOutlined style={{ fontSize: '21px', color: 'black' }} /> Criar Post
          </Link>
        </div>
        <br />
        <div className='class'>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={24}>
              {Array.isArray(posts) && posts.map(post => (
                <Col span={24} key={post.id}>
                  <Post
                    title={post.name}
                    user={post.user}
                    uuid={post.uuid}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    comentarios={post.count}
                    foto={`${baseUrl}/uploads/${post.userAvatar}`}
                  />
                  <br />
                </Col>
              ))}
            </Row>
          )}
          <br /><br /><br /><br />
        </div>
      </div>
      {isClient === '1' ? <Cliente /> : <Prestador />}
    </>
  );
}
