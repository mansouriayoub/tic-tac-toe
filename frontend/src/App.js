import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Images for X and O
  const PLAYER_X_IMAGE = "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4";
  const PLAYER_O_IMAGE = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e";
  
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');
  const [winningLine, setWinningLine] = useState(null);

  // Win conditions - all possible winning combinations
  const winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

  // Check for winner or draw
  useEffect(() => {
    const checkGameStatus = () => {
      // Check for winner
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setGameStatus(`${board[a]} wins!`);
          setWinningLine(winConditions[i]);
          return;
        }
      }

      // Check for draw
      if (board.every(square => square !== null)) {
        setGameStatus('Draw!');
        return;
      }

      // Game continues
      setGameStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    };

    checkGameStatus();
  }, [board, isXNext]);

  // Handle click on a square
  const handleClick = (index) => {
    // Don't allow clicking if square is filled or game is won
    if (board[index] || winningLine) return;
    
    // Create a new board with the move
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    // Update game state
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Render a square on the board
  const renderSquare = (index) => {
    let squareClass = "w-full h-full flex items-center justify-center text-4xl font-bold cursor-pointer transition-all duration-200";
    
    // Add highlight class if square is part of the winning line
    if (winningLine && winningLine.includes(index)) {
      squareClass += " bg-green-200";
    }

    return (
      <div 
        className={squareClass}
        onClick={() => handleClick(index)}
      >
        {board[index] === 'X' && (
          <div className="x-icon">
            <img 
              src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4" 
              alt="X" 
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
        )}
        {board[index] === 'O' && (
          <div className="o-icon">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
              alt="O" 
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
        )}
      </div>
    );
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('Next player: X');
    setWinningLine(null);
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>
      
      <div className="flex items-center gap-8 mb-6">
        <div className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4" 
            alt="X" 
            className="w-10 h-10 object-cover rounded-full mr-2"
          />
          <span>X</span>
        </div>
        <div className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
            alt="O" 
            className="w-10 h-10 object-cover rounded-full mr-2"
          />
          <span>O</span>
        </div>
      </div>
      
      <div className="status text-xl mb-4">{gameStatus}</div>
      
      <div className="game-board w-full max-w-xs aspect-square grid grid-cols-3 grid-rows-3 gap-2 bg-gray-300 p-2 rounded-lg shadow-lg">
        {Array(9).fill(null).map((_, i) => (
          <div key={i} className="bg-white">
            {renderSquare(i)}
          </div>
        ))}
      </div>
      
      <button 
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;