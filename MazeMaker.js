class MazeMaker {
    constructor(n_cols, n_rows, square_w) {
        this.n_cols = n_cols;
        this.n_rows = n_rows;
        this.square_w = square_w;

        this.grid = [];
        for (let i = 0; i < n_rows; i++) {
            this.grid.push([]);
            for (let j = 0; j < n_cols; j++) {
                this.grid[i].push(new GridSquare(j, i, this.square_w));
            }
        }
        this.n_unvisited = n_cols*n_rows-1;

        this.current_cell = this.grid[0][0];
        this.stack = [];
        this.stack.push(this.current_cell);
        this.current_cell.visited = true;
    }
    show() {
        for (let i = 0; i < n_rows; i++) {
            for (let j = 0; j < n_cols; j++) {
                this.grid[i][j].show();
            }
        }
    }
    // get_sq_move(sq) {
    //     // Moves: N E S W
    //     let possible_moves = [];
    //     if (sq.y > 0) possible_moves.push(0);
    //     if (sq.x < n_cols-1) possible_moves.push(1);
    //     if (sq.y < n_rows-1) possible_moves.push(2);
    //     if (sq.x > 0) possible_moves.push(3);

    //     if (possible_moves.length == 0) {
    //         return -1;
    //     } else {
    //         let r = random(Math.floor(possible_moves.length));
    //         return possible_moves[r];
    //     }
    // }
    get_next_move() {
        if (this.n_unvisited <= 0) {
            console.log("All cells visited.");
            noLoop();
        } else {
            let cx = this.current_cell.x;
            let cy = this.current_cell.y;
            let possible_moves = [];
            let move_directions = [];
            // if (cy > 0 && !this.grid[cy-1][cx].visited) possible_moves.push(this.grid[cy-1][cx]);
            // if (cx < n_cols-1 && !this.grid[cy][cx+1].visited) possible_moves.push(this.grid[cy][cx+1]);
            // if (cy < n_rows-1 && !this.grid[cy+1][cx].visited) possible_moves.push(this.grid[cy+1][cx]);
            // if (cx > 0 && !this.grid[cy][cx-1].visited) possible_moves.push(this.grid[cy][cx-1]);
            if (cy > 0 && !this.grid[cy-1][cx].visited) {
                move_directions.push(0);
                possible_moves.push(this.grid[cy-1][cx]);
            }
            if (cx < n_cols-1 && !this.grid[cy][cx+1].visited) {
                move_directions.push(1);
                possible_moves.push(this.grid[cy][cx+1]);
            }
            if (cy < n_rows-1 && !this.grid[cy+1][cx].visited) {
                move_directions.push(2);
                possible_moves.push(this.grid[cy+1][cx]);
            }
            if (cx > 0 && !this.grid[cy][cx-1].visited) {
                move_directions.push(3);
                possible_moves.push(this.grid[cy][cx-1]);
            }
            // Pick randomly
            if (move_directions.length > 0) {
                let r = Math.floor(random(move_directions.length));
                let next_cell = possible_moves[r];
                switch (move_directions[r]) {
                    case 0: //N
                        this.current_cell.n = false;
                        next_cell.s = false;
                        break;
                    case 1: //E
                        this.current_cell.e = false;
                        next_cell.w = false;
                        break;
                    case 2: //S
                        this.current_cell.s = false;
                        next_cell.n = false;
                        break;
                    case 3: //W
                        this.current_cell.w = false;
                        next_cell.e = false;
                        break;
                }
                this.current_cell = next_cell;
                this.stack.push(this.current_cell);
                this.current_cell.visited = true;
                this.n_unvisited--;
            } else if (this.stack.length > 0) {
                this.current_cell = this.stack.pop();
            }

        }
    }
}