import Link from "next/link"
import Image from "next/image"
///../../public/msaLogo.jpeg

export default function Navbar(){
    return (
        <div className="navBar">
            <Link href="/"> 
               <Image alt ="msaLogo"
                src="/msaLogo.jpeg" width = {100} height={100} /> 
        
             </Link>
            <Link href="/"> Home </Link>
            <Link href="/">About Us</Link>
            <Link href="/calendarEvents"> Events </Link>
            <Link href="/"> Multimedia </Link>
            <Link href="/"> Forms </Link>
            <Link href="/"> Dining Options </Link>
            <Link href="/"> Donations </Link>
            <Link href="/"> Additional Information </Link>
        </div>
    )
}