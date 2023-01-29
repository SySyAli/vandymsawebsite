import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className=" mt-8 footer items-center p-2 bg-base-200 text-black">
        <div className="items-center grid-flow-col">
          <div className="avatar">
            <div className="w-24 rounded ">
              <Link href="/">
                <img src="/MSA.png" />
              </Link>
            </div>
          </div>
          <p>Copyright © 2023 - All right reserved</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="https://www.instagram.com/vandymsa/" target="_blank">
            <img
              src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
              width="24"
              height="24"
            />
          </a>
          <a
            href="https://web.groupme.com/join_group/33160254/cr6IWz"
            target="_blank"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1419/1419514.png"
              width="24"
              height="24"
            />
          </a>
        </div>
      </footer>
    </>
  );
}
