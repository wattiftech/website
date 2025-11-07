"use client"

import { Button } from "@/components/ui/button"
import { DemandChart } from "@/components/demand-chart"
import { ArrowRight, Building2 } from "lucide-react"
import { useState, useEffect } from "react"

const marketData = {
  singapore: {
    currency: "SGD",
    costReduction: "15-20%",
    revenue: "SGD 10-50K*",
    note: "*Revenue estimates depend on market rates, asset capacity, activation frequency, and program enrollment.",
  },
  australia: {
    currency: "AUD",
    costReduction: "20-30%",
    revenue: "AUD 30-100K*",
    note: "*Revenue estimates depend on market rates, asset capacity, activation frequency, and program enrollment.",
  },
}

export function HeroSection() {
  const trustedByLogos: { name: string; width: string }[] = []

  const rotatingTexts = ["Zero Effort.", "No Comfort Impact.", "Real Savings.", "Automatic Revenue."]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [selectedMarket, setSelectedMarket] = useState<"singapore" | "australia">("australia")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  const currentMarket = marketData[selectedMarket]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Copy */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block">
                <p className="text-xs sm:text-sm font-semibold tracking-widest text-accent uppercase">
                  Energy Intelligence Platform
                </p>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance leading-tight">
                Your Building Can Earn Money From Energy
                <br />
                <span className="relative inline-block">
                  <span className="text-accent animate-pulse">Flexibility</span>
                </span>
                .
                <br />
                <span key={currentTextIndex} className="text-[#FF6B2C] inline-block animate-fade-in">
                  {rotatingTexts[currentTextIndex]}
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty pt-6">
                Wattif intelligently coordinates{" "}
                <span className="inline-block animate-fade-cycle-when font-semibold">when</span>
                {" and "}
                <span className="inline-block animate-fade-cycle-how font-semibold">how</span>
                {
                  " your building uses power to reduce peak charges, optimize storage, and monetize flexibility through grid programs."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base w-full sm:w-auto"
                asChild
              >
                <a href="#calculator" className="flex items-center justify-center">
                  <span className="text-center">Calculate Your Building's Revenue Potential</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm sm:text-base bg-transparent w-full sm:w-auto"
                asChild
              >
                <a href="#start-free-monitoring">Start 30 Day Free Monitoring</a>
              </Button>
            </div>

            <div className="relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-1 bg-secondary/50 p-1 rounded-lg border border-border/50">
                  <button
                    onClick={() => setSelectedMarket("australia")}
                    className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                      selectedMarket === "australia"
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Australia
                  </button>
                  <button
                    onClick={() => setSelectedMarket("singapore")}
                    className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                      selectedMarket === "singapore"
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Singapore
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 sm:px-5 sm:py-4">
                  <div
                    key={`cost-${selectedMarket}`}
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-primary animate-fade-in"
                  >
                    {currentMarket.costReduction}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div className="flex flex-col gap-1 bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 sm:px-5 sm:py-4">
                  <div
                    key={`revenue-${selectedMarket}`}
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-accent animate-fade-in"
                  >
                    {currentMarket.revenue}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">New Revenue</div>
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 sm:px-5 sm:py-4">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">Activation in 6 Weeks</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Simply Connect to Your BMS</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/80 pt-3 text-center">{currentMarket.note}</p>
            </div>
          </div>

          {/* Right side - Animated Chart */}
          <div className="lg:pl-8 mt-8 lg:mt-0">
            <DemandChart />
          </div>
        </div>

        {trustedByLogos.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 sm:pt-12 border-t border-border/50">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Trusted by leading commercial properties
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {trustedByLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  <div
                    className={`${logo.width} h-12 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50 px-4`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{logo.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
