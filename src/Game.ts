import gameBoard, { BoardFace, Sprite } from "./Board";

type Position = {
    x: number;
    y: number;
}
const ROBOT_COLORS = ["red", "blue", "green", "yellow"] as const;
type RobotColor = typeof ROBOT_COLORS[number];
type RobotPositions = Record<RobotColor, Position>;
 type BoardState = {
    robotPositions: RobotPositions;
    robotMarkerPositions: RobotPositions;
    board: BoardFace
    boardCode: string;
}
 type Player = {
    name: string;
    collectedSprites: Sprite[];
}
 type GameState = {
    board: BoardState;
    players: Player[];
}

 const newBoard = (boardCode?: string): BoardState => {
    const {board, code} = gameBoard(boardCode);
    const getRandomPosition = (maxX: number, maxY: number): Position => {
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
    };

    const isPositionValid = (position: Position, board: BoardFace, occupiedPositions: Position[]): boolean => {
        if (board[position.y][position.x].sprite) {
            return false;
        }
        for (const occupied of occupiedPositions) {
            if (occupied.x === position.x && occupied.y === position.y) {
                return false;
            }
        }
        return true;
    };

    const placeRobots = (board: BoardFace): RobotPositions => {
        const occupiedPositions: Position[] = [];
        const robotPositions: RobotPositions = {
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
}

export type {BoardState, Player, GameState, Position}
export {ROBOT_COLORS, newBoard}