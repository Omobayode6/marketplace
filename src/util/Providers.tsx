"use client"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode, useState } from "react";

export default function Provider({
    children
}: {
    children: ReactNode
}) {
    return (
      <div>
        <ToastContainer />
        {children}
      </div>
    );
};
