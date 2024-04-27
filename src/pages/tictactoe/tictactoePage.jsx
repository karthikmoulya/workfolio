import useTictactoe from '../../hooks/use-tic-tac-toe';
import './tictactoePage.css';

export default function TictactoePage() {
  const { board, getStatusMessage, handleClick, resetGame, noOfCells } =
    useTictactoe();
  return (
    <div
      style={{
        maxWidth: `calc(${noOfCells} * 100px)`,
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div className='status'>
        {getStatusMessage()}
        <button className='reset-button' onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${noOfCells}, 1fr)`,
          justifyContent: 'center',
        }}
      >
        {board.map((b, index) => {
          return (
            <button
              className='cell'
              key={`board-${index}`}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
