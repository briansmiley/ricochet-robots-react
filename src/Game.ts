import gameBoard, { BoardFace, Sprite, Wall } from "./Board";

type Position = {
    x: number;
    y: number;
}
type Direction = "U" | "D" | "L" | "R";
const ROBOT_COLORS = ["red", "blue", "green", "yellow"] as const;
type RobotColor = typeof ROBOT_COLORS[number];
 type BoardState = {
    robotPositions: Record<RobotColor, Position>;
    robotMarkerPositions: Record<RobotColor, Position>;
    board: BoardFace
    boardCode: string;
}
 type Player = {
    name: string;
    collectedSprites: Sprite[];
}
 type GameState = {
    board: BoardState;
    inputAllowed: boolean;
    players: Player[];

}


const gameUtils = {
    /**
     * Returns the position of the square that the robot will stop at when moving in a given direction.
     * @param startPosition - The starting position of the robot.
     * @param direction - The direction the robot is moving.
     * @param boardState - The current state of the board.
     * @returns The position of the square that the robot will stop at.
     */
     stoppingSquare: (startPosition: Position, direction:Direction, boardState: BoardState): Position => {
        let stopped = false;
        let currentPosition = startPosition;
        const moves: Record<Direction, {x: number, y: number, wallDir: Wall}> = {
            "U": {x: 0, y: -1, wallDir: "n"},
            "D": {x: 0, y: 1, wallDir: "s"},
            "L": {x: -1, y: 0, wallDir: "w"},
            "R": {x: 1, y: 0, wallDir: "e"}
        }
        while (!stopped) {
            const nextPosition = {
                x: currentPosition.x + moves[direction].x,
                y: currentPosition.y + moves[direction].y
            }
            const blockedByWall = boardState.board[currentPosition.y][currentPosition.x].walls.includes(moves[direction].wallDir);
            const blockedByRobot = Object.values(boardState.robotPositions).some(robot => robot.x === nextPosition.x && robot.y === nextPosition.y);
            if (blockedByWall || blockedByRobot) {
                stopped = true;
            } else {
                currentPosition = nextPosition;
            }
        }
        return currentPosition;
    },
    newBoard: (boardCode?: string): BoardState => {
    const {board, code} = gameBoard(boardCode);
    const getRandomPosition = (maxX: number, maxY: number): Position => {
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
    };

    const isPositionValid = (position: Position, board: BoardFace, occupiedPositions: Position[]): boolean => {
        if (board[position.y][position.x].sprite || (position.x >= 7 && position.x <= 8 && position.y >= 7 && position.y <= 8)) {
            return false;
        }
        for (const occupied of occupiedPositions) {
            if (occupied.x === position.x && occupied.y === position.y) {
                return false;
            }
        }
        return true;
    };

    const placeRobots = (board: BoardFace): Record<RobotColor, Position> => {
        const occupiedPositions: Position[] = [];
        const robotPositions: Record<RobotColor, Position> = {
            red: {x: -1, y: -1},
            blue: {x: -1, y: -1},
            green: {x: -1, y: -1},
            yellow: {x: -1, y: -1}
        };

        for (const color of ROBOT_COLORS) {
            let position: Position;
            do {
                position = getRandomPosition(board[0].length, board.length);
            } while (!isPositionValid(position, board, occupiedPositions));
            robotPositions[color] = position;
            occupiedPositions.push(position);
        }

        return robotPositions;
    };

    const robotPositions = placeRobots(board);
    return {
        board,
        boardCode: code,
        robotPositions,
        robotMarkerPositions: robotPositions
    }

},
newGame: (): GameState => {
    return {
        board: gameUtils.newBoard(),
        inputAllowed: true,
        players: []
    }
},
enableInput: (gameState: GameState): GameState => ({
    ...gameState,
    inputAllowed: true
}),
disableInput: (gameState: GameState): GameState => ({
    ...gameState,
    inputAllowed: false
})
}
const gameActions = {
    moveRobotInDirection: (gameState: GameState, robotColor: RobotColor, direction: Direction): GameState => {
        const startingPosition = gameState.board.robotPositions[robotColor];
        const destination = gameUtils.stoppingSquare(startingPosition, direction, gameState.board);
        return {
            ...gameState,
            board: {
                ...gameState.board,
                robotPositions: {
                    ...gameState.board.robotPositions,
                    [robotColor]: destination
                }
            }
        }
    },
    moveRobotToPosition: (gameState: GameState, robotColor: RobotColor, position: Position): GameState => {
        return {
            ...gameState,
            board: {
                ...gameState.board,
                robotPositions: {
                    ...gameState.board.robotPositions,
                    [robotColor]: position
                }
            }
        }
    }
}
export type {BoardState, Player, GameState, Direction, Position, RobotColor}
export {ROBOT_COLORS, gameUtils, gameActions}
