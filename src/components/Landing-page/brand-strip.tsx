"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function BrandStrip() {
  const brands = [
    "Castrol",
    "Timken",
    "TATA",
    "Valvoline",
    "Shell",
    "Compo",
    "Mahindra",
    "Leyland",
    "Eicher",
    "Fleetguard",
    "Lumax",
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto ">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white ">
          Trusted by Leading Brands
        </h2>
        <InfiniteMovingCards
          items={brands.map((name) => ({ name }))}
          direction="right"
          speed="fast"
          className="py-4"
        />
      </div>
    </div>
  );
}
