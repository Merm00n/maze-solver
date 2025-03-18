"use client";
import Image from "next/image";
import robot from "../../icons/robot.svg";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const initialMaze = [
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 2],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  ];

  const goal = { row: 0, col: 11 };
  
  const calculateHeuristic = (x, y, goalX, goalY) => {
    return Math.abs(goalX - x) + Math.abs(goalY - y);
  };

  const heuristic = {};
  for (let row = 0; row < initialMaze.length; row++) {
    for (let col = 0; col < initialMaze[0].length; col++) {
      if (initialMaze[row][col] !== 1) {
        heuristic[`${row},${col}`] = calculateHeuristic(row, col, goal.row, goal.col);
      }
    }
  }

  const [maze, setMaze] = useState(initialMaze);
  const [robotPos, setRobotPos] = useState({ row: 6, col: 0 });
  const [exploredCells, setExploredCells] = useState([]);
  const [correctPath, setCorrectPath] = useState([]);
  const [isExploring, setIsExploring] = useState(false);

  const aStar = async () => {
    setIsExploring(true);
    const rows = maze.length;
    const cols = maze[0].length;
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parents = Array.from({ length: rows }, () => Array(cols).fill(null));
    const gCost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const fCost = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    let startRow = robotPos.row;
    let startCol = robotPos.col;

    gCost[startRow][startCol] = 0;
    fCost[startRow][startCol] = heuristic[`${startRow},${startCol}`] || 0;
 
    const openSet = [[startRow, startCol, fCost[startRow][startCol]]];

    let found = false;
    let endRow = -1, endCol = -1;

    while (openSet.length > 0 && !found) {
      openSet.sort((a, b) => a[2] - b[2]);
      const [row, col, _] = openSet.shift();

      setExploredCells((prev) => [...prev, [row, col]]);
      await new Promise((resolve) => setTimeout(resolve, 200));

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !visited[newRow][newCol] &&
          maze[newRow][newCol] !== 1
        ) {
          const newGCost = gCost[row][col] + 1;
          if (newGCost < gCost[newRow][newCol]) {
            parents[newRow][newCol] = [row, col];
            gCost[newRow][newCol] = newGCost;
            fCost[newRow][newCol] = newGCost + (heuristic[`${newRow},${newCol}`] || 0);

            openSet.push([newRow, newCol, fCost[newRow][newCol]]);
            visited[newRow][newCol] = true;

            if (maze[newRow][newCol] === 2) {
              found = true;
              endRow = newRow;
              endCol = newCol;
              break;
            }
          }
        }
      }
    }

    if (found) {
      let current = [endRow, endCol];
      const pathCells = [];
      while (current) {
        pathCells.push(current);
        current = parents[current[0]][current[1]];
      }
      pathCells.reverse();
      setCorrectPath(pathCells);
      setExploredCells([]);
      animatePath(pathCells);
    }

    setIsExploring(false);
  };

  const animatePath = async (pathCells) => {
    for (const [row, col] of pathCells) {
      setMaze((prevMaze) =>
        prevMaze.map((r, i) =>
          r.map((cell, j) => {
            if (i === row && j === col && cell !== 2 && cell !== 3) return 4;
            return cell;
          })
        )
      );
      setRobotPos({ row, col });
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  const getCellColor = (cell, rowIndex, colIndex) => {
    if (correctPath.some(([x, y]) => x === rowIndex && y === colIndex)) {
      return "bg-orange-300";
    }
    if (exploredCells.some(([x, y]) => x === rowIndex && y === colIndex)) {
      return "bg-orange-200";
    }
    switch (cell) {
      case 0:
        return "bg-white";
      case 1:
        return "bg-black";
      case 2:
        return "bg-orange-200";
      case 3:
        return "bg-orange-200";
      case 4:
        return "bg-orange-400";
      default:
        return "bg-white";
    }
  };

  const restart = () => {
    setMaze(initialMaze);
    setRobotPos({ row: 6, col: 0 });
    setExploredCells([]);
    setCorrectPath([]);
  };

  return (
    <>
      <div className="h-screen bg-slate-100 w-full flex justify-center items-center">
        <div className="w-[60%] bg-white p-20 gap-y-10 flex flex-col justify-center items-center shadow-2xl rounded-md">
          <div className="grid grid-cols-12 grid-rows-7 border-2 border-black">
            {maze.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${getCellColor(cell, rowIndex, colIndex)} h-12 w-12 flex justify-center items-center`}
                >
                  {robotPos.row === rowIndex && robotPos.col === colIndex && (
                    <Image src={robot} alt="robot" width={35} height={35} />
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex gap-x-4">
            <button
              onClick={aStar}
              disabled={isExploring}
              className="px-4 py-2 text-orange-500 border-2 border-orange-500 rounded hover:text-white hover:bg-orange-500 disabled:opacity-50"
            >
              {isExploring ? "Exploring..." : "Start"}
            </button>
            <button
              onClick={restart}
              className="px-4 py-2 text-orange-500 border-2 border-orange-500 rounded hover:text-white hover:bg-orange-500"
            >
              Restart
            </button>
            <Link href={"/method"}>
              <button className="px-4 py-2 text-gray-500 border-2 border-gray-500 hover:text-white rounded hover:bg-gray-500">
                Choose another method
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}