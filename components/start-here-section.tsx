"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, TrendingUp, Zap, Activity, AlertCircle, FileText, CheckCircle, Rocket, BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Confetti from "react-confetti"

type Location = "singapore" | "australia" | ""
type SizeUnit = "sqft" | "sqm"

export function StartHereSection() {
  const [selectedLocation, setSelectedLocation] = useState<Location>("")
  const [isQualified, setIsQualified] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>("sqm")
  const [formData, setFormData] = useState({
    buildingName: "",
    location: "",
    squareFootage: "",
    buildingType: "",
  })

  const SQFT_TO_SQM = 0.092903
  const SQM_TO_SQFT = 10.7639
  const MIN_SQFT = 100000
  const MIN_SQM = 10000

  const handleCheckEligibility = () => {
    console.log("[v0] Check Eligibility clicked")
    console.log("[v0] Form data:", formData)

    if (!formData.location || !formData.buildingName || !formData.squareFootage || !formData.buildingType) {
      console.log("[v0] Validation failed - missing fields")
      return
    }

    const inputValue = Number.parseInt(formData.squareFootage)
    const minRequired = sizeUnit === "sqft" ? MIN_SQFT : MIN_SQM

    console.log("[v0] Input value:", inputValue)
    console.log("[v0] Unit:", sizeUnit)
    console.log("[v0] Minimum required:", minRequired)
    console.log("[v0] Qualifies:", inputValue >= minRequired)

    if (inputValue >= minRequired) {
      console.log("[v0] Building qualifies! Showing confetti")
      setIsQualified(true)
      setShowConfetti(true)
      setTimeout(() => {
        console.log("[v0] Hiding confetti")
        setShowConfetti(false)
      }, 5000)
    } else {
      console.log("[v0] Building does not qualify")
    }
  }

  const getWhatsIncluded = () => {
    if (selectedLocation === "singapore") {
      return [
        "Zero upfront cost",
        "30 days free trial",
        "Wireless sensors on major equipment",
        "Real-time energy dashboard with anomaly detection",
        "Tenant energy consumption tracking and breakdown (Optional)",
        "Automated Green Mark compliance tracking",
        "Monthly reports with local benchmarking",
      ]
    } else if (selectedLocation === "australia") {
      return [
        "Zero upfront cost",
        "30 days free trial",
        "Wireless sensors on major equipment",
        "Real-time energy dashboard with efficiency alerts",
        "Tenant energy consumption tracking and breakdown (Optional)",
        "NABERS compliance data tracking",
        "Monthly reports with maintenance insights",
      ]
    }
    return [
      "Zero upfront cost",
      "30 days free trial",
      "Wireless sensors on major equipment",
      "Real-time energy dashboard",
      "Tenant energy consumption tracking and breakdown (Optional)",
      "Compliance tracking (Green Mark / NABERS)",
      "Monthly consumption reports",
    ]
  }

  const getMinSquareFootage = () => {
    return sizeUnit === "sqft" ? "100,000" : "10,000"
  }

  const getMinSquareFootageNumber = () => {
    return sizeUnit === "sqft" ? MIN_SQFT : MIN_SQM
  }

  const isFormComplete = () => {
    return !!(formData.location && formData.buildingName && formData.squareFootage && formData.buildingType)
  }

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-[#0A1F2E] via-[#0F2A3A] to-[#1A4D5C] relative overflow-hidden"
      id="start-free-monitoring"
    >
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 300}
          height={typeof window !== "undefined" ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,192,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(26,77,92,0.3),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#00D9C0]/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 border border-[#00D9C0]/40">
            NO COST. NO OBLIGATION.
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-white">Wattif Monitor</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto text-balance">
            Free energy monitoring for your building. Track consumption, maintain compliance, and uncover hidden revenue
            and savings opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side - The Offer */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="bg-[#00D9C0]/10 border border-[#00D9C0]/30 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-900">Building Qualifications:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">Commercial building 10,000+ m²</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">Read Access to BMS</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What's Included</h3>
              <div className="space-y-3">
                {getWhatsIncluded().map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-[#00D9C0]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00D9C0]" />
                      </div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => {
                    console.log("[v0] Location changed to:", value)
                    setFormData({ ...formData, location: value })
                    setSelectedLocation(value as Location)
                    setIsQualified(false)
                  }}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingName">Building Name</Label>
                <Input
                  id="buildingName"
                  placeholder="Enter building name"
                  value={formData.buildingName}
                  onChange={(e) => {
                    console.log("[v0] Building name changed to:", e.target.value)
                    setFormData({ ...formData, buildingName: e.target.value })
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="squareFootage">Size of the Building</Label>
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setSizeUnit("sqm")}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        sizeUnit === "sqm"
                          ? "bg-[#00D9C0] text-gray-900"
                          : "bg-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      m²
                    </button>
                    <button
                      type="button"
                      onClick={() => setSizeUnit("sqft")}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        sizeUnit === "sqft"
                          ? "bg-[#00D9C0] text-gray-900"
                          : "bg-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      sq ft
                    </button>
                  </div>
                </div>
                <Input
                  id="squareFootage"
                  type="number"
                  placeholder={`Minimum ${getMinSquareFootage()} ${sizeUnit === "sqft" ? "sq ft" : "m²"}`}
                  value={formData.squareFootage}
                  onChange={(e) => {
                    console.log("[v0] Building size changed to:", e.target.value)
                    setFormData({ ...formData, squareFootage: e.target.value })
                  }}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum {sizeUnit === "sqft" ? "100,000 sq ft" : "10,000 m²"} required
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingType">Building Type</Label>
                <Select
                  value={formData.buildingType}
                  onValueChange={(value) => {
                    console.log("[v0] Building type changed to:", value)
                    setFormData({ ...formData, buildingType: value })
                  }}
                >
                  <SelectTrigger id="buildingType">
                    <SelectValue placeholder="Select building type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail / Shopping Mall</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="mixed">Mixed-use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isQualified && (
                <>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 my-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-green-900">Congratulations!</h4>
                        <p className="text-sm text-green-700">Your building qualifies for free monitoring</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-800 mt-3">
                      Click below to schedule your consultation and start your 30-day free trial.
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#00D9C0] hover:bg-[#00C4AD] text-gray-900 font-semibold"
                  >
                    <a
                      href="https://calendly.com/wattif/exploring-wattif-energy-intelligence-platform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started with Wattif Monitor
                    </a>
                  </Button>
                </>
              )}

              {!isQualified &&
                formData.squareFootage &&
                Number.parseInt(formData.squareFootage) < getMinSquareFootageNumber() &&
                isFormComplete() && (
                  <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-6 my-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-orange-900">Building Size Below Minimum</h4>
                        <p className="text-sm text-orange-700">
                          Your building is below our minimum size requirement of{" "}
                          {sizeUnit === "sqft" ? "100,000 sq ft" : "10,000 m²"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-orange-800 mt-3">
                      We currently serve larger commercial buildings. However, you can still reach out to discuss
                      potential options for your building.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full mt-4 border-2 border-orange-500 hover:bg-orange-50 bg-transparent"
                    >
                      <a
                        href="https://calendly.com/wattif/exploring-wattif-energy-intelligence-platform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Us Anyway
                      </a>
                    </Button>
                  </div>
                )}

              {!isQualified && (
                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-[#00D9C0] hover:bg-[#00C4AD] text-gray-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isFormComplete()}
                  onClick={handleCheckEligibility}
                >
                  Check My Building's Eligibility
                </Button>
              )}
            </div>
          </div>

          {/* Right Side - Dashboard Preview with Tabs */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Tabs defaultValue="realtime" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100">
                <TabsTrigger
                  value="realtime"
                  className="text-xs data-[state=active]:bg-[#00D9C0] data-[state=active]:text-gray-900"
                >
                  Real-Time
                </TabsTrigger>
                <TabsTrigger
                  value="capacity"
                  className="text-xs data-[state=active]:bg-[#00D9C0] data-[state=active]:text-gray-900"
                >
                  Capacity
                </TabsTrigger>
                <TabsTrigger
                  value="compliance"
                  className="text-xs data-[state=active]:bg-[#00D9C0] data-[state=active]:text-gray-900"
                >
                  Compliance
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="text-xs data-[state=active]:bg-[#00D9C0] data-[state=active]:text-gray-900"
                >
                  Alerts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="realtime" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-900">Real-Time Consumption</span>
                    <Activity className="w-4 h-4 text-[#00D9C0]" />
                  </div>
                  <div className="h-32 flex items-end gap-1">
                    {[65, 45, 70, 55, 80, 60, 75, 50, 85, 65, 90, 70].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#00D9C0] to-[#00F5D4] rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>6AM</span>
                    <span>12PM</span>
                    <span>6PM</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#00D9C0]/10 rounded-lg p-4 border border-[#00D9C0]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#00D9C0]" />
                      <span className="text-xs text-gray-700">Flexible Capacity</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">520 kW</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700">Revenue Potential</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">$220K/yr</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="capacity" className="space-y-6">
                <div className="bg-[#00D9C0]/10 rounded-lg p-6 border border-[#00D9C0]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[#00D9C0]" />
                    <span className="text-sm text-gray-700">Total Flexible Capacity</span>
                  </div>
                  <div className="text-4xl font-bold mb-6 text-gray-900">520 kW</div>

                  <h4 className="text-sm font-medium mb-3 text-gray-900">Equipment Breakdown</h4>
                  <div className="space-y-3">
                    {[
                      { name: "HVAC System 1", power: "145 kW", percent: 28 },
                      { name: "HVAC System 2", power: "132 kW", percent: 25 },
                      { name: "Refrigeration", power: "95 kW", percent: 18 },
                      { name: "Lighting", power: "48 kW", percent: 9 },
                      { name: "Other Systems", power: "100 kW", percent: 20 },
                    ].map((equipment, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700">{equipment.name}</span>
                          <span className="font-medium text-gray-900">{equipment.power}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#00D9C0] rounded-full h-2" style={{ width: `${equipment.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[#00D9C0]" />
                    <span className="text-sm font-medium text-gray-900">
                      {selectedLocation === "singapore" ? "Green Mark EUI Tracker" : "NABERS Rating Tracker"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Current EUI</span>
                      <span className="text-2xl font-bold text-gray-900">142 kWh/m²/yr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Target EUI</span>
                      <span className="text-lg font-medium text-green-600">120 kWh/m²/yr</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 rounded-full h-3" style={{ width: "85%" }} />
                    </div>
                    <p className="text-xs text-gray-600">85% towards target</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="text-sm font-medium mb-3 text-gray-900">Export Reports</h5>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Monthly Report
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Compliance Data
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm mb-1">HVAC System 1 Above Baseline</h5>
                        <p className="text-xs text-muted-foreground">
                          Running 15% above baseline. Check filters and settings.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm mb-1">After-Hours Usage Detected</h5>
                        <p className="text-xs text-muted-foreground">Lighting system active outside business hours.</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday, 11:30 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm mb-1">Peak Demand Forecast</h5>
                        <p className="text-xs text-muted-foreground">
                          High demand expected tomorrow 2-4 PM. Consider pre-cooling.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Today, 9:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-bold mb-6 text-gray-900 text-center">Your Journey</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00D9C0] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-0.5 h-20 bg-gray-200 my-1" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm font-semibold text-[#00D9C0] mb-1">Today</div>
                    <div className="text-base font-bold text-gray-900 mb-1">You Apply</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      We install wireless sensors on your major equipment and spaces. No downtime required.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00D9C0]/20 border-2 border-[#00D9C0] flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-5 h-5 text-[#00D9C0]" />
                    </div>
                    <div className="w-0.5 h-16 bg-gray-200 my-1" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Week 1</div>
                    <div className="text-base font-bold text-gray-900 mb-1">Dashboard Goes Live</div>
                    <div className="text-sm text-gray-600 leading-relaxed">Real consumption data starts flowing</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00D9C0]/20 border-2 border-[#00D9C0] flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-[#00D9C0]" />
                    </div>
                    <div className="w-0.5 h-16 bg-gray-200 my-1" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Month 1</div>
                    <div className="text-base font-bold text-gray-900 mb-1">Energy Intelligence On</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      Monitor tenant usage, track compliance, set targets, compare buildings.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm font-semibold text-green-600 mb-1">Then</div>
                    <div className="text-base font-bold text-gray-900 mb-1">Your Choice</div>
                    <div className="space-y-3 mt-2">
                      <div className="bg-[#00D9C0]/10 border border-[#00D9C0]/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-[#00D9C0] flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">Turn On Energy Orchestration</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Activate Wattif's Energy Orchestration and Demand Response participation services.
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                            <Activity className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">Continue with Monitoring</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Keep using the energy monitoring platform standalone with a subscription.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
