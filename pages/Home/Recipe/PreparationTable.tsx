import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import RenderHtml from 'react-native-render-html';
import { useAppSelector } from '../../../src/hooks';
import { Preparation } from '../../../store/recipe';
import Typography from '../../../Piwi/material/Typography';
import Table from '../../../Piwi/material/Table';
import TableHead from '../../../Piwi/material/TableHead';
import TableRow from '../../../Piwi/material/TableRow';
import TableCell from '../../../Piwi/material/TableCell';
import TableBody from '../../../Piwi/material/TableBody';

export default function PreparationTable({
  preparation,
}: PreparationTableProps) {
  const n = useAppSelector(
    useCallback((state) => state.recipe.preparations, []),
  );
  const totalWeight = (() => {
    let total = 0;
    preparation.ingredients.forEach((ingredient) => {
      total += parseInt(ingredient.weight, 10);
    });

    return total * n;
  })();
  let totalPercentaje = 0;
  const instructionsHtml = useMemo(
    () => ({
      html: preparation.instructions,
    }),
    [],
  );

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Ingredients
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Weight
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Percentage
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {preparation.ingredients.map((ingredient) => {
            const thisPercentaje =
              ((parseInt(ingredient.weight) * n) / totalWeight) * 100;
            totalPercentaje += thisPercentaje;

            return (
              <TableRow
                key={_.snakeCase(`${ingredient.name}${ingredient.weight}`)}
              >
                <TableCell>
                  <Typography variant="subtitle2">{ingredient.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {parseInt(ingredient.weight, 10) * n} gr
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {thisPercentaje.toFixed(2)}%
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Total:
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">{totalWeight} gr</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">
                {totalPercentaje.toFixed(0)}%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Weight per unit:
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">{totalWeight / n} gr</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Instructions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <RenderHtml source={instructionsHtml} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

interface PreparationTableProps {
  preparation: Preparation;
}
