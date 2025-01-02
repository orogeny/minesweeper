import { describe, expect, test } from "vitest";
import { getNeighbours } from "./utils";

describe("neighbour cells", () => {
  const findNeighbours = getNeighbours(8, 6);

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
    expect(findNeighbours(index)).toEqual(new Set(expected));
  });
});
