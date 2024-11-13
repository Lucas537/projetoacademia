"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask"; 

export default function CadastroPersonais() {
  const [personais, setPersonais] = useState({
    nome: "",
    apelido: "",
    equipe: "",
    email: "",
    telefone: "",
    experiencia: "",
    tipoArmaPreferida: "",
  });

  const [clientes, setClientes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || [
      { id: 1, nomeCliente: "Alpha Squadron" },
      { id: 2, nomeCliente: "Bravo Battalion" },
      { id: 3, nomeCliente: "Delta Force" },
      { id: 4, nomeCliente: "Omega Rangers" },
      { id: 5, nomeCliente: "Black Knights" },
      { id: 6, nomeCliente: "Red Storm" },
      { id: 7, nomeCliente: "Green Berets" },
      { id: 8, nomeCliente: "Phantom Elite" },
      { id: 9, nomeCliente: "Ghost Recon" },
      { id: 10, nomeCliente: "Titan Force" },
      { id: 11, nomeCliente: "Storm Troopers" },
      { id: 12, nomeCliente: "Viper Squad" },
      { id: 13, nomeCliente: "Cobra Command" },
      { id: 14, nomeCliente: "Shadow Ops" },
      { id: 15, nomeCliente: "Rogue Warriors" },
      { id: 16, nomeCliente: "Scorpion Team" },
      { id: 17, nomeCliente: "Ironclad Warriors" },
      { id: 18, nomeCliente: "Steel Rain" },
      { id: 19, nomeCliente: "Reaper Command" },
      { id: 20, nomeCliente: "Blaze Squad" },
    ];
    setClientes(clientesLocalStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonais({ ...personais, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personaisLocalStorage = JSON.parse(localStorage.getItem("personais")) || [];
    personais.id = Date.now();
    personaisLocalStorage.push(personais);
    localStorage.setItem("personais", JSON.stringify(personaisLocalStorage));
    alert("personais cadastrado com sucesso!");
    router.push("/personais");
  };

  return (
    <Pagina titulo={"Cadastro de Personais"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={personais.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formApelido">
          <Form.Label>Apelido</Form.Label>
          <Form.Control
            type="text"
            name="apelido"
            value={personais.apelido}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={personais.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
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
        
        <Form.Group controlId="formExperiencia">
          <Form.Label>Experiência (anos)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            name="experiencia"
            value={personais.experiencia}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Cadastrar Personais
        </Button>
      </Form>
    </Pagina>
  );
}
