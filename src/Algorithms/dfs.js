import {getUnvisitedNeighbors } from "./helper";

export function depthFirstSearch(grid, startNode, finishNode) {
    const visitedNodes = [];
    if(startNode === finishNode){   
        startNode.isVisited = true;
        finishNode.previousNode = startNode;
        visitedNodes.push(startNode);
        return visitedNodes;
    }
    const sNode = startNode;
    let stack = [];   //array as a stack
    sNode.isVisited = true;
    stack.push(sNode);
    //visitedNodes.push(sNode);
     
  while(stack.length){
        let node = stack.pop();
        
        visitedNodes.push(node);
        node.isVisited = true;
        if(node.isFinish) 
           return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
        for (const n of unvisitedNeighbors) {  
           if(!n.isVisited){
              n.previousNode = node;
              stack.push(n);         
            }
        }
    }
}