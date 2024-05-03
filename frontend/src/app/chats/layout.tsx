import React from "react";
import SideBar from "@/components/navbar/SideBar";

export default async function Layout({children}: { children: React.ReactNode }) {
  return (
    <main className='flex flex-row min-h-screen'>
      <SideBar/>
      {children}
    </main>
  )
}