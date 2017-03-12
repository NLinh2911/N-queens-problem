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
  const div = d3.select("#svg-container");
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
let n = 4;
const colors = ["#4caf50", "#FF5722", "brown", "black", "#FFC107", "#9C27B0"];
let countCol = 0;
let countRow = 0;
let solIndex = 0;
let newSolutions = [];
let prevSolutions = [];
let autoAnimation  = "";
const inputNum = document.getElementById("inputNum");
const status = document.getElementById("status");

// Function to run each step of the algorithm
const nextStep = () => {
  console.log(newSolutions);
  if (countCol === n) { //finish checking all columns
    if (solIndex === prevSolutions.length - 1) {
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
      if (countRow === n) {
        status.innerHTML = `There are total  ${prevSolutions.length} solutions. Solutions ${prevSolutions}`
      };
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
        d3.select("#b" + countRow + solIndex).attr("visibility", "visible");
        countCol = 0;
        countRow++;
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

  } // end of checking when countCol === n
  if (countRow > 0 && countRow < n && countCol <= n) {
    for (let i = 0; i <= countRow; i++) {
      //hide checked boxes
      d3.selectAll(".queens" + i).attr("visibility", "hidden");
    }
    let solution = prevSolutions[solIndex];
    console.log(solution);
    status.innerHTML = `Check row ${countRow} and column  ${countCol} when queens are placed previously at ${solution}. `;
    for (let i = 0; i < solution.length; i++) {
      let solutionQ = d3.select("#b" + i + solution[i]).text(queen.b).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      }).attr("visibility", "visible");
    }
    let selectedQ = d3.select("#b" + countRow + countCol);
    if (meetConstraints(countRow, countCol, solution)) { //meet constraints -> place queens
      // can place a queen at column j 
      console.log("checked");
      newSolutions.push(solution.concat([countCol]));
      selectedQ.classed("queens" + countRow, true).text(queen.b).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      });
      status.innerHTML += `Store accepted solution [${solution.concat([countCol])}]`;
      console.log(newSolutions);
    } else { //place X
      selectedQ.classed("queens" + countRow, true).text("X").datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      });
    }
    selectedQ.attr("visibility", "visible");
    countCol++;
  }
  // 1st Row
  if (countRow === 0 && countCol < n) {
    let solution = [];
    status.innerHTML = `Check row ${countRow} and column  ${countCol}. `;
    let selectedQ = d3.select("#b" + countRow + countCol);
    selectedQ.classed("queens" + countRow, true).text(queen.b).datum(colors[countCol]).attr("fill", function(d) {
      return d;
    });
    //store solutions
    if (meetConstraints(countRow, countCol, solution)) {
      // can place a queen at column j 
      newSolutions.push(solution.concat([countCol]));
      status.innerHTML += `Store accepted solution [${solution.concat([countCol])}]`;
    }
    countCol++;
  }
}

const autoRun = () => {
  // assign setInterval to a var to use clearInterval to stop animation
  autoAnimation = setInterval(nextStep, 800);
}

///
const stopAnimation = () => {
  // stop auto run
  clearInterval(autoAnimation);
  // clear and draw board again
  d3.select("svg").remove();
  drawBoard(n);
  status.innerHTML = "You stop the animation";
  // reassign variables to rerun algorithm
  countCol = 0;
  countRow = 0;
  solIndex = 0;
  newSolutions = [];
  prevSolutions = [];
  console.log(prevSolutions);
  console.log(countRow);
  console.log(countCol);
}

/**
 * Function called when click GET button to read input value
 */
const clickGet = () => {
    index = 0;
    n = parseInt(inputNum.value);
    if (Number.isNaN(n)) {
        status.innerHTML = "Please enter a number";
    } else {
        stopAnimation();
      status.innerHTML = `The chess board size is now ${n}`;
    }
}