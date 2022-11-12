import Link from "next/link";
import { useState } from "react";
import MenuTray from "./MenuTray";

export default function Sidebar(props) {
    const [isOpen, setTray] = useState(false);
    return (
        <>
            <ul className="list-none text-2xl hidden md:flex space-y-4 flex-col sticky top-32">
                {props.children}
            </ul>
            <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
                <header className="flex flex-col">
                    <Link href="/" passHref>
                        <a className="font-semibold mb-4">Roadmap</a>
                    </Link>
                    <Link href="https://urbit.org" passHref>
                        <a className="mt-2">Urbit.org</a>
                    </Link>
                    <Link href="https://operators.urbit.org" passHref>
                        <a className="mt-2">Operators</a>
                    </Link>
                    <Link href="https://developers.urbit.org" passHref>
                        <a className="mt-2">Developers</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="font-semibold mt-2 mb-4">Roadmap</a>
                    </Link>
                    <hr className="border-wall-200" />
                </header>
                <ul className="mt-4 list-none text-lg md:hidden flex space-y-2 flex-col sticky top-32">
                    {props.children}
                </ul>
                <div className="pt-32" />
            </MenuTray>
        </>
    );
}
