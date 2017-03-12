# N-queens-problem

##TODO:
1. Solve N queens problem by JavaScript. The whole algorithm is in file nqueens_algorithm.js

2. Display all solutions on a chess board. See index.html (linked js file is nqueens.js)
   Solutions are displayed in a chess board drawn by D3js. 
   
   * You can choose the n size between 4 and 10 and click GET to see solutions. 
   * Click NEXT to see different solutions shown sequentially.
  
3. Animate the algorithm. See animation.html (linked js file is animation.js). You can choose the n size between 4 and 10. Advise to select n size <= 6 since the whole algorithm animated sequentially can be time-consuming. 

   * Each step of the algorithm is animated. Click NEXT STEP to see.
   * See the whole algorithm with AUTO RUN.
   * Stop animation and reset with STOP ANIMATION.
  
##ALGORITHM EXPLANATION: Check from the 1st row to the last row. In each row, check through all columns.
1. Total solutions is an array of arrays.

   * For example, with 4*4 chess board, there are 2 solutions stored as [[1, 3, 0, 2], [2, 0, 3, 1]].
   * Solution1 = [1, 3, 0, 2] is one way to place 4 queens that no queen threatens each other. The index of the solution implies the row while the value at that index is the column, so Solution1[0] = 1 means that in the 1st row (row index = 0), the queen is placed at the second column (column index = 1).
   * [1, 3, 0, 2] -> 1st row - 2nd column, 2nd row - last column, 3rd row - 1st column, last row - 3rd column
   
2. Check from the 1st row: all columns are possible ways to place a queen.
3. Check next rows, compare each column with all placed queens from potential solutions from previous rows. If they don't threaten each other, push the new accepted column into existing solutions.
4. Continue the process until the last row.
  
