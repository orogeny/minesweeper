import { describe, expect, test } from "vitest";
import { layMines } from "./game";

describe("layMines", () => {
  test("should have w * h cells", () => {
    const cells = layMines(5, 4, 8);
    expect(cells).toHaveLength(20);
  });

  test("should lay all mines", () => {
    const cells = layMines(5, 4, 8);
    expect(cells.filter((c) => c.mined)).toHaveLength(8);
  });
});

describe("adjacent mines", () => {
  const cells = layMines(
    6,
    8,
    22,
    new Set([
      0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 30, 31, 32, 36, 38, 41, 42, 43, 44, 45,
      46, 47,
    ])
  );

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
  ])("cell: %i should have %i adjacent mines", (index, expected) => {
    expect(cells[index].adjacentMines).toBe(expected);
  });
});
