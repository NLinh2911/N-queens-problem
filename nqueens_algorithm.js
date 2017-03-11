/*
 * Created by Linh Ngo in 8/3/2017
 */

/* Function to check contraints
 * @param: rows : check through all rows from 0 to rows - 1
 * @param: column = j in main function eachRow()
 * @param: solution is an array where index is the row and
 * value at each index is the column where queen is placed in each row
 * @return: True if in column j, no queen is placed from 0 to rows - 1  
 * */
// each solution is an array
 const meetContraints = (rows, column, solution) => {
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
   
    for (let i = 0; i< prev.length; i++) {
    	let solution = prev[i];
      //loop through n columns
    	for (let j = 0; j < columns; j++) {
        //check if possible to place a queen in column j
        	if (meetContraints(row, j, solution)) {
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

solve_Nqueens(4);