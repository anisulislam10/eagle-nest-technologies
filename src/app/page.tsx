import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Counter from '@/components/Home/Counter'
import Progresswork from '@/components/Home/WorkProgress';
import Services from '@/components/Home/Services';
import Technologies from '@/components/Home/Technologies';
import Projects from '@/components/Home/Projects';
import Testimonials from '@/components/Home/Testimonials';
import Contactform from '@/components/Home/Contact';
export const metadata: Metadata = {
  title: "Eagle Nest Technologies | Software Development",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Counter isColorMode={false} />
      <Progresswork isColorMode={false} />
      <Services />
      <Technologies />
      <Projects />
      <Testimonials />
      <Contactform />
    </main>
  )
}
