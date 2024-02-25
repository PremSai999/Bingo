function isBingo(matrix, size) {
    let count = 0;
    for (let i = 0; i < size; i++) {
      if (matrix[i].every((number) => number.strike)) {
        count++;
      }
    }
  
    for (let j = 0; j < size; j++) {
      if (matrix.every((row) => row[j].strike)) {
        count++;
      }
    }
    if (matrix.every((row, index) => row[index].strike)) {
      count++;
    }
  
    if (matrix.every((row, index) => row[size - 1 - index].strike)) {
      count++;
    }
  
    return count;
  }
export default isBingo