import React from "react";
import Projects from "@/components/Home/Projects";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Portfolio | Eagle Nest Technologies",
};

const PortfolioList = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/portfolio", text: "Portfolio" },
    ];
    return (
        <>
            <HeroSub
                title="Portfolio"
                description="Explore the software products built by Eagle Nest Technologies."
                breadcrumbLinks={breadcrumbLinks}
            />
            <Projects showAll />
        </>
    );
};

export default PortfolioList;