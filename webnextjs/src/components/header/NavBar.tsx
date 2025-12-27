"use client";
import Link from "next/link";

interface NavbarProps {
  role: string | null;
}

const NavBar = ({ role }: NavbarProps) => {
  return (
    <nav>
        <div>
            <ul>
                <Link href="./">Home </Link>
                <Link href="/myprojects">Projects </Link>
                {role === "ADMIN" && (<Link href="/dashboard">Dashboard</Link>)}
            </ul>
            <p>{role}</p>
        </div>
    </nav>
  )
}

export default NavBar