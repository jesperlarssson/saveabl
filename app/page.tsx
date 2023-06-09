import Hero from "@/components/section/Hero";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

import { illustration, positions } from "@/lib/illustrations";
import Image from "next/image";

export default function Home() {
  const gridSettings = [
    "col-span-1 row-span-2 scale-125 transform translate-y-1/5",
    "col-span-1 transform -translate-y-1/3 delay-150",
    "col-span-1 transform -translate-y-1/5 scale-125 delay-300",
    "col-span-1 transform translate-y-1/2 delay-500",
    "col-span-1 transform translate-y-1/5 translate-x-1/3 scale-125 delay-1000",
  ];
  return (
    <>
      <div className="absolute w-full min-h-screen flex justify-center items-center z-0">
        <div className="w-full h-screen p-24 grid grid-cols-3 grid-row-3">
          {illustration.map((item, index) => (
            <div
              key={item.id}
              className={`relative opacity-50 ${gridSettings[index]}`}
            >
              <Image
                width={300}
                height={300}
                className="object-contain animate-wiggle"
                alt={item.alt}
                src={item.path}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-between pt-28">
        <Hero />
        <Section className="bg-secondary">
          
        </Section>
      </div>
    </>
  );
}
