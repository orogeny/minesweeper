import { describe, expect, test } from "vitest";
import { setup } from "./game";

describe("game setup", () => {
  const game = setup(5, 4, 8);

  test("width should be set", () => {
    expect(game.width).toBe(5);
  });

  test("height should be set", () => {
    expect(game.height).toBe(4);
  });

  test("should have width * height cells", () => {
    expect(game.cells).toHaveLength(20);
  });

  test("should have requested mines", () => {
    expect(game.mines).toHaveLength(8);
  });

  test("should have requested mined cells", () => {
    expect(game.cells.filter((c) => c.mined)).toHaveLength(8);
  });
});

describe("neighbour cells", () => {
  const game = setup(8, 6, 9);

  test.each([
    [0, [1, 8, 9]],
    [5, [4, 6, 12, 13, 14]],
    [7, [6, 14, 15]],
    [16, [8, 9, 17, 24, 25]],
    [28, [19, 20, 21, 27, 29, 35, 36, 37]],
    [31, [22, 23, 30, 38, 39]],
    [40, [32, 33, 41]],
    [43, [34, 35, 36, 42, 44]],
    [47, [38, 39, 46]],
  ])("cell: %i should have neighbours %o", (index, expected) => {
    expect(game.findNeighbours(index)).toEqual(new Set(expected));
  });
});

describe("adjacent mines", () => {
  const game = setup(
    6,
    8,
    22,
    new Set([
      0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 30, 31, 32, 36, 38, 41, 42, 43, 44, 45,
      46, 47,
    ])
  );

  let grid = "012345\n";
  for (let row = 0; row < game.height; row++) {
    for (let col = 0; col < game.width; col++) {
      grid += game.cells[row * game.width + col].mined ? "M" : ".";
    }
    grid += "\n";
  }

  console.log(`grid:\n${grid}`);

  test.each([
    [23, 0],
    [17, 1],
    [11, 2],
    [15, 3],
    [25, 3],
    [13, 4],
    [40, 4],
    [39, 5],
    [9, 6],
    [7, 7],
    [37, 8],
  ])("cell: %i has %i adjacent mines", (index, expected) => {
    expect(game.cells[index].adjacentMines).toBe(expected);
  });
});
