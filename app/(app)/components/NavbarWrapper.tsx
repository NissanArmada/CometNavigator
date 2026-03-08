"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname() || "";

  // Do not render the navbar on the onboarding survey route(s)
  if (pathname === "/onboard-survey" || pathname.startsWith("/onboard-survey/")) {
    return null;
  }

  return <AppNavbar />;
}
