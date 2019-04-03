import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStarHalfAlt, faEraser } from '@fortawesome/free-solid-svg-icons';

library.add(faStarHalfAlt, faEraser);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 25,
      y: 40,
      grid: [],
      interval: null,
      playing: false,
    }
  }

  componentDidMount() {
    this.createGridZero();
 }

  gridShape(x, y) {
    return [...Array(x).keys()].map(x => [...Array(y).keys()])
  }

  createGridZero() {
    const x = this.state.x;
    const y = this.state.y;
    var grid = this.gridShape(x, y).map(x => x.map(y => false))

    this.setState({ grid });
  }

  randomizeGrid() {
    const x = this.state.x;
    const y = this.state.y;
    var grid = this.gridShape(x, y).map(x => x.map(y => Math.random() < 0.25))

    this.setState({ grid });
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

  stop() {
    clearInterval(this.state.interval);
  }

  start() {
    const interval = setInterval(() => {
      var newGrid = this.newDay(this.state.grid);
      this.setState({grid: newGrid})
    }, 100);

    this.setState({ interval, playing: true });
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
    if (i > 0 && j > 0) {
      if (grid[i - 1][j - 1] === true) {
        amountOfNeighbors++;
      }
    }
    if (i > 0 && (j < grid[i].length - 1)) {
      if (grid[i - 1][j + 1] === true) {
        amountOfNeighbors++;
      }
    }

    if (i < grid.length - 1) {
      if (grid[i + 1][j] === true) {
        amountOfNeighbors++;
      }
    }
    if ((i < grid.length - 1) && j > 0) {
      if (grid[i + 1][j - 1] === true) {
        amountOfNeighbors++;
      }
    }

    if ((i < grid.length - 1) && (j < grid[i].length - 1)) {
      if (grid[i + 1][j + 1] === true) {
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

    var willLive = false
    if (grid[i][j] === true) {
      if (amountOfNeighbors === 2 || amountOfNeighbors === 3) {
        willLive = true;
      }
    }
    else if (!grid[i][j]) {
      if (amountOfNeighbors === 3) {
        willLive = true;
      }
    }
    return willLive;
  }

  render() {
    return (
      <AppBody>
        <Grid>
          {this.state.grid.map(x => this.renderRow(x))}
        </Grid>
        <ButtonContainer>
          <Button onClick={() => this.randomizeGrid(25, 40)}>
            <FontAwesomeIcon icon="star-half-alt" />
            Randomize
          </Button>
          <Button onClick={() => this.createGridZero(25, 40)}>
            <FontAwesomeIcon icon="eraser" />
            Clear
          </Button>
          <Button onClick={() => this.start()}>Start</Button>
          <Button onClick={() => this.stop()}>Pause</Button>
        </ButtonContainer>
      </AppBody>
    );
  }
}

const Flex = styled.div`
  display: flex;
`


const AppBody = styled(Flex)`
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`

const Grid = styled(Flex)`
  text-align: center;
  flex-direction: column;
  height: 60vh;
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
const ButtonContainer = styled(Flex)`
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: stretch;
  height: 42px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`
const Button = styled.button`
  height: 40px;
`


export default App;
