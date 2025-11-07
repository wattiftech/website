"use client"

import { Card } from "@/components/ui/card"
import { Eye, Zap, DollarSign, BarChart3, Rocket } from "lucide-react"

export function SolutionFeatures() {
  const features = [
    {
      tag: "STEP 1",
      icon: Eye,
      title: "Energy Visibility",
      description:
        "Real-time consumption tracking across equipment and zones. Monitor tenant usage, track EUI for Green Mark and NABERS, identify cost drivers. The baseline data that enables everything else.",
      keyCapability: "Equipment-level monitoring with compliance exports",
      tagColor: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      tag: "STEP 2",
      icon: Zap,
      title: "Demand Flexibility",
      description:
        "Automated load coordination across HVAC, lighting, and equipment. Pre-cool before peaks, shift loads to cheaper periods, respond to grid signals—all without impacting comfort or operations.",
      keyCapability: "40-60% peak reduction, zero comfort complaints",
      tagColor: "bg-accent/10 text-accent border-accent/20",
    },
    {
      tag: "STEP 3",
      icon: DollarSign,
      title: "Grid Revenue",
      description:
        "Automatic participation in demand response markets. Platform bids, executes, and tracks settlements across Singapore EMA and Australia AEMO programs. Revenue flows to your account automatically.",
      keyCapability: "$150K-400K annual revenue per building",
      tagColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    {
      tag: "SCALE",
      icon: BarChart3,
      title: "Portfolio Intelligence",
      description:
        "Manage 5, 50, or 500 buildings from one dashboard. Aggregate DR capacity, coordinate grid events, share optimization strategies across your portfolio. More buildings = more revenue, not more work.",
      keyCapability: "Portfolio-wide coordination and benchmarking",
      tagColor: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    },
    {
      tag: "GROW",
      icon: Rocket,
      title: "Future-Ready Platform",
      description:
        "Built for what's coming: battery storage dispatch, EV charging coordination, FCAS participation. Add new revenue streams as markets mature—same platform, expanding capabilities.",
      keyCapability: "Battery adds $600K-1.2M/MW in frequency regulation revenue",
      tagColor: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    },
  ]

  return (
    <section id="capabilities" className="py-12 sm:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight">
            One Platform. Five Ways It Grows With You.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Start with monitoring. Scale to portfolio management. Add revenue streams as markets evolve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group perspective-1000 h-[280px] sm:h-[320px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <Card className="absolute inset-0 p-4 sm:p-6 backface-hidden">
                  <div
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </div>
                  <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </Card>

                {/* Back of card */}
                <Card className="absolute inset-0 p-4 sm:p-6 backface-hidden rotate-y-180 bg-primary text-primary-foreground flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-primary-foreground/10 flex items-center justify-center mx-auto">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-80 mb-2">
                        Key Capability
                      </p>
                      <p className="text-base sm:text-lg font-bold leading-relaxed">{feature.keyCapability}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
