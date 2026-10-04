
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Technologies from "@/components/Home/Technologies";
import Progresswork from "@/components/Home/WorkProgress";
import Services from "@/components/Home/Services";
export const metadata: Metadata = {
    title: "Services | Eagle Nest Technologies",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
  ];
  return (
    <>
      <HeroSub
        title="Services"
        description="From React Native and Flutter apps to full-stack web platforms and AI integrations, we build software around your business needs."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Services/>
      <Technologies />
    </>
  );
};

export default page;
