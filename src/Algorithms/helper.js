export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}

export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
  

export function calculateManhattanHeuristic(grid, finishNode, COL_SIZE, ROW_SIZE){
    
  for(let row=0;row<ROW_SIZE;row++){
      for(let col=0;col<COL_SIZE;col++){
          const tempNode = grid[row][col];
          const node = {...tempNode};
          node.heuristic = Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
          grid[row][col] = node;
      }
    }
    return grid;   
}

export function getFinishNodes(grid){
  const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        if(node.isFinish || node.obstacleWeight===4){
          nodes.push(node);
        }
      }
    }
    return nodes;
}