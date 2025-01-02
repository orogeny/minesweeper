function getNeighbours(width: number, height: number) {
  return (index: number) => {
    const neighbours = new Set<number>();

    const col = index % width;
    const row = Math.floor(index / width);

    if (row - 1 >= 0) {
      if (col - 1 >= 0) neighbours.add((row - 1) * width + (col - 1));
      neighbours.add((row - 1) * width + col);
      if (col + 1 < width) neighbours.add((row - 1) * width + col + 1);
    }

    if (col - 1 >= 0) neighbours.add(row * width + col - 1);
    if (col + 1 < width) neighbours.add(row * width + col + 1);

    if (row + 1 < height) {
      if (col - 1 >= 0) neighbours.add((row + 1) * width + col - 1);
      neighbours.add((row + 1) * width + col);
      if (col + 1 < width) neighbours.add((row + 1) * width + col + 1);
    }

    return neighbours;
  };
}

export { getNeighbours };
