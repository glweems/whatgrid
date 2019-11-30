import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '.';
import dragTypes from '../utils/dragTypes';

interface Props {
  isDragging: boolean;
}

const GridItem: FC<Props> = () => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: dragTypes.GRID_ITEM },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragTypes.GRID_ITEM,
    drop: () => console.log('drop'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop}>
      <Box ref={dragRef} style={{ opacity }} />
    </div>
  );
};

export default GridItem;
