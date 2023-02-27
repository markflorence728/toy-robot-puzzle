# Toy Robot Puzzle

This is a command-line application that simulates a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table. Any movement that would result in the robot falling from the table is prevented, however further valid movement commands are still allowed.

## Requirements

- Node.js (v14.15.4 or later)
- npm (v6.14.10 or later)

## Installation

1. Install dependencies: `npm install`

## Usage

To run the application, execute the following command:

```
npm run build
npm run start
```

This will start the application and begin listening for user input. The application accepts the following commands:

- `PLACE X,Y,F` - Place the robot on the tabletop in position `(X, Y)` and facing direction `F` (NORTH, EAST, SOUTH, or WEST).
- `MOVE` - Move the robot one unit forward in the direction it is currently facing.
- `LEFT` - Rotate the robot 90 degrees to the left.
- `RIGHT` - Rotate the robot 90 degrees to the right.
- `REPORT` - Output the current position and orientation of the robot.

All commands must be in uppercase.




