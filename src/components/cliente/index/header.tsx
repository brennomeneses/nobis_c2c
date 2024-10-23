import React, { useState } from 'react';
import { Modal, Form, Input, Radio, Select, InputNumber, Checkbox, Button, Dropdown, Menu, Space, Divider, Alert, message, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import logo from '../../assets/logos/nobis_horizontal.png';
import notif from '../../assets/icons/notif.png';
import baseUrl from '../../assets/schemas/baseUrl';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const profissoes = [
  "Acupunturista",
  "Açougueiro(a)",
  "Administrador(a)",
  "Advogado(a)",
  "Advogado(a) trabalhista",
  "Agente de seguros",
  "Agente de viagens",
  "Agricultor(a)",
  "Alfaiate/Alfaitaria",
  "Alinhador(a) de pneus",
  "Almoxarife",
  "Animador(a) de festas",
  "Antiquário(a)",
  "Antropólogo(a)",
  "Apicultor(a)",
  "Arqueólogo(a)",
  "Arquiteto(a)",
  "Arquiteto(a) de software",
  "Artista de circo",
  "Artista plástico(a)",
  "Ascensorista",
  "Assessor(a) de imprensa",
  "Assistente administrativo(a)",
  "Assistente social",
  "Astrônomo(a)",
  "Atendente de telemarketing",
  "Atleta",
  "Ator/Atriz",
  "Auditor(a)",
  "Auditor(a) fiscal",
  "Autônomo(a)",
  "Auxiliar de cozinha",
  "Babá",
  "Bailarino(a)",
  "Balconista",
  "Barbeiro(a)",
  "Barista",
  "Bibliotecário(a)",
  "Bicicleteiro(a)",
  "Biólogo(a)",
  "Biomédico(a)",
  "Bioquímico(a)",
  "Biotecnólogo(a)",
  "Bombeiro(a)",
  "Borracheiro(a)",
  "Cabeleireiro(a)",
  "Caixa de supermercado",
  "Camareiro(a)",
  "Caminhoneiro(a)",
  "Carpinteiro(a)",
  "Carteiro(a)",
  "Caseiro(a)",
  "Cenógrafo(a)",
  "Ceramista",
  "Cerimonialista",
  "Chapeiro(a)",
  "Chaveiro(a)",
  "Chef de cozinha",
  "Churrasqueiro(a)",
  "Cientista",
  "Cientista de dados",
  "Cientista político(a)",
  "Cineasta",
  "Coach",
  "Cobrador(a) de ônibus",
  "Comediante",
  "Comissário(a) de bordo",
  "Compositor(a)",
  "Confeiteiro(a)",
  "Consultor(a) de beleza",
  "Consultor(a) de RH",
  "Consultor(a) financeiro(a)",
  "Controlador(a) de qualidade",
  "Controlador(a) de tráfego aéreo",
  "Corretor(a) de imóveis",
  "Corretor(a) de seguros",
  "Costureiro(a)",
  "Cozinheiro(a)",
  "Cuidador(a) de idosos",
  "Dançarino(a)",
  "Decorador(a)",
  "Defensor(a) público(a)",
  "Dentista",
  "Despachante",
  "Designer de moda",
  "Designer gráfico(a)",
  "Designer de interiores",
  "Desenvolvedor(a) de software",
  "Digitador(a)",
  "Diarista",
  "DJ",
  "Economista",
  "Ecólogo(a)",
  "Editor(a) de vídeo",
  "Educador(a) físico(a)",
  "Eletricista",
  "Eletrônico(a)",
  "Embalador(a)",
  "Encanador(a)",
  "Enfermeiro(a)",
  "Engenheiro(a)",
  "Engenheiro(a) agrícola",
  "Engenheiro(a) agrônomo(a)",
  "Engenheiro(a) ambiental",
  "Engenheiro(a) biomédico(a)",
  "Engenheiro(a) civil",
  "Engenheiro(a) de alimentos",
  "Engenheiro(a) de computação",
  "Engenheiro(a) de materiais",
  "Engenheiro(a) de minas",
  "Engenheiro(a) de petróleo",
  "Engenheiro(a) de produção",
  "Engenheiro(a) de segurança do trabalho",
  "Engenheiro(a) de software",
  "Engenheiro(a) de telecomunicações",
  "Engenheiro(a) elétrico(a)",
  "Engenheiro(a) mecânico(a)",
  "Engenheiro(a) químico(a)",
  "Engraxate",
  "Enólogo(a)",
  "Escritor(a)",
  "Escultor(a)",
  "Estatístico(a)",
  "Esteticista",
  "Estilista",
  "Estivador(a)",
  "Executor(a) de serviços gerais",
  "Farmacêutico(a)",
  "Faxineiro(a)",
  "Ferramenteiro(a)",
  "Fisioterapeuta",
  "Florista",
  "Fonoaudiólogo(a)",
  "Fotógrafo(a)",
  "Fundidor(a)",
  "Garagista",
  "Garçom/Garçonete",
  "Gari",
  "Geógrafo(a)",
  "Geólogo(a)",
  "Gerente de banco",
  "Gerente de projetos",
  "Gestor(a) ambiental",
  "Gestor(a) de TI",
  "Guarda-costas",
  "Guia turístico(a)",
  "Historiador(a)",
  "Ilustrador(a)",
  "Iluminador(a)",
  "Informático(a)",
  "Instalador(a) de ar condicionado",
  "Instrutor(a) de academia",
  "Instrutor(a) de autoescola",
  "Intérprete",
  "Investigador(a)",
  "Jardineiro(a)",
  "Joalheiro(a)",
  "Jornalista",
  "Ladrilhador(a)",
  "Lavador(a) de carros",
  "Lavador(a) de roupas",
  "Lavrador(a)",
  "Leiteiro(a)",
  "Leiturista",
  "Líder de equipe",
  "Locutor(a)",
  "Maestro(a)",
  "Maquiador(a)",
  "Marceneiro(a)",
  "Massagista",
  "Matemático(a)",
  "Mecânico(a)",
  "Médico(a)",
  "Metalúrgico(a)",
  "Meteorologista",
  "Modelo",
  "Montador(a) de móveis",
  "Motoboy/Motogirl",
  "Motorista",
  "Motorista de ônibus",
  "Museólogo(a)",
  "Músico(a)",
  "Nutricionista",
  "Oceanógrafo(a)",
  "Office boy/Office girl",
  "Oficial de justiça",
  "Operador(a) de caixa",
  "Operador(a) de câmera",
  "Operador(a) de máquinas",
  "Ortopedista",
  "Ourives",
  "Palhaço(a)",
  "Paleontólogo(a)",
  "Palestrante",
  "Pastor(a)",
  "Pediatra",
  "Pedagogo(a)",
  "Pedreiro(a)",
  "Perito(a) criminal",
  "Pescador(a)",
  "Pescador(a) artesanal",
  "Pesquisador(a)",
  "Pintor(a)",
  "Pizzaiolo(a)",
  "Poeta/Poetisa",
  "Policial",
  "Policial rodoviário(a)",
  "Produtor(a) cultural",
  "Produtor(a) rural",
  "Professor(a) particular",
  "Professor(a) universitário(a)",
  "Programador(a)",
  "Promotor(a) de eventos",
  "Psicólogo(a)",
  "Psicopedagogo(a)",
  "Publicitário(a)",
  "Químico(a)",
  "Quiroprático(a)",
  "Radialista",
  "Radiologista",
  "Recreador(a)",
  "Redator(a)",
  "Relações públicas",
  "Reparador(a) de computadores",
  "Repórter",
  "Revisor(a) de textos",
  "Salva-vidas",
  "Sapateiro(a)",
  "Secretário(a)",
  "Segurança",
  "Serralheiro(a)",
  "Servente de pedreiro",
  "Sociólogo(a)",
  "Socorrista",
  "Soldador(a)",
  "Sommelier",
  "Superintendente",
  "Tatuador(a)",
  "Taxista",
  "Técnico(a) agrícola",
  "Técnico(a) de laboratório",
  "Técnico(a) de manutenção",
  "Técnico(a) de segurança do trabalho",
  "Técnico(a) em eletrônica",
  "Técnico(a) em enfermagem",
  "Técnico(a) em radiologia",
  "Teleatendente",
  "Telefonista",
  "Terapeuta ocupacional",
  "Topógrafo(a)",
  "Tradutor(a)",
  "Treinador(a)",
  "Turismólogo(a)",
  "Urbanista",
  "Vaqueiro(a)",
  "Vendedor(a)",
  "Veterinário(a)",
  "Veterinário(a) de pequenos animais"
];

const deficiencias = [
  "Autismo", "Surdocegueira", "Baixa visão", "Surdez", "Deficiência auditiva", "Deficiência física", "Deficiência intelectual", "Deficiência múltipla", "Transtorno do espectro autista", "Deficiências sensoriais"
];

const countries = [
  "Afeganistão", "África do Sul", "Albânia", "Alemanha", "Andorra", "Angola", "Antígua e Barbuda", "Arábia Saudita",
  "Argélia", "Argentina", "Armênia", "Austrália", "Áustria", "Azerbaijão", "Bahamas", "Bangladesh", "Barbados",
  "Bahrein", "Belarus", "Bélgica", "Belize", "Benin", "Bermuda", "Bósnia e Herzegovina", "Botsuana", "Brasil",
  "Brunei", "Bulgária", "Burkina Faso", "Burundi", "Butão", "Cabo Verde", "Camarões", "Camboja", "Canadá",
  "Catar", "Cazaquistão", "Chade", "Chile", "China", "Chipre", "Cingapura", "Colômbia", "Comores", "Congo",
  "Coréia do Norte", "Coréia do Sul", "Costa do Marfim", "Costa Rica", "Croácia", "Cuba", "Dinamarca", "Djibouti",
  "Dominica", "Egito", "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia", "Eslováquia", "Eslovênia",
  "Espanha", "Estados Unidos", "Estônia", "Eswatini", "Etiópia", "Fiji", "Filipinas", "Finlândia", "França",
  "Gabão", "Gâmbia", "Gana", "Geórgia", "Granada", "Grécia", "Guatemala", "Guiana", "Guiné", "Guiné-Bissau",
  "Guiné Equatorial", "Haiti", "Honduras", "Hungria", "Iêmen", "Ilhas Marshall", "Índia", "Indonésia", "Irã",
  "Iraque", "Irlanda", "Islândia", "Israel", "Itália", "Jamaica", "Japão", "Jordânia", "Kuwait", "Laos", "Letônia",
  "Líbano", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", "Madagáscar", "Malásia", "Malawi",
  "Maldivas", "Mali", "Malta", "Marrocos", "Mauritânia", "Maurício", "México", "Mianmar", "Micronésia", "Moçambique",
  "Moldávia", "Mônaco", "Mongólia", "Montenegro", "Namíbia", "Nauru", "Nepal", "Nicarágua", "Níger", "Nigéria",
  "Noruega", "Nova Zelândia", "Omã", "Países Baixos", "Palau", "Panamá", "Papua-Nova Guiné", "Paquistão", "Paraguai",
  "Peru", "Polônia", "Portugal", "Quênia", "Quirguistão", "Reino Unido", "República Centro-Africana", "República Democrática do Congo",
  "República Dominicana", "República Tcheca", "Romênia", "Ruanda", "Rússia", "Samoa", "San Marino", "Santa Lúcia",
  "São Cristóvão e Névis", "São Tomé e Príncipe", "São Vicente e Granadinas", "Seicheles", "Senegal", "Serra Leoa",
  "Sérvia", "Singapura", "Síria", "Somália", "Sri Lanka", "Suazilândia", "Sudão", "Sudão do Sul", "Suécia", "Suíça",
  "Suriname", "Tailândia", "Tanzânia", "Timor-Leste", "Togo", "Tonga", "Trinidad e Tobago", "Tunísia", "Turquia",
  "Turcomenistão", "Tuvalu", "Ucrânia", "Uganda", "Uruguai", "Uzbequistão", "Vanuatu", "Vaticano", "Venezuela",
  "Vietnã", "Zâmbia", "Zimbábue"
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [budgetDisabled, setBudgetDisabled] = useState(false);

  const authToken = localStorage.getItem('authToken');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const handlePrestadorClick = () => {
    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users', options)
      .then(response => response.json())
      .then(data => {
        const { user } = data;
        if (user.about === undefined || user.role === null) {
          setIsModalVisible(true);
        } else {
          fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users/create', options)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem("isClient", "0");
              // window.location.reload();

              navigate('/inicio')
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  };

  const atualizarCadastro = (values) => {
    const body = {
      birthContry: values.birthCountry || '',
      cnpj: values.cnpj || '',
      deficiency: values.disabilityType || 'Não se aplica',
      operationRadius: values.serviceRadius || '',
      role: values.services || '',
      about: values.bio || '',
      payments: (values.paymentTypes ? values.paymentTypes.join(', ') : ''),
      budget: budgetDisabled ? 'Não cobro para realizar orçamento' : values.budgetValue || '',
      isLookingForJob: values.isLookingForJob ? 1 : 0,
      remoteWork: values.remoteWork || false,
    };

    const updateOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(body)
    };

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users/0', updateOptions)
      .then(response => response.json())
      .then(response => {
        fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users/create', options)
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("isClient", "0");
          })
          .catch(err => console.error(err));

        message.success('Perfil atualizado com sucesso!');
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onDisabilityChange = e => {
    setHasDisability(e.target.value === 'yes');
  };

  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setBudgetDisabled(isChecked);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p onClick={handlePrestadorClick}>Virar Prestador</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className='header' style={{ backgroundColor: "#D2BFF6", paddingBottom: "1%" }}>
        <img className='logo' src={logo} alt="Logo" /> <sub style={{ color: "#4C3779" }}>VOCÊ ESTÁ LOGADO COMO: <b>CLIENTE</b></sub>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className='btnTroca' style={{ cursor: "pointer", backgroundColor: "#D2BFF6" }} onClick={(e) => e.preventDefault()}>
            <Space>
              QUERO PRESTAR SERVIÇOS
            </Space>
          </a>
        </Dropdown>
        <a href='/notificacoes'><img src={notif} alt="Notificações" /></a>
      </div>
      <Modal
        title="Complete suas informações para virar Prestador"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Continuar
          </Button>,
        ]}
      >
        <Form form={form} onFinish={atualizarCadastro} layout="vertical" name="userForm">
          {/* birthCountry */}
          <Form.Item name="birthCountry" label="País de Nascimento" rules={[{ required: true, message: 'Por favor, insira seu país de nascimento!' }]}>
            <Select showSearch>
              {countries.map(country => (
                <Option key={country} value={country}>{country}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="cnpj" label="CNPJ">
            <Input id='cnpj' />
          </Form.Item>

          {/* disability */}
          <Form.Item name="disability" label="Possui Deficiência?">
            <Radio.Group onChange={onDisabilityChange}>
              <Radio value="yes">Sim</Radio>
              <Radio value="Não se aplica">Não</Radio>
            </Radio.Group>
          </Form.Item>

          {/* disabilityType */}
          {hasDisability && (
            <Form.Item name="disabilityType" label="Tipo de Deficiência">
              <Select showSearch>
                {deficiencias.map(def => (
                  <Option key={def} value={def}>{def}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* serviceRadius */}
          <Form.Item name="serviceRadius" label="Distância que você gostaria de prestar seus serviços (0 - 50km)" rules={[{ required: true, message: 'Por favor, insira um raio de atendimento válido!' }]}>
            <InputNumber min={0} max={50} addonAfter={"KM"} />
          </Form.Item>

          {/* services */}
          <Form.Item name="services" label="Serviços Prestados" rules={[{ required: true, message: 'Por favor, selecione um serviço!' }]}>
            <Select
              showSearch
              placeholder="Selecione um serviço"
              optionFilterProp="children"
            >
              {profissoes.map(service => (
                <Option key={service} value={service}>{service}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* bio */}
          <Form.Item name="bio" label="Biografia" rules={[{ required: true, message: 'Por favor, insira uma biografia!' }]}>
            <TextArea
              showCount
              maxLength={300}
              placeholder="Fale um pouco sobre o que você faz..."
              style={{ height: 120, resize: 'none' }}
            />
          </Form.Item>

          {/* paymentTypes */}
          <Form.Item name="paymentTypes" label="Tipos de Pagamento Aceitos">
            <Checkbox.Group options={['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Boleto Bancário', 'Permuta']} />
          </Form.Item>

          <Alert message="O pagamento de serviços é responsabilidade do usuário" type="info" showIcon />

          <br />

          {/* budget */}
          <Form.Item name="budgetValue" label="Valor do Orçamento">
            <Input
              addonAfter={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  value="Não cobro para realizar orçamento"
                >
                  Não cobro para realizar orçamento
                </Checkbox>
              }
              disabled={budgetDisabled}
              prefix="R$"
              placeholder="0,00"
            />
          </Form.Item>

          {/* badges */}
          <Form.Item name="badge" label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ flexShrink: 0 }}>Desejo me identificar na plataforma como:</p>
              <Popover content="Inserção em determinados grupos na plataforma. Eles ajudam a destacar suas características, mas não servem como critério de exclusão na hora da contratação de serviços... fique tranquilo!"><div className="hoverQtn" style={{ flexShrink: 0, width: "8%", marginLeft: "5%" }}>?</div></Popover>
            </div>
          }>
            <Checkbox value={"idoso"}>
              Pessoa Idosa
            </Checkbox>
            <br />
            <Checkbox value={"imigrante"}>
              Imigrante
            </Checkbox>
            <br />
            <Checkbox value={"pcd"}>
              Pessoa com Deficiência
            </Checkbox>
          </Form.Item>

          {/* isLookingForJob */}
          <Form.Item name="isLookingForJob" label="">
            <Checkbox value={true}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ flexShrink: 0 }}>Estou atualmente desempregado/trabalho informalmente e estou buscando uma oportunidade de trabalho</p>
              </div>
            </Checkbox>
          </Form.Item>

          {/* remoteWork */}
          <Form.Item name="remoteWork" label="">
            <Checkbox value={true}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ flexShrink: 0 }}>Estou disponível para prestar serviços remotamente</p>
              </div>
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegistrationForm;