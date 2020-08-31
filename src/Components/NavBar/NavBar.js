import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from '../../App.js';
import './NavBar.css';


const AlgoLine = ({algo,visual}) => {
  if(algo === 'Select an Algorithm' && !visual)
    return(<div> <p>Pick an Algorithm to visualize.</p> </div>);
  else if(algo ==='Select an Algorithm' && visual )
    return(<div><p>Please choose an algorithm first.</p></div>);
  else
    return(<div><p>{algo} selected.Press Visualize or press Reset board to visualize another.</p></div>)
}

const NavBar = ({setObstacleWeight,visualizeBFS,visualizeDFS,visualizeDijkstra,visualizeAStar,addMaze,Reset}) => {
  const [algo,setAlgo] = useState("Select an Algorithm");
  const [visual,setVisual] = useState(false);
  function visualizeAlgo() {
    setVisual(true);
    if(algo == 'Dijkstra Algorithm')
      visualizeDijkstra(); 
    else if(algo === 'Astar Algorithm') 
      visualizeAStar();
    else if(algo === 'BFS Algorithm') 
      visualizeBFS();
    else if(algo === 'DFS Algorithm') 
      visualizeDFS();
    else return;
  }

    return(
      <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
    <a className="navbar-brand text-white">Pathfinding Visualizer <i class="fas fa-route"></i></a>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
      <li className="nav-item">
          <button className="btn btn-secondary reduce-size ml-2 obstacle" onClick = {()=>setObstacleWeight(2)}>Add Tree</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary ml-2 reduce-size obstacle" onClick = {()=>setObstacleWeight(3)}>Add River</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary ml-2 reduce-size obstacle" onClick = {()=>setObstacleWeight(4)}>Add Camp</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary ml-2 reduce-size obstacle" onClick = {()=>setObstacleWeight(0)}>Add Bomb</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-secondary reduce-size ml-2"onClick = {() => addMaze()}>Add Maze</button>
        </li>
        <li className="nav-item dropdown">
        <button className="btn btn-secondary reduce-size dropdown-toggle ml-2" id="dropdownMenuButton"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > {algo}
         </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item reduce-size" value = "Dijkstra Algorithm" onClick = {(e) => setAlgo(e.target.value)}>Dijkstra Algorithm</button>
        <button className="dropdown-item reduce-size" value = "Astar Algorithm" onClick = {(e) => setAlgo(e.target.value)}>Astar Algorithm</button>
        <button className="dropdown-item reduce-size" value = "DFS Algorithm" onClick = {(e) => setAlgo(e.target.value)}>DFS Algorithm</button>
        <button className="dropdown-item reduce-size" value = "BFS Algorithm" onClick = {(e) => setAlgo(e.target.value)}>BFS Algorithm</button>
       </div>
        </li>
        <li className="nav-item">
          <button className="btn btn-success reduce size ml-2" onClick = {()=>visualizeAlgo()}>Visualize!</button>
          </li>
        <li className="nav-item">
          <button className="btn btn-secondary reduce-size ml-2" onClick = {() => Reset()}>Reset Board</button>
          </li>
      </ul>
    </div>
  </nav>
  <div className = "which-algo">
  <AlgoLine algo = {algo} visual = {visual}></AlgoLine>
  </div>
  </div>
    );
  }
export default NavBar;