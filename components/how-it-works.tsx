"use client"

import { useEffect } from "react"

import { useState } from "react"
import { Eye, TrendingUp, Zap, DollarSign } from "lucide-react"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: Eye,
      title: "Visibility",
      headline: "Understand your building's energy behavior",
      description:
        "See which systems use energy across different spaces. Track occupancy, temperatures, and schedules. Know what's actually happening before you change anything.",
    },
    {
      icon: TrendingUp,
      title: "Prediction",
      headline: "Know when peaks and price spikes are coming",
      description:
        "We forecast electricity prices and your building's demand peaks hours ahead. No surprises on your bill.",
    },
    {
      icon: Zap,
      title: "Automation",
      headline: "Intelligent Load Orchestration",
      description:
        "Intelligently coordinates all building assets—HVAC, lighting, refrigeration, storage, EV charging—based on occupancy, weather, energy prices, and grid signals. Pre-positions loads before peaks, maintains operations through expensive periods, and participates in grid events without compromising comfort or operations.",
    },
    {
      icon: DollarSign,
      title: "Revenue",
      headline: "Unlock multiple revenue streams, zero effort",
      description:
        "Unlock multiple revenue streams with zero effort: earn demand response payments for grid support, eliminate peak demand charges through intelligent load shifting, and reduce energy costs through continuous optimization—all automated and stacking simultaneously.",
    },
  ]

  return (
    <section id="how-it-works" className="py-12 sm:py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight">
            Context-Aware Energy Orchestration in Action
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            See how Wattif transforms your building into a grid-responsive asset
          </p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="inline-flex bg-muted/50 rounded-xl p-1.5 gap-1 min-w-max">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ${
                    activeStep === index
                      ? "bg-background shadow-lg text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold text-sm sm:text-base">{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative bg-background rounded-2xl shadow-2xl overflow-hidden min-h-[500px] sm:min-h-[600px]">
          {/* Text Content - Top Left */}
          <div className="absolute top-0 left-0 z-10 p-4 sm:p-8 lg:p-12 max-w-full sm:max-w-xl">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <Icon
                        key={index}
                        className={`h-5 w-5 sm:h-7 sm:w-7 text-accent absolute transition-all duration-500 ${
                          activeStep === index ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                      />
                    )
                  })}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-accent">STEP {activeStep + 1} OF 4</span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      activeStep === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute"
                    }`}
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-balance mb-3 sm:mb-4 leading-tight">
                      {step.headline}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animation Area - Right Side */}
          <div className="absolute inset-0 flex items-center justify-end p-4 sm:p-8 lg:p-12">
            {/* Step 1: Visibility Animation */}
            <div
              className={`absolute transition-all duration-700 ${activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <VisibilityAnimation />
            </div>

            {/* Step 2: Prediction Animation */}
            <div
              className={`absolute transition-all duration-700 ${activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <PredictionAnimation />
            </div>

            {/* Step 3: Automation Animation */}
            <div
              className={`absolute transition-all duration-700 ${activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <AutomationAnimation />
            </div>

            {/* Step 4: Revenue Animation */}
            <div
              className={`absolute transition-all duration-700 ${activeStep === 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <RevenueAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisibilityAnimation() {
  const [currentHour, setCurrentHour] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour((prev) => (prev >= 23 ? 0 : prev + 1))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const hourlyData = [
    { hour: 0, hvac: 45, lighting: 8, equipment: 12, total: 65 },
    { hour: 1, hvac: 42, lighting: 6, equipment: 10, total: 58 },
    { hour: 2, hvac: 40, lighting: 5, equipment: 8, total: 53 },
    { hour: 3, hvac: 38, lighting: 5, equipment: 8, total: 51 },
    { hour: 4, hvac: 40, lighting: 5, equipment: 8, total: 53 },
    { hour: 5, hvac: 45, lighting: 8, equipment: 10, total: 63 },
    { hour: 6, hvac: 55, lighting: 15, equipment: 18, total: 88 },
    { hour: 7, hvac: 68, lighting: 22, equipment: 25, total: 115 },
    { hour: 8, hvac: 75, lighting: 28, equipment: 32, total: 135 },
    { hour: 9, hvac: 82, lighting: 30, equipment: 35, total: 147 },
    { hour: 10, hvac: 88, lighting: 32, equipment: 38, total: 158 },
    { hour: 11, hvac: 92, lighting: 32, equipment: 40, total: 164 },
    { hour: 12, hvac: 95, lighting: 30, equipment: 38, total: 163 },
    { hour: 13, hvac: 98, lighting: 32, equipment: 40, total: 170 },
    { hour: 14, hvac: 102, lighting: 32, equipment: 42, total: 176 },
    { hour: 15, hvac: 100, lighting: 32, equipment: 40, total: 172 },
    { hour: 16, hvac: 95, lighting: 30, equipment: 38, total: 163 },
    { hour: 17, hvac: 88, lighting: 28, equipment: 35, total: 151 },
    { hour: 18, hvac: 75, lighting: 25, equipment: 30, total: 130 },
    { hour: 19, hvac: 65, lighting: 20, equipment: 25, total: 110 },
    { hour: 20, hvac: 58, lighting: 18, equipment: 20, total: 96 },
    { hour: 21, hvac: 52, lighting: 15, equipment: 18, total: 85 },
    { hour: 22, hvac: 48, lighting: 12, equipment: 15, total: 75 },
    { hour: 23, hvac: 46, lighting: 10, equipment: 12, total: 68 },
  ]

  const currentData = hourlyData[currentHour]
  const maxValue = 180

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8">
        {/* Current consumption display */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current Consumption</div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-accent tabular-nums">{currentData.total}</span>
              <span className="text-2xl text-muted-foreground">kW</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {currentHour === 0 ? "12" : currentHour > 12 ? currentHour - 12 : currentHour}
              {currentHour >= 12 ? " PM" : " AM"}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">HVAC: {currentData.hvac} kW</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Lighting: {currentData.lighting} kW</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Equipment: {currentData.equipment} kW</span>
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div className="relative h-64 bg-background/30 rounded-xl p-4">
          {/* Grid lines */}
          <div className="absolute inset-4 flex flex-col justify-between">
            {[180, 135, 90, 45, 0].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8">{value}</span>
                <div className="flex-1 border-t border-primary/10" />
              </div>
            ))}
          </div>

          {/* Chart SVG */}
          <svg className="absolute inset-4 left-12" viewBox="0 0 1000 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hvacGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="lightingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* HVAC area (bottom layer) */}
            <path
              d={`M 0 240 ${hourlyData
                .slice(0, currentHour + 1)
                .map((d, i) => `L ${(i / 23) * 1000} ${240 - (d.hvac / maxValue) * 240}`)
                .join(" ")} L ${(currentHour / 23) * 1000} 240 Z`}
              fill="url(#hvacGradient)"
              className="transition-all duration-200"
            />
            <path
              d={`M 0 ${240 - (hourlyData[0].hvac / maxValue) * 240} ${hourlyData
                .slice(1, currentHour + 1)
                .map((d, i) => `L ${((i + 1) / 23) * 1000} ${240 - (d.hvac / maxValue) * 240}`)
                .join(" ")}`}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />

            {/* Total consumption line (top layer) */}
            <path
              d={`M 0 ${240 - (hourlyData[0].total / maxValue) * 240} ${hourlyData
                .slice(1, currentHour + 1)
                .map((d, i) => `L ${((i + 1) / 23) * 1000} ${240 - (d.total / maxValue) * 240}`)
                .join(" ")}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />

            {/* Current point indicator */}
            <circle
              cx={(currentHour / 23) * 1000}
              cy={240 - (currentData.total / maxValue) * 240}
              r="6"
              fill="hsl(var(--accent))"
              className="animate-pulse"
            />
          </svg>

          {/* Time labels */}
          <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-muted-foreground">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Peak Today</div>
          <div className="text-xl font-bold">176 kW</div>
          <div className="text-xs text-accent mt-1">at 2 PM</div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Daily Total</div>
          <div className="text-xl font-bold">2.4 MWh</div>
          <div className="text-xs text-muted-foreground mt-1">so far</div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Avg Load</div>
          <div className="text-xl font-bold">108 kW</div>
          <div className="text-xs text-accent mt-1">-12% vs yesterday</div>
        </div>
      </div>
    </div>
  )
}

function PredictionAnimation() {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const currentHour = 10 // Current time is 10 AM
  const progressHour = Math.floor((currentTime / 100) * 23)

  // Price forecast ($/kWh)
  const priceData = hours.map((h) => {
    const base = 0.12
    const morningPeak = h >= 7 && h <= 9 ? 0.08 : 0
    const afternoonPeak = h >= 14 && h <= 17 ? 0.15 : 0
    const eveningPeak = h >= 18 && h <= 20 ? 0.1 : 0
    return base + morningPeak + afternoonPeak + eveningPeak
  })

  const maxPrice = Math.max(...priceData)

  // Peak warnings
  const upcomingPeaks = [
    { hour: 14, value: "$0.27/kWh", severity: "high" },
    { hour: 15, value: "$0.27/kWh", severity: "high" },
  ]

  const showWarnings = progressHour >= 10

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Main forecast display */}
      <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8">
        {/* Header with current time */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current Time</div>
            <div className="text-3xl font-bold">10:00 AM</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Forecast Horizon</div>
            <div className="text-xl font-semibold text-accent">14 hours ahead</div>
          </div>
        </div>

        <div className="relative h-72 bg-background/30 rounded-xl p-6">
          {/* Grid lines */}
          <div className="absolute inset-6 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-primary/5" />
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between text-xs text-muted-foreground">
            <span>$0.30</span>
            <span>$0.23</span>
            <span>$0.15</span>
            <span>$0.08</span>
            <span>$0.00</span>
          </div>

          {/* Chart area */}
          <svg className="absolute inset-6 left-12" viewBox="0 0 1000 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Price area */}
            <path
              d={`M 0 240 ${priceData
                .slice(0, progressHour + 1)
                .map((d, i) => `L ${(i / 23) * 1000} ${240 - (d / maxPrice) * 240}`)
                .join(" ")} L ${(progressHour / 23) * 1000} 240 Z`}
              fill="url(#priceGradient)"
              className="transition-all duration-100"
            />

            {/* Price line */}
            <path
              d={`M 0 ${240 - (priceData[0] / maxPrice) * 240} ${priceData
                .slice(1, progressHour + 1)
                .map((d, i) => `L ${((i + 1) / 23) * 1000} ${240 - (d / maxPrice) * 240}`)
                .join(" ")}`}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-100"
              filter="url(#glow)"
            />

            {/* Current time indicator */}
            <line
              x1={(currentHour / 23) * 1000}
              y1="0"
              x2={(currentHour / 23) * 1000}
              y2="240"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.5"
            />

            {/* Peak indicators */}
            {showWarnings && progressHour >= 14 && (
              <>
                <circle
                  cx={(14 / 23) * 1000}
                  cy={240 - (priceData[14] / maxPrice) * 240}
                  r="8"
                  fill="hsl(var(--destructive))"
                  className="animate-pulse"
                />
                <circle
                  cx={(15 / 23) * 1000}
                  cy={240 - (priceData[15] / maxPrice) * 240}
                  r="8"
                  fill="hsl(var(--destructive))"
                  className="animate-pulse"
                />
              </>
            )}
          </svg>

          {/* Time labels */}
          <div className="absolute bottom-0 left-12 right-6 flex justify-between text-xs text-muted-foreground">
            <span>12 AM</span>
            <span>6 AM</span>
            <span className="font-semibold text-primary">10 AM</span>
            <span>3 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>

          <div className="absolute top-4 left-12 flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-accent rounded" />
              <span className="text-muted-foreground">Electricity Price Forecast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Peak warnings */}
      {showWarnings && (
        <div className="space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="text-sm font-semibold text-muted-foreground mb-2">⚠️ Upcoming Price Spikes</div>
          {upcomingPeaks.map((peak, i) => (
            <div
              key={i}
              className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <div>
                  <div className="font-semibold">Price Peak</div>
                  <div className="text-sm text-muted-foreground">
                    {peak.hour === 14 ? "2:00 PM" : "3:00 PM"} ({peak.hour - currentHour}h ahead)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-destructive">{peak.value}</div>
                <div className="text-xs text-muted-foreground">Predicted</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Next Peak</div>
          <div className="text-xl font-bold">4 hours</div>
          <div className="text-xs text-accent mt-1">2:00 PM</div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Peak Price</div>
          <div className="text-xl font-bold">$0.27</div>
          <div className="text-xs text-destructive mt-1">+125% vs now</div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Forecast Accuracy</div>
          <div className="text-xl font-bold">94%</div>
          <div className="text-xs text-accent mt-1">Last 30 days</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

function AutomationAnimation() {
  const [time, setTime] = useState(0)
  const [activePhase, setActivePhase] = useState<"precool" | "coast" | "shed" | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev >= 100 ? 0 : prev + 0.5

        if (newTime < 25) setActivePhase("precool")
        else if (newTime < 60) setActivePhase("coast")
        else if (newTime < 85) setActivePhase("shed")
        else setActivePhase(null)

        return newTime
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Building demand profile throughout the day
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

  const baselineDemand = [150, 180, 220, 250, 240, 235, 230, 225, 320, 330, 325, 310, 280]
  const optimizedDemand = [180, 220, 250, 260, 240, 235, 230, 225, 240, 245, 240, 235, 240]

  const maxDemand = 350
  const progressIndex = Math.floor((time / 100) * (hours.length - 1))

  const precoolCost = time >= 25 ? 12 : Math.floor((time / 25) * 12)
  const coastRevenue = time >= 60 ? 180 : time >= 25 ? Math.floor(((time - 25) / 35) * 180) : 0
  const shedRevenue = time >= 85 ? 450 : time >= 60 ? Math.floor(((time - 60) / 25) * 450) : 0
  const totalDailyValue = 765
  const annualValue = 279000

  return (
    <div className="w-full max-w-2xl h-[650px] min-h-[650px] max-h-[650px] flex flex-col gap-3 scale-90 origin-center">
      {/* Header with time and context indicators */}
      <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-3 sm:p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Current Time</div>
            <div className="text-lg sm:text-xl font-bold">10:00 AM</div>
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm font-semibold text-destructive">14 hours ahead</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
          <div className="bg-background/50 rounded-lg p-1.5 border border-primary/10">
            <div className="text-[10px] text-muted-foreground mb-0.5">Weather</div>
            <div className="text-xs font-semibold flex items-center gap-1">🌡️ 34°C</div>
          </div>
          <div className="bg-background/50 rounded-lg p-1.5 border border-destructive/20">
            <div className="text-[10px] text-muted-foreground mb-0.5">Grid Signal</div>
            <div className="text-xs font-semibold flex items-center gap-1">⚡ DR Event</div>
          </div>
          <div className="bg-background/50 rounded-lg p-1.5 border border-primary/10">
            <div className="text-[10px] text-muted-foreground mb-0.5">Occupancy</div>
            <div className="text-xs font-semibold flex items-center gap-1">👥 60%</div>
          </div>
          <div className="bg-background/50 rounded-lg p-1.5 border border-accent/20">
            <div className="text-[10px] text-muted-foreground mb-0.5">Peak Price</div>
            <div className="text-xs font-semibold flex items-center gap-1">💰 $0.45</div>
          </div>
        </div>

        {/* Building demand profile chart */}
        <div className="bg-background/30 rounded-xl p-2 sm:p-3">
          <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-2">BUILDING DEMAND PROFILE</div>

          <div className="relative h-40 sm:h-44">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-muted-foreground">
              <span>300 kW</span>
              <span>250 kW</span>
              <span>200 kW</span>
              <span>150 kW</span>
              <span>100 kW</span>
            </div>

            {/* Chart area */}
            <svg
              className="absolute inset-0 left-10 right-0 bottom-6"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="baselineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="optimizedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
                </linearGradient>
                {/* Revenue opportunity gradient (gold) */}
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(234, 179, 8)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.1" />
                </linearGradient>

                {/* Timeline period backgrounds */}
                <linearGradient id="precoolBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="peakBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="1000"
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.2"
                />
              ))}

              {/* PRE-COOL region (6-9 AM) - Blue/Green */}
              <rect x="0" y="0" width="230" height="200" fill="url(#precoolBg)" />
              {/* PEAK region (2-6 PM) - Red */}
              <rect x="615" y="0" width="385" height="200" fill="url(#peakBg)" />

              {time >= 25 && (
                <path
                  d={`
                    M 0 ${200 - (baselineDemand[0] / maxDemand) * 200}
                    ${baselineDemand
                      .slice(1, progressIndex + 1)
                      .map((d, i) => `L ${((i + 1) / (hours.length - 1)) * 1000} ${200 - (d / maxDemand) * 200}`)
                      .join(" ")}
                    ${optimizedDemand
                      .slice(0, progressIndex + 1)
                      .reverse()
                      .map(
                        (d, i) =>
                          `L ${((progressIndex - i) / (hours.length - 1)) * 1000} ${200 - (d / maxDemand) * 200}`,
                      )
                      .join(" ")}
                    Z
                  `}
                  fill="url(#revenueGradient)"
                  opacity="0.6"
                />
              )}

              <path
                d={`M 0 ${200 - (baselineDemand[0] / maxDemand) * 200} ${baselineDemand
                  .slice(1, progressIndex + 1)
                  .map((d, i) => `L ${((i + 1) / (hours.length - 1)) * 1000} ${200 - (d / maxDemand) * 200}`)
                  .join(" ")}`}
                fill="none"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
                className="transition-all duration-100"
              />

              <path
                d={`M 0 ${200 - (optimizedDemand[0] / maxDemand) * 200} ${optimizedDemand
                  .slice(1, progressIndex + 1)
                  .map((d, i) => `L ${((i + 1) / (hours.length - 1)) * 1000} ${200 - (d / maxDemand) * 200}`)
                  .join(" ")}`}
                fill="none"
                stroke="rgb(34, 197, 94)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-100"
              />

              {/* Phase labels */}
              <text x="115" y="20" textAnchor="middle" className="text-[10px] font-semibold fill-primary" opacity="0.7">
                PRE-COOL
              </text>
              <text
                x="500"
                y="20"
                textAnchor="middle"
                className="text-[10px] font-semibold fill-muted-foreground"
                opacity="0.5"
              >
                COAST
              </text>
              <text
                x="850"
                y="20"
                textAnchor="middle"
                className="text-[10px] font-semibold fill-destructive"
                opacity="0.7"
              >
                SHED
              </text>
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-muted-foreground">
              <span>6AM</span>
              <span>9AM</span>
              <span>12PM</span>
              <span>2PM</span>
              <span>4PM</span>
              <span>6PM</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-violet-400 opacity-70" style={{ borderTop: "2px dashed" }} />
              <span className="text-muted-foreground">Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-500" />
              <span className="text-muted-foreground">Optimized</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1.5 bg-yellow-500 opacity-40 rounded-sm" />
              <span className="text-muted-foreground">Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-[200px] min-h-[200px] max-h-[200px] flex-shrink-0">
        {/* PRE-COOL Card */}
        <div
          className={`bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-2 sm:p-3 border transition-all duration-300 ${
            activePhase === "precool"
              ? "border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105"
              : "border-blue-500/20"
          }`}
        >
          <div className="text-center mb-2">
            <div className="text-xl sm:text-2xl mb-1">❄️</div>
            <div className="font-bold text-xs">PRE-COOL</div>
            <div className="text-[10px] text-muted-foreground">6-9 AM</div>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temp:</span>
              <span className="font-semibold">22°C → 20°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-semibold text-green-600">$0.12/kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-semibold text-blue-600">${precoolCost}</span>
            </div>
            <div className="pt-1.5 border-t border-blue-500/20">
              <div className="font-semibold mb-0.5">Strategy:</div>
              <div className="text-muted-foreground leading-relaxed">Build thermal mass</div>
            </div>
            {activePhase === "precool" && (
              <div className="pt-1.5 border-t border-blue-500/20 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-[10px] font-semibold mb-0.5">Active:</div>
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-blue-500/20 rounded text-[9px]">HVAC</span>
                  <span className="px-1.5 py-0.5 bg-blue-500/20 rounded text-[9px]">Storage</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COAST Card */}
        <div
          className={`bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-2 sm:p-3 border transition-all duration-300 ${
            activePhase === "coast"
              ? "border-orange-500/50 shadow-lg shadow-orange-500/20 scale-105"
              : "border-orange-500/20"
          }`}
        >
          <div className="text-center mb-2">
            <div className="text-xl sm:text-2xl mb-1">🏖️</div>
            <div className="font-bold text-xs">COAST</div>
            <div className="text-[10px] text-muted-foreground">2-4 PM</div>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temp:</span>
              <span className="font-semibold">20°C → 24°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reduce:</span>
              <span className="font-semibold text-orange-600">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-semibold text-green-600">${coastRevenue}</span>
            </div>
            <div className="pt-1.5 border-t border-orange-500/20">
              <div className="font-semibold mb-0.5">Strategy:</div>
              <div className="text-muted-foreground leading-relaxed">DR + thermal inertia</div>
            </div>
            {activePhase === "coast" && (
              <div className="pt-1.5 border-t border-orange-500/20 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-[10px] font-semibold mb-0.5">Active:</div>
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-orange-500/20 rounded text-[9px]">HVAC</span>
                  <span className="px-1.5 py-0.5 bg-orange-500/20 rounded text-[9px]">Lights</span>
                  <span className="px-1.5 py-0.5 bg-orange-500/20 rounded text-[9px]">Storage</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SHED Card */}
        <div
          className={`bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl p-2 sm:p-3 border transition-all duration-300 ${
            activePhase === "shed" ? "border-red-500/50 shadow-lg shadow-red-500/20 scale-105" : "border-red-500/20"
          }`}
        >
          <div className="text-center mb-2">
            <div className="text-xl sm:text-2xl mb-1">⚡</div>
            <div className="font-bold text-xs">SHED</div>
            <div className="text-[10px] text-muted-foreground">Peak Events</div>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Load:</span>
              <span className="font-semibold">Critical only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reduce:</span>
              <span className="font-semibold text-red-600">60%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-semibold text-green-600">${shedRevenue}</span>
            </div>
            <div className="pt-1.5 border-t border-red-500/20">
              <div className="font-semibold mb-0.5">Strategy:</div>
              <div className="text-muted-foreground leading-relaxed">Emergency DR</div>
            </div>
            {activePhase === "shed" && (
              <div className="pt-1.5 border-t border-red-500/20 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-[10px] font-semibold mb-0.5">Active:</div>
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-red-500/20 rounded text-[9px]">HVAC</span>
                  <span className="px-1.5 py-0.5 bg-red-500/20 rounded text-[9px]">Lights</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROI Section */}
      <div className="h-[100px] min-h-[100px] max-h-[100px] flex-shrink-0 relative">
        {time >= 85 && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-3 border border-green-500/20 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">📊 Daily Value</div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">${totalDailyValue}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Peak: 80 kW • Cost: $135 • Revenue: ${coastRevenue + shedRevenue}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground mb-1">Annual</div>
                <div className="text-lg sm:text-xl font-bold text-green-600">${(annualValue / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RevenueAnimation() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const revenueStreams = [
    {
      name: "Demand response payments",
      range: "$50K-200K/year",
      icon: "⚡",
    },
    {
      name: "Peak demand charge elimination",
      range: "$80K-200K/year",
      icon: "📊",
    },
    {
      name: "Energy cost optimization",
      range: "$40K-100K/year",
      icon: "💰",
    },
  ]

  const totalMin = 180000
  const totalMax = 500000
  const currentTotal = Math.floor(totalMin + (totalMax - totalMin) * (progress / 100))

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Total revenue display */}
      <div className="relative bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl p-6 overflow-hidden border border-accent/20">
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer" />

        <div className="relative text-center space-y-3">
          <div className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
            Total Annual Revenue
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-accent tabular-nums">
            ${currentTotal.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            ${totalMin.toLocaleString()} - ${totalMax.toLocaleString()} annually
          </div>
        </div>

        {/* Circular progress indicator */}
        <svg className="absolute top-4 right-4 w-16 h-16 -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" opacity="0.2" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-6 border border-primary/10">
        <div className="text-sm font-semibold text-muted-foreground mb-4">Three ways your building makes money:</div>

        <div className="space-y-4">
          {revenueStreams.map((stream, index) => (
            <div
              key={index}
              className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
            >
              <div className="text-2xl mt-0.5 group-hover:scale-110 transition-transform duration-200">
                {stream.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-base font-medium leading-relaxed">{stream.name}</span>
                  <span className="text-base font-bold text-accent tabular-nums whitespace-nowrap">{stream.range}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total:</span>
            <span className="text-xl font-bold text-accent">$180K-500K annually</span>
          </div>
          <div className="text-xs text-muted-foreground text-right mt-1">for a typical 50,000 sq ft building</div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-primary/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-muted-foreground">Zero effort required</span>
          </div>
          <span className="font-semibold text-accent">Fully automated</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
