'use client'
import { Reggae_One } from "next/font/google";
import { useAuth } from "../store";
import { useEffect, useState } from "react";
import { ifetch, validateToken } from "../services/utils";
import PreLoader from "@/components/PreLoader";
import Link from "next/link";
import { usePathname } from "next/navigation";

const reggaeOne = Reggae_One({ weight: ["400"], subsets: ["latin"] });

export default function Layout({ children }: { children: any }) {
  const [setUser] = useAuth((state: any) => [state.setUser]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const user = await validateToken(token || "");
      if (user) setUser(user);
      setFetching(false);
    })();
  }, [setUser]);

  if (fetching) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <PreLoader />
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="p-2 sm:p-2 md:p-4 min-h-[100vh] flex flex-col justify-center !pt-20">
        {children}
      </main>
    </>
  );
}

function Header() {
  const [user, setUser, roomName, setRoomName, canvasDataUrl] = useAuth((s: any) => [s.user, s.setUser, s.roomName, s.setRoomName, s.canvasDataUrl]);
  const pathname = usePathname();
  const [saving, setSaving] = useState(false);
  return (
    <header className="flex justify-between items-center bg-[#CCC5E7] p-3 px-7 text-lg absolute w-full">
      <h1 className={`${reggaeOne.className} text-3xl text-black`}><Link href={"/"}>Canvas</Link></h1>
      {pathname === "/canvas" &&
      <div>
        <input className="text-black w-56 font-bold bg-transparent focus-visible:outline-none" value={roomName} onChange={e => setRoomName(e.target.value)} />
        <button
          className={`${saving ? "bg-gray-400" : "bg-green-600"} p-1 px-3 rounded-lg`} disabled={saving}
          onClick={async () => {
            setSaving(true);
            const response = await ifetch("/api/canvas/save", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({ 
                name: roomName,
                dataUrl: canvasDataUrl,
              })
            })
            if (response?.data?.user) setUser(response.data.user);
            setSaving(false);
          }}
        >{saving ? "Saving..." : "Save"}</button>
      </div>
      }
      <button className="p-2 px-5 bg-[#763CF0] rounded-md font-semibold"><Link href={user ? "" : "/login"}>{user ? (user.name || user.email?.split("@")[0]) : "Sign In"}</Link></button>
    </header>
  )
}