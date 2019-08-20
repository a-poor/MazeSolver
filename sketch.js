let n_cols = 20;
let n_rows = 20;
let sq_width;
let maze_maker;
let solver;
let solver_built = false;

function setup() {
    let cnv = createCanvas(600,600);
    cnv.parent("sketch-holder");
    cnv.position((windowWidth - width) / 2);

    sq_width = width / n_cols;
    maze_maker = new MazeMaker(n_cols, n_rows, sq_width);
}

function draw() {
    background(40);
    if (maze_maker.n_unvisited > 0) {
        maze_maker.get_next_move();
        maze_maker.show();
    } else {
        if (!solver_built) {
            solver = new AStar(maze_maker.grid, sq_width);
            solver_built = true;
        }
        maze_maker.show();
        solver.get_next_move();
    }
}
