import Link from "next/link";
import Image from "next/image";
///../../public/msaLogo.jpeg

export default function Navbar() {
  return (
    <div className="navBar">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="avatar">
            <div className="w-24 rounded">
              <Link href="/">
                <img src="/msaLogo.jpeg" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/"> Home </Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/calendarEvents"> Events </Link>
            </li>
            <li>
              <a>
                Multimedia
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link href="/"> Newsletter </Link>
                </li>
                <li>
                  <Link href="/"> Recent Events </Link>
                </li>
                <li>
                  <Link href="/"> Pictures </Link>
                </li>
              </ul>
            </li>
            <li>
              <a>
                Forms
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                    <Link href="/"> Khutbah Sign Ups</Link>
                </li>
                <li>
                    <Link href="/"> Feedback Form</Link>
                </li>
                <li>
                    <Link href="/"> Roommate Selection Form</Link>
                </li>
              </ul>
            </li>
            <li>
              <a>
                Dining Options 
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                    <Link href="/"> Vanderbilt Dining Halls</Link>
                </li>
                <li>
                    <Link href="/"> Restaurants around Town </Link>
                </li>
              </ul>
            </li>
            <li>
                <Link href="/"> Donations </Link>
            </li>
            <li>
              <a>
                Additional Information 
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                    <Link href="/"> Campus Praying Spaces </Link>
                </li>
                <li>
                    <Link href="/"> Adjacent Organization Information </Link>
                </li>
                <li>
                    <Link href="/"> Nashville Community Information </Link>
                </li>
                <li>
                    <Link href="/"> Admin Page </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
