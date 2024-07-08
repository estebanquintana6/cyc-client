

let coors = [[0,1],[1,0],[0,-1],[-1,0]]

const bomb = (matrix) => {

    const m = matrix.length;
    const n =  matrix[0].length;    
    
    const q = [{
        x: 0,
        y: 0,
        bombs: 1,
    }];

    while (q.length > 0) {
        let { x, y, bombs } = q.pop();

        if (x == m - 1 && y == n - 1) return true;

        if (matrix[x][y] == 1 && bombs == 0) continue;

        if (matrix[x][y] == 1) bombs--;

        matrix[x][y] = 2;

        for (const coor of coors) {
            let xx = x + coor[0];
            let yy = y + coor[1];
            // is inside matrix & not visited
            
            if (xx >= 0 && yy >= 0 && xx < m && yy < n && matrix[xx][yy] !== 2) {
                q.push({
                    x: xx,
                    y: yy,
                    bombs,
                })
            }
        }


    }

    return false;
}

/*
[[0, 1, 1, 0, 0, 0, ]
[0, 1, 1, 0, 0, 0, ]
[0, 1, 1, 0, 0, 0, ]
[0, 1, 1, 1, 1, 1, ]
[0, 0, 0, 1, 0, 0]]
*/

const example1 = [[0, 1, 1, 0, 0, 0 ],
[0, 1, 1, 0, 0, 0],
[0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 0],
[0, 0, 0, 1, 1, 0]];

console.log(bomb(example1));