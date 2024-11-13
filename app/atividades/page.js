"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import {excluir} from '../../utils/excluir.js'


export default function AtividadesPage() {
  const [atividades, setAtividades] = useState([]);


  useEffect(() => {
    const atividadesLocalStorage =JSON.parse(localStorage.getItem("atividades")) || [];
    setAtividades(atividadesLocalStorage);
  }, []);

  function excluir(atividades) {
    if (window.confirm(`Deseja realmente excluir o atividades ${atividades.nomeAtividades}?`)) {
      const atividades = JSON.parse(localStorage.getItem("atividades")) || [];
      const novaLista = atividades.filter((item) => item.id !== atividades.id);
      localStorage.setItem("atividades", JSON.stringify(novaLista));
      setAtividades(novaLista);
      alert("Atividades excluído com sucesso!");
    }
  }


  return (
    <Pagina titulo={"Lista de atividades"}>
      <div className="text-end mb-2">
        <Button href="/atividades/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Nome</th>
            <th>Unidade</th>
            <th>Status</th>
            <th>Atividades</th>  
            <th>Telefone</th> 
            <th>CPF</th>        
        
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividade) => {
            return(
              <tr key={atividade.id}>
                <td>{atividade.unidade}</td>
                <td>{atividade.status}</td>
                <td>{atividade.atividades}</td>
                <td>{atividade.telefone}</td>
                <td>{atividade.cpf}</td>
                <td className="text-center">
                  <Button
                    className="me-2" href={`/atividades/form?id=${atividade.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(atividade)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
