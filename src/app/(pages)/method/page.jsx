import Link from "next/link";
import Image from "next/image";
import robot from "../../icons/rb.svg";

export default function Home() {
  return (
    <>
      <div className="h-screen bg-slate-100 w-full flex justify-center items-center">
        <div className="w-[50%] bg-white flex flex-col gap-y-16 justify-center items-center shadow-2xl rounded-md">
        <div className="text-[28pt] flex gap-x-2 mt-10">Select a <div className="text-[#F8A000]">Search Method</div> !</div>
        <div className="flex w-full justify-center items-center gap-x-14">
            <Link
              className="group shadow-xl w-[30%] h-44 flex flex-col gap-y-3 justify-center items-center text-[18pt] p-4 text-center hover:shadow-md hover:shadow-[#F8A000]"
              href="/bfs"
            >
              <div>Breadth-First Search</div>
              <Image src={robot} alt="robot" className="w-[25%] opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
            <Link
              className="group shadow-xl w-[30%] h-44 flex flex-col gap-y-3 justify-center items-center text-[18pt] p-4 text-center hover:shadow-md hover:shadow-[#F8A000]"
              href="/dfs"
            >
              <div>Depth-First Search</div>
              <Image src={robot} alt="robot" className="w-[25%] opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          </div>
          <div className="w-full flex justify-center items-center mb-10">
            <Link
              className="group shadow-xl w-[30%] h-44 flex flex-col gap-y-3 justify-center items-center text-[18pt] p-4 text-center hover:shadow-md hover:shadow-[#F8A000]"
              href="/astar"
            >
              <div>A* Search</div>
              <Image src={robot} alt="robot" className="w-[25%] opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
