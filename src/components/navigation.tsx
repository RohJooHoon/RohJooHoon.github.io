"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const path = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
        </li>
        <li>
          <Link href="/about">About</Link> {path === "/about" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  );
}
