import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, List, theme, Badge, Select } from 'antd';
import baseUrl from '../../../../components/assets/schemas/baseUrl';
import { useNavigate } from 'react-router-dom';

const VideosContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const BigButtom = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: center;
    height: 200px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 0 3px 0 grey;
    align-items: center;
    text-align: center;
    cursor: pointer;
`

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const token = localStorage.getItem('digitalPartnerToken');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch(`${baseUrl}/videos`, options)
      .then(response => response.json())
      .then(response => {
        setData(response)
      })
      .catch(err => console.error(err));
  }, [])

  const onFinish = (values) => {
    setLoading(true)
    console.log('Form Values:', values);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: values.playlistName,
        videos: values.videos,
        tags: values.tags
      })
    };
    fetch(`${baseUrl}/playlists`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setLoading(false)
        navigate("/parceiro-digital/learning/videos")
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  };

  const onVideoChange = (checkedValues) => {
    setSelectedVideos(checkedValues);
  };

  const videoList = [{
    id: 1, name: "teste", tags: ["tafgasd"]
  }]

  /*
  data.map((video) => (
    {
      id: video.uuid,
      name: video.title,
      tags: video.tags,
      thumbnail: video.thumbnail
    }
  ))
  */

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
      }}
    >
      <h1>Criar Playlist</h1>
      {data && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="playlistName"
            label="Nome da Playlist"
            rules={[{ required: true, message: 'Please input the playlist name!' }]}
          >
            <Input placeholder="Enter playlist name" />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
            />
          </Form.Item>

          <Form.Item
            name="videos"
            label="Videos"
            style={{
              width: "100%"
            }}
            rules={[{ required: true, message: 'Please select at least one video!' }]}
          >
            <Checkbox.Group
              onChange={onVideoChange}>
              <List
                style={{
                  width: "100%"
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item
                    key={item.uuid}
                    style={{
                      width: '100%',
                      justifyContent: 'inherit'
                    }}
                  >
                    <Checkbox value={item.uuid}></Checkbox>
                    <img style={{
                      margin: "0 20px 0 20px",
                      borderRadius: "20px"
                    }} src={`${baseUrl}/uploads/${item.thumbnail}`} width={200} height={200} />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <h2>{item.title}</h2>
                      <div
                        style={{
                          margin: "0 20px 0 20px",
                        }}
                      >
                        {item.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className="badges-videos"
                            count={tag.name}
                            color={tag.color ? tag.color : "#f50"}
                          />))}
                      </div>

                    </div>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Create Playlist
            </Button>
          </Form.Item>
        </Form>
      )}

    </div>
  )
}

export default CreatePlaylist