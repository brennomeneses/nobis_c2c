import { Tooltip } from "antd";
import styled from "styled-components";

const odsNumbers = [
  { "ods": "ODS 1", "name": "Erradicação da Pobreza", "color": "#E5243B" },
  { "ods": "ODS 2", "name": "Fome Zero e Agricultura Sustentável", "color": "#DDA63A" },
  { "ods": "ODS 3", "name": "Saúde e Bem-Estar", "color": "#4C9F38" },
  { "ods": "ODS 4", "name": "Educação de Qualidade", "color": "#C5192D" },
  { "ods": "ODS 5", "name": "Igualdade de Gênero", "color": "#FF3A21" },
  { "ods": "ODS 6", "name": "Água Potável e Saneamento", "color": "#26BDE2" },
  { "ods": "ODS 7", "name": "Energia Limpa e Acessível", "color": "#FCC30B" },
  { "ods": "ODS 8", "name": "Trabalho Decente e Crescimento Econômico", "color": "#A21942" },
  { "ods": "ODS 9", "name": "Indústria, Inovação e Infraestrutura", "color": "#FD6925" },
  { "ods": "ODS 10", "name": "Redução das Desigualdades", "color": "#DD1367" },
  { "ods": "ODS 11", "name": "Cidades e Comunidades Sustentáveis", "color": "#FD9D24" },
  { "ods": "ODS 12", "name": "Consumo e Produção Responsáveis", "color": "#BF8B2E" },
  { "ods": "ODS 13", "name": "Ação Contra a Mudança Global do Clima", "color": "#3F7E44" },
  { "ods": "ODS 14", "name": "Vida na Água", "color": "#0A97D9" },
  { "ods": "ODS 15", "name": "Vida Terrestre", "color": "#56C02B" },
  { "ods": "ODS 16", "name": "Paz, Justiça e Instituições Eficazes", "color": "#00689D" },
  { "ods": "ODS 17", "name": "Parcerias e Meios de Implementação", "color": "#19486A" }
]


const ODS = (props) => {
  const { number } = props;

  const Square = styled.div<{ hex: string }>`
    width: 25px;
    height: 25px;
    background-color: ${props => props.hex};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7em;
    margin-right: 5px;
  `

  return (
    <Tooltip title={odsNumbers[number - 1].name}>
      <Square hex={odsNumbers[number - 1].color}>
        {number.toString()}
      </Square>
    </Tooltip>
  )
}

export default ODS