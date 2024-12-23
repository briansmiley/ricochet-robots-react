import { newBoard } from "./Game";
import Roboard from "./Roboard";

function App() {
  const boardState = newBoard();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Roboard boardState={boardState} />
    </div>
  );
}

export default App;
