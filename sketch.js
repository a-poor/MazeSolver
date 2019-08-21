let n_cols = 30;
let n_rows = 30;
let sq_width;
let maze_maker, solver;
let solve_maze = false;

function start_solve() {
    if (maze_maker.n_unvisited <= 0 && !solve_maze) {
        solve_maze = true;
        solver = new AStar(maze_maker.grid, sq_width);
    }
}
function reset_grid() {
    solver = undefined;
    solve_maze = false;
    document.getElementById("solve-button").disabled = true;
    maze_maker = new MazeMaker(n_cols, n_rows, sq_width);
    loop();
}

function setup() {
    let cnv = createCanvas(600,600);
    cnv.parent("sketch-holder");
    document.getElementById("solve-button").disabled = true;

    sq_width = width / n_cols;
    maze_maker = new MazeMaker(n_cols, n_rows, sq_width);
}

function draw() {
    background(40);
    if (maze_maker.n_unvisited > 0) {
        maze_maker.get_next_move();
    } else {
        document.getElementById("solve-button").disabled = false;
        maze_built = true;
    }
    maze_maker.show();
    if (solve_maze) {
        solver.get_next_move();
    }
}
