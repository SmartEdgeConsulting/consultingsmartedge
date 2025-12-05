import { Card } from "@/components/ui/card";
import { bootcamp } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BootcampHero = () => {
  return (
    <header className="py-10 sm:py-12 lg:py-16 text-center">
      <h1 className="hero-heading"><span className="text-gradient-primary">SmartEdge</span> Bootcamp</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bootcamp.map((item) => {
          return (
            <Link href={item.link} key={item.id} className="block">
              <Card
                key={item.id}
                className="rounded-none overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-2.5">
                  <div className="relative w-full h-20">
                    <Image
                      src={item.img}
                      fill
                      alt={item.title}
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-center line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default BootcampHero;
