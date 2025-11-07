import { Cpu, BarChart3, FileText } from "lucide-react"

export function WhatYouGet() {
  const items = [
    {
      icon: Cpu,
      title: "Hardware & Software",
      items: [
        "Wireless sensors on your electrical systems",
        "Dashboard showing energy use and costs",
        "Automatic market participation (when events happen)",
      ],
    },
    {
      icon: BarChart3,
      title: "During the Pilot",
      items: [
        "We split whatever revenue comes in 50/50",
        "Weekly reports on what happened",
        "Direct access to our engineering team",
        "Adjustments if anything affects building operations",
      ],
    },
    {
      icon: FileText,
      title: "After 3 Months",
      items: [
        "Clear picture of annual revenue potential",
        "Option to continue at 30% fee (vs 50% during pilot)",
        "Or cancel, keep what you earned, no penalty",
      ],
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">What You Get</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">→</span>
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
