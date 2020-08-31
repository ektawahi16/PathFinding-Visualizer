import { getUnvisitedNeighbors } from "./helper";

export function aStarAlgorithm(grid, startNode, finishNode){
    const visitedNodesInorder = [];
    const open = [];
    startNode.isOpen = true;
    startNode.distance = 0;
    open.push(startNode); 

    while(!!open.length){
        sortNodesByFValue(open);
        const currentNode = open.shift();
        currentNode.isOpen = false;
        currentNode.isVisited = true;
        visitedNodesInorder.push(currentNode);

        if(currentNode.isFinish === true){
            return visitedNodesInorder;
        }

        const neighbours = getUnvisitedNeighbors(currentNode, grid);
        
        for(const neighbor of neighbours){
            if(neighbor.isVisited===true || neighbor.obstacleWeight==0 || neighbor.obstacleWeight==4 )
                continue;
        
            if(neighbor.isOpen === false || currentNode.distance + neighbor.heuristic + neighbor.obstacleWeight < neighbor.distance){  //here next condition is: new path to neighbour is shorter
                neighbor.distance = currentNode.distance + neighbor.obstacleWeight;
                neighbor.previousNode = currentNode;

                if(neighbor.isOpen === false){
                    neighbor.isOpen = true;
                    open.push(neighbor);
                }
            }
        }
    }
    return visitedNodesInorder;
}

function sortNodesByFValue(neighbours) {
    neighbours.sort((nodeA, nodeB) => (nodeA.obstacleWeight + nodeA.heuristic) - (nodeB.obstacleWeight + nodeB.heuristic));
  }
