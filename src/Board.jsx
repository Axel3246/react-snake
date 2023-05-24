import styled from "@emotion/styled";
import { useState } from "react";
import './Board.css'

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  margin: 40px auto;
`;

const Square = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid black;
  background: ${(props) => props.color};
`;

const randomPos = () => Math.floor(Math.random() * 399);
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const Board = ({ size }) => {
  const [snakePosition, setSnakePosition] = useState(0);
  const [foodPosition, setFoodPosition] = useState(randomPos);
  const [count, setCount] = useState(0);

  const checkFood = (nextP) => {
    if (nextP === foodPosition) {
      let nextFP = randomPos();
      console.log(nextFP);
      // Hasta que no caigan en el mismo
      while (nextFP === nextP) {
        nextFP = randomPos();
        console.log(nextFP);
      }
      setFoodPosition(nextFP);
      setCount(count + 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 40 && snakePosition < 380) {
      setSnakePosition(snakePosition + size);
      checkFood(snakePosition);
    } else if (event.keyCode === 38 && snakePosition >= size) {
      setSnakePosition(snakePosition - size);
      checkFood(snakePosition);
    } else if (event.keyCode === 39 && (snakePosition + 1) % 20 !== 0) {
      setSnakePosition(snakePosition + 1);
      checkFood(snakePosition);
    } else if (event.keyCode === 37 && snakePosition % 20 !== 0) {
      setSnakePosition(snakePosition - 1);
      checkFood(snakePosition);
    }
    console.log(snakePosition);
    window.removeEventListener("keydown", handleKeyDown);
  };

  window.addEventListener("keydown", handleKeyDown);

  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < size * size; i++) {
      if (i === snakePosition) {
        squares.push(<Square color="red" />);
      } else if (i === foodPosition) {
        squares.push(<Square color="blue" />);
      } else {
        squares.push(<Square />);
      }
    }
    return squares;
  };

  return (
    <>
      <Box>{renderSquares().map((square) => square)}</Box>
      <br></br>
      <div className="sorpresa">
      <h1>A00829837</h1>
      <h1>Llega a 3 puntos para una sorpresa...</h1>
      <h1>Puntaje: {count}</h1>
      {count >= 3 ? (        
          <iframe
            width="560"
            height="280"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="YouTube video player"
      
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
       
      ) : null}
      </div>
    </>
  );
};

export default Board;
