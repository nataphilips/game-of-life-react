import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './unicorno.png';
import background from './glitter2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStarHalfAlt, faEraser, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

library.add(faStarHalfAlt, faEraser, faPlay, faPause);

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

  toggle() {
    if (this.state.playing === false) {
      this.start();
    }
    else {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.state.interval);
    this.setState({ playing: false });
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
        <Header>
          <Logo src={logo}/>
          AWESOME UNICORN GAME OF LIFE
        </Header>
        <Grid>
          {this.state.grid.map(x => this.renderRow(x))}
        </Grid>
        <ButtonContainer>
          <Button onClick={() => this.randomizeGrid(25, 40)}>
            <FontAwesomeIcon icon="star-half-alt" />
            &nbsp;Randomize
          </Button>
          <Button onClick={() => this.createGridZero(25, 40)}>
            <FontAwesomeIcon icon="eraser" />
            &nbsp;Clear
          </Button>
          <Button onClick={() => this.toggle()}>
            <FontAwesomeIcon icon={this.state.playing ? "pause" : "play"} />
          </Button>
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
  justify-content: space-evenly;
  align-items: center;
  background-image: url(${background});
`
const Header = styled(Flex)`
  text-align: center;
  flex-direction: column;
  height: 25vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #FAC6DD;
  font-size: 42px;
  margin-bottom: 5px;
`
const Logo = styled.img`
  text-align: center;
  flex-direction: column;
  height: 18vh;
  justify-content: center;
  align-items: center;
`

const Grid = styled(Flex)`
  text-align: center;
  flex-direction: column;
  height: 62vh;
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
const colors = [
  '#dbb3f2',
  '#f2d1f4',
  '#ebfeff',
  '#d3f0ff',
  '#f9bcdb'
];
const Cell = styled(Flex)`
  height: 1em;
  width: 1em;
  border: 0.5px solid #a5a5a5;
  background: transparent;
  border-radius: 50%;
  ${props => props.alive && `
    background: ${colors[Math.floor(Math.random() * (colors.length))]};
  `}
`
const ButtonContainer = styled(Flex)`
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: stretch;
  height: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`
const Button = styled.button`
  background-color:#FAC6DD;
  height: 50px;
  color: black;
  font-size: 26px;
  text-align: center;
  padding: 7px 5px;
  border: none;
  border-radius: 15px;
  margin: 3px;
  font-family: 'Gochi Hand', cursive;
  letter-spacing: 1px;
  font-weight: 500;
  cursor: pointer;
  outline: 0;
`
export default App;
