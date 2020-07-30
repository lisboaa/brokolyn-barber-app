import React, { useCallback, useRef} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo-brokolyn-barber.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string()
        .required('Senha obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch(err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
    }
  },[]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forget"> Esqueci minha senha </a>
        </Form>

        <a href="#">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )};

export default SignUp;
