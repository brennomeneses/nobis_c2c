import React from 'react';
import imagem from '../../assets/imgs/chatImgFinish.png';
import { Divider } from 'antd';

const App: React.FC = ({ confirmar, cancelar }) => (
  <>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src={imagem} />
      <h3 style={{ flexShrink: "0" }}>Marcar serviço como concluído?</h3>
      <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button className="btnConfirmar" onClick={confirmar}>Confirmar</button>
        <br/>
        <button className="btnCancelar" onClick={cancelar}>Cancelar</button>
      </div>
      <br/><br/>
    </div>
  </>
);

export default App;