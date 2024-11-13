"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function PersonaisPage() {
  const [personais, setPersonais] = useState([]);

  useEffect(() => {
    const personaisLocalStorage = JSON.parse(localStorage.getItem("personais")) || [];
    setPersonais(personaisLocalStorage);
  }, []);

  const excluir = (personais) => {
    if (window.confirm(`Deseja realmente excluir o personal ${personais.nome}?`)) {
      const novaLista = personais.filter((item) => item.id !== personais.id);
      localStorage.setItem("personais", JSON.stringify(novaLista));
      setPersonais(novaLista);
      alert("Personal excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Personais"}>
      <div className="text-end mb-2">
        <Button href="/personais/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Equipe</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Experiência</th>
          </tr>
        </thead>
        <tbody>
          {personais.map((personais) => (
            <tr key={personais.id}>
              <td>{personais.nome}</td>
              <td>{personais.apelido}</td>
              <td>{personais.equipe}</td>
              <td>{personais.email}</td>
              <td>{personais.telefone}</td>
              <td>{personais.experiencia}</td>
              
              <td className="text-center">
                <Button className="me-2" href={`/personais/form?id=${personais.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(personais)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
