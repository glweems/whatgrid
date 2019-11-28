/**
 * The units that are allowed to be set on the grid
 *
 */
type GridUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem', 'auto'];

type GridUnit = GridUnits[number] | string;

type InputProps = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  type: string;
};

type GridItem = {
  id: string;
  type: string | 'row' | 'column';
  amount: number;
  unit: GridUnit;
  inputProps: InputProps;
};

type NoIdGridItem = { id?: string; type: string | 'row' | 'column'; amount: number; unit: GridUnit };
