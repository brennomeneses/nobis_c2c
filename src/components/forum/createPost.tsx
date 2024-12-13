import React, { useState } from 'react';
import { Form, Input, Button, Radio, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import baseUrl from '../assets/schemas/baseUrl';

const { TextArea } = Input;

interface PostFormProps {
  onSubmit: (values: { title: string; content: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [isWorkerForum, setIsWorkerForum] = useState(false); // Estado para determinar se é um fórum de prestador

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWorkerForum(e.target.value === 'worker');
  };

  const [form] = Form.useForm();

  const handleSubmit = (values: { title: string; content: string }) => {
    // Mapear os valores do formulário para os dados esperados na requisição
    const requestData = {
      name: values.title,
      description: values.content,
      category: form.getFieldValue('services'),
      isWorkerForum: isWorkerForum,
    };

    const authToken = localStorage.getItem('authToken');

    // Configurações da requisição
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(requestData)
    };

    // Fazer a requisição
    fetch(baseUrl + '/forums', options)
      .then(response => response.json())
      .then(response => {
        window.location.href = `/post/${response.uuid}`;
      })
      .catch(err => console.error(err));

    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Por favor, insira o título do post!' }]}
      >
        <Input placeholder="Título" />
      </Form.Item>
      <Form.Item
        name="content"
        rules={[{ required: true, message: 'Por favor, insira o conteúdo do post!' }]}
      >
        <TextArea placeholder="Conteúdo" rows={4} />
      </Form.Item>
      <Form.Item>
        Deseja postar como: <br/><br/>
        <Radio.Group onChange={handleRadioChange}>
          <Radio value="client">Cliente</Radio>
          <Radio value="worker">Prestador</Radio>
        </Radio.Group>
      </Form.Item>
      {isWorkerForum && ( // Mostrar o Select apenas se for um fórum de prestador
        <Form.Item
          name="services"
        >
          <Select
            showSearch
            placeholder="Selecione uma categoria"
            optionFilterProp="children"
          >
            <Select.Option value="Acupunturista">Acupunturista</Select.Option>
            <Select.Option value="Açougueiro(a)">Açougueiro(a)</Select.Option>
            <Select.Option value="Administrador(a)">Administrador(a)</Select.Option>
            <Select.Option value="Advogado(a)">Advogado(a)</Select.Option>
            <Select.Option value="Advogado(a) trabalhista">Advogado(a) trabalhista</Select.Option>
            <Select.Option value="Agente de seguros">Agente de seguros</Select.Option>
            <Select.Option value="Agente de viagens">Agente de viagens</Select.Option>
            <Select.Option value="Agricultor(a)">Agricultor(a)</Select.Option>
            <Select.Option value="Alfaiate/Alfaitaria">Alfaiate/Alfaitaria</Select.Option>
            <Select.Option value="Alinhador(a) de pneus">Alinhador(a) de pneus</Select.Option>
            <Select.Option value="Almoxarife">Almoxarife</Select.Option>
            <Select.Option value="Animador(a) de festas">Animador(a) de festas</Select.Option>
            <Select.Option value="Antiquário(a)">Antiquário(a)</Select.Option>
            <Select.Option value="Antropólogo(a)">Antropólogo(a)</Select.Option>
            <Select.Option value="Apicultor(a)">Apicultor(a)</Select.Option>
            <Select.Option value="Arqueólogo(a)">Arqueólogo(a)</Select.Option>
            <Select.Option value="Arquiteto(a)">Arquiteto(a)</Select.Option>
            <Select.Option value="Arquiteto(a) de software">Arquiteto(a) de software</Select.Option>
            <Select.Option value="Artista de circo">Artista de circo</Select.Option>
            <Select.Option value="Artista plástico(a)">Artista plástico(a)</Select.Option>
            <Select.Option value="Ascensorista">Ascensorista</Select.Option>
            <Select.Option value="Assessor(a) de imprensa">Assessor(a) de imprensa</Select.Option>
            <Select.Option value="Assistente administrativo(a)">Assistente administrativo(a)</Select.Option>
            <Select.Option value="Assistente social">Assistente social</Select.Option>
            <Select.Option value="Astrônomo(a)">Astrônomo(a)</Select.Option>
            <Select.Option value="Atendente de telemarketing">Atendente de telemarketing</Select.Option>
            <Select.Option value="Atleta">Atleta</Select.Option>
            <Select.Option value="Ator/Atriz">Ator/Atriz</Select.Option>
            <Select.Option value="Auditor(a)">Auditor(a)</Select.Option>
            <Select.Option value="Auditor(a) fiscal">Auditor(a) fiscal</Select.Option>
            <Select.Option value="Autônomo(a)">Autônomo(a)</Select.Option>
            <Select.Option value="Auxiliar de cozinha">Auxiliar de cozinha</Select.Option>
            <Select.Option value="Babá">Babá</Select.Option>
            <Select.Option value="Bailarino(a)">Bailarino(a)</Select.Option>
            <Select.Option value="Balconista">Balconista</Select.Option>
            <Select.Option value="Barbeiro(a)">Barbeiro(a)</Select.Option>
            <Select.Option value="Barista">Barista</Select.Option>
            <Select.Option value="Bibliotecário(a)">Bibliotecário(a)</Select.Option>
            <Select.Option value="Bicicleteiro(a)">Bicicleteiro(a)</Select.Option>
            <Select.Option value="Biólogo(a)">Biólogo(a)</Select.Option>
            <Select.Option value="Biomédico(a)">Biomédico(a)</Select.Option>
            <Select.Option value="Bioquímico(a)">Bioquímico(a)</Select.Option>
            <Select.Option value="Biotecnólogo(a)">Biotecnólogo(a)</Select.Option>
            <Select.Option value="Bombeiro(a)">Bombeiro(a)</Select.Option>
            <Select.Option value="Borracheiro(a)">Borracheiro(a)</Select.Option>
            <Select.Option value="Cabeleireiro(a)">Cabeleireiro(a)</Select.Option>
            <Select.Option value="Caixa de supermercado">Caixa de supermercado</Select.Option>
            <Select.Option value="Camareiro(a)">Camareiro(a)</Select.Option>
            <Select.Option value="Caminhoneiro(a)">Caminhoneiro(a)</Select.Option>
            <Select.Option value="Carpinteiro(a)">Carpinteiro(a)</Select.Option>
            <Select.Option value="Carteiro(a)">Carteiro(a)</Select.Option>
            <Select.Option value="Caseiro(a)">Caseiro(a)</Select.Option>
            <Select.Option value="Cenógrafo(a)">Cenógrafo(a)</Select.Option>
            <Select.Option value="Ceramista">Ceramista</Select.Option>
            <Select.Option value="Cerimonialista">Cerimonialista</Select.Option>
            <Select.Option value="Chapeiro(a)">Chapeiro(a)</Select.Option>
            <Select.Option value="Chaveiro(a)">Chaveiro(a)</Select.Option>
            <Select.Option value="Chef de cozinha">Chef de cozinha</Select.Option>
            <Select.Option value="Churrasqueiro(a)">Churrasqueiro(a)</Select.Option>
            <Select.Option value="Cientista">Cientista</Select.Option>
            <Select.Option value="Cientista de dados">Cientista de dados</Select.Option>
            <Select.Option value="Cientista político(a)">Cientista político(a)</Select.Option>
            <Select.Option value="Cineasta">Cineasta</Select.Option>
            <Select.Option value="Coach">Coach</Select.Option>
            <Select.Option value="Cobrador(a) de ônibus">Cobrador(a) de ônibus</Select.Option>
            <Select.Option value="Comediante">Comediante</Select.Option>
            <Select.Option value="Comissário(a) de bordo">Comissário(a) de bordo</Select.Option>
            <Select.Option value="Compositor(a)">Compositor(a)</Select.Option>
            <Select.Option value="Confeiteiro(a)">Confeiteiro(a)</Select.Option>
            <Select.Option value="Consultor(a) de beleza">Consultor(a) de beleza</Select.Option>
            <Select.Option value="Consultor(a) de RH">Consultor(a) de RH</Select.Option>
            <Select.Option value="Consultor(a) financeiro(a)">Consultor(a) financeiro(a)</Select.Option>
            <Select.Option value="Controlador(a) de qualidade">Controlador(a) de qualidade</Select.Option>
            <Select.Option value="Controlador(a) de tráfego aéreo">Controlador(a) de tráfego aéreo</Select.Option>
            <Select.Option value="Corretor(a) de imóveis">Corretor(a) de imóveis</Select.Option>
            <Select.Option value="Corretor(a) de seguros">Corretor(a) de seguros</Select.Option>
            <Select.Option value="Costureiro(a)">Costureiro(a)</Select.Option>
            <Select.Option value="Cozinheiro(a)">Cozinheiro(a)</Select.Option>
            <Select.Option value="Cuidador(a) de idosos">Cuidador(a) de idosos</Select.Option>
            <Select.Option value="Dançarino(a)">Dançarino(a)</Select.Option>
            <Select.Option value="Decorador(a)">Decorador(a)</Select.Option>
            <Select.Option value="Defensor(a) público(a)">Defensor(a) público(a)</Select.Option>
            <Select.Option value="Dentista">Dentista</Select.Option>
            <Select.Option value="Despachante">Despachante</Select.Option>
            <Select.Option value="Designer de moda">Designer de moda</Select.Option>
            <Select.Option value="Designer gráfico(a)">Designer gráfico(a)</Select.Option>
            <Select.Option value="Designer de interiores">Designer de interiores</Select.Option>
            <Select.Option value="Desenvolvedor(a) de software">Desenvolvedor(a) de software</Select.Option>
            <Select.Option value="Digitador(a)">Digitador(a)</Select.Option>
            <Select.Option value="Diarista">Diarista</Select.Option>
            <Select.Option value="DJ">DJ</Select.Option>
            <Select.Option value="Economista">Economista</Select.Option>
            <Select.Option value="Ecólogo(a)">Ecólogo(a)</Select.Option>
            <Select.Option value="Editor(a) de vídeo">Editor(a) de vídeo</Select.Option>
            <Select.Option value="Educador(a) físico(a)">Educador(a) físico(a)</Select.Option>
            <Select.Option value="Eletricista">Eletricista</Select.Option>
            <Select.Option value="Eletrônico(a)">Eletrônico(a)</Select.Option>
            <Select.Option value="Embalador(a)">Embalador(a)</Select.Option>
            <Select.Option value="Encanador(a)">Encanador(a)</Select.Option>
            <Select.Option value="Enfermeiro(a)">Enfermeiro(a)</Select.Option>
            <Select.Option value="Engenheiro(a)">Engenheiro(a)</Select.Option>
            <Select.Option value="Engenheiro(a) agrícola">Engenheiro(a) agrícola</Select.Option>
            <Select.Option value="Engenheiro(a) agrônomo(a)">Engenheiro(a) agrônomo(a)</Select.Option>
            <Select.Option value="Engenheiro(a) ambiental">Engenheiro(a) ambiental</Select.Option>
            <Select.Option value="Engenheiro(a) biomédico(a)">Engenheiro(a) biomédico(a)</Select.Option>
            <Select.Option value="Engenheiro(a) civil">Engenheiro(a) civil</Select.Option>
            <Select.Option value="Engenheiro(a) de alimentos">Engenheiro(a) de alimentos</Select.Option>
            <Select.Option value="Engenheiro(a) de computação">Engenheiro(a) de computação</Select.Option>
            <Select.Option value="Engenheiro(a) de materiais">Engenheiro(a) de materiais</Select.Option>
            <Select.Option value="Engenheiro(a) de minas">Engenheiro(a) de minas</Select.Option>
            <Select.Option value="Engenheiro(a) de petróleo">Engenheiro(a) de petróleo</Select.Option>
            <Select.Option value="Engenheiro(a) de produção">Engenheiro(a) de produção</Select.Option>
            <Select.Option value="Engenheiro(a) de segurança do trabalho">Engenheiro(a) de segurança do trabalho</Select.Option>
            <Select.Option value="Engenheiro(a) de software">Engenheiro(a) de software</Select.Option>
            <Select.Option value="Engenheiro(a) de telecomunicações">Engenheiro(a) de telecomunicações</Select.Option>
            <Select.Option value="Engenheiro(a) elétrico(a)">Engenheiro(a) elétrico(a)</Select.Option>
            <Select.Option value="Engenheiro(a) mecânico(a)">Engenheiro(a) mecânico(a)</Select.Option>
            <Select.Option value="Engenheiro(a) químico(a)">Engenheiro(a) químico(a)</Select.Option>
            <Select.Option value="Engraxate">Engraxate</Select.Option>
            <Select.Option value="Enólogo(a)">Enólogo(a)</Select.Option>
            <Select.Option value="Escritor(a)">Escritor(a)</Select.Option>
            <Select.Option value="Escultor(a)">Escultor(a)</Select.Option>
            <Select.Option value="Estatístico(a)">Estatístico(a)</Select.Option>
            <Select.Option value="Esteticista">Esteticista</Select.Option>
            <Select.Option value="Estilista">Estilista</Select.Option>
            <Select.Option value="Estivador(a)">Estivador(a)</Select.Option>
            <Select.Option value="Executor(a) de serviços gerais">Executor(a) de serviços gerais</Select.Option>
            <Select.Option value="Farmacêutico(a)">Farmacêutico(a)</Select.Option>
            <Select.Option value="Faxineiro(a)">Faxineiro(a)</Select.Option>
            <Select.Option value="Ferramenteiro(a)">Ferramenteiro(a)</Select.Option>
            <Select.Option value="Fisioterapeuta">Fisioterapeuta</Select.Option>
            <Select.Option value="Florista">Florista</Select.Option>
            <Select.Option value="Fonoaudiólogo(a)">Fonoaudiólogo(a)</Select.Option>
            <Select.Option value="Fotógrafo(a)">Fotógrafo(a)</Select.Option>
            <Select.Option value="Fundidor(a)">Fundidor(a)</Select.Option>
            <Select.Option value="Garagista">Garagista</Select.Option>
            <Select.Option value="Garçom/Garçonete">Garçom/Garçonete</Select.Option>
            <Select.Option value="Gari">Gari</Select.Option>
            <Select.Option value="Geógrafo(a)">Geógrafo(a)</Select.Option>
            <Select.Option value="Geólogo(a)">Geólogo(a)</Select.Option>
            <Select.Option value="Gerente de banco">Gerente de banco</Select.Option>
            <Select.Option value="Gerente de projetos">Gerente de projetos</Select.Option>
            <Select.Option value="Gestor(a) ambiental">Gestor(a) ambiental</Select.Option>
            <Select.Option value="Gestor(a) de TI">Gestor(a) de TI</Select.Option>
            <Select.Option value="Guarda-costas">Guarda-costas</Select.Option>
            <Select.Option value="Guia turístico(a)">Guia turístico(a)</Select.Option>
            <Select.Option value="Historiador(a)">Historiador(a)</Select.Option>
            <Select.Option value="Ilustrador(a)">Ilustrador(a)</Select.Option>
            <Select.Option value="Iluminador(a)">Iluminador(a)</Select.Option>
            <Select.Option value="Informático(a)">Informático(a)</Select.Option>
            <Select.Option value="Instalador(a) de ar condicionado">Instalador(a) de ar condicionado</Select.Option>
            <Select.Option value="Instrutor(a) de academia">Instrutor(a) de academia</Select.Option>
            <Select.Option value="Instrutor(a) de autoescola">Instrutor(a) de autoescola</Select.Option>
            <Select.Option value="Intérprete">Intérprete</Select.Option>
            <Select.Option value="Investigador(a)">Investigador(a)</Select.Option>
            <Select.Option value="Jardineiro(a)">Jardineiro(a)</Select.Option>
            <Select.Option value="Joalheiro(a)">Joalheiro(a)</Select.Option>
            <Select.Option value="Jornalista">Jornalista</Select.Option>
            <Select.Option value="Ladrilhador(a)">Ladrilhador(a)</Select.Option>
            <Select.Option value="Lavador(a) de carros">Lavador(a) de carros</Select.Option>
            <Select.Option value="Lavador(a) de roupas">Lavador(a) de roupas</Select.Option>
            <Select.Option value="Lavrador(a)">Lavrador(a)</Select.Option>
            <Select.Option value="Leiteiro(a)">Leiteiro(a)</Select.Option>
            <Select.Option value="Leiturista">Leiturista</Select.Option>
            <Select.Option value="Líder de equipe">Líder de equipe</Select.Option>
            <Select.Option value="Locutor(a)">Locutor(a)</Select.Option>
            <Select.Option value="Maestro(a)">Maestro(a)</Select.Option>
            <Select.Option value="Maquiador(a)">Maquiador(a)</Select.Option>
            <Select.Option value="Marceneiro(a)">Marceneiro(a)</Select.Option>
            <Select.Option value="Massagista">Massagista</Select.Option>
            <Select.Option value="Matemático(a)">Matemático(a)</Select.Option>
            <Select.Option value="Mecânico(a)">Mecânico(a)</Select.Option>
            <Select.Option value="Médico(a)">Médico(a)</Select.Option>
            <Select.Option value="Metalúrgico(a)">Metalúrgico(a)</Select.Option>
            <Select.Option value="Meteorologista">Meteorologista</Select.Option>
            <Select.Option value="Modelo">Modelo</Select.Option>
            <Select.Option value="Montador(a) de móveis">Montador(a) de móveis</Select.Option>
            <Select.Option value="Motoboy/Motogirl">Motoboy/Motogirl</Select.Option>
            <Select.Option value="Motorista">Motorista</Select.Option>
            <Select.Option value="Motorista de ônibus">Motorista de ônibus</Select.Option>
            <Select.Option value="Museólogo(a)">Museólogo(a)</Select.Option>
            <Select.Option value="Músico(a)">Músico(a)</Select.Option>
            <Select.Option value="Nutricionista">Nutricionista</Select.Option>
            <Select.Option value="Oceanógrafo(a)">Oceanógrafo(a)</Select.Option>
            <Select.Option value="Office boy/Office girl">Office boy/Office girl</Select.Option>
            <Select.Option value="Oficial de justiça">Oficial de justiça</Select.Option>
            <Select.Option value="Operador(a) de caixa">Operador(a) de caixa</Select.Option>
            <Select.Option value="Operador(a) de câmera">Operador(a) de câmera</Select.Option>
            <Select.Option value="Operador(a) de máquinas">Operador(a) de máquinas</Select.Option>
            <Select.Option value="Ortopedista">Ortopedista</Select.Option>
            <Select.Option value="Ourives">Ourives</Select.Option>
            <Select.Option value="Palhaço(a)">Palhaço(a)</Select.Option>
            <Select.Option value="Paleontólogo(a)">Paleontólogo(a)</Select.Option>
            <Select.Option value="Palestrante">Palestrante</Select.Option>
            <Select.Option value="Pastor(a)">Pastor(a)</Select.Option>
            <Select.Option value="Pediatra">Pediatra</Select.Option>
            <Select.Option value="Pedagogo(a)">Pedagogo(a)</Select.Option>
            <Select.Option value="Pedreiro(a)">Pedreiro(a)</Select.Option>
            <Select.Option value="Perito(a) criminal">Perito(a) criminal</Select.Option>
            <Select.Option value="Pescador(a)">Pescador(a)</Select.Option>
            <Select.Option value="Pescador(a) artesanal">Pescador(a) artesanal</Select.Option>
            <Select.Option value="Pesquisador(a)">Pesquisador(a)</Select.Option>
            <Select.Option value="Pintor(a)">Pintor(a)</Select.Option>
            <Select.Option value="Pizzaiolo(a)">Pizzaiolo(a)</Select.Option>
            <Select.Option value="Poeta/Poetisa">Poeta/Poetisa</Select.Option>
            <Select.Option value="Policial">Policial</Select.Option>
            <Select.Option value="Policial rodoviário(a)">Policial rodoviário(a)</Select.Option>
            <Select.Option value="Produtor(a) cultural">Produtor(a) cultural</Select.Option>
            <Select.Option value="Produtor(a) rural">Produtor(a) rural</Select.Option>
            <Select.Option value="Professor(a) particular">Professor(a) particular</Select.Option>
            <Select.Option value="Professor(a) universitário(a)">Professor(a) universitário(a)</Select.Option>
            <Select.Option value="Programador(a)">Programador(a)</Select.Option>
            <Select.Option value="Promotor(a) de eventos">Promotor(a) de eventos</Select.Option>
            <Select.Option value="Psicólogo(a)">Psicólogo(a)</Select.Option>
            <Select.Option value="Psicopedagogo(a)">Psicopedagogo(a)</Select.Option>
            <Select.Option value="Publicitário(a)">Publicitário(a)</Select.Option>
            <Select.Option value="Químico(a)">Químico(a)</Select.Option>
            <Select.Option value="Quiroprático(a)">Quiroprático(a)</Select.Option>
            <Select.Option value="Radialista">Radialista</Select.Option>
            <Select.Option value="Radiologista">Radiologista</Select.Option>
            <Select.Option value="Recreador(a)">Recreador(a)</Select.Option>
            <Select.Option value="Redator(a)">Redator(a)</Select.Option>
            <Select.Option value="Relações públicas">Relações públicas</Select.Option>
            <Select.Option value="Reparador(a) de computadores">Reparador(a) de computadores</Select.Option>
            <Select.Option value="Repórter">Repórter</Select.Option>
            <Select.Option value="Revisor(a) de textos">Revisor(a) de textos</Select.Option>
            <Select.Option value="Salva-vidas">Salva-vidas</Select.Option>
            <Select.Option value="Sapateiro(a)">Sapateiro(a)</Select.Option>
            <Select.Option value="Secretário(a)">Secretário(a)</Select.Option>
            <Select.Option value="Segurança">Segurança</Select.Option>
            <Select.Option value="Serralheiro(a)">Serralheiro(a)</Select.Option>
            <Select.Option value="Servente de pedreiro">Servente de pedreiro</Select.Option>
            <Select.Option value="Sociólogo(a)">Sociólogo(a)</Select.Option>
            <Select.Option value="Socorrista">Socorrista</Select.Option>
            <Select.Option value="Soldador(a)">Soldador(a)</Select.Option>
            <Select.Option value="Sommelier">Sommelier</Select.Option>
            <Select.Option value="Superintendente">Superintendente</Select.Option>
            <Select.Option value="Tatuador(a)">Tatuador(a)</Select.Option>
            <Select.Option value="Taxista">Taxista</Select.Option>
            <Select.Option value="Técnico(a) agrícola">Técnico(a) agrícola</Select.Option>
            <Select.Option value="Técnico(a) de laboratório">Técnico(a) de laboratório</Select.Option>
            <Select.Option value="Técnico(a) de manutenção">Técnico(a) de manutenção</Select.Option>
            <Select.Option value="Técnico(a) de segurança do trabalho">Técnico(a) de segurança do trabalho</Select.Option>
            <Select.Option value="Técnico(a) em eletrônica">Técnico(a) em eletrônica</Select.Option>
            <Select.Option value="Técnico(a) em enfermagem">Técnico(a) em enfermagem</Select.Option>
            <Select.Option value="Técnico(a) em radiologia">Técnico(a) em radiologia</Select.Option>
            <Select.Option value="Teleatendente">Teleatendente</Select.Option>
            <Select.Option value="Telefonista">Telefonista</Select.Option>
            <Select.Option value="Terapeuta ocupacional">Terapeuta ocupacional</Select.Option>
            <Select.Option value="Topógrafo(a)">Topógrafo(a)</Select.Option>
            <Select.Option value="Tradutor(a)">Tradutor(a)</Select.Option>
            <Select.Option value="Treinador(a)">Treinador(a)</Select.Option>
            <Select.Option value="Turismólogo(a)">Turismólogo(a)</Select.Option>
            <Select.Option value="Urbanista">Urbanista</Select.Option>
            <Select.Option value="Vaqueiro(a)">Vaqueiro(a)</Select.Option>
            <Select.Option value="Vendedor(a)">Vendedor(a)</Select.Option>
            <Select.Option value="Veterinário(a)">Veterinário(a)</Select.Option>
            <Select.Option value="Veterinário(a) de pequenos animais">Veterinário(a) de pequenos animais</Select.Option>
            <Select.Option value="Vidraceiro(a)">Vidraceiro(a)</Select.Option>
            <Select.Option value="Web designer">Web designer</Select.Option>
            <Select.Option value="Xerife">Xerife</Select.Option>
            <Select.Option value="Youtuber">Youtuber</Select.Option>
            <Select.Option value="Zelador(a)">Zelador(a)</Select.Option>
            <Select.Option value="Zootecnista">Zootecnista</Select.Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
