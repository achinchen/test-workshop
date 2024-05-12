export const getCoordinates = ({ x, y }) => {
  return [
    { x: x - 1, y },
    { x, y: y - 1 },
    { x: x + 1, y },
    { x, y: y + 1 },
  ];
};

export function generateInitialData({ rows, cols }) {
  return Array.from({ length: rows }, () => {
    return Array.from({ length: cols }, () => {
      return { ...INITIATED_CELL };
    });
  });
}

export const generateMines = ({ rows, cols, mines: amount }) => {
  const SEPARATOR = ':';
  const coordinates = new Set();

  while (coordinates.size <= amount) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    coordinates.add(`${x}${SEPARATOR}${y}`);
  }

  return [...coordinates].map((coordinateString) => {
    const [x, y] = coordinateString.split(SEPARATOR).map(Number);
    return { x, y };
  });
};

export const getFlaggedCell = ({
  board,
  aroundCoordinates,
}) => {
  const flags = aroundCoordinates.reduce((accumulator, { x, y }) => {
    if (board?.[y]?.[x]?.isFlag) accumulator++;
    return accumulator;
  }, 0);

  return flags;
};

export const getGameState = (board, mines) => {
  let isRevealAll = true;
  let remainingMines = mines;

  for (const row of board) {
    for (const cell of row) {
      if (cell.isFlag) {
        if (!cell.isMine) return 'playing'
        remainingMines--;
      } else {
        if (!cell.isOpen) {
          isRevealAll = false;
          if (cell.isMine) return 'playing'
        }
      }
    }
  }

  if (isRevealAll && remainingMines === 0) return 'won'
  return 'playing';
};