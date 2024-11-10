"use client"
import Landing from "@/components/landing";
import { useSession } from "next-auth/react";
export default function Home() {
  return (
   <>
      <Landing/>
   </>
  );
}
