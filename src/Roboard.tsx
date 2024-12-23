import { Space } from "./Board";
import { BoardState, Position, ROBOT_COLORS } from "./Game"

type RoboardProps = {
    boardState: BoardState
}

const wallStyles = (space: Space) => {
    const wallWidth = "4px";
    const cellWidth = "1px";
    
    return {
        borderTop: space.walls.has("n") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderBottom: space.walls.has("s") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderLeft: space.walls.has("w") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderRight: space.walls.has("e") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        backgroundColor: space.sprite ? space.sprite.color : undefined,
    }
}
const robotColorStyle = (position: Position, boardState: BoardState) => {
    for (const color of ROBOT_COLORS) {
        const robotPosition = boardState.robotPositions[color];
        if (robotPosition.x === position.x && robotPosition.y === position.y) {
            return {backgroundColor: color};
        }
    }
    return {};
}
export default function Roboard({boardState}: RoboardProps) {
    const {board} = boardState;

    return (
        <div className="flex flex-col">
            {board.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((space, x) => (
                        <div key={`${x}-${y}`} 
                            className={`w-10 h-10`}
                            style={{...wallStyles(space), ...robotColorStyle({x, y}, boardState)}}>
                                
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}