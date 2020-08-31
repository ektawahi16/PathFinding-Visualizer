import {getUnvisitedNeighbors} from "./helper";

export function dijkstra(grid, startNode) {
  const visitedNodesInOrder = [];
  const allNodes = [];
  startNode.distance=0;
  allNodes.push(startNode);

  while(!!allNodes.length){
    sortNodesByDistance(allNodes);
    const node = allNodes.shift();
    const neighbor = getUnvisitedNeighbors(node, grid);
    node.isVisited = true;
    visitedNodesInOrder.push(node);
    for(const newNode of neighbor){
      if(newNode.obstacleWeight===0){
        newNode.isVisited = true;
        visitedNodesInOrder.push(newNode); //add bomb node to visited node
        continue;
      }
        if(node.distance + newNode.obstacleWeight < newNode.distance){
          newNode.distance = node.distance + newNode.obstacleWeight;
          newNode.previousNode = node;
          allNodes.filter(node=> node.row === newNode.row && node.col === newNode.col);
          allNodes.push(newNode);
        }
    } 
  }
  //getCostIncurred(finishNode);
  return visitedNodesInOrder;
}
export function getCostIncurred(finishNode){
  return finishNode.distance;
}
  
  function sortNodesByDistance(allNodes) {
    allNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }