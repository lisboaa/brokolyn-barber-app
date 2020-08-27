import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo-brokolyn-barber.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();


  const handleSubmit = useCallback(async (data: SignInFormData) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail valido'),
        password: Yup.string()
        .required('Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro na authenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      })
    }
  },[signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="BrokolynBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input type="password" name="password" icon={FiLock} placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forget"> Esqueci minha senha </a>
        </Form>

        <a href="forget">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )};

export default SignIn;
