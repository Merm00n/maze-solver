import Link from "next/link"
import "./globals.css"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import arrow from "./icons/maki_arrow (1).svg"
export default function Home(){
    return (
        <>
        <div className="h-screen bg-slate-100 w-full flex justify-center items-center ">
            <div className="w-[50%]  bg-white  flex flex-col gap-y-16 justify-center items-center h-80 shadow-2xl rounded-md  ">
                 <div className="text-[36pt] flex gap-x-2 ">Welcome to <div className="text-[#F8A000]">Maze Solver</div> !</div>
                 <Link href='/method' className="bg-[#F8A000] text-white flex justify-center items-center text-[16pt] w-[25%] p-4 rounded-full">
                 <button className="flex gap-x-2">
                    <Image src={arrow} className="w-[15%]" alt="arrow" />
                     Get Started</button>
            
                 </Link>
            </div>

        </div>
        </>
    )
}