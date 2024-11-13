
"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function LocaisUniage() {
  const [locaisUni, setLocaisUni] = useState([]);

  
  useEffect(() => {
    const locaisUniLocalStorage = JSON.parse(localStorage.getItem("unidades"));
    if (locaisUniLocalStorage && Array.isArray(locaisUniLocalStorage)) {
      setLocaisUni(locaisUniLocalStorage);
    } else {
      setLocaisUni([]);
    }
    console.log(locaisUniLocalStorage);
  }, []);

  
  function excluir(unidade) {
 
    if (window.confirm(`Deseja realmente excluir unidade ${unidade.nome}?`)) {
      const novaLista = locaisAirsoft.filter((item) => item.id !== unidade.id);
      unidadeStorage.setItem("unidades", JSON.stringify(novaLista));
      setLocaisAirsoft(novaLista);
      alert("unidade de Airsoft excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Locais de Airsoft"}>
      <div className="text-end mb-2">
        <Button href="/unidades/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {locaisUni.length > 0 ? (
            locaisUni.map((unidade) => {
              return (
                <tr key={unidade.id}>
                  <td>{unidade.nome}</td>
                  <td>{unidade.endereco}</td>
                  <td>{unidade.cep}</td>
                  <td>{unidade.telefone}</td>
                  <td className="text-center">
                    
                    <Button
                      className="me-2"
                      href={`/unidades/form?id=${unidade.id}`}
                    >
                      <FaPen />
                    </Button>
                    <Button variant="danger" onClick={() => excluir(unidade)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Nenhum local de Unidades cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    
    </Pagina>
  );
}
