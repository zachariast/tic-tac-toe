import { Square } from "./Square";
import { GameContainer } from './style'

function Game() {
  return (
    <GameContainer>
      {Array(3*3).fill('').map((value:string, index:number) => (
        <Square
          key={index}
          value={value}
          index={index}
        />
      ))}
    </GameContainer>
  );
}

export default Game;
