import React, {useCallback, useRef} from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiPrinter } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo-brokolyn-barber.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string()
        .min(6, 'No mínimo 6 digitos')
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
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input type="password" name="password" icon={FiLock} placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="forget">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignIn;
