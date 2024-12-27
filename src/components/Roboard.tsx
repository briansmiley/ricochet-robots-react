import { Space } from "../Board";
import { Robot } from "./Robot";
import { BoardState, ROBOT_COLORS, RobotColor } from "../Game"

type RoboardProps = {
    boardState: BoardState
    selectedRobot: RobotColor | null
    inMotion: boolean
    onSelectRobot: (robot: RobotColor) => void
}

const wallStyles = (space: Space) => {
    const wallWidth = "4px";
    const cellWidth = "1px";
    
    return {
        borderTop: space.walls.includes("n") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderBottom: space.walls.includes("s") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderLeft: space.walls.includes("w") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        borderRight: space.walls.includes("e") ? `${wallWidth} solid black` : `${cellWidth} solid #ddd`,
        backgroundColor: space.sprite ? space.sprite.color : undefined,
    }
}

export default function Roboard({boardState, selectedRobot, inMotion, onSelectRobot}: RoboardProps) {
    const {board} = boardState;
    const cellSize = 40;
    
    return (
        <div className="grid grid-cols-16 gap-0 relative" style={{
            width: 16 * cellSize,
            height: 16 * cellSize
        }}>
            {board.map((row, y) => 
                    row.map((space, x) => (
                        <div key={`${x}-${y}`} className="aspect-square" 
                            style={{...wallStyles(space)}}>
                        </div>
                    ))
            )}
            {ROBOT_COLORS.map((color) => {
                const position = boardState.robotPositions[color];
                const selectedBg = () => {
                     if (color === selectedRobot && !inMotion) {
                        return 'rgba(50, 50, 50, 0.2)';
                    } else {
                        return 'transparent';
                    }
                }
                return (
                    <div key={color} 
                         className="absolute flex justify-center items-center cursor-pointer"
                         onClick={() => onSelectRobot(color)}
                         style={{
                            width: cellSize,
                            height: cellSize,
                            left: position.x * cellSize,
                            top: position.y * cellSize,
                            backgroundColor: selectedBg(),
                            transition: 'left 0.5s ease-in-out, top 0.5s ease-in, background-color 0.2s ease-in',
                    }}>
                        <Robot color={color} />
                    </div>
                )
            })}
        </div>
    )
}