import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const generatePuzzle = () => {
    const tiles = Array.from({ length: 16 }, (_, i) => i + 1);
    const shuffledTiles = shuffleArray(tiles);
    const puzzle = shuffledTiles.slice(0, 8);
    const solution = shuffledTiles.slice(8);
    setPuzzle(puzzle);
    setSolution(solution);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleTileClick = (tile) => {
    if (isSolved || selectedTiles.length === 2) {
      return;
    }

    setSelectedTiles([...selectedTiles, tile]);
    setMoves(moves + 1);
  };

  const checkMatch = () => {
    if (selectedTiles.length !== 2) {
      return;
    }

    const [tile1, tile2] = selectedTiles;
    if (solution[tile1] === solution[tile2]) {
      // Match!
      setPuzzle(puzzle.map((t, i) => (i === tile1 || i === tile2) ? solution[i] : t));
      setSelectedTiles([]);
      if (puzzle.every((t) => t !== null)) {
        setIsSolved(true);
      }
    } else {
      // No match, hide tiles after a delay
      setTimeout(() => {
        setSelectedTiles([]);
      }, 500);
    }
  };

  useEffect(() => {
    checkMatch();
  }, [selectedTiles]);

  useEffect(() => {
    generatePuzzle();
  }, []);

  return (
    <div className="App">
      <h1>Puzzle Game</h1>
      <div className="puzzle-grid">
        {puzzle.map((tile, index) => (
          <div
            key={index}
            className={`tile ${selectedTiles.includes(index) ? 'selected' : ''} ${tile !== null ? 'revealed' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile !== null ? tile : ''}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      {isSolved && <p>Congratulations! You solved the puzzle!</p>}
      {!isSolved && <button onClick={generatePuzzle}>New Puzzle</button>}
    </div>
  );
}

export default App;
