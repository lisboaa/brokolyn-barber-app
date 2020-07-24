import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo-brokolyn-barber.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome" />

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input name="password" icon={FiLock} placeholder="Senha" />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="forget">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignIn;
