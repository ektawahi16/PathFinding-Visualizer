import {getUnvisitedNeighbors } from "./helper";

// this algo is not copied, need to check for bug later
export function breadthFirstSearch(grid, startNode, finishNode) {
    const visitedNode = [];
    if(startNode === finishNode){   
        startNode.isVisited = true;
        finishNode.previousNode = startNode;
        visitedNode.push(startNode);
        return visitedNode;
    }
    const sNode = startNode;

    const queue = [];
    sNode.isVisited =true;
    queue.push(sNode);
    visitedNode.push(sNode);

    while(queue.length){
        const node = queue.shift()

        const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
        for (const n of unvisitedNeighbors) {  
            const{isVisited, obstacleWeight, isFinish} = n;
            if(!isVisited && obstacleWeight!=0){  // && obstacleWeight!=0 && obstacleWeight!=2 && obstacleWeight!=3 && obstacleWeight!=4
                n.previousNode = node;
                n.isVisited = true;
                queue.push(n);  
                visitedNode.push(n);
                if(isFinish){
                    return visitedNode;
                };
            }
        }
    }
}