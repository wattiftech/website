"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingDown, Snowflake, Battery, Play, Pause, Sun } from "lucide-react"

type TabType = "hvac" | "storage" | "solar"

export function DemandChart() {
  const [activeTab, setActiveTab] = useState<TabType>("hvac")
  const [stage, setStage] = useState(0)
  const [savings, setSavings] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const tabs: { id: TabType; label: string; icon: typeof Snowflake }[] = [
    { id: "hvac", label: "HVAC", icon: Snowflake },
    { id: "storage", label: "Storage", icon: Battery },
    { id: "solar", label: "Solar", icon: Sun },
  ]

  const buildingNames: Record<TabType, string> = {
    hvac: "Gateway Office Tower",
    storage: "SmartGrid Business Park",
    solar: "Skyline Business Centre",
  }

  const getBuildingName = () => buildingNames[activeTab]

  useEffect(() => {
    if (!isPlaying) return

    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
    const stageDurations = [2000, 2000, 3000]
    const totalDuration = stageDurations.reduce((a, b) => a + b, 0)

    // After all stages complete, move to next tab
    if (stage === 2) {
      const timer = setTimeout(() => {
        const nextTabIndex = (currentTabIndex + 1) % tabs.length
        setActiveTab(tabs[nextTabIndex].id)
        setStage(0)
        setProgress(0)
      }, stageDurations[2])
      return () => clearTimeout(timer)
    }
  }, [stage, activeTab, isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const stageDurations = [2000, 2000, 3000]
    const currentDuration = stageDurations[stage]
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / currentDuration) * 100, 100)
      setProgress(newProgress)
    }, 50)

    return () => clearInterval(progressInterval)
  }, [stage, isPlaying])

  useEffect(() => {
    setStage(0)
    setSavings(0)
    setRevenue(0)
    setTotalValue(0)
    setProgress(0)
  }, [activeTab])

  useEffect(() => {
    if (!isPlaying) return

    // Stage timing: 2s, 2s, 3s
    const stageDurations = [2000, 2000, 3000]
    const timer = setTimeout(() => {
      setStage((prev) => (prev >= 2 ? 0 : prev + 1))
      setProgress(0)
    }, stageDurations[stage])
    return () => clearTimeout(timer)
  }, [stage, isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    // Animate counters for each stage
    if (activeTab === "hvac") {
      if (stage === 1) {
        // Energy-Optimized stage: $75K savings
        let current = 0
        const target = 75
        const increment = target / 20
        const counter = setInterval(() => {
          current += increment
          if (current >= target) {
            setSavings(target)
            setTotalValue(target)
            clearInterval(counter)
          } else {
            setSavings(Math.floor(current))
            setTotalValue(Math.floor(current))
          }
        }, 30)
        return () => clearInterval(counter)
      } else if (stage === 2) {
        // Grid-Optimized stage: $75K savings + $28K revenue = $103K
        let currentSavings = 0
        let currentRevenue = 0
        const targetSavings = 75
        const targetRevenue = 28
        const incrementSavings = targetSavings / 20
        const incrementRevenue = targetRevenue / 20

        const savingsCounter = setInterval(() => {
          currentSavings += incrementSavings
          if (currentSavings >= targetSavings) {
            setSavings(targetSavings)
            clearInterval(savingsCounter)
          } else {
            setSavings(Math.floor(currentSavings))
          }
        }, 30)

        const revenueCounter = setInterval(() => {
          currentRevenue += incrementRevenue
          if (currentRevenue >= targetRevenue) {
            setRevenue(targetRevenue)
            setTotalValue(targetSavings + targetRevenue)
            clearInterval(revenueCounter)
          } else {
            setRevenue(Math.floor(currentRevenue))
            setTotalValue(Math.floor(currentSavings + currentRevenue))
          }
        }, 30)

        return () => {
          clearInterval(savingsCounter)
          clearInterval(revenueCounter)
        }
      } else {
        // Reset counters for Standard stage
        setSavings(0)
        setRevenue(0)
        setTotalValue(0)
      }
    } else if (activeTab === "storage") {
      if (stage === 1) {
        // Simple Arbitrage stage: $85K revenue
        let current = 0
        const target = 85
        const increment = target / 20
        const counter = setInterval(() => {
          current += increment
          if (current >= target) {
            setRevenue(target)
            setTotalValue(target)
            clearInterval(counter)
          } else {
            setRevenue(Math.floor(current))
            setTotalValue(Math.floor(current))
          }
        }, 30)
        return () => clearInterval(counter)
      } else if (stage === 2) {
        // Revenue Stacking stage: $85K arbitrage + $170K grid services = $255K
        let currentArbitrage = 0
        let currentGrid = 0
        const targetArbitrage = 85
        const targetGrid = 170
        const incrementArbitrage = targetArbitrage / 20
        const incrementGrid = targetGrid / 20

        const arbitrageCounter = setInterval(() => {
          currentArbitrage += incrementArbitrage
          if (currentArbitrage >= targetArbitrage) {
            setRevenue(targetArbitrage)
            clearInterval(arbitrageCounter)
          } else {
            setRevenue(Math.floor(currentArbitrage))
          }
        }, 30)

        const gridCounter = setInterval(() => {
          currentGrid += incrementGrid
          if (currentGrid >= targetGrid) {
            setSavings(targetGrid)
            setTotalValue(targetArbitrage + targetGrid)
            clearInterval(gridCounter)
          } else {
            setSavings(Math.floor(currentGrid))
            setTotalValue(Math.floor(currentArbitrage + currentGrid))
          }
        }, 30)

        return () => {
          clearInterval(arbitrageCounter)
          clearInterval(gridCounter)
        }
      } else {
        setSavings(0)
        setRevenue(0)
        setTotalValue(0)
      }
    } else if (activeTab === "solar") {
      if (stage === 1) {
        // Basic solar: $50K savings
        let current = 0
        const target = 50
        const increment = target / 20
        const counter = setInterval(() => {
          current += increment
          if (current >= target) {
            setSavings(target)
            setTotalValue(target)
            clearInterval(counter)
          } else {
            setSavings(Math.floor(current))
            setTotalValue(Math.floor(current))
          }
        }, 30)
        return () => clearInterval(counter)
      } else if (stage === 2) {
        // Solar-aligned load shifting: $50K + $15K additional = $65K
        let currentSavings = 0
        let currentAdditional = 0
        const targetSavings = 50
        const targetAdditional = 15
        const incrementSavings = targetSavings / 20
        const incrementAdditional = targetAdditional / 20

        const savingsCounter = setInterval(() => {
          currentSavings += incrementSavings
          if (currentSavings >= targetSavings) {
            setSavings(targetSavings)
            clearInterval(savingsCounter)
          } else {
            setSavings(Math.floor(currentSavings))
          }
        }, 30)

        const additionalCounter = setInterval(() => {
          currentAdditional += incrementAdditional
          if (currentAdditional >= targetAdditional) {
            setRevenue(targetAdditional)
            setTotalValue(targetSavings + targetAdditional)
            clearInterval(additionalCounter)
          } else {
            setRevenue(Math.floor(currentAdditional))
            setTotalValue(Math.floor(currentSavings + currentAdditional))
          }
        }, 30)

        return () => {
          clearInterval(savingsCounter)
          clearInterval(additionalCounter)
        }
      } else {
        setSavings(0)
        setRevenue(0)
        setTotalValue(0)
      }
    } else {
      // Reset counters for other tabs
      setSavings(0)
      setRevenue(0)
      setTotalValue(0)
    }
  }, [stage, activeTab])

  const getStageTitle = () => {
    if (activeTab === "hvac") {
      switch (stage) {
        case 0:
          return "Standard HVAC"
        case 1:
          return "Energy-Optimized HVAC"
        case 2:
          return "Grid-Optimized HVAC (Wattif)"
        default:
          return ""
      }
    } else if (activeTab === "storage") {
      switch (stage) {
        case 0:
          return "No Battery Storage"
        case 1:
          return "Simple Arbitrage"
        case 2:
          return "Revenue Stacking (Wattif)"
        default:
          return ""
      }
    } else if (activeTab === "solar") {
      switch (stage) {
        case 0:
          return "Standard Solar"
        case 1:
          return "Solar + Basic Optimization"
        case 2:
          return "Solar-Aligned Load Shifting (Wattif)"
        default:
          return ""
      }
    }
    return "Coming Soon"
  }

  const getStageDescription = () => {
    if (activeTab === "hvac") {
      switch (stage) {
        case 0:
          return "React to temperature"
        case 1:
          return "Use less power"
        case 2:
          return "Strategic timing for grid revenue"
        default:
          return ""
      }
    } else if (activeTab === "storage") {
      switch (stage) {
        case 0:
          return "Grid-dependent operations"
        case 1:
          return "Charge cheap, discharge expensive"
        case 2:
          return "FCAS + DR + arbitrage + peak shaving"
        default:
          return ""
      }
    } else if (activeTab === "solar") {
      switch (stage) {
        case 0:
          return "Reduces bill during solar hours"
        case 1:
          return "Load shifting awareness"
        case 2:
          return "Pre-cool during cheap solar hours"
        default:
          return ""
      }
    }
    return "Phase 2 - Coming Soon"
  }

  return (
    <Card className="p-6 bg-card shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span className="text-xs font-medium">{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>

        <div className="border-b border-border pb-4">
          <div className="text-sm font-medium text-muted-foreground mb-3">Select Building System:</div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsPlaying(false)
                  }}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }
                  `}
                >
                  {isActive && isPlaying && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-card" />
                  )}
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">{getBuildingName()}</span>
              {/* </CHANGE> */}
              <span className="font-semibold text-sm">{getStageTitle()}</span>
              <span className="text-xs text-muted-foreground">{getStageDescription()}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">24-Hour Demand Profile</div>
        </div>

        {/* Chart Area */}
        <div className="relative h-64 bg-secondary/30 rounded-lg p-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-4">
            <span>2000 kW</span>
            <span>1500 kW</span>
            <span>1000 kW</span>
            <span>500 kW</span>
            <span>0 kW</span>
          </div>

          {/* Chart content */}
          <div className="ml-12 h-full relative">
            {activeTab === "hvac" && <HVACChart stage={stage} />}
            {activeTab === "storage" && <StorageChart stage={stage} />}
            {activeTab === "solar" && <SolarChart stage={stage} />}
            {/* Removed RefrigerationChart */}
          </div>

          {/* X-axis */}
          <div className="ml-12 flex justify-between text-xs text-muted-foreground mt-2">
            <span>12AM</span>
            <span>6AM</span>
            <span>12PM</span>
            <span>6PM</span>
            <span>11PM</span>
          </div>
        </div>

        {/* Value Display */}
        <ValueDisplay activeTab={activeTab} stage={stage} savings={savings} revenue={revenue} totalValue={totalValue} />

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {activeTab === "solar" ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-yellow-500 rounded" />
                <span>Solar Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-2 bg-gray-400 rounded"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 4px)",
                  }}
                />
                <span>Baseline Load</span>
              </div>
              {stage >= 2 && (
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <div className="w-4 h-2 bg-green-500 rounded" />
                  <span>Optimized Load</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-violet-500 rounded" />
                <span>Baseline</span>
              </div>
              {stage >= 1 && (
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <div className="w-4 h-2 bg-green-300 rounded" />
                  <span>
                    {activeTab === "hvac" && "Energy-Optimized"}
                    {activeTab === "storage" && "Simple Arbitrage"}
                  </span>
                </div>
              )}
              {stage === 2 && (
                <>
                  <div className="flex items-center gap-2 animate-in fade-in duration-300">
                    <div className="w-4 h-2 bg-green-600 rounded" />
                    <span>Grid-Optimized (Wattif)</span>
                  </div>
                  <div className="flex items-center gap-2 animate-in fade-in duration-300">
                    <div className="w-4 h-2 bg-yellow-500 rounded" />
                    <span>Revenue Zone</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

// Removed RefrigerationChart component

function HVACChart({ stage }: { stage: number }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
      {/* Grid lines */}
      <line
        x1="0"
        y1="50"
        x2="400"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="100"
        x2="400"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="150"
        x2="400"
        y2="150"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />

      {/* Peak period highlight */}
      {stage === 2 && (
        <rect
          x="180"
          y="0"
          width="80"
          height="200"
          fill="rgba(239, 68, 68, 0.08)"
          className="animate-in fade-in duration-500"
        />
      )}

      {/* Baseline demand curve (violet) */}
      <path
        d="M 0 180 L 50 170 L 100 160 L 150 140 L 200 60 L 250 55 L 300 100 L 350 150 L 400 170"
        stroke="rgb(139, 92, 246)"
        strokeWidth="2"
        fill="none"
        strokeDasharray={stage === 0 ? "0" : "4"}
        className="transition-all duration-1000"
        opacity={stage === 0 ? "1" : "0.5"}
      />
      <path
        d="M 0 180 L 50 170 L 100 160 L 150 140 L 200 60 L 250 55 L 300 100 L 350 150 L 400 170 L 400 200 L 0 200 Z"
        fill="url(#violetGradient)"
        className="transition-all duration-1000"
        opacity={stage === 0 ? "0.6" : "0.2"}
      />

      {/* Energy-Optimized curve (light green) */}
      {stage >= 1 && (
        <>
          <path
            d="M 0 185 L 50 175 L 100 165 L 150 150 L 200 90 L 250 85 L 300 120 L 350 160 L 400 175"
            stroke="rgb(134, 239, 172)"
            strokeWidth="3"
            fill="none"
            className="transition-all duration-1000"
            opacity={stage === 1 ? "1" : "0.3"}
          />
          {stage === 1 && (
            <path
              d="M 0 185 L 50 175 L 100 165 L 150 150 L 200 90 L 250 85 L 300 120 L 350 160 L 400 175 L 400 200 L 0 200 Z"
              fill="url(#lightGreenGradient)"
              className="animate-in fade-in duration-1000"
              opacity="0.3"
            />
          )}
        </>
      )}

      {/* Grid-Optimized curve (dark green) */}
      {stage === 2 && (
        <>
          <path
            d="M 150 140 L 200 60 L 250 55 L 300 100 L 300 130 L 250 120 L 200 110 L 150 120 Z"
            fill="url(#goldGradient)"
            className="animate-in fade-in duration-1000"
          />
          <path
            d="M 0 180 L 50 170 L 100 140 L 150 120 L 200 110 L 250 120 L 300 130 L 350 150 L 400 170"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
            fill="none"
            className="animate-in fade-in duration-1000"
          />
          <path
            d="M 0 180 L 50 170 L 100 140 L 150 120 L 200 110 L 250 120 L 300 130 L 350 150 L 400 170 L 400 200 L 0 200 Z"
            fill="url(#darkGreenGradient)"
            className="animate-in fade-in duration-1000"
            opacity="0.3"
          />
          <g className="animate-in fade-in duration-500">
            <circle cx="225" cy="40" r="8" fill="rgb(239, 68, 68)" opacity="0.2">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="225" cy="40" r="4" fill="rgb(239, 68, 68)" />
          </g>
        </>
      )}

      <defs>
        <linearGradient id="violetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lightGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(134, 239, 172)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(134, 239, 172)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="darkGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(234, 179, 8)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Removed RefrigerationChart component

function StorageChart({ stage }: { stage: number }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
      {/* Grid lines */}
      <line
        x1="0"
        y1="50"
        x2="400"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="100"
        x2="400"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="150"
        x2="400"
        y2="150"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />

      {/* Peak period highlight */}
      {stage === 2 && (
        <rect
          x="180"
          y="0"
          width="80"
          height="200"
          fill="rgba(239, 68, 68, 0.08)"
          className="animate-in fade-in duration-500"
        />
      )}

      {/* Baseline (no storage - flat demand) */}
      <path
        d="M 0 110 L 400 110"
        stroke="rgb(139, 92, 246)"
        strokeWidth="2"
        fill="none"
        strokeDasharray={stage === 0 ? "0" : "4"}
        className="transition-all duration-1000"
        opacity={stage === 0 ? "1" : "0.5"}
      />
      <path
        d="M 0 110 L 400 110 L 400 200 L 0 200 Z"
        fill="url(#violetGradient)"
        className="transition-all duration-1000"
        opacity={stage === 0 ? "0.6" : "0.2"}
      />

      {/* Simple arbitrage (charge at night, discharge at peak) */}
      {stage >= 1 && (
        <>
          <path
            d="M 0 110 L 50 130 L 100 135 L 150 120 L 200 80 L 250 75 L 300 110 L 350 115 L 400 110"
            stroke="rgb(134, 239, 172)"
            strokeWidth="3"
            fill="none"
            className="transition-all duration-1000"
            opacity={stage === 1 ? "1" : "0.3"}
          />
          {stage === 1 && (
            <>
              <path
                d="M 0 110 L 50 130 L 100 135 L 150 120 L 200 80 L 250 75 L 300 110 L 350 115 L 400 110 L 400 200 L 0 200 Z"
                fill="url(#lightGreenGradient)"
                className="animate-in fade-in duration-1000"
                opacity="0.3"
              />
              {/* Charging annotation */}
              <text x="75" y="145" fontSize="10" fill="rgb(134, 239, 172)" className="animate-in fade-in duration-1000">
                Charging
              </text>
              {/* Discharging annotation */}
              <text x="215" y="70" fontSize="10" fill="rgb(134, 239, 172)" className="animate-in fade-in duration-1000">
                Discharging
              </text>
            </>
          )}
        </>
      )}

      {/* Revenue stacking (FCAS + DR + arbitrage) */}
      {stage === 2 && (
        <>
          <path
            d="M 180 120 L 200 80 L 250 75 L 280 110 Z M 180 120 L 280 110 L 280 100 L 180 100 Z"
            fill="url(#goldGradient)"
            className="animate-in fade-in duration-1000"
          />
          <path
            d="M 0 110 L 50 135 L 100 140 L 150 125 L 180 120 L 200 80 L 250 75 L 280 110 L 350 115 L 400 110"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
            fill="none"
            className="animate-in fade-in duration-1000"
          />
          <path
            d="M 0 110 L 50 135 L 100 140 L 150 125 L 180 120 L 200 80 L 250 75 L 280 110 L 350 115 L 400 110 L 400 200 L 0 200 Z"
            fill="url(#darkGreenGradient)"
            className="animate-in fade-in duration-1000"
            opacity="0.3"
          />
          {/* FCAS annotation */}
          <text x="215" y="65" fontSize="9" fill="rgb(234, 179, 8)" className="animate-in fade-in duration-1000">
            FCAS + DR
          </text>
        </>
      )}

      <defs>
        <linearGradient id="violetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lightGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(134, 239, 172)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(134, 239, 172)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="darkGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(234, 179, 8)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SolarChart({ stage }: { stage: number }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
      {/* Grid lines */}
      <line
        x1="0"
        y1="50"
        x2="400"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="100"
        x2="400"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />
      <line
        x1="0"
        y1="150"
        x2="400"
        y2="150"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-border"
        strokeDasharray="4"
      />

      {/* Solar peak period highlight */}
      {stage >= 1 && (
        <rect
          x="150"
          y="0"
          width="100"
          height="200"
          fill="rgba(234, 179, 8, 0.08)"
          className="animate-in fade-in duration-500"
        />
      )}

      {/* Solar Generation Curve (yellow/orange) - bell curve peaking at noon */}
      <path
        d="M 0 200 L 50 200 L 100 180 L 150 120 L 200 60 L 250 120 L 300 180 L 350 200 L 400 200"
        stroke="rgb(234, 179, 8)"
        strokeWidth="3"
        fill="none"
        className="transition-all duration-1000"
      />
      <path
        d="M 0 200 L 50 200 L 100 180 L 150 120 L 200 60 L 250 120 L 300 180 L 350 200 L 400 200 L 400 200 L 0 200 Z"
        fill="url(#solarGradient)"
        className="transition-all duration-1000"
        opacity="0.3"
      />

      {/* Baseline Load (dotted grey) - high during business hours */}
      <path
        d="M 0 180 L 50 175 L 100 160 L 150 140 L 200 130 L 250 135 L 300 145 L 350 165 L 400 175"
        stroke="rgb(156, 163, 175)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4"
        className="transition-all duration-1000"
        opacity={stage === 0 ? "1" : "0.5"}
      />

      {/* Optimized Load (solid green) - shifted to match solar peak */}
      {stage === 2 && (
        <>
          <path
            d="M 0 185 L 50 180 L 100 150 L 150 110 L 200 90 L 250 110 L 300 150 L 350 170 L 400 180"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
            fill="none"
            className="animate-in fade-in duration-1000"
          />
          <path
            d="M 0 185 L 50 180 L 100 150 L 150 110 L 200 90 L 250 110 L 300 150 L 350 170 L 400 180 L 400 200 L 0 200 Z"
            fill="url(#greenGradient)"
            className="animate-in fade-in duration-1000"
            opacity="0.2"
          />
          {/* Shaded area showing savings */}
          <path
            d="M 100 160 L 150 140 L 200 130 L 250 135 L 300 145 L 300 150 L 250 110 L 200 90 L 150 110 L 100 150 Z"
            fill="url(#savingsGradient)"
            className="animate-in fade-in duration-1000"
            opacity="0.4"
          />
        </>
      )}

      <defs>
        <linearGradient id="solarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(234, 179, 8)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(134, 239, 172)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(134, 239, 172)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ValueDisplay({
  activeTab,
  stage,
  savings,
  revenue,
  totalValue,
}: {
  activeTab: TabType
  stage: number
  savings: number
  revenue: number
  totalValue: number
}) {
  // HVAC values
  const hvacSavings = stage === 1 ? 75 : stage === 2 ? 75 : 0
  const hvacRevenue = stage === 2 ? 28 : 0
  const hvacTotal = hvacSavings + hvacRevenue

  // Storage values (note: stage 1 is revenue only for arbitrage)
  const storageSavings = stage === 2 ? 170 : 0 // Updated Grid Services revenue from $195K to $170K
  const storageRevenue = stage === 1 ? 85 : stage === 2 ? 85 : 0 // Arbitrage revenue
  const storageTotal = storageSavings + storageRevenue

  const solarSavings = stage === 1 ? 50 : stage === 2 ? 50 : 0
  const solarAdditional = stage === 2 ? 15 : 0
  const solarTotal = solarSavings + solarAdditional

  const currentSavings =
    activeTab === "hvac"
      ? hvacSavings
      : activeTab === "storage"
        ? storageSavings
        : activeTab === "solar"
          ? solarSavings
          : 0

  const currentRevenue =
    activeTab === "hvac"
      ? hvacRevenue
      : activeTab === "storage"
        ? storageRevenue
        : activeTab === "solar"
          ? solarAdditional
          : 0

  const currentTotal =
    activeTab === "hvac" ? hvacTotal : activeTab === "storage" ? storageTotal : activeTab === "solar" ? solarTotal : 0

  const [displaySavings, setDisplaySavings] = useState(0)
  const [displayRevenue, setDisplayRevenue] = useState(0)
  const [displayTotal, setDisplayTotal] = useState(0)

  useEffect(() => {
    if (stage >= 1) {
      let current = 0
      const increment = currentSavings / 20
      const counter = setInterval(() => {
        current += increment
        if (current >= currentSavings) {
          setDisplaySavings(currentSavings)
          clearInterval(counter)
        } else {
          setDisplaySavings(Math.floor(current))
        }
      }, 30)
      return () => clearInterval(counter)
    } else {
      setDisplaySavings(0)
    }
  }, [stage, currentSavings])

  useEffect(() => {
    if (stage >= 1 && currentRevenue > 0) {
      let current = 0
      const increment = currentRevenue / 20
      const counter = setInterval(() => {
        current += increment
        if (current >= currentRevenue) {
          setDisplayRevenue(currentRevenue)
          setDisplayTotal(currentTotal)
          clearInterval(counter)
        } else {
          setDisplayRevenue(Math.floor(current))
          setDisplayTotal(Math.floor(currentSavings + current))
        }
      }, 30)
      return () => clearInterval(counter)
    } else {
      setDisplayRevenue(0)
      setDisplayTotal(currentSavings)
    }
  }, [stage, currentRevenue, currentSavings, currentTotal])

  return (
    <div className="min-h-[80px]">
      {stage === 0 && (
        <div className="bg-muted/50 rounded-lg p-4 text-center animate-in fade-in duration-500">
          <div className="text-sm text-muted-foreground">
            {activeTab === "storage"
              ? "No battery storage"
              : activeTab === "solar"
                ? "Solar reduces bill during solar hours"
                : "Operating cost only"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">No optimization</div>
        </div>
      )}

      {stage === 1 && (
        <div className="space-y-3 animate-in fade-in duration-500">
          <div className="bg-green-500/10 border-2 border-green-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {activeTab === "storage"
                    ? "Arbitrage Revenue"
                    : activeTab === "solar"
                      ? "Solar Savings"
                      : "Energy Savings"}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ${activeTab === "storage" ? revenue : savings}K/year
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <div>
                  {activeTab === "hvac" && "15% energy reduction"}
                  {activeTab === "storage" && "Charge cheap, discharge expensive"}
                  {activeTab === "solar" && "Bill reduction during solar hours"}
                </div>
                {activeTab === "hvac" && <div className="mt-1 text-[10px]">BrainBox, Sync, others</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="space-y-3 animate-in fade-in duration-500">
          {activeTab === "solar" ? (
            <>
              <div className="bg-green-500/10 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Solar Capacity</div>
                    <div className="text-xl font-bold text-green-600">850 kW</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Optimized Savings</div>
                    <div className="text-xl font-bold text-primary">${totalValue}K/year</div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-semibold">Solar-Aligned Load Shifting</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">18% additional value from load timing</div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-500/10 border-2 border-green-500 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    {activeTab === "storage" ? "Grid Services" : "Energy Savings"}
                  </div>
                  <div className="text-xl font-bold text-green-600">${savings}K/yr</div>
                </div>
                <div className="bg-yellow-500/10 border-2 border-yellow-600 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    {activeTab === "storage" ? "Arbitrage" : "Grid Revenue"}
                  </div>
                  <div className="text-xl font-bold text-yellow-600">${revenue}K/yr</div>
                </div>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Annual Value</div>
                <div className="text-2xl font-bold text-primary">${totalValue}K/year</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">
                    {activeTab === "hvac" && "22% peak reduction"}
                    {activeTab === "storage" && "Revenue stacking"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
