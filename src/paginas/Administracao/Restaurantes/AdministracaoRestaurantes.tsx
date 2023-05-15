import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get<IRestaurante[]>('http://0.0.0.0:8000/api/v2/restaurantes/')
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    axios
      .delete(
        `http://0.0.0.0:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`
      )
      .then(() => {
        const listaDeRestaurante = restaurantes.filter(
          (restaurante) => restaurante.id !== restauranteAhSerExcluido.id
        );
        setRestaurantes([...listaDeRestaurante]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [
                <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => excluir(restaurante)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
