export function findIndices(matrix, x) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value === x) {
                return {r: i, c: j};
            }
        }
    }
    return null;
}