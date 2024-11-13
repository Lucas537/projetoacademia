"use client";
import "../../banner.css";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function LocalUnitFormPage(props) {
  const router = useRouter();
  const locaisUni = JSON.parse(localStorage.getItem("unidades")) || [];
  const id = props.searchParams?.id;
  console.log(id);
  const localEditado = id ? locaisUni.find((item) => item.id === id) : null;

  function salvar(dados) {
    if (localEditado) {
      Object.assign(localEditado, dados);
      localStorage.setItem("unidades", JSON.stringify(locaisUni));
    } else {
      dados.id = v4();
      locaisUni.push(dados);
      localStorage.setItem("unidades", JSON.stringify(locaisUni));
    }

    alert("Local de Unidades criado com sucesso!");
    router.push("/unidades");
  }

 
 const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string()
      .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF inválido")
      .required("Campo obrigatório"),
      telefone: Yup.string().required("Campo obrigatório"),
  });
  return (
    <Pagina titulo={"Cadastro de Local de Airsoft"}>
      <Formik
        initialValues={localEditado || initialValues}
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
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
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

        
              </Row>

              <Row className="mb-2">
                

                <Form.Group as={Col}>
                  <Form.Label>Capacidade:</Form.Label>
                  <Form.Control
                    name="capacidade"
                    type="number"
                    value={values.capacidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.capacidade && !errors.capacidade}
                    isInvalid={touched.capacidade && errors.capacidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.capacidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                

                <Form.Group as={Col}>
                  <Form.Label>CEP:</Form.Label>
                  <Form.Control
                    name="CEP"
                    type="text"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cep && !errors.cep}
                    isInvalid={touched.cep && errors.cep}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <InputMask
            mask="(99) 99999-9999"
            value={personais.telefone}
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
              

              <Form.Group className="text-end">
                <Button className="me-2" href="/unidades">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
