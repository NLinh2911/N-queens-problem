/*
 * Created by Linh Ngo in 8/3/2017
 */
//==============================
// N QUEENS ALGORITHM
//==============================
/* Function to check constraints
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
    const init = [[]];
    const totalSolutions = eachRow(0, n, init);
    //console.log(totalSolutions.length);
    return totalSolutions;
}
//==============================
// DRAW CHESS BOARD WITH D3
//==============================
// Chess pieces data
const queen = {
    name: "queen",
    w: "\u2655",
    b: "\u265B"
};

/**
 * draw a chess board without any pieces
 * @param {*} n : size of the chess board
 * @param {*} totalSolutions : ways to place queen pieces 
 * @param {*} index : the index of one specific solution in totalSolutions array
 */
const drawBoard = (n, totalSolutions, index) => {
    //Create a a chess  board with d3
    //Set chess board config 
    const boxSize = 100,
        boardDimension = n,
        boardSize = boardDimension * boxSize,
        margin = 100;
    // // Get n queens solutions 
    // const nQueens = solve_Nqueens(boardDimension);
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

            // draw chess pieces 
            const chess = svg.append("text")
                .classed('draggable', true)
                .style("font-size", boxSize*3/4)
                .attr("text-anchor", "middle")
                .attr("x", i * boxSize)
                .attr("y", j * boxSize)
                .attr("dx", boxSize / 2)
                .attr("dy", boxSize * 3 / 4)
                .style("text-shadow", "2px 2px 4px #757575");

            // chess.attr("X", chess.attr("x"))
            //   .attr("Y", chess.attr("y"));

            //Draw pieces
            if (j === totalSolutions[index][i]) {
                chess.attr("id", "b" + j + i)
                    .classed('team1', true)
                    .text(queen.b);
            }
        }
    }
}

//default
const init = () => {
    drawBoard(8, [[]], 0);
}
init();

//clear chess board
const clearBoard = () => {
    d3.select("svg").remove();
}

//select DOM
//const btnGet = document.getElementById("btnGet");
const inputNum = document.getElementById("inputNum");
const instruction = document.getElementById("instruction");
const status = document.getElementById("status");
const title = document.getElementById("title");
let index = 0; //index to count solutions when showing on chess boards
/** 
 * Function called when click GET button
 * Read input value, generate totalSolutions
 */
// Initially, run clickGet() on clicking GET and each time click next, run getSol() to store solutions for drawing
// clickGet() and getSol() are redundant due to repeated code, combine into getSol() and when click GET btn, getSol() runs
// const clickGet = () => {
//     index = 0;
//     n = parseInt(inputNum.value);
//     if (Number.isNaN(n)) {
//         document.getElementById("instruction").innerHTML = "Please enter a number";
//     } else {
//         const totalSolutions = solve_Nqueens(n);
//         document.getElementById("title").innerHTML = `Find solutions for ${n} queens problem`
//         document.getElementById("instruction").innerHTML = "Click Next to see solutions";
//         document.getElementById("status").innerHTML = `There are ${totalSolutions.length} solutions.`;
//     }
// }
/**
 * Function 
 */
const getSol = () => {
    n = parseInt(inputNum.value);
    if (Number.isNaN(n)) {
        instruction.innerHTML = "Please enter a number";
    }
    else if (n < 4 || n > 10) {
        instruction.innerHTML = "Please enter a number between 4 and 10";
    } else {
        clearBoard();
        const totalSolutions = solve_Nqueens(n);
        title.innerHTML = `Find solutions for ${n} queens problem`
        instruction.innerHTML = "Click Next to see solutions";
        status.innerHTML = `There are ${totalSolutions.length} solutions.`;
        return [n, totalSolutions];
    }
}

/**
 * Show solutions sequentially when clicking NEXT 
 */
const nextSol = () => {
    //console.log(index);
    // get n and totalSolutions   
    const vars = getSol();
    //console.log(vars[0]);
    //console.log(vars[1].length);
    //draw chess board with n queens
    drawBoard(vars[0], vars[1], index);
    if (index < vars[1].length - 1) {
        status.innerHTML = ` Solution ${index + 1}`;
        index++;
    } else {
        //console.log(index);
        status.innerHTML = ` Solution ${index + 1}. You reach the last solution!`;
        index = 0;
    }
}

