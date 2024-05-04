import React from "react";
import SideBar from "@/components/navbar/SideBar";

export default async function Layout({children}: { children: React.ReactNode }) {
  return (
    <main className='flex min-h-screen flex-row'>
      <SideBar/>
      {children}
    </main>
  )
}