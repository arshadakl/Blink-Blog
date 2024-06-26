import React from "react";

export function GridBackground({children}) {
  return (
    <div className="h-mx-full min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
    {children}
    {/* <div className="absolute pointer-events-none  flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
  </div>
  );
}
