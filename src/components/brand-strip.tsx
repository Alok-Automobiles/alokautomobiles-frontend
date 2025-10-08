import Image from "next/image"

export function BrandStrip() {
  const brands = [
    { 
      name: "Castrol", 
      logo: "https://logo.clearbit.com/castrol.com"
    },
    { 
      name: "Gulf", 
      logo: "https://logo.clearbit.com/gulfoil.com"
    },
    { 
      name: "Valvoline", 
      logo: "https://logo.clearbit.com/valvoline.com"
    },
    { 
      name: "Mobil", 
      logo: "https://logo.clearbit.com/mobil.com"
    },
    { 
      name: "Shell", 
      logo: "https://logo.clearbit.com/shell.com"
    },
  ]
  return (
    <div className="flex items-center justify-center flex-wrap gap-6 md:gap-10">
      {brands.map((b) => (
        <div
          key={b.name}
          className="h-10 w-28 md:h-12 md:w-32 rounded-md border border-border bg-card p-2 flex items-center justify-center"
        >
          <Image
            src={b.logo}
            alt={`${b.name} logo`}
            width={128}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}
