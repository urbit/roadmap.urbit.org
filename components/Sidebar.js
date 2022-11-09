import Link from "next/link";
import { useState } from "react";
import MenuTray from "./MenuTray";

export default function Sidebar(props) {
    const [isOpen, setTray] = useState(false);
    return (
        <>
            <ul className="list-none text-2xl hidden md:flex space-y-2 flex-col sticky top-32">
                {props.children}
            </ul>
            <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
                <header className="pl-4 flex shrink-0 justify-between items-center pb-4">
                    <Link href="/" passHref>
                        <a className="font-urbit-sans text-xl font-semibold sig">Roadmap</a>
                    </Link>
                </header>
                <ul className="pl-4 list-none text-lg md:hidden font-urbit-sans flex space-y-2 flex-col sticky top-32">
                    {props.children}
                </ul>
                <div className="pt-32" />
            </MenuTray>
        </>
    );
}
