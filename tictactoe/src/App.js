import React, { Component } from 'react';
import './App.css';

class Game extends Component {
  render() {
    return (
      <div className ="game">
        <Board className="game-board" />
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );

}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNext: false
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner() || squares[i]) {
      return;
    }
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isNext: !this.state.isNext
    });
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.state.squares[a] 
          && this.state.squares[a] === this.state.squares[b] 
          && this.state.squares[a] === this.state.squares[c]) {
            return this.state.squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner();
    let status;
    if (winner == null) {
      status = 'Next Player' + (this.state.isNext ? 'X' : 'O');
    } else {
      status = 'Winner ' + winner;
    }
    return (
      <div>
        <div className="game-status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}


export default Game;
