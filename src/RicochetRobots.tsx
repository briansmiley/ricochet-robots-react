import { gameUtils, GameState, RobotColor, gameActions, Direction } from "./Game";
import Roboard from "./components/Roboard";
import { useState, useEffect } from "react";
const clickSound = new Audio('/sound/click.mp3');
export const RicochetRobots = () => {
  const [gameState, setGameState] = useState<GameState>(gameUtils.newGame());
  const [selectedRobot, setSelectedRobot] = useState<RobotColor | null>(null);
  const [inMotion, setInMotion] = useState(false);
  const handleSelectRobot = (robot: RobotColor) => {
    if (!gameState.inputAllowed) return;
    setSelectedRobot(robot);
  }

  const handleMoveRobot = (direction: Direction) => {
    if (!selectedRobot || !gameState.inputAllowed) return;
    setInMotion(true);
    setGameState(state => {
      const disabledState = gameUtils.disableInput(state);
      const movedState = gameActions.moveRobotInDirection(disabledState, selectedRobot, direction);
      
      // Schedule re-enabling input after animation
      setTimeout(() => {
        setGameState(state => {
          const enabledState = gameUtils.enableInput(state);
          clickSound.play();
          return enabledState;
        });
        setInMotion(false);
      }, 500);
      
      return movedState;
    });
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.inputAllowed) return;

      // Robot selection
      const robotKeys: Record<string, RobotColor> = {
        'r': 'red',
        'g': 'green',
        'b': 'blue',
        'y': 'yellow'
      };
      
      if (e.key.toLowerCase() in robotKeys) {
        handleSelectRobot(robotKeys[e.key.toLowerCase()]);
        return;
      }

      // Movement
      const moveKeys: Record<string, Direction> = {
        'ArrowUp': 'U',
        'ArrowDown': 'D',
        'ArrowLeft': 'L',
        'ArrowRight': 'R',
        'w': 'U',
        's': 'D',
        'a': 'L',
        'd': 'R'
      };

      if (e.key in moveKeys) {
        handleMoveRobot(moveKeys[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRobot, gameState.inputAllowed]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Roboard 
        boardState={gameState.board} 
        selectedRobot={selectedRobot}
        inMotion={inMotion}
        onSelectRobot={handleSelectRobot}
      />
    </div>
  );
}

export default RicochetRobots;