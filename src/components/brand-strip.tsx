"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function BrandStrip() {
  const brands = [
    { 
      name: "Castrol", 
      logo: "https://logo.clearbit.com/castrol.com"
    },
    { 
      name: "Timken", 
      logo: "https://logo.clearbit.com/timken.com"
    },
    { 
      name: "TATA", 
      logo: "https://logo.clearbit.com/tata.com"
    },
    { 
      name: "Valvoline", 
      logo: "https://logo.clearbit.com/valvoline.com"
    },
    { 
      name: "Shell", 
      logo: "https://logo.clearbit.com/shell.com"
    },
    { 
      name: "Compo", 
      logo: "https://logo.clearbit.com/compo.com"
    },
    { 
      name: "Mahindra", 
      logo: "https://logo.clearbit.com/mahindra.com"
    },
    { 
      name: "Leyland", 
      logo: "https://logo.clearbit.com/ashokleyland.com"
    },
    { 
      name: "Eicher", 
      logo: "https://logo.clearbit.com/eicher.in"
    },
    { 
      name: "Fleetguard", 
      logo: "https://logo.clearbit.com/fleetguard.com"
    },
    { 
      name: "Lumax", 
      logo: "https://logo.clearbit.com/lumax.com"
    },
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto ">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white ">
          Trusted by Leading Brands
        </h2>
        <InfiniteMovingCards
          items={brands}
          direction="right"
          speed="fast"
          className="py-4"
        />
      </div>
    </div>
  );
}
