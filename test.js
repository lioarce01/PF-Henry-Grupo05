//that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

//For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

function solution(A) {
  // write your code in JavaScript (Node.js 14)
  let sorted = A.sort((a, b) => a - b);
  let smallest = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === smallest) {
      smallest++;
    }
  } 
  return smallest;
}