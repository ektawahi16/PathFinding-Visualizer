import React, { useState, useEffect } from 'react';
import Cell from './Components/Cell/Cell';
import NavBar from './Components/NavBar/NavBar';
import Modal from './Components/Modal/Modal';
import {dijkstra, getNodesInShortestPathOrder, getCostIncurred} from './Algorithms/dijkstra';
import { breadthFirstSearch } from './Algorithms/bfs';
import {depthFirstSearch} from './Algorithms/dfs';
import './App.css';
import { addMazeOne, addMazeTwo } from './Components/Maze';
import { calculateManhattanHeuristic, getFinishNodes } from './Algorithms/helper';
import { aStarAlgorithm } from './Algorithms/AStar';

const ROW_SIZE = 14;
const COL_SIZE = 31;
const start_row= 4;
const start_col= 4;
const end_row= 9;
const end_col=23;

const App = () => {
  const [reload, setReload] = useState(false);  
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [obstacleWeight, setObstacleWeight] = useState(1);    //default weight is 1
  const [maze, setMaze] = useState(0);

useEffect(() => {                     //similar to componentdidmount in class based 
    setGrid(getInitialGrid());
}, []);


const getInitialGrid = () => {    //2d array is created to store each Cell component.
    const grid = [];
    for (let row = 0; row < ROW_SIZE; row++) {
      const currentRow = [];
      for (let col = 0; col < COL_SIZE; col++) {
        currentRow.push(createCell(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
};

const createCell= (row, col) => {
      return {    //notice, its an object
        row, 
        col,
        obstacleWeight: 1,
        isStart: row === start_row && col === start_col,
        isFinish: row === end_row && col === end_col,
        isVisited: false,
        distance: Number.MAX_VALUE,
        heuristic: 0,
        isOpen: false,
        previousNode: null,
      }
};

const Reset = () => {
  window.location.reload();
  // setGrid(getInitialGrid());
  // setReload(!reload);
};

  //here we are updating each cell object inside grid, onclicked from UI
const handleOnMouseDown = (row, col) => {   
  const newgrid = getNewGridStateToggled(grid, row, col);
  setGrid(newgrid);   
  setMouseIsPressed(true);
};

const handleOnMouseEnter = (row, col) => {
  if (!mouseIsPressed) return;
  const newGrid = getNewGridStateToggled(grid, row, col);
  setGrid(newGrid);
}

const handleOnMouseUp=()=> {
  setMouseIsPressed(false);
}

const getNewGridStateToggled = (grid, row, col) => {
  const tempNode = grid[row][col];
  const newCell = { ...tempNode};   
  if(newCell.obstacleWeight === 0 || newCell.obstacleWeight === 2 || newCell.obstacleWeight === 3 || newCell.obstacleWeight === 4)
    newCell.obstacleWeight=1;
  else
    newCell.obstacleWeight=obstacleWeight;
  grid[row][col] = newCell;
  return grid;
}

  const visualizeDijkstra = () => {          
    console.log(grid);
    const startNode = grid[start_row][start_col];
    const visitedNodesInOrder = dijkstra(grid, startNode);
    console.log(visitedNodesInOrder); 
    const finishNodeArray = getFinishNodes(grid);
    for(const finishNode of finishNodeArray){
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      console.log(nodesInShortestPathOrder);
      animate(visitedNodesInOrder,nodesInShortestPathOrder);
    }
  };

  const visualizeAStar = () => {
    const finishNode = grid[end_row][end_col];
    const newGrid = calculateManhattanHeuristic(grid, finishNode, COL_SIZE, ROW_SIZE);
    setGrid(newGrid);
    const startNode = grid[start_row][start_col];
    const visitedNodesInOrder = aStarAlgorithm(grid, startNode, finishNode);
    console.log("out from a*", visitedNodesInOrder);
    const f = visitedNodesInOrder.slice(-1)[0];
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(f);
    animate(visitedNodesInOrder,nodesInShortestPathOrder);
  }

  const visualizeBFS = () => {
    const startNode = grid[start_row][start_col];
    const finishNode = grid[end_row][end_col];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode); 
    setReload(!reload);
    animate(visitedNodesInOrder,nodesInShortestPathOrder);
}

  const visualizeDFS = () => {
    const startNode = grid[start_row][start_col];
    const finishNode = grid[end_row][end_col];
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
    setReload(!reload);
    animate(visitedNodesInOrder,visitedNodesInOrder);
}
  
  const animate = (visitedNodesInOrder,nodesInShortestPathOrder) => {
    for(let i = 0; i<= visitedNodesInOrder.length; i++){
      if(i === visitedNodesInOrder.length){
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      const cell = visitedNodesInOrder[i];
      cell.isVisited = false;
      if(cell.isStart || cell.isFinish) continue;
      setTimeout(function(){
        document.getElementById(`cell-${cell.row}-${cell.col}`).classList.add('is-visited');
    },10*i);
    }
   
  } 
  const animateShortestPath = (nodesInShortestPathOrder) => {
    var prev = nodesInShortestPathOrder[0];
    for(let i = 1; i < nodesInShortestPathOrder.length; i++){
      const cell = nodesInShortestPathOrder[i];
      cell.isVisited = false;
      if(cell.isFinish) continue;
      
      if(prev.col===cell.col && prev.row < cell.row)
        setTimeout(()=>{document.getElementById(`cell-${cell.row}-${cell.col}`).className = `ordinary-cell is-visited shortest-path-${'down'}`;
      }, 200*i);

      else if(prev.row === cell.row && prev.col < cell.col)
        setTimeout(()=>{document.getElementById(`cell-${cell.row}-${cell.col}`).className = `ordinary-cell is-visited shortest-path-${'right'}`;
      }, 200*i);
      
      else if(prev.col === cell.col && prev.row > cell.row)
        setTimeout(()=>{document.getElementById(`cell-${cell.row}-${cell.col}`).className = `ordinary-cell is-visited shortest-path-${'up'}`;
      }, 200*i);
      
      else
        setTimeout(()=>{document.getElementById(`cell-${cell.row}-${cell.col}`).className = `ordinary-cell is-visited shortest-path-${'left'}`;
      }, 200*i);
            prev = cell;
    }
  }

  const addMaze = () => {
    if(maze===0){
      console.log("current maze", maze);
      const newGrid = addMazeOne(grid, ROW_SIZE, COL_SIZE);
      setMaze(1);
      setGrid(newGrid);
    }
    else if(maze==1){
      console.log("current maze before", maze);
      const newGrid = addMazeTwo(grid, ROW_SIZE, COL_SIZE);
      setMaze(2);
      setGrid(newGrid);
    }
    else if(maze==2){
      Reset();
    }
  }


   return( 
    <div id = "wrapper">
      <NavBar
      setObstacleWeight = {setObstacleWeight} 
      visualizeDijkstra = {visualizeDijkstra}
      visualizeBFS = {visualizeBFS}
      visualizeDFS = {visualizeDFS}
      visualizeAStar = {visualizeAStar}
      Reset = {Reset}
      addMaze = {addMaze}>
      </NavBar>
      <Modal></Modal>
     
      <div className = "grid">
      {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((cell, cellIdx) => {
                  const {row, col,isStart,obstacleWeight, isFinish, isVisited} = cell;   //destructuring each object element (alternative cell.row, cell.col etc)
                  return (<Cell
                          key={cellIdx}
                          col={col}
                          row={row}
                          obstacleWeight = {obstacleWeight}
                          isStart = {isStart}
                          isFinish= {isFinish}
                          isVisited = {isVisited}
                          setReload = {setReload}
                          reload = {reload}
                          onMouseUp = {handleOnMouseUp}
                          onMouseEnter = {(row, col) => handleOnMouseEnter(row,col)}
                          onMouseDown= {(row, col) => handleOnMouseDown(row,col)}>
                        </Cell>)})}
              </div>)}
      )}
      </div>
    </div>
   )

  }

export default App;