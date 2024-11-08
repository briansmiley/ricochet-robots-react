//WALL CODE
type Wall = "n" | "s" | "e" | "w";
type Sprite = {
  shape: "star" | "square" | "circle" | "triangle" | "burst";
  color: string;
};
/**Wall and sprite information for a board space */
type Space = {
  walls: Set<Wall>;
  sprite?: Sprite;
};
type BoardFace = Space[][];
/**Two 2D Arrays of spaces representing the two faces of a board quadrant */
type BoardQuadrant = [BoardFace, BoardFace];
/**Wall and sprite information for configuring a board space */
type SpaceConfig = {
  x: number;
  y: number;
  walls: Wall[];
  sprite?: Sprite;
};
/** Two arrays of space configurations representing the seed information for two faces of a board quadrant */
type BoardQuadrantConfig = [SpaceConfig[], SpaceConfig[]];
const BOARD_CONFIGS: BoardQuadrantConfig[] = [
  [
    [
      { x: 0, y: 3, walls: ["e"] },
      {
        x: 1,
        y: 5,
        walls: ["e", "s"],
        sprite: { shape: "star", color: "green" }
      },
      {
        x: 2,
        y: 1,
        walls: ["w", "s"],
        sprite: { shape: "square", color: "red" }
      },
      { x: 3, y: 0, walls: ["s"] },
      {
        x: 4,
        y: 6,
        walls: ["n", "w"],
        sprite: { shape: "circle", color: "yellow" }
      },
      {
        x: 6,
        y: 2,
        walls: ["n", "e"],
        sprite: { shape: "triangle", color: "blue" }
      }
    ],
    [
      { x: 0, y: 4, walls: ["e"] },
      {
        x: 1,
        y: 2,
        walls: ["w", "n"],
        sprite: { shape: "circle", color: "yellow" }
      },
      {
        x: 3,
        y: 6,
        walls: ["w", "s"],
        sprite: { shape: "triangle", color: "blue" }
      },
      { x: 4, y: 0, walls: ["s"] },
      {
        x: 5,
        y: 4,
        walls: ["n", "e"],
        sprite: { shape: "square", color: "red" }
      },
      {
        x: 6,
        y: 1,
        walls: ["n", "e"],
        sprite: { shape: "star", color: "green" }
      }
    ]
  ],
  [
    [
      { x: 0, y: 3, walls: ["e"] },
      {
        x: 2,
        y: 5,
        walls: ["e", "s"],
        sprite: { shape: "star", color: "blue" }
      },
      { x: 4, y: 0, walls: ["s"] },
      {
        x: 4,
        y: 2,
        walls: ["e", "n"],
        sprite: { shape: "circle", color: "green" }
      },
      {
        x: 5,
        y: 7,
        walls: ["w", "s"],
        sprite: { shape: "triangle", color: "red" }
      },
      {
        x: 6,
        y: 1,
        walls: ["n", "w"],
        sprite: { shape: "square", color: "yellow" }
      }
    ],
    [
      { x: 0, y: 3, walls: ["e"] },
      {
        x: 1,
        y: 1,
        walls: ["w", "s"],
        sprite: { shape: "triangle", color: "red" }
      },
      {
        x: 2,
        y: 6,
        walls: ["e", "n"],
        sprite: { shape: "circle", color: "green" }
      },
      {
        x: 4,
        y: 2,
        walls: ["s", "e"],
        sprite: { shape: "star", color: "blue" }
      },
      { x: 5, y: 0, walls: ["s"] },
      {
        x: 5,
        y: 7,
        walls: ["n", "w"],
        sprite: { shape: "square", color: "yellow" }
      }
    ]
  ],
  [
    [
      { x: 0, y: 4, walls: ["e"] },
      {
        x: 1,
        y: 6,
        walls: ["e", "s"],
        sprite: { shape: "star", color: "yellow" }
      },
      {
        x: 2,
        y: 1,
        walls: ["w", "n"],
        sprite: { shape: "triangle", color: "green" }
      },
      { x: 5, y: 0, walls: ["s"] },
      {
        x: 5,
        y: 6,
        walls: ["n", "e"],
        sprite: { shape: "square", color: "blue" }
      },
      {
        x: 6,
        y: 3,
        walls: ["w", "s"],
        sprite: { shape: "circle", color: "red" }
      }
    ],
    [
      { x: 0, y: 1, walls: ["e"] },
      {
        x: 1,
        y: 4,
        walls: ["w", "n"],
        sprite: { shape: "circle", color: "red" }
      },
      {
        x: 2,
        y: 1,
        walls: ["n", "e"],
        sprite: { shape: "triangle", color: "green" }
      },
      {
        x: 3,
        y: 6,
        walls: ["s", "e"],
        sprite: { shape: "star", color: "yellow" }
      },
      { x: 5, y: 0, walls: ["s"] },
      {
        x: 6,
        y: 3,
        walls: ["w", "s"],
        sprite: { shape: "square", color: "blue" }
      }
    ]
  ],
  [
    [
      { x: 0, y: 5, walls: ["e"] },
      {
        x: 1,
        y: 2,
        walls: ["e", "s"],
        sprite: { shape: "star", color: "red" }
      },
      {
        x: 3,
        y: 1,
        walls: ["s", "w"],
        sprite: { shape: "square", color: "green" }
      },
      { x: 4, y: 0, walls: ["s"] },
      {
        x: 4,
        y: 6,
        walls: ["w", "n"],
        sprite: { shape: "triangle", color: "yellow" }
      },
      {
        x: 6,
        y: 5,
        walls: ["n", "e"],
        sprite: { shape: "circle", color: "blue" }
      },
      {
        x: 7,
        y: 3,
        walls: ["s", "e"],
        sprite: { shape: "burst", color: "white" }
      }
    ],
    [
      { x: 0, y: 3, walls: ["e"] },
      {
        x: 1,
        y: 6,
        walls: ["w", "s"],
        sprite: { shape: "circle", color: "blue" }
      },
      {
        x: 3,
        y: 1,
        walls: ["e", "n"],
        sprite: { shape: "triangle", color: "yellow" }
      },
      {
        x: 4,
        y: 5,
        walls: ["w", "n"],
        sprite: { shape: "square", color: "green" }
      },
      {
        x: 5,
        y: 2,
        walls: ["s", "e"],
        sprite: { shape: "star", color: "red" }
      },
      {
        x: 5,
        y: 7,
        walls: ["s", "e"],
        sprite: { shape: "burst", color: "white" }
      },
      { x: 6, y: 0, walls: ["s"] }
    ]
  ]
] as const;

/**Generate 2D Board Face array from config */
const generateFace = (config: SpaceConfig[]): BoardFace => {
  return Array.from({ length: 8 }, (_, y) =>
    Array.from({ length: 8 }, (_, x) => {
      //Get any walls specified for this cell in the config
      const configSpace = config.find(s => s.x === x && s.y === y);
      const walls = new Set(configSpace?.walls || []);

      // Add border walls
      if (y === 0) walls.add("n");
      if (x === 0) walls.add("w");
      if (x === 7 && y === 7) {
        walls.add("n");
        walls.add("w");
      }

      return {
        walls,
        sprite: configSpace?.sprite
      };
    })
  );
};
/**Generate a board quadrant from a pair of face configurations */
const generateQuadrant = (config: BoardQuadrantConfig): BoardQuadrant => {
  const [topFaceConfig, bottomFaceConfig] = config;
  //Check that the face configs have the same sprites
  const topSprites = topFaceConfig
    .map(space => space.sprite?.shape)
    .filter(shape => shape !== undefined);
  const bottomSprites = bottomFaceConfig
    .map(space => space.sprite?.shape)
    .filter(shape => shape !== undefined);
  if (
    topSprites.length !== bottomSprites.length ||
    !(topSprites.sort().join(",") === bottomSprites.sort().join(","))
  ) {
    throw new Error(
      "Top and bottom face configurations must have the same sprites."
    );
  }

  const topFace = generateFace(topFaceConfig);
  const bottomFace = generateFace(bottomFaceConfig);
  return [topFace, bottomFace];
};

/**
 * Rotates a board face clockwise n * 90 degrees
 * @param {BoardFace} face - The board face to rotate
 * @param {number} n - The number of 90 degree rotations
 * @returns {BoardFace} - The rotated board face
 */
const rotateFace = (face: BoardFace, n: number) => {
  if (n === 0) return face;

  const numCols = face[0].length;
  const numRows = face.length;
  let buffFace = face.map(row => row.slice());
  const rotFace: BoardFace = face.map(row => new Array(row.length));

  for (let i = 0; i < n; i++) {
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        rotFace[row][col] = buffFace[numRows - col - 1][row];
        const space = rotFace[row][col];
        const temp = [
          space.walls.has("n"),
          space.walls.has("e"),
          space.walls.has("s"),
          space.walls.has("w")
        ];
        space.walls = new Set<Wall>(
          [
            temp[3] ? "n" : null,
            temp[0] ? "e" : null,
            temp[1] ? "s" : null,
            temp[2] ? "w" : null
          ].filter(wall => wall !== null) as Wall[]
        );
      }
    }
    buffFace = rotFace.map(row => row.slice());
  }
  return rotFace;
};

/**Join four selected board faces into a full game board */
const joinFaces = (
  northWest: BoardFace,
  northEast: BoardFace,
  southWest: BoardFace,
  southEast: BoardFace
): BoardFace => {
  const topHalf = northWest.map((row, y) => row.concat(northEast[y]));
  const bottomHalf = southWest.map((row, y) => row.concat(southEast[y]));
  return topHalf.concat(bottomHalf);
};

/**Gives every space walls that match with bordering spaces */
const fillWallParity = (face: BoardFace): BoardFace => {
  face.forEach((row, r) => {
    row.forEach((space, c) => {
      if (r > 0 && face[r - 1][c].walls.has("s")) space.walls.add("n");
      if (r < face.length - 1 && face[r + 1][c].walls.has("n"))
        space.walls.add("s");
      if (c > 0 && face[r][c - 1].walls.has("e")) space.walls.add("w");
      if (c < row.length - 1 && face[r][c + 1].walls.has("w"))
        space.walls.add("e");
    });
  });
  return face;
};

/**Generate a random repeatable board code */
const generateBoardCode = (): string => {
  const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const flips = Array.from({ length: 4 }, () => Math.floor(Math.random() * 2));
  return order.join("") + flips.join("");
};

/**Generate a game board */
const generateGameBoard = (
  config: BoardQuadrantConfig[],
  code?: string
): BoardFace => {
  const quadrants = config.map(generateQuadrant);

  // Generate a random repeatable board code
  const boardCode = code ? code : generateBoardCode();

  // Decode the code
  const order = boardCode.slice(0, 4).split("").map(Number);
  const flips = boardCode.slice(4).split("").map(Number);

  // Select the faces based on the code
  const selectedFaces = order.map((index, i) => quadrants[index][flips[i]]);

  // Rotate the selected faces based on the code
  const rotatedFaces = selectedFaces.map((face, i) => rotateFace(face, i));
  // Stitch the selected faces together
  const joinedBoard = joinFaces(
    rotatedFaces[0],
    rotatedFaces[1],
    rotatedFaces[2],
    rotatedFaces[3]
  );

  //Complete wall info so each space knows what its bordering walls are
  const completedBoard = fillWallParity(joinedBoard);

  return completedBoard;
};

const gameBoard = () => {
  const code = generateBoardCode();
  const board = generateGameBoard(BOARD_CONFIGS, code);
  return { board, code };
};

export default gameBoard;
