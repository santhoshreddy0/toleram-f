import React, { useState } from "react";
import Header from "./Header";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="">
            <Header />
            <main className="isolate">
                <div className="">{props.children}</div>
            </main>
        </div>
    );
}
