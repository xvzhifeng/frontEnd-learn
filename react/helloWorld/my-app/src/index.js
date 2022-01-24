import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square 是一个 React 组件类，或者说是一个 React 组件类型。一个组件接收一些参数，我们把这些参数叫做 props（“props” 是 “properties” 简写），然后通过 render 方法返回需要展示在屏幕上的视图的层次结构
 */
// class Square extends React.Component {

//   render() {
//     return (
//       <button className="square" onClick={() => { this.props.onClick() }}>
//         {/* TODO */
//           this.props.value
//         }
//       </button>
//     );
//   }
// }

/**
 * 如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单。
 * 我们不需要定义一个继承于 React.Component 的类，我们可以定义一个函数，这个函数接收 props 作为参数，然后返回需要渲染的元素。
 * 函数组件写起来并不像 class 组件那么繁琐，很多组件都可以使用函数组件来写。
 * 
 * @param {*} props 
 * @returns 
 */
function Square(props) {
  if(props.flag) {
    return (
      <button className='winner' onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    if (this.props.res) {
      for (let r of this.props.res) {
        if (i === r) {
          return (
            <Square key={i} value={this.props.squares[i]}
              flag={true}
              onClick={() => this.props.onClick(i)}
            />
          )
        }
      }
    }
    return (
      <Square key={i} value={this.props.squares[i]}
        res={this.props.res}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
    const items = [];
    for (let i = 0; i < 3; i++) {
      const item = []
      for (let j = 0; j < 3; j++) {
        item.push(this.renderSquare(i * 3 + j));
      }
      items.push(<div className="board-row" key={i}>{item}</div>);
    }
    return (
      <div>
        {items}
        {/* <div className="board-row">
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
    </div> */}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          x: 0,
          y: 0
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      order: false
    };

  }

  // 我们调用了 .slice() 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const x = parseInt(i / 3) + 1;
    const y = i % 3 + 1;
    // concat() 方法可能与你比较熟悉的 push() 方法不太一样，它并不会改变原数组，所以我们推荐使用 concat()。
    this.setState({
      history: history.concat([{
        squares: squares,
        x: x,
        y: y
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }
  order() {
    this.setState({
      order: !this.state.order
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner, res, dogfall] = calculateWinner(current.squares);
    const options = this.state.stepNumber;
    // map 方法得三个参数，前两个是必须得，分别是step当前数组得值，move是索引，arr是当前数组
    const moves = history.map((step, move, arr) => {
      let desc = move ?
        `Go to move #${move} (${step.x},${step.y})` :
        `Go to game start`;
      if (move === options) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });
    // 对历史记录信息，进行排序
    if (this.state.order) {
      moves.reverse()
    }
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (dogfall)  {
      status = `dagfall : X and O `;
    } else {
      status = `Next player:  ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            res={res}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.order()}>升序或者降序</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // 所有落下得子可能赢得情况
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
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 判断这三个连着得子是否相同，如果相同就得出赢家
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i], false];
    }
    
  }
  for(let s of squares){
    if(s) count+=1;
  }
  if(count >= 8) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (!squares[a] && squares[b] && squares[b] === squares[c]) {
        return [null, null, false];
      }
    }
    return [null, null, true];
  }
  return [null, null, false];
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
