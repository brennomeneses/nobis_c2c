import React from 'react';
import { Form, AutoComplete, Button, Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = AutoComplete;

const serviceOptions = [
  "Acupunturista", "Açougueiro(a)", "Administrador(a)", "Advogado(a)", "Advogado(a) trabalhista",
  "Agente de seguros", "Agente de viagens", "Agricultor(a)", "Alfaiate/Alfaitaria",
  "Alinhador(a) de pneus", "Almoxarife", "Animador(a) de festas", "Antiquário(a)",
  "Antropólogo(a)", "Apicultor(a)", "Arqueólogo(a)", "Arquiteto(a)", "Arquiteto(a) de software",
  "Artista de circo", "Artista plástico(a)", "Ascensorista", "Assessor(a) de imprensa",
  "Assistente administrativo(a)", "Assistente social", "Astrônomo(a)", "Atendente de telemarketing",
  "Atleta", "Ator/Atriz", "Auditor(a)", "Auditor(a) fiscal", "Autônomo(a)", "Auxiliar de cozinha",
  "Babá", "Bailarino(a)", "Balconista", "Barbeiro(a)", "Barista", "Bibliotecário(a)",
  "Bicicleteiro(a)", "Biólogo(a)", "Biomédico(a)", "Bioquímico(a)", "Biotecnólogo(a)",
  "Bombeiro(a)", "Borracheiro(a)", "Cabeleireiro(a)", "Caixa de supermercado", "Camareiro(a)",
  "Caminhoneiro(a)", "Carpinteiro(a)", "Carteiro(a)", "Caseiro(a)", "Cenógrafo(a)", "Ceramista",
  "Cerimonialista", "Chapeiro(a)", "Chaveiro(a)", "Chef de cozinha", "Churrasqueiro(a)",
  "Cientista", "Cientista de dados", "Cientista político(a)", "Cineasta", "Coach",
  "Cobrador(a) de ônibus", "Comediante", "Comissário(a) de bordo", "Compositor(a)",
  "Confeiteiro(a)", "Consultor(a) de beleza", "Consultor(a) de RH", "Consultor(a) financeiro(a)",
  "Controlador(a) de qualidade", "Controlador(a) de tráfego aéreo", "Corretor(a) de imóveis",
  "Corretor(a) de seguros", "Costureiro(a)", "Cozinheiro(a)", "Cuidador(a) de idosos",
  "Dançarino(a)", "Decorador(a)", "Defensor(a) público(a)", "Dentista", "Despachante",
  "Designer de moda", "Designer gráfico(a)", "Designer de interiores", "Desenvolvedor(a) de software",
  "Digitador(a)", "Diarista", "DJ", "Economista", "Ecólogo(a)", "Editor(a) de vídeo",
  "Educador(a) físico(a)", "Eletricista", "Eletrônico(a)", "Embalador(a)", "Encanador(a)",
  "Enfermeiro(a)", "Engenheiro(a) agrícola", "Engenheiro(a) agrônomo(a)",
  "Engenheiro(a) ambiental", "Engenheiro(a) biomédico(a)", "Engenheiro(a) civil",
  "Engenheiro(a) de alimentos", "Engenheiro(a) de computação", "Engenheiro(a) de materiais",
  "Engenheiro(a) de minas", "Engenheiro(a) de petróleo", "Engenheiro(a) de produção",
  "Engenheiro(a) de segurança do trabalho", "Engenheiro(a) de software",
  "Engenheiro(a) de telecomunicações", "Engenheiro(a) elétrico(a)", "Engenheiro(a) mecânico(a)",
  "Engenheiro(a) químico(a)", "Engraxate", "Enólogo(a)", "Escritor(a)", "Escultor(a)",
  "Estatístico(a)", "Esteticista", "Estilista", "Estivador(a)", "Executor(a) de serviços gerais",
  "Farmacêutico(a)", "Faxineiro(a)", "Ferramenteiro(a)", "Fisioterapeuta", "Florista",
  "Fonoaudiólogo(a)", "Fotógrafo(a)", "Fundidor(a)", "Garagista", "Garçom/Garçonete", "Gari",
  "Geógrafo(a)", "Geólogo(a)", "Gerente de banco", "Gerente de projetos", "Gestor(a) ambiental",
  "Gestor(a) de TI", "Guarda-costas", "Guia turístico(a)", "Historiador(a)", "Ilustrador(a)",
  "Iluminador(a)", "Informático(a)", "Instalador(a) de ar condicionado", "Instrutor(a) de academia",
  "Instrutor(a) de autoescola", "Intérprete", "Investigador(a)", "Jardineiro(a)", "Joalheiro(a)",
  "Jornalista", "Ladrilhador(a)", "Lavador(a) de carros", "Lavador(a) de roupas", "Lavrador(a)",
  "Leiteiro(a)", "Leiturista", "Líder de equipe", "Locutor(a)", "Maestro(a)", "Maquiador(a)",
  "Marceneiro(a)", "Massagista", "Matemático(a)", "Mecânico(a)", "Médico(a)", "Metalúrgico(a)",
  "Meteorologista", "Modelo", "Montador(a) de móveis", "Motoboy/Motogirl", "Motorista",
  "Motorista de ônibus", "Museólogo(a)", "Músico(a)", "Nutricionista", "Oceanógrafo(a)",
  "Office boy/Office girl", "Oficial de justiça", "Operador(a) de caixa", "Operador(a) de câmera",
  "Operador(a) de máquinas", "Ortopedista", "Ourives", "Palhaço(a)", "Paleontólogo(a)",
  "Palestrante", "Pastor(a)", "Pediatra", "Pedagogo(a)", "Pedreiro(a)", "Perito(a) criminal",
  "Pescador(a)", "Pescador(a) artesanal", "Pesquisador(a)", "Pintor(a)", "Pizzaiolo(a)",
  "Poeta/Poetisa", "Policial", "Policial rodoviário(a)", "Produtor(a) cultural",
  "Produtor(a) rural", "Professor(a) particular", "Professor(a) universitário(a)",
  "Programador(a)", "Promotor(a) de eventos", "Psicólogo(a)", "Psicopedagogo(a)",
  "Publicitário(a)", "Químico(a)", "Quiroprático(a)", "Radialista", "Radiologista",
  "Recreador(a)", "Redator(a)", "Relações públicas", "Reparador(a) de computadores", "Repórter",
  "Revisor(a) de textos", "Salva-vidas", "Sapateiro(a)", "Secretário(a)", "Segurança",
  "Serralheiro(a)", "Servente de pedreiro", "Sociólogo(a)", "Socorrista", "Soldador(a)",
  "Sommelier", "Superintendente", "Tatuador(a)", "Taxista", "Técnico(a) agrícola",
  "Técnico(a) de laboratório", "Técnico(a) de manutenção", "Técnico(a) de segurança do trabalho",
  "Técnico(a) em eletrônica", "Técnico(a) em enfermagem", "Técnico(a) em radiologia",
  "Teleatendente", "Telefonista", "Terapeuta ocupacional", "Topógrafo(a)", "Tradutor(a)",
  "Treinador(a)", "Turismólogo(a)", "Urbanista", "Vaqueiro(a)", "Vendedor(a)", "Veterinário(a)",
  "Veterinário(a) de pequenos animais", "Vidraceiro(a)", "Web designer", "Xerife", "Youtuber",
  "Zelador(a)", "Zootecnista"
];

const App = ({ onSearchSubmit }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedService, setSelectedService] = React.useState(null);

  const onChange = (value) => {
    setSearchValue(value);
  };

  const handleSelect = (value) => {
    setSelectedService(value);
  };

  const handleFormSubmit = (values) => {
    onSearchSubmit(values.text)
  };

  const filteredOptions = serviceOptions.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    // console.log(value)
  };

  return (
    <Form onFinish={handleFormSubmit}>
      <Row gutter={8} align="middle">
        <Col flex="auto">
          <Form.Item
            name="text"
          >
            <AutoComplete
              value={searchValue}
              onChange={onChange}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="Buscar serviço..."
              style={{ width: '100%' }}
              options={filteredOptions.map((option) => ({ label: option, value: option }))}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Pesquisar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default App;