import CanvasThumbnail from "@/assets/images/canvas-thumbnail.png";
import Image from "next/image";
import localFont from "next/font/local";
// import PostNoBills from "@/assets/fonts/post-no-bills/postnobillscolombo-extrabold.ttf";

const myFont = localFont({ src: "../../assets/fonts/post-no-bills/postnobillscolombo-extrabold.ttf" });

export default function CanvasCard({ width = 36, height = 36, className }: { width?: number, height?: number, className?: string }) {
  return (
    <div className={`${height ? `h-[${height}]` : "h-36"} ${width ? `w-[${width}]` : "w-36"} relative ${className || ""}`}>
      <div className="w-full h-full bg-black opacity-[0.56] absolute"></div>
      <div className="w-full h-full -rotate-[8deg] bg-[#D9D9D9] p-3 flex justify-between flex-col">
        <Image src={CanvasThumbnail} alt="Thumbnail" className="" />
        <p className={`${myFont.className} text-black text-lg lg:text-xl my-2`}>Canvas 1</p>
      </div>
    </div>
  );
}