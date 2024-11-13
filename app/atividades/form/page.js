"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function AtividadesFormPage({ searchParams }) {
  const router = useRouter();

  const atividades = JSON.parse(localStorage.getItem("atividades")) || [];
  const id = searchParams?.id;
  const atividadesEditada = atividades.find((item) => item.id === id);

  function salvar(dados) {
    if (atividadesEditada) {
      Object.assign(atividadesEditada, dados);
      localStorage.setItem("atividades", JSON.stringify(atividades));
    } else {
      dados.id = v4();
      atividades.push(dados);
      localStorage.setItem("atividades", JSON.stringify(atividades));
    }
    alert("Atividade salva com sucesso!");
    router.push("/atividades");
  }

  const initialValues = {
    nome: "",
    unidade: "",
    status: "",
    atividades: "",
    telefone: "",
    cpf: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    unidade: Yup.string().required("Campo obrigatório"),
    status: Yup.string(),
    atividades: Yup.string(),
    telefone: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de atividades"}>
      <Formik
        initialValues={atividadesEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
            <Form.Group as={Col}>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                name="nome"
                type="text"
                placeholder="Nome Completo"
                style={{ textTransform: "capitalize" }}
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.nome && !errors.nome}
                isInvalid={touched.nome && errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Status:</Form.Label>
              <Form.Select
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.status && !errors.status}
                isInvalid={touched.status && errors.status}
              >
                <option value="">Selecione</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                value={values.telefone}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    type="tel"
                    name="telefone"
                    required
                  />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>CPF:</Form.Label>
              <InputMask
                mask="999.999.999-99"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                isValid={touched.cpf && !errors.cpf}
                isInvalid={touched.cpf && errors.cpf}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpf}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-end">
              <Button className="me-2" href="/atividades">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
