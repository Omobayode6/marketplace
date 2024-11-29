'use client'
import React, { useEffect } from "react";
import { Loader } from "lucide-react";

const LoadingOverlay = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('no-scroll');
  
    return () => {
      body?.classList.remove('no-scroll');
    }
  }, [])
  
  return (
    <div className=" h-[100vh] overflow-hidden  w-full flex items-center justify-center  absolute z-10 top-0 left-0 bg-white/70 hidde">
      <div className="mx-auto text-center space-y-5">
        <Loader size={50} className="animate-spin mx-auto text-[#B1924E]"/>
        <p>Loading! Please wait ...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;