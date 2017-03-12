/*
 * Created by Linh Ngo in 12/03/2017
 */

/* Function to check contraints
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

const queen = {
  name: "queen",
  w: "\u2655",
  b: "\u265B"
};
/* Draw chess board function
 * @param: n -> set boardDimension
 * */
const drawBoard = (n) => {
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

// ANIMATION
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

//default
const init = () => {
    drawBoard(n);
}
init();

/**
 * ANIMATE EACH STEP OF THE ALGORITHM
 */
const nextStep = () => {
  if (countCol === n) { //finish checking all columns
    if (solIndex === prevSolutions.length - 1) {
      prevSolutions = newSolutions.slice();
      newSolutions = [];
      countRow++;
      countCol = 0;
      solIndex = 0;
      if (countRow === n) {
        status.innerHTML = `There are total  ${prevSolutions.length} solutions. Solutions ${prevSolutions}`
      };
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
      prevSolutions = newSolutions.slice();
      newSolutions = [];
    }

  } // end of checking when countCol === n
  if (countRow > 0 && countRow < n && countCol <= n) {
    for (let i = 0; i <= countRow; i++) {
      //hide checked boxes
      d3.selectAll(".queens" + i).attr("visibility", "hidden");
    }
    let solution = prevSolutions[solIndex];
    status.innerHTML = `Check row ${countRow} and column  ${countCol} when queens are placed previously at ${solution}. `;
    for (let i = 0; i < solution.length; i++) {
      let solutionQ = d3.select("#b" + i + solution[i]).text(queen.b).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      }).attr("visibility", "visible");
    }
    let selectedQ = d3.select("#b" + countRow + countCol);
    if (meetConstraints(countRow, countCol, solution)) { //meet constraints -> place queens
      // can place a queen at column j 
      newSolutions.push(solution.concat([countCol]));
      selectedQ.classed("queens" + countRow, true).text(queen.b).datum(colors[solution[0]]).attr("fill", function(d) {
        return d;
      });
      status.innerHTML += `Store accepted solution [${solution.concat([countCol])}]`;
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
/**
 * AUTO RUN
 */
const autoRun = () => {
  // assign setInterval to a var to use clearInterval to stop animation
  autoAnimation = setInterval(nextStep, 800);
}

/**
 * STOP ANIMATION
 */
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
}

/**
 * click GET button to read input value
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

