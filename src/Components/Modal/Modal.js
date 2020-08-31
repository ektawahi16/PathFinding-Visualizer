import React, { useState} from 'react';
import './Modal.css';
import soldier from './Images/soldier.png';
import camp from './Images/finish.png';
import arrow from './Images/arrow.gif';
import bomb from './Images/bomb.png';
import tree from './Images/tree.png';
import river from './Images/river.png';
import foot from './Images/foot.png';
import walk from './Images/walking.gif';


const Next = ({page,setPage}) => {
    return(
    <button className = "btn btn-secondary next" id = "nextbtn" onClick = {() => setPage(page+1)}>Next</button>
    );
}
const Previous = ({page,setPage}) =>{
    return(
    <button className = "btn btn-secondary prev" onClick = {() => setPage(page-1)}>Previous</button>
    );

}

const Page1 = ({page,setPage}) => {
 return(
    <div className = 'modal-text'>
        <Next page = {page} setPage = {setPage}></Next>
    <h2> Welcome to PathFinding Visualizer</h2>
        <p> Hey Guys! Let us take you through all the features of our application.If you are not new to this, feel free
            to press the Skip Tutorial button below. You can use the Previous and Next buttons for navigation.
        </p>
        <p className = "front-line">Meet our little soldier,Sam <img src = {soldier}
         width={30} height={30}></img> who is all ready to find a path to his destination, the Base Camp <img src = {camp}
         width={30} height={30}></img>. So come, Let's get started.</p>
         <br></br>
         <img src = {walk} width = {150} height = {150}></img>
    </div>
 );
}

const Page2 = ({page,setPage}) => {
    return(
        <div className = 'modal-text'>
            <Next page = {page} setPage = {setPage}></Next>
            <Previous page = {page} setPage = {setPage}></Previous>
            <h3>Let's add some adventure!</h3>
            <p>Our boy Sam is quite fond of adventure.Let us help make his journey a little adventurous
                by adding some obstacles in his path.
            </p>
            <p>Press the <button className = "btn-sm btn-secondary" disabled>Add Maze</button> to add some predefined 
            obstacles in the grid.Click the button once to add bombs.Click the button twice to add some trees and rivers.Click the button
                thrice to reset the maze to default.
                <br></br> <br></br>
                Press the <button className = "btn-sm btn-secondary" disabled>Add Bomb</button> to add a Bomb yourself.
                <br></br> <br></br>
                Press the <button className = "btn-sm btn-secondary" disabled>Add Tree</button> and the <button 
                className= "btn-sm btn-secondary" disabled> Add River</button> to add some Trees and Rivers yourself.
            </p>
        </div>
    );
}

const Page3 = ({page,setPage})=>{
    return(
        <div className = 'modal-text'>
            <Next page = {page} setPage = {setPage}></Next>
            <Previous page = {page} setPage = {setPage}></Previous>
            <h2>Know your Nodes!</h2>
            <p> <img src = {soldier} width = {30} height = {30}></img> 
                <img src = {arrow} width = {30} height = {30}></img> Represents the Starting node
                <br></br>
                <img src = {camp} width = {30} height = {30}>
                </img> <img src = {arrow} width = {30} height = {30}></img> Represents the Finishing node
                <br></br>
                <img src = {bomb} width = {30} height = {30}>
                </img> <img src = {arrow} width = {30} height = {30}></img> Represents a Bomb node.Sam can't diffuse it and Hence cannot pass through it.
                <br></br>
                <img src = {tree} width = {30} height = {30}>
                </img> <img src = {arrow} width = {30} height = {30}></img> Represents a Tree node.In order to pass through,Sam needs to cut the tree.
                <br></br>
                <img src = {river} width = {30} height = {30}>
                </img> <img src = {arrow} width = {30} height = {30}></img> Represents a River node.In order to pass,Sam needs to row a boat through it.
                </p>
                <p>
                <b>Note - River is a more difficult obstacle than a Tree.</b>
                </p>
                <p>
                    When Sam visits a node,the grid turns transparent and the Jungle becomes visible. However, once visited,
                    He calculates the shortest path and it is represented by <img src = {foot} width = {30} height ={30}></img> node.
                </p>
        </div>
    );
}

const Page4 = ({page,setPage}) => {
    return(
        <div className = 'modal-text'>
            <Next page = {page} setPage = {setPage}></Next>
            <Previous page = {page} setPage = {setPage}></Previous>
            <h2>The mouse pressed option!</h2>
            <img src = {walk} width = {100} height = {140}></img>
            <br></br>
            <p>After clicking the button of the obstacle you wanted to add,Click any cell in the grid
                to add that obstacle to that cell.Also,you can keep your mouse pressed and drag the cursor to 
                add multiple obstacles at the same time.
            </p>
        </div>   
    );
}

const Page5 = ({page,setPage}) => {
    return(
        <div className = 'modal-text'>
        <Next page = {page} setPage = {setPage}></Next>
        <Previous page = {page} setPage = {setPage}></Previous>
        <h2>Know your Algorithms!</h2>
        <br></br>
        <p className = "reduce-font-size">
        <b>Dijkstra Algorithm</b>(weighted) - It finds shortest paths from source to all vertices in a given graph. 
        <br></br> 
        <b>A<sup>*</sup>Algorithm</b>(weighted) -  It uses a Heuristic function to find the shortest path and is faster than Dijkstra Algorithm.
        <br></br> 
        <b>BFS Algorithm</b>(unweighted) -  It starts at the source node and explores all of the neighbor nodes 
        at the present depth prior to moving on to the nodes at the next depth level.
        <br></br>
        <b>DFS Algorithm</b>(unweighted) -   It starts at the source node and explores as far as possible 
        along each branch before backtracking.It does not guarantee the shortest path.
        <br></br>
        <b>One more algorithm</b>(weighted) -  finds shortest paths from source to all vertices in a given graph. 
        </p>
        <p>
        Select one of these algorithms from the <button className = "btn-sm btn-secondary" disabled>Select an Algorithm</button> dropdown menu 
        and then Click <button className = "btn-sm btn-secondary" disabled>Visualize!</button> to start visualizing.
        </p>
        </div>
    );
}

const Page6 = ({page,setPage,ToggleState}) => {
    return(
        <div className = 'modal-text'>
        <Next page = {page} setPage = {setPage}></Next>
        <Previous page = {page} setPage = {setPage}></Previous>
            <h1 className = 'lastpage'>Visualize and Enjoy!</h1>
        <button className = "btn btn-secondary fin" onClick = {()=> ToggleState()}>Finish</button>
        </div>   
    );
}
const ManagePages = ({page,ToggleState,setPage}) => {

    if(page == 1)
        return(<Page1 page = {page} setPage = {setPage}></Page1>);
    if(page == 2)
        return(<Page2 page = {page} setPage = {setPage}></Page2>);
    if(page == 3)
        return(<Page3 page = {page} setPage = {setPage}></Page3>);
    if(page == 4)
        return(<Page4 page = {page} setPage = {setPage}></Page4>);
    if(page == 5)
        return(<Page5 page = {page} setPage = {setPage}></Page5>);
    if(page == 6)
        return(<Page6 page = {page} setPage = {setPage} ToggleState = {ToggleState}></Page6>);
}

const Modal = () =>{
    const [modalState,setModalState] = useState(false);
    const [page,setPage] = useState(1);
    
    function ToggleState(){
     setModalState(!modalState);
     var element = document.getElementsByClassName('main')[0];
     if(!modalState)
       element.classList.add('modal-hide');
     else
       element.className = 'main';
    }

    return(
        <div id = "modal-id">
        <div className = 'main'>
            <div className = 'modal-inner'>
                <br></br>
            <ManagePages page = {page} setPage = {setPage} ToggleState = {ToggleState}></ManagePages>
            </div>
            <button className  = "btn btn-secondary skip" onClick = {()=>ToggleState()}>Skip Tutorial</button>
            <footer className = "pagecounts">{page}/6</footer>
         </div>
        </div>
    );
}
export default Modal;