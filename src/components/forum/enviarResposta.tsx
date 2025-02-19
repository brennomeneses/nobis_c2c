import React, { useState } from 'react';
import { Input, Button } from 'antd';
import baseUrl from '../assets/schemas/baseUrl';

const { TextArea } = Input;

const authToken = localStorage.getItem('authToken');

const Case = () => {
  const [comentario, setComentario] = useState('');

  const enviarComentario = () => {
    const url = window.location.href;
    const uuid = url.split('/post/')[1];
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ content: comentario })
    };

    fetch(`${baseUrl}/forums/${uuid}/answer`, options)
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert('Erro ao enviar resposta:', response.statusText);
        }
      })
      .catch(err => console.error('Erro ao enviar resposta:', err));
  };

  const handleTextAreaChange = (e) => {
    setComentario(e.target.value);
  };

  return (
    <>
      <br />
      <TextArea
        showCount
        placeholder="Escreva um comentário!"
        maxLength={100}
        style={{ height: 120, resize: 'none' }}
        value={comentario}
        onChange={handleTextAreaChange}
      />
      <br /><br />
      <Button onClick={enviarComentario}>Comentar</Button>
    </>
  );
};

export default Case;
