'use client'
import CanvasCard from "@/components/CanvasCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../store";

export default function HomePage() {
  const [showRoomInput, setShowRoomInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const user = useAuth((s: any) => s.user);
  const router = useRouter();
  return (
    <div className="flex flex-col items-center lg:grid lg:grid-cols-2 justify-center w-fit m-auto gap-0">
      <div className="flex items-center justify-center h-full w-[80%]">
        <div className="m-auto text-center flex-1">
          <img src="/logo.svg" alt="logo" className="w-[90vw] sm:w-[60vw] lg:w-[35vw] m-auto px-10 box-border" />
          <p className="text-xl text-ce mt-4 w-full">Create a room and start drawing live or join other room and watch others drawing.</p>
          <div className="flex flex-col m-20 gap-4 md:gap-4 items-center">
            {showRoomInput ?
              <div className={`border-b-2 border-white m-2 px-1 text-xl flex`}>
                <input type="text" placeholder={"Enter Room ID"} className={`bg-transparent text-white placeholder:text-gray-100 focus-visible:outline-none`} value={roomId} onChange={e => setRoomId(e.target.value)} />
                <p className="cursor-pointer" onClick={() => {
                  setShowRoomInput(false);
                  setRoomId("");
                }}>&#10005;</p>
              </div>
              :
              <button className="hover:scale-105 transition-all p-2 px-6 font-medium rounded-md text-lg sm:text-xl md:text-2xl w-max bg-[#BCBC74]"><Link href={"/canvas?room=new"}>+ New Canvas</Link></button>}
            <button
              className="hover:scale-105 transition-all p-2 px-6 font-medium rounded-md text-lg sm:text-xl md:text-2xl w-max border border-white"
              onClick={() => showRoomInput ? router.push("/canvas?room=" + roomId) : setShowRoomInput(true)}
            >Join Room</button>
          </div>
        </div>
      </div>

      <div className="w-fit sm:pr-8 m-auto flex sm:block items-center flex-col">
        <h3 className="text-3xl m-4 mt-4 text-[#E0FFFF] self-start">Your Recent Drawings:</h3>
        <div className="p-4 sm:px-8 m-4 grid sm:grid-cols-3 grid-cols-2 gap-8 sm:gap-10 lg:gap-14 w-fit">
          {user && user.canvases?.map((canvas: any, id: number) => <CanvasCard key={id} canvas={canvas} />)}
        </div>
      </div>
    </div>
  );
}