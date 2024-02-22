"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function NavigationBar() {
  return (
    <header className="flex w-full items-center justify-between bg-white p-4">
      <Link href={"/servers/"}>XHost</Link>
      <UserButton />
    </header>
  );
}
