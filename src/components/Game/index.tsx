import { Square } from "./Square";
import { GameContainer } from './style'
import { useSelector } from 'react-redux'

function Game() {
  const { gridSize, board } = useSelector((state : any) => state.boardSettings)

  return (
    <GameContainer gridSize={gridSize}>
      {board.map((value:string, index:number) => (
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