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
import { Link } from 'react-router-dom';

import IPrato from '../../../interfaces/IPrato';
import http from '../../../http';

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/').then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratosAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratosAhSerExcluido.id}/`).then(() => {
      const listaDePratos = pratos.filter(
        (prato) => prato.id !== pratosAhSerExcluido.id
      );
      setPratos([...listaDePratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a href={prato.imagem} target='_blank' rel='noreferrer'>
                  ver imagem
                </a>
                ]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => excluir(prato)}
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

export default AdministracaoPratos;
