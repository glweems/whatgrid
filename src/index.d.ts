/**
 * The units that are allowed to be set on the grid
 *
 */
type GridUnit = '%' | 'fr' | 'px' | 'vw' | 'vh' | 'em' | 'rem';

type GridValue = { id: string; amount: number; unit: GridUnit };

type GridData = {
  /**
   *  **Rows** * Array
   *
   *  Number of _rows_ the grid contains
   */
  rows: GridValue[];
  /**
   * **Columns** * Array
   *
   *  Number of _columns_ the grid contains
   */
  columns: GridValue[];
  gap: {
    amount: number;
    unit: GridUnit;
  };
};
