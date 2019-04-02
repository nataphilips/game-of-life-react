import React, { Component } from 'react';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.createGrid(25, 40),
    }
  }

  componentDidMount() {
    setInterval(() => {
      var newGrid = this.newDay(this.state.grid);
      this.setState({grid: newGrid})
    }, 1000);
  }

  createGrid(x, y) {
    var grid = [...Array(x).keys()]
      .map(x => [...Array(y).keys()]
        .map(y => Math.random() < 0.1)
      );

    return grid;
  }

  renderRow(row) {
    return (
      <Row>
        {row.map(x => this.renderCell(x))}
      </Row>
    );
  }

  renderCell(cell) {
    return (<Cell alive={cell}></Cell>);
  }


  newDay(grid) {
    var newCondition = [];
    for (var i = 0; i < grid.length; i++) {
      newCondition[i] = [];
      for (var j = 0; j < grid[i].length; j++) {
        newCondition[i][j] = this.willBeAlive(i, j, grid);
      }
    }
    return newCondition;
  }


  willBeAlive(i, j, grid) {
    var amountOfNeighbors = 0;
    if (i > 0) {
      if (grid[i - 1][j] === true) {
        amountOfNeighbors++;
      }
    }
    if (i < grid.length - 1) {
      if (grid[i + 1][j] === true) {
        amountOfNeighbors++;
      }
    }
    if (j > 0) {
      if (grid[i][j - 1] === true) {
        amountOfNeighbors++;
      }
    }
    if (j < grid[i].length - 1) {
      if (grid[i][j + 1] === true) {
        amountOfNeighbors++;
      }
    }
    if (i > 0 && j > 0) {
      if (grid[i - 1][j - 1] === true) {
        amountOfNeighbors++;
      }
    }
    if ((i < grid.length - 1) && j > 0) {
      if (grid[i + 1][j - 1] === true) {
        amountOfNeighbors++;
      }
    }
    if (i > 0 && (j < grid[i].length - 1)) {
      if (grid[i - 1][j + 1] === true) {
        amountOfNeighbors++;
      }
    }
    if ((i < grid.length - 1) && (j < grid[i].length - 1)) {
      if (grid[i + 1][j + 1] === true) {
        amountOfNeighbors++;
      }
    }
    if (amountOfNeighbors === 3 || amountOfNeighbors === 2) {
      return true;
    }
    return false;
}

  render() {
    return (
      <div>
        <button> CLICK </button>
        <Grid>
          {this.state.grid.map(x => this.renderRow(x))}
        </Grid>
      </div>
    );
  }
}

const Flex = styled.div`
  display: flex;
`
const Grid = styled(Flex)`
  text-align: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`
const Row = styled(Flex)`
  height: 1em;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Cell = styled(Flex)`
  height: 1em;
  width: 1em;
  border: 1px solid grey;
  ${props => props.alive && `
    background: green;
  `}
`

export default App;
