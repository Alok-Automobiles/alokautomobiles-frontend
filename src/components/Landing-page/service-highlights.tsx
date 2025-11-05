import Image from "next/image"

export function ServiceHighlights() {
  const items = [
    {
      title: "Genuine & OE-Grade",
      desc: "Quality parts you can trust for performance and durability.",
      icon: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=64&h=64&fit=crop&crop=center&auto=format&q=80",
    },
    {
      title: "Wide Inventory",
      desc: "From suspension to braking and lubrication — all in one place.",
      icon: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=64&h=64&fit=crop&crop=center&auto=format&q=80",
    },
    {
      title: "Fast Fulfilment",
      desc: "Quick processing and reliable shipping to your location.",
      icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop&crop=center&auto=format&q=80",
    },
    {
      title: "Expert Guidance",
      desc: "Get the right part, first time — our team is here to help.",
      icon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center&auto=format&q=80",
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((it) => (
        <div key={it.title} className="rounded-lg border border-border p-5 bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={it.icon}
                alt={`${it.title} icon`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium">{it.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{it.desc}</p>
        </div>
      ))}
    </div>
  )
}
