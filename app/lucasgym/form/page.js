"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

export default function LucasgymFormPage(props) {
  const router = useRouter();

  const id = props.searchParams.id;
  const lucasgym = JSON.parse(localStorage.getItem("lucasgym")) || [];
  const lucasEditado = lucasgym.find((item) => item.id === id);

  function salvar(dados) {
    if (lucasEditado) {
      Object.assign(lucasEditado, dados);
      localStorage.setItem("lucasgym", JSON.stringify(lucasgym));
    } else {
      dados.id = uuidv4();
      lucasgym.push(dados);
      localStorage.setItem("lucasgym", JSON.stringify(lucasgym));
    }

    alert("Lucas salvo com sucesso!");
    router.push("/lucasgym");
  }

  const initialValues = {
    nome: "",
    endereço: "",
    responsavel: "",
    observacoes: "",
    turno: "",
    
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    data: Yup.date().required("Campo obrigatório"),
    organizador: Yup.string().required("Campo obrigatório"),
    responsavel: Yup.string().required("Campo obrigatório"),
    observacoes: Yup.string(),
   
  });

  return (
    <Pagina titulo="Cadastro de Lucas">
      <Formik
        initialValues={lucasEditado || initialValues}
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
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
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
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name="endereço"
                  type="text"
                  value={values.endereço}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereço && !errors.endereço}
                  isInvalid={touched.endereço && errors.endereço}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endereço}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Responsável:</Form.Label>
                <Form.Control
                  name="responsavel"
                  type="text"
                  value={values.responsavel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.responsavel && !errors.responsavel}
                  isInvalid={touched.responsavel && errors.responsavel}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.responsavel}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                  name="observacoes"
                  type="text"
                  value={values.observacoes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.observacoes && !errors.observacoes}
                  isInvalid={touched.observacoes && errors.observacoes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.observacoes}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Turno:</Form.Label>
                <Form.Select
                  name="turno"
                  value={values.turno}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.turno && !errors.turno}
                  isInvalid={touched.turno && errors.turno}
                >
                  <option value="">Selecione</option>
                  <option value="Matutino">Manhã</option>
                  <option value="Vespertino">Tarde</option>
                  <option value="Noturno">Noite</option>
                  
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tipoEvento}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/lucasgym">
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

