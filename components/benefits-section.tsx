"use client"

import { Card } from "@/components/ui/card"
import { TrendingDown, Shield, Leaf, BarChart3, Zap, DollarSign, ThermometerSun } from "lucide-react"
import { useState } from "react"

export function BenefitsSection() {
  const [location, setLocation] = useState<"singapore" | "australia">("australia")

  const singaporeBenefits = [
    {
      tag: "COST",
      icon: TrendingDown,
      title: "15-20% Cost Reduction",
      description: "Lower peak demand charges through intelligent load management",
      tagColor: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      tag: "REVENUE",
      icon: BarChart3,
      title: "$20K-$600K+ Annual Revenue*",
      description: "Earn from NEMS DR & IL programmes based on building size (100 kW to 1+ MW)",
      tagColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    {
      tag: "SUSTAINABILITY",
      icon: Leaf,
      title: "100+ Tonnes CO₂/Year",
      description: "Reduce emissions by shifting demand away from peak fossil fuel hours",
      tagColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    {
      tag: "COMFORT",
      icon: ThermometerSun,
      title: "Comfort Assurance",
      description: "Maintain optimal indoor conditions with smart thermal management and pre-cooling",
      tagColor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    },
    {
      tag: "RELIABILITY",
      icon: Shield,
      title: "Zero Disruption",
      description: "Maintain comfort and operations with smart automation and thermal management",
      tagColor: "bg-accent/10 text-accent border-accent/20",
    },
    {
      tag: "SPEED",
      icon: Zap,
      title: "Activation in 8 Weeks",
      description:
        "Simply connect to your BMS - Fast time to value with immediate ROI (timeline varies by participation route)",
      tagColor: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    },
  ]

  const australiaBenefits = [
    {
      tag: "COST",
      icon: TrendingDown,
      title: "20-30% Cost Reduction",
      description: "Optimize DNSP charges and reduce peak demand costs",
      tagColor: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      tag: "REVENUE",
      icon: DollarSign,
      title: "$25K-$900K+ Annual Revenue*",
      description: "Stack multiple streams: WDRM, RERT, FCAS, state certificates (NSW PDRS, VIC VEU)",
      tagColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    {
      tag: "SUSTAINABILITY",
      icon: Leaf,
      title: "150-200 Tonnes CO₂/Year",
      description: "Lower emissions and enable more renewable integration through grid balancing",
      tagColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    {
      tag: "COMFORT",
      icon: ThermometerSun,
      title: "Comfort Assurance",
      description: "Maintain optimal indoor conditions while participating in grid programs",
      tagColor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    },
    {
      tag: "RELIABILITY",
      icon: Shield,
      title: "Zero Disruption",
      description: "Maintain operations while participating in national and state programs",
      tagColor: "bg-accent/10 text-accent border-accent/20",
    },
    {
      tag: "SPEED",
      icon: Zap,
      title: "Activation in 8 Weeks",
      description: "Simply connect to your BMS - Quick implementation via VPP aggregation or direct AEMO registration",
      tagColor: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    },
  ]

  const benefits = location === "singapore" ? singaporeBenefits : australiaBenefits

  return (
    <section id="benefits" className="py-12 sm:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight">
            Real Benefits, Real Numbers
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Measurable impact on your bottom line and operational efficiency
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            <button
              onClick={() => setLocation("australia")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all ${
                location === "australia"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Australia
            </button>
            <button
              onClick={() => setLocation("singapore")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all ${
                location === "singapore"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Singapore
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              <div
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${benefit.tagColor}`}
              >
                {benefit.tag}
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8 max-w-3xl mx-auto">
          *Revenue ranges depend on building size, flexible capacity estimates, and market participation route.
        </p>
      </div>
    </section>
  )
}
