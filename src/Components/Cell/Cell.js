import React, { useState } from 'react'
import "./Cell.css"

const Cell = ({row, col,isStart, isFinish, obstacleWeight, isVisited,onMouseDown, onMouseEnter, onMouseUp, setReload = f => f, 
    reload = undefined }) => {
    const [values, setValues] = useState({
        row: row,
        col: col,
        isStart: isStart,
        isFinish: isFinish,
        isVisited: isVisited,
        obstacleWeight: obstacleWeight
    })
    const cellClassName 
    = isFinish ? 'is-finish' 
    : isStart ? 'is-start' 
    : (obstacleWeight==0) ? 'is-bomb' 
    : (obstacleWeight==3)? 'is-river'
    : (obstacleWeight==2) ? 'is-tree' 
    : (obstacleWeight==4) ? 'is-camp' 
    : isVisited ? 'is-visited' 
    : '';

    return<div
        id={`cell-${row}-${col}`} 
        className = {`ordinary-cell ${cellClassName}`} 
        onMouseDown= {() => {
            onMouseDown(row,col)
            setReload(!reload)}}
        onMouseEnter= {() => {
            onMouseEnter(row,col) 
            setReload(!reload)}}
        onMouseUp= {() => {
            onMouseUp()
            setReload(!reload)}}>
    </div>
}

export default Cell;