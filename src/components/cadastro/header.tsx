import React from 'react';
import logo from '../assets/logos/nobis_horizontal.png';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const url = window.location.href;
  const pdCode = url.split('/cadastro/')[1];

  return (
  <>
      <div className='header' style={{ marginTop: "-1%", marginLeft: "2%", marginBottom: "2%", justifyContent: "space-around" }}>
        <img className='logo' src={logo} />
        {pdCode ? (
          <>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <h2 className='tituloCadastro'>Cadastro de Prestador</h2>
              <p style={{ marginTop: "-5%" }}>Código do Parceiro Digital: {pdCode} </p>
              <p style={{ marginTop: "-3%", fontSize: '18px' }}>Já possui conta? <Link to={`/login/${pdCode}`}>Faça Login</Link></p>
            </div>
            </>
            ) : (
            <>
              <h2 className='tituloCadastro'>Cadastro de prestador/cliente</h2>
            </>
      )}
          </div>
  </>
)};

      export default App;