"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function LucasgymPage() {
  const [lucasgym, setLucasgym] = useState([]);
  useEffect(() => {
    const lucasgymLocalStorage = JSON.parse(localStorage.getItem("lucasgym")) || [];
    setLucasgym(lucasgymLocalStorage);
    console.log(lucasgymLocalStorage);
  }, []);
  function excluir(lucas) {
    if (window.confirm(`Deseja realmente excluir o Lucas ${lucas.nome}?`)) {
      const novaLista = lucasgym.filter((item) => item.id !== lucas.id);
      localStorage.setItem("lucasgym", JSON.stringify(novaLista));
      setLucasgym(novaLista);
      alert("Lucas excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Lucasgym"}>
      <div className="text-end mb-2">
        <Button href="/lucasgym/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Nome</th>
            <th>Endereço</th>
            <th>Responsável</th>
            <th>Observações</th>
            <th>Turno</th>
            
          </tr>
        </thead>
        <tbody>
          {lucasgym.map((lucas) => (
            <tr key={lucas.id}>
              <td>{lucas.nome}</td>
              <td>{lucas.endereço}</td>
              <td>{lucas.responsavel}</td>
              <td>{lucas.observaões}</td>
              <td>{lucas.turno}</td>
              <td className="text-center">
                <Button className="me-2" href={`/lucasgym/form?id=${lucas.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(lucas)}>
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
