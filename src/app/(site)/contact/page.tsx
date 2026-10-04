import ContactForm from "@/components/Contact/Form";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact | Eagle Nest Technologies",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Tell us about your idea, the problem you want to solve, and the software you want to build with Eagle Nest Technologies."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactForm />
    </>
  );
};

export default page;
