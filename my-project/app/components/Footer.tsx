import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="footer items-center p-4 bg-base-200 text-black">
                <div className="items-center grid-flow-col">
                    <Link href="/"><img className="h-fit w-fit" src="/MSA.png" /></Link>
                    <p>Copyright © 2023 - All right reserved</p>
                </div>
                <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a href="https://www.instagram.com/vandymsa/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" width="24" height="24"/></a>
                    <a href="https://web.groupme.com/join_group/33160254/cr6IWz" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1419/1419514.png" width="24" height="24"/></a>
                </div>
            </footer>
        </>
    );
}
