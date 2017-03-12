/*
 */

/* Function to check contraints
 * @param: rows : check through all rows from 0 to rows - 1
 * @param: column = j in main function eachRow()
 * @param: solution is an array where index is the row and
 * value at each index is the column where queen is placed in each row
 * @return: True if in column j, no queen is placed from 0 to rows - 1  
 * */
// each solution is an array
const meetConstraints = (rows, column, solution) => {
  for (let i = 0; i < rows; i++) {
    if (solution[i] === column ||
      Math.abs(column - solution[i]) === Math.abs(rows - i)) {
      return false;
    }
  }
  return true;
}

/* Function to loop through all column in a row 
 * @param: row: the index of the current row
 * @param: columns = n
 * @param: prevSolution: the solutions are found in previous rows
 * @return: an array of arrays that are possible solutions
 * */

const eachRow = (row, columns, prevSolutions) => {
  //console.log(row);
  //console.log(columns);
  let newSolutions = [];
  let prev = prevSolutions;

  for (let i = 0; i < prev.length; i++) {
    let solution = prev[i];
    //loop through n columns
    for (let j = 0; j < columns; j++) {
      //check if possible to place a queen in column j
      if (meetConstraints(row, j, solution)) {
        // can place a queen at column j 
        newSolutions.push(solution.concat([j]));
      }
    }
  }
  if (row === columns - 1) {
    //console.log(row);
    result = newSolutions;
    //console.log(result); 

  } else {
    // continue to other rows
    eachRow(row + 1, columns, newSolutions);
  }
  return result;
};

/* Runner function
 * @param: n 
 * @return: array of all possible solutions and its length
 * */

const solve_Nqueens = (n) => {
  const init = [
    []
  ];
  const totalSolutions = eachRow(0, n, init);
  //console.log(totalSolutions.length);
  return totalSolutions;
}

const nQueens = solve_Nqueens(4);
/* Draw chess board function
 * @param: n -> set boardDimension
 * @param: randomSol ->
 * */

const queen = {
  name: "queen",
  w: "\u2655",
  b: "\u265B"
};
//Join the random solution array data below to draw queens
const drawBoard = (n) => {
  //Create a SVG element with d3

  ///// Draw
  const boxSize = 50,
    boardDimension = n,
    boardSize = boardDimension * boxSize,
    margin = 100;
  // Get n queens solutions 
  // set <body>
  const div = d3.select("#chessboard");
  // create <svg>
  const svg = div.append("svg")
    .attr("width", boardSize + "px")
    .attr("height", boardSize + "px");

  // loop through 8 rows and 8 columns to draw the chess board
  for (let i = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++) {
      // draw each chess field
      const box = svg.append("rect")
        .attr("x", i * boxSize)
        .attr("y", j * boxSize)
        .attr("width", boxSize + "px")
        .attr("height", boxSize + "px");
      if ((i + j) % 2 === 0) {
        box.attr("fill", "beige");
      } else {
        box.attr("fill", "gray");
      }
    }
  }

  //
  // draw chess pieces 

  for (let i = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++) {
      const chess = svg.append("text")
        .classed('draggable', true)
        .attr("id", "b" + j + i)
        .attr("text-anchor", "middle")
        .attr("x", i * boxSize)
        .attr("y", j * boxSize)
        .attr("dx", boxSize / 2)
        .attr("dy", boxSize * 2 / 3)
        .attr("font-size", '40');
      chess.attr("X", chess.attr("x"))
        .attr("Y", chess.attr("y"));
      // // Draw pieces
      if (j === 0) {
        chess.classed('row0', true);
      }
      if (j === 1) {
        chess.classed('row1', true);
      }
      if (j === 2) {
        chess.classed('row2', true);
      }
      if (j === 3) {
        chess.classed('row3', true);
      }
    }
  }
}

drawBoard(4);
const n = 4;
const colors = ["green", "red", "brown", "black", "yellow", "pink"];
let countCol = 0;
let countRow = 0;
let solIndex = 0;
let newSolutions = [];
let prevSolutions = [];
const status = document.getElementById("status");
const nextRow = () => {
  console.log(newSolutions);
  if (countCol === n) { //finish checking all columns
    if(solIndex === prevSolutions.length - 1){
      console.log("end of" + prevSolutions);
      prevSolutions = newSolutions.slice();
      newSolutions = [];
      console.log(prevSolutions);
      console.log(countRow);
      console.log(countCol);
      console.log(solIndex);
      countRow++;
      countCol = 0;
      solIndex = 0;
      if (countRow === n) {status.innerHTML = prevSolutions};
      console.log("reset");
      console.log(countRow);
      console.log(countCol);
      console.log(solIndex);
      for (let i = 0; i <= countRow; i++) {
        //hide checked boxes
        d3.selectAll(".queens" + i).attr("visibility", "hidden");
      }
    } else {
          if (countRow > 0) { //back track to the next solution of previous row
      //console.log(countRow);
      // for (let i = 0; i <= countRow; i++) {
      //   //hide checked boxes
      //   d3.selectAll(".queens" + i).attr("visibility", "hidden");
      // }
      countRow--;
      solIndex++;
      //firstRowSol++;
      //console.log(countRow);
      //console.log(firstRowSol);
      d3.select("#b" + countRow + solIndex).attr("visibility", "visible");
      countCol = 0;
      countRow++;
      
      console.log(prevSolutions);
      console.log(firstRowSol);

    } 
    }
      if (countRow === 0) {
      countCol = 0;
      d3.selectAll(".queens" + countRow).attr("visibility", "hidden");
      d3.select("#b" + countRow + countCol).attr("visibility", "visible");
      countRow++;
      //status.innerHTML = `Continue to row ${countRow} `;
      // console.log(countCol);
      // console.log(countRow);
      prevSolutions = newSolutions.slice();
      console.log(prevSolutions);
      newSolutions = [];
    }


  }// end of checking when countCol === n
  if (countRow > 0 && countRow < n && countCol <= n) {
    // console.log(countCol);
    // console.log(countRow);
    // console.log(newSolutions);
    // console.log(prevSolutions);
    for (let i = 0; i <= countRow; i++) {
        //hide checked boxes
        d3.selectAll(".queens" + i).attr("visibility", "hidden");
      }
    let solution = prevSolutions[solIndex];
    console.log(solution);
    status.innerHTML = `Check row ${countRow} and column  ${countCol} when queens are placed previously at ${solution}`;
    for (let i = 0; i<solution.length; i++) {
      let solutionQ = d3.select("#b" + i + solution[i]).text(queen.w).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      }).attr("visibility", "visible");
    }   
    let selectedQ = d3.select("#b" + countRow + countCol);
    console.log(countRow);
    console.log(countCol);
    if (meetConstraints(countRow, countCol, solution)) {
      // can place a queen at column j 
      console.log("checked");
      newSolutions.push(solution.concat([countCol]));
      selectedQ.classed("queens" + countRow, true).text(queen.w).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      });
      //console.log(colors[solution[0]]);
      console.log(newSolutions);
    } else {
      selectedQ.classed("queens" + countRow, true).text("X").datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      });
    }
    selectedQ.attr("visibility", "visible");
    countCol++;
    console.log(countCol);
  }
  // 1st Row
  if (countRow === 0 && countCol < n) {
    let solution = [];
    status.innerHTML = `Check row ${countRow} and column  ${countCol}`;
    let selectedQ = d3.select("#b" + countRow + countCol);
    selectedQ.classed("queens" + countRow, true).text(queen.w).datum(colors[countCol]).attr("fill", function(d) {
      return d;
    });
    //store solutions
    if (meetConstraints(countRow, countCol, solution)) {
      // can place a queen at column j 
      newSolutions.push(solution.concat([countCol]));
      //console.log(newSolutions);
    }
    countCol++;
  }
}