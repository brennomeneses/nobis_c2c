import React from 'react';
import { Card, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';

interface DadosProps {
  nome: string;
  foto: string;
  profissao: string;
  nota: number;
  bio: string;
  badges: boolean;
  deficiency: string;
  birthContry: string;
  birthdate: string;
  oficialDev: boolean;
}

const calcularIdade = (dataNascimento: string) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

const Dados: React.FC<DadosProps> = ({ nome, foto, profissao, nota, bio, badges, deficiency, birthContry, birthdate, oficialDev }) => (
  <>
    <div className="dados-prestador">
      <center>
        <img src={foto} className="iconPrestador" />
        <h3>{nome}</h3>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4 style={{ marginRight: "1%" }}>{profissao}</h4>
          <div className='rating'><StarFilled />{isNaN(nota) ? "Sem avaliações" : nota}</div>
        </div>
        {badges && (
          <div className="flex-center" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 0' }}>
            {deficiency !== "Não se aplica" && <Tag color="geekblue-inverse">Pessoa com Deficiência</Tag>}
            {birthContry !== "Brasil" && <Tag color="red-inverse">Imigrante</Tag>}
            {oficialDev && <Tag color="green-inverse">Desenvolvedor Oficial</Tag>}
            {calcularIdade(birthdate) >= 65 && <Tag color="cyan-inverse">Terceira Idade</Tag>}
          </div>
        )}
      </center>
    </div>
    <h3>Descrição</h3>
    <Card>
      <p>{bio}</p>
    </Card>
  </>
);

export default Dados;
