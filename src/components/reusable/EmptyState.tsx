import Image from "next/image";
import React from "react";
import empty from '../../assets/icons/empty.svg'

const EmptyState = ({title, text}:{title:string; text:string}) => {
  return (
    <div className="shadow-custom text-[#6D6D6D] rounded-md h-[300px] px-8 max-w-[600px] mx-auto flex flex-col items-center justify-center">
      <Image src={empty} alt="empty" className=""/>
      {/* img={<AlertTriangle className="text-red-600 bg-[#FDE3E3] p-1 w-8 h-8 rounded-sm" />} */}
      <p className="text-[#655F5F] text-lg my-2 font-bold">{title}</p>
      <p className="text-sm text-[#655F5F] text-center">{text}</p>
    </div>
  );
};

export default EmptyState;
