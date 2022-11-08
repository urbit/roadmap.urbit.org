import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";

export default function IntraNav({ search, ourSite = "https://roadmap.urbit.org" }) {
    const [shortcut, setShortcut] = useState("");
    const detectOS = () => {
        const agent = window.navigator.appVersion;
        if (agent.includes("Win")) {
            return "Ctrl+K";
        } else if (agent.includes("Mac")) {
            return "⌘K";
        } else if (agent.includes("Linux")) {
            return "Ctrl+K";
        }
    };

    useEffect(() => {
        setShortcut(detectOS());
    }, []);
    const sites = [
        { title: "Urbit.org", href: "https://urbit.org" },
        { title: "Operators", href: "https://operators.urbit.org" },
        { title: "Developers", href: "https://developers.urbit.org" },
        { title: "Roadmap", href: "https://roadmap.urbit.org" }
    ];
    return (
        <div className="bg-wall-100 w-full grid grid-cols-12">
            <div className="hidden md:block col-start-2 col-end-11">
                <div className="flex justify-between items-center py-2">
                    <div className="flex space-x-4 items-center">
                        {sites.map((site) => (
                            <a
                                key={site.title}
                                className={classNames("text-xs", {
                                    "font-bold text-black": ourSite.includes(site.href),
                                })}
                                href={site.href}
                            >
                                {site.title}
                            </a>
                        ))}
                        <div className="w-[1px] h-[1.25rem] bg-wall-400" />
                        <a className="text-xs" href="https://network.urbit.org">
                            Network Explorer
                        </a>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            search.toggleSearch(e);
                        }}
                        className="bg-white text-wall-500 flex px-3 py-2 rounded-lg text-xs font-medium"
                    >
                        <div>Search</div>
                        <div className="ml-2 text-wall-400">{shortcut}</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
