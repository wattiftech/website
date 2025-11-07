"use client"

import { useState } from "react"
import { Building2, Monitor, Zap, Lightbulb, Battery, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OurDifference() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 0,
      icon: Building2,
      label: "Wattif + BMS",
      symbol: "+",
      leftHeader: "YOUR BMS",
      rightHeader: "WATTIF ADDS",
      comparisons: [
        {
          aspect: "INTELLIGENCE",
          existing: "Rule-based schedules execute control",
          wattif: "Predictive AI that looks 72 hours ahead",
        },
        {
          aspect: "MARKET AWARENESS",
          existing: "No price awareness operates on fixed schedules",
          wattif: "Real-time electricity price forecasting and optimization",
        },
        {
          aspect: "OCCUPANCY",
          existing: "Time-based schedules assume 9-5 patterns",
          wattif: "Real-time occupancy sensors per zone",
        },
        {
          aspect: "OPTIMIZATION",
          existing: "Single moment reacts to current conditions",
          wattif: "Multi-step planning prepares for future conditions",
        },
        {
          aspect: "GRID SERVICES",
          existing: "Manual participation if operator remembers",
          wattif: "Automatic DR bidding integrated with markets",
        },
        {
          aspect: "ENERGY METERING",
          existing: "Equipment status shows on/off states",
          wattif: "Asset-level consumption tracks actual kW usage",
        },
      ],
      callout:
        "Your BMS keeps running exactly as it does today. Wattif adds predictive peak optimization and grid responsiveness on top.",
    },
    {
      id: 1,
      icon: Monitor,
      label: "Wattif > EMS",
      symbol: ">",
      leftHeader: "TYPICAL EMS",
      rightHeader: "WATTIF",
      comparisons: [
        {
          aspect: "CAPABILITY",
          existing: "Monitoring and reporting only",
          wattif: "Monitoring plus active control execution",
        },
        {
          aspect: "VALUE CREATION",
          existing: "Visibility into costs identifies waste",
          wattif: "Visibility plus revenue generation",
        },
        {
          aspect: "FORECASTING",
          existing: "Historical reporting analyzes past data",
          wattif: "Historical plus predictive plans next 72 hours",
        },
        {
          aspect: "DEMAND RESPONSE",
          existing: "Reports on peaks after they happen",
          wattif: "Reports plus eliminates peaks automatically",
        },
        {
          aspect: "TENANT BILLING",
          existing: "Building-level totals with estimates",
          wattif: "Building-level plus zone-level precision",
        },
        {
          aspect: "ECONOMICS",
          existing: "Dashboard insights",
          wattif: "Insights plus $150K-400K annual revenue streams",
        },
      ],
      callout:
        "EMS is your rearview mirror showing where you've been. Wattif is GPS navigation telling you where to go next.",
    },
    {
      id: 2,
      icon: Zap,
      label: "Wattif ⊕ Efficiency",
      symbol: "⊕",
      leftHeader: "EFFICIENCY TOOLS",
      rightHeader: "WATTIF ADDS",
      comparisons: [
        {
          aspect: "OBJECTIVE",
          existing: "Reduce consumption minimize energy use",
          wattif: "Time-shifted demand for maximum value",
        },
        {
          aspect: "PRICE STRATEGY",
          existing: "Ignores market prices constant reduction",
          wattif: "Price-responsive strategic timing",
        },
        {
          aspect: "DEMAND PATTERN",
          existing: "Lower overall usage steady-state approach",
          wattif: "Eliminate expensive peaks while maintaining total use",
        },
        {
          aspect: "GRID REVENUE",
          existing: "No grid interaction saves on bills only",
          wattif: "Active grid participation adds DR payment streams",
        },
        {
          aspect: "COMFORT APPROACH",
          existing: "May reduce comfort for savings",
          wattif: "Maintains comfort through intelligent scheduling",
        },
        {
          aspect: "ECONOMICS",
          existing: "10-15% bill reduction",
          wattif: "Bill reduction plus $150K-400K grid revenue",
        },
      ],
      callout:
        "Efficiency tools are like cutting expenses to save money. Wattif is like investing to generate returns.",
    },
    {
      id: 3,
      icon: Battery,
      label: "Wattif * Assets",
      symbol: "*",
      leftHeader: "WITHOUT WATTIF",
      rightHeader: "WITH WATTIF",
      comparisons: [
        {
          aspect: "SOLAR",
          existing: "Bill reduction only, fixed export timing",
          wattif: "Reduces bill + enables strategic load timing to maximize solar value",
        },
        {
          aspect: "BATTERY STORAGE",
          existing: "Simple arbitrage and TOU shifting",
          wattif: "Revenue stacking: FCAS + DR + arbitrage + peak shaving",
        },
        {
          aspect: "SOLAR + STORAGE",
          existing: "Basic self-consumption optimization",
          wattif: "Coordinated dispatch for maximum market value",
        },
        {
          aspect: "EV CHARGING",
          existing: "Managed charging schedules",
          wattif: "Flexible load timing plus demand response revenue",
        },
        {
          aspect: "ASSET VALUE",
          existing: "Capital investment with basic ROI",
          wattif: "Revenue-generating assets with multiple income streams",
        },
      ],
      callout:
        "Wattif transforms your capital investments into revenue generators by orchestrating all DERs for maximum market value.",
    },
  ]

  const activeTabData = tabs[activeTab]

  return (
    <section id="our-difference" className="py-12 sm:py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-balance leading-tight">
            What Makes Wattif Different
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance">
            Predictive optimization and grid revenue that works with your existing systems
          </p>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-12 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                <TabIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-background border-2 border-border rounded-xl overflow-hidden shadow-lg overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] lg:grid-cols-[180px_1fr_1fr] border-b-2 border-border bg-muted/50 min-w-[600px]">
              <div className="p-3 sm:p-4 lg:p-6 border-r border-border"></div>
              <div className="p-3 sm:p-4 lg:p-6 border-r border-border">
                <div className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {activeTabData.leftHeader}
                </div>
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider">
                  {activeTabData.rightHeader}
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {activeTabData.comparisons.map((comparison, index) => (
              <div
                key={index}
                className={`grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[140px_1fr_1fr] lg:grid-cols-[180px_1fr_1fr] min-w-[600px] ${
                  index !== activeTabData.comparisons.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="p-3 sm:p-4 lg:p-6 border-r border-border bg-muted/30">
                  <div className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wide">
                    {comparison.aspect}
                  </div>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 border-r border-border">
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {comparison.existing}
                  </p>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-accent/5">
                  <p className="text-xs sm:text-sm lg:text-base text-foreground font-medium leading-relaxed">
                    {comparison.wattif}
                  </p>
                </div>
              </div>
            ))}

            {/* Callout */}
            <div className="p-4 sm:p-6 lg:p-8 bg-accent/10 border-t-2 border-border min-w-[600px]">
              <div className="flex gap-2 sm:gap-3 items-start max-w-3xl mx-auto">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm lg:text-base text-foreground leading-relaxed font-medium">
                  {activeTabData.callout}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-12 px-4">
          <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto group" asChild>
            <a href="#calculator" className="flex items-center justify-center">
              Calculate Your Building's Revenue Potential
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
