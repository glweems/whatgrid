/**
 * The units that are allowed to be set on the grid
 *
 */
type GridUnit = '%' | 'fr' | 'px' | 'vw' | 'vh' | 'em' | 'rem' | string;

type GridItem = { id: string; type: string | 'row' | 'column'; amount: number; unit: GridUnit };
type NoIdGridItem = { id?: string; type: string | 'row' | 'column'; amount: number; unit: GridUnit };
