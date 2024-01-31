import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useAppSelector } from '../../../src/hooks';
import { Preparation } from '../../../store/recipe';
import Typography from '../../../Piwi/material/Typography';
import Table from '../../../Piwi/material/Table';
import TableHead from '../../../Piwi/material/TableHead';
import TableRow from '../../../Piwi/material/TableRow';
import TableCell from '../../../Piwi/material/TableCell';
import TableBody from '../../../Piwi/material/TableBody';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default function PreparationTable({
  preparation,
  originalRecipeWeight,
}: PreparationTableProps) {
  const n = useAppSelector(
    useCallback((state) => state.recipe.preparations, []),
  );
  const recipeWeight = useAppSelector(
    useCallback((state) => state.recipe.weight, []),
  );
  const instructionsHtml = useMemo(
    () => ({
      html: preparation.instructions,
    }),
    [],
  );
  const originalWeight = (() => {
    let total = 0;
    preparation.ingredients.forEach((ingredient) => {
      total += parseInt(ingredient.weight, 10);
    });

    return total * n;
  })();
  const originalWeightInPercent = (originalWeight / originalRecipeWeight) * 100;
  const newWeight = (recipeWeight * originalWeightInPercent) / 100;

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
              ((parseInt(ingredient.weight) * n) / originalWeight) * 100;

            return (
              <TableRow
                key={_.snakeCase(`${ingredient.name}${ingredient.weight}`)}
              >
                <TableCell>
                  <Typography variant="subtitle2">{ingredient.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {(((newWeight * thisPercentaje) / 100) * n).toFixed(0)} gr
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
              <Typography variant="subtitle2">{originalWeight} gr</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">100%</Typography>
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
              <RenderHtml
                source={instructionsHtml}
                contentWidth={SCREEN_WIDTH}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

interface PreparationTableProps {
  preparation: Preparation;
  originalRecipeWeight: number;
}
