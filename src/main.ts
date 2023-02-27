import readline from "readline";

type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface Position {
  x: number;
  y: number;
}

class ToyBot {
  position: Position;
  direction?: Direction;

  constructor(x: number = 0, y: number = 0, direction?: Direction) {
    this.position = {x, y};
    this.direction = direction;
  }

  getNextPosition(): Position {
    const {x, y} = this.position;
    switch (this.direction) {
      case "NORTH":
        return { x, y: y + 1 };
      case "EAST":
        return { x: x + 1, y };
      case "SOUTH":
        return { x, y: y - 1 };
      case "WEST":
        return { x: x - 1, y };
      default:
        return this.position;
    }
  }

  isPointValid(point: Position): boolean {
    return (
      point.x >= 0 &&
      point.x <= 4 &&
      point.y >= 0 &&
      point.y <= 4
    );
  }

  place(x: number, y: number, direction?: Direction): void {
    if (this.isPointValid({x, y})) {
      this.position= {x, y};
      if (direction) {
        this.direction = direction;
      }
    }
  }

  move(): void {
    const nextPosition = this.getNextPosition();
    if (this.isPointValid(nextPosition)) {
      this.position = nextPosition;
    }
  }  

  turnLeft(): void {
    if (this.direction) {
      switch (this.direction) {
        case "NORTH":
          this.direction = "WEST";
          break;
        case "EAST":
          this.direction = "NORTH";
          break;
        case "SOUTH":
          this.direction = "EAST";
          break;
        case "WEST":
          this.direction = "SOUTH";
          break;
        default:
          break;
      }
    }
  }

  turnRight(): void {
    if (this.direction) {
      switch (this.direction) {
        case "NORTH":
          this.direction = "EAST";
          break;
        case "EAST":
          this.direction = "SOUTH";
          break;
        case "SOUTH":
          this.direction = "WEST";
          break;
        case "WEST":
          this.direction = "NORTH";
          break;
        default:
          break;
      }
    }
  }

  reportPosition(): string {
    return this.direction
      ? `Position: (${this.position.x}, ${this.position.y}), Facing: ${this.direction}`
      : "Toy bot has not been placed yet.";
  }
}

class Command {
  private readonly command: string;
  private readonly args?: string[];

  constructor(commandString: string) {
    const [command, args] = commandString.trim().toUpperCase().split(" ");
    this.command = command;
    this.args = args?.split(",");
  }

  execute(toyBot: ToyBot): void | string {
    switch (this.command) {
      case "PLACE":
        const [x, y, direction] = this.args ?? [];
        if (x && y) {
          toyBot.place(parseInt(x), parseInt(y), <Direction>direction);
        }
        break;
      case "MOVE":
        toyBot.move();
        break;
      case "LEFT":
        toyBot.turnLeft();
        break;
      case "RIGHT":
        toyBot.turnRight();
        break;
      case "REPORT":
        console.log(toyBot.reportPosition());
        break;
      default:
        console.log("Invalid command. Try again.");
        break;
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let toyBot = new ToyBot();

rl.on("line", (input: string) => {
  const command = new Command(input);
  command.execute(toyBot);
});
