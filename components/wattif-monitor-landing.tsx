"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Check,
  TrendingUp,
  Zap,
  Activity,
  AlertCircle,
  FileText,
  X,
  Building2,
  Clock,
  Users,
  ArrowRight,
  Wifi,
  Wrench,
  Lock,
  Cloud,
  ShieldCheck,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Confetti from "react-confetti"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Location = "singapore" | "australia" | ""
type SizeUnit = "sqft" | "sqm"

export function WattifMonitorLanding() {
  const [selectedLocation, setSelectedLocation] = useState<Location>("")
  const [isQualified, setIsQualified] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isWhoWeAreVisible, setIsWhoWeAreVisible] = useState(false)
  const whoWeAreRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsWhoWeAreVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (whoWeAreRef.current) {
      observer.observe(whoWeAreRef.current)
    }

    return () => {
      if (whoWeAreRef.current) {
        observer.unobserve(whoWeAreRef.current)
      }
    }
  }, [])

  const handleCheckEligibility = () => {
    if (!formData.location || !formData.buildingName || !formData.squareFootage || !formData.buildingType) {
      return
    }

    const inputValue = Number.parseInt(formData.squareFootage)
    const minRequired = sizeUnit === "sqft" ? MIN_SQFT : MIN_SQM

    if (inputValue >= minRequired) {
      setIsQualified(true)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } else {
      setIsQualified(false)
    }
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

  return (
    <div className="bg-background">
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 300}
          height={typeof window !== "undefined" ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#0A1F2E] via-[#0F2A3A] to-[#1A4D5C] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,192,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(26,77,92,0.3),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-[#00D9C0]/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-[#00D9C0]/40">
              Unlock Your 30-Day Trial
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Free Energy Monitoring for Your Commercial Building
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance">
              Track consumption, maintain compliance, discover your grid revenue potential. No cost, no contracts, no
              catch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#00D9C0] hover:bg-[#00C4AD] text-gray-900 font-semibold text-lg px-8"
                onClick={() => {
                  document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Check Your Building's Eligibility
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section ref={whoWeAreRef} className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Who We Are</h2>
            <div
              className={`text-center transition-all duration-700 ${
                isWhoWeAreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                Wattif orchestrates building energy to reduce costs and unlock revenue - optimizing when and how
                buildings use power for peak reduction, grid market participation, and energy arbitrage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Start With Monitoring */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Why Start With Monitoring</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Before you can optimize energy usage or participate in grid services, you need to understand your
              building's consumption patterns and flexibility potential.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border-2 border-transparent hover:border-[#00D9C0]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Track exactly where your energy goes - by system, by floor, by hour. Know what's running when
                      building is empty, which equipment is inefficient, and where money is being wasted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-transparent hover:border-[#00D9C0]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Automated Compliance</h3>
                    <p className="text-muted-foreground">
                      Green Mark EUI tracking (Singapore) and NABERS data (Australia) automated. Always audit-ready. No
                      more manual spreadsheets or quarterly scrambles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-transparent hover:border-[#00D9C0]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Consumption Pattern Intelligence</h3>
                    <p className="text-muted-foreground">
                      Identify when and why peaks occur, what's running after-hours, which systems are inefficient. See
                      opportunities to reduce costs through better timing, load shifting, pre-cooling, and coordinating
                      with solar or storage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-transparent hover:border-[#00D9C0]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Flexibility Revenue Assessment</h3>
                    <p className="text-muted-foreground">
                      Calculate how much your building could earn from grid markets. Identify which loads can shift,
                      curtail, or respond - and what that's worth annually.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#00D9C0]/10 border border-[#00D9C0]/30 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-3">Similar to expensive Building Management Systems, but:</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">2-4 hours installation</div>
                    <div className="text-sm text-muted-foreground">Not months</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Non-invasive wireless</div>
                    <div className="text-sm text-muted-foreground">No major work</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">No cost</div>
                    <div className="text-sm text-muted-foreground">Free monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Monitor - Technical Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9C0]/10 rounded-full mb-4">
                <Activity className="w-4 h-4 text-[#00D9C0]" />
                <span className="text-sm font-medium text-[#00D9C0]">Comprehensive Monitoring</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">What We Monitor</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Complete visibility into your building's energy systems and consumption patterns
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Energy Management Card */}
              <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border-2 border-border hover:border-[#00D9C0]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00D9C0]/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00D9C0]/10 transition-all" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-[#00D9C0]" />
                    </div>
                    <h3 className="text-2xl font-bold">Energy Management</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    System-level monitoring across all major energy consumers
                  </p>

                  <div className="space-y-3">
                    {[
                      { icon: Activity, label: "Main electrical panels", detail: "Real-time load tracking" },
                      { icon: Activity, label: "HVAC systems", detail: "Chillers, AHUs, FCUs" },
                      { icon: Activity, label: "Lighting circuits", detail: "Zone-level control" },
                      { icon: Activity, label: "Major equipment", detail: "Individual monitoring" },
                      { icon: Activity, label: "Floor panels*", detail: "Floor-level tracking" },
                      { icon: Activity, label: "Individual Tenant consumption*", detail: "Per-tenant metering" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#00D9C0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-3 h-3 text-[#00D9C0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      * Requires additional sensors available for purchase
                    </p>
                  </div>
                </div>
              </div>

              {/* Data You See Card */}
              <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border-2 border-border hover:border-[#00D9C0]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00D9C0]/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00D9C0]/10 transition-all" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-[#00D9C0]" />
                    </div>
                    <h3 className="text-2xl font-bold">Data You See</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Actionable insights delivered in real-time dashboards
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: "Real-time consumption", value: "kW", color: "bg-blue-500" },
                      { label: "Energy usage", value: "kWh", color: "bg-green-500" },
                      { label: "Peak demand tracking", value: "Alerts", color: "bg-orange-500" },
                      { label: "System breakdowns", value: "By equipment", color: "bg-purple-500" },
                      { label: "Tenant consumption*", value: "Individual", color: "bg-pink-500" },
                      { label: "Cost attribution", value: "By system", color: "bg-yellow-500" },
                      { label: "Anomaly detection", value: "Auto", color: "bg-red-500" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-1.5 h-8 ${item.color} rounded-full`} />
                          <div className="font-medium text-sm">{item.label}</div>
                        </div>
                        <div className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">How We Do It</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enterprise-grade technology with simple, non-invasive installation
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0A4D5C] via-[#0F5A6B] to-[#1A6B7A] rounded-3xl p-12 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.15),transparent_60%)]" />

                <div className="relative z-10">
                  <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {[
                      {
                        icon: Wifi,
                        title: "Wireless sensors",
                        desc: "No wiring required",
                        metric: "2-4 hrs install",
                      },
                      {
                        icon: Wrench,
                        title: "Non-invasive",
                        desc: "Clamp installation",
                        metric: "Zero downtime",
                      },
                      {
                        icon: Lock,
                        title: "Encrypted",
                        desc: "Bank-grade security",
                        metric: "256-bit",
                      },
                      {
                        icon: Cloud,
                        title: "Cloud platform",
                        desc: "Access anywhere",
                        metric: "24/7",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Reliable",
                        desc: "Always-on tracking",
                        metric: "99.9% uptime",
                      },
                    ].map((item, i) => (
                      <div key={i} className="text-center group">
                        <div className="mb-6 flex justify-center">
                          <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                            <item.icon className="w-9 h-9 text-[#0A4D5C]" strokeWidth={1.5} />
                          </div>
                        </div>
                        <h4 className="font-bold text-lg mb-3 text-white">{item.title}</h4>
                        <p className="text-sm text-white/80 mb-4 leading-relaxed">{item.desc}</p>
                        <div className="inline-block text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                          {item.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It's Free */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We're Offering It Free</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* What We Give */}
              <div className="bg-card border-2 border-[#00D9C0]/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/10 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">What We Give You</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Free monitoring infrastructure (30 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Real-time energy intelligence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Automated compliance tracking (Green Mark, Scope 2)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Peak demand and cost reduction insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Flexibility revenue assessment</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* What We Get */}
              <div className="bg-card border-2 border-[#00D9C0]/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/10 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="w-12 h-12 bg-[#00D9C0]/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-[#00D9C0]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">What We Get</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Understanding of how your building operates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Data to build your building's unique optimization model
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Validation that our orchestration works for your specific conditions
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* After 30 Days */}
              <div className="bg-gradient-to-br from-[#00D9C0]/20 to-[#00D9C0]/10 border-2 border-[#00D9C0] rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/20 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="w-12 h-12 bg-[#00D9C0] rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">After 30 Days</h3>
                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-lg p-4 border-2 border-[#00D9C0]/30">
                      <div className="text-sm font-semibold mb-2">Continue monitoring with annual subscription</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">OR</span>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 border-2 border-[#00D9C0]">
                      <div className="text-sm font-semibold mb-2">Activate orchestration platform</div>
                      <div className="text-xs text-muted-foreground">
                        For demand response, peak management, frequency services, and energy arbitrage
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/90 rounded-lg border-2 border-[#00D9C0]">
                    <p className="text-sm font-bold text-center">You decide what's right for your building</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#00D9C0]/10 via-[#00D9C0]/5 to-transparent border-l-4 border-[#00D9C0] rounded-r-xl p-6 mb-8">
              <p className="text-lg font-medium text-foreground">
                Your building data stays yours. We learn your patterns to create tailored coordination strategies - not
                generic AI that treats all buildings the same.
              </p>
            </div>

            {/* The Trade Explanation */}
            <div className="bg-card border rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#00D9C0]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-[#00D9C0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">The Trade</h3>
                  <p className="text-lg text-muted-foreground">A fair exchange that benefits both sides</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">You get free monitoring</div>
                      <div className="text-sm text-muted-foreground">
                        Use it for operations, compliance, and decision-making
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">You keep your data</div>
                      <div className="text-sm text-muted-foreground">Full access and export capability</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Optional grid services participation</div>
                      <div className="text-sm text-muted-foreground">
                        Consider demand response, peak management, frequency services, or energy arbitrage when you're
                        ready
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">We improve our platform</div>
                      <div className="text-sm text-muted-foreground">Using aggregated, anonymized building data</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">We build relationships</div>
                      <div className="text-sm text-muted-foreground">With forward-thinking building operators</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">We earn when you earn</div>
                      <div className="text-sm text-muted-foreground">
                        Only through grid services revenue sharing (DR, peak management, frequency services, arbitrage)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* No Strings Attached */}
            <div className="bg-gradient-to-r from-[#00D9C0]/10 via-[#00D9C0]/5 to-transparent border-l-4 border-[#00D9C0] rounded-r-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#00D9C0] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">No Obligation. No Contracts. Cancel Anytime.</h3>
              </div>
              <p className="text-muted-foreground ml-13">
                If grid services markets don't develop as expected, or if buildings don't want to participate, we've
                given away free monitoring and our business model doesn't work. That's our risk, not yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started - Break Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#00D9C0]/10 via-[#00D9C0]/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,192,0.15),transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9C0]/20 backdrop-blur-sm rounded-full mb-6 border border-[#00D9C0]/40">
              <Check className="w-4 h-4 text-[#00D9C0]" />
              <span className="text-sm font-medium text-foreground">Free 30-Day Trial Available</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Get Started?</h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto">
              You've learned what we offer and why it's free. Check if your building qualifies, or keep reading to learn
              more about the details.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-[#00D9C0] hover:bg-[#00C4AD] text-gray-900 font-semibold text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Check Your Building's Eligibility
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 h-auto border-2 hover:bg-muted/50 bg-transparent"
                onClick={() => {
                  const nextSection = document.querySelector('[data-section="continue-reading"]')
                  nextSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Continue Reading
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-[#00D9C0]" />
                <span>No upfront cost</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-[#00D9C0]" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-[#00D9C0]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's In It For You */}
      <section data-section="continue-reading" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What's In It For Your Building</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-lg font-bold mb-4">Operational Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Equipment running when it shouldn't (after-hours HVAC is common)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Systems consuming more than they should</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Peak demand patterns and what's driving them</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-lg font-bold mb-4">Compliance Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Automatic Green Mark EUI tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Continuous monitoring for certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Scope 2 Emission tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Audit-ready performance data</span>
                  </li>
                </ul>
              </div>
              {/* CHANGE> Updated from DR Opportunity to Unlock Flexibility with new value-focused bullets */}
              <div className="bg-card rounded-xl p-6 border">
                <h3 className="text-lg font-bold mb-4">Unlock Flexibility</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Quantify your building's flexible capacity and revenue potential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Identify which loads can shift, curtail, or respond without impacting operations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Access multiple revenue streams: demand response, peak management, frequency services, energy
                      arbitrage
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Real Example */}
            <div className="bg-gradient-to-br from-[#00D9C0]/10 to-[#00D9C0]/5 border border-[#00D9C0]/30 rounded-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <Building2 className="w-8 h-8 text-[#00D9C0] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Real Example: 100,000 sq ft Office in CBD</h3>
                  <p className="text-muted-foreground">What actually happened with one of our buildings</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00D9C0] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Week 1</div>
                    <div className="text-muted-foreground">
                      Identified AHU serving empty space running 24/7 (S$2,400/month waste)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#00D9C0] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Week 2</div>
                    <div className="text-muted-foreground">
                      Mapped peak demand patterns, calculated 280 kW flexible capacity
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#00D9C0] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Day 30</div>
                    <div className="text-muted-foreground">
                      Building qualified for DR, enrolled in program, earning S$40K annually
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Today</div>
                    <div className="text-muted-foreground">
                      Still using free monitoring for operations and Green Mark compliance
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                Not a sales story. Just what actually happened.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Doesn't Do */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">What It Doesn't Do</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Let's be clear about what monitoring won't do:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 bg-card border rounded-lg p-4">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Won't automatically fix problems</div>
                  <div className="text-sm text-muted-foreground">You still need to act on insights</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border rounded-lg p-4">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Won't replace your facilities team</div>
                  <div className="text-sm text-muted-foreground">Their expertise is still essential</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border rounded-lg p-4">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Won't generate savings automatically</div>
                  <div className="text-sm text-muted-foreground">Requires changes from you</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border rounded-lg p-4">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Won't make DR participation automatic</div>
                  <div className="text-sm text-muted-foreground">That's your choice when ready</div>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl p-6 mt-8">
              <p className="text-lg font-semibold mb-2">Monitoring creates visibility.</p>
              <p className="text-muted-foreground">
                What you do with that visibility is up to you. Some buildings discover significant waste and take
                action. Others realize they're already well-optimized. Both outcomes are valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Makes Sense For */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Who This Makes Sense For</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-900">This is probably relevant if:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">10,000 m² commercial space</span> {/* Updated size to m² */}
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">Monthly energy bills over S$15,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">Needs Green Mark compliance data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">Curious about demand response eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">Wants visibility before making optimization investments</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-red-900">This probably isn't worth your time if:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">You already have comprehensive monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">Building is under 10,000 m²</span> {/* Updated to m² */}
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">Energy management isn't a priority right now</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">You prefer not having visibility into consumption</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 italic">
              These are genuine filters, not sales tactics. We're looking for buildings where there's mutual benefit.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Actually Works</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-[#00D9C0] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Installation (2-4 hours)</h3>
                  <p className="text-muted-foreground mb-3">
                    We install wireless current sensors on your major circuits - non-invasive clamp-on installation, no
                    downtime required. Connect to your building's internet (isolated, secure). Map your equipment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-[#00D9C0] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Dashboard Goes Live (24 hours)</h3>
                  <p className="text-muted-foreground mb-3">
                    You get login credentials and access to real-time data. We provide initial training on using the
                    dashboard.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-[#00D9C0] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">First Insights (7-10 days)</h3>
                  <p className="text-muted-foreground mb-3">
                    Baseline established, initial findings report delivered, discussion of opportunities, decide next
                    steps together.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-[#00D9C0] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Ongoing</h3>
                  <p className="text-muted-foreground mb-3">
                    Continuous monitoring, weekly reports, anomaly alerts. You review data and decide what's worth
                    acting on.
                  </p>
                </div>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Your Options After 30 Days:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">If you want grid services enrollment:</div>
                      <div className="text-sm text-muted-foreground">
                        We handle the paperwork, coordinate test events, set up protocols for demand response, peak
                        management, frequency services, or energy arbitrage. Revenue sharing starts when payments begin.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">If you don't want grid services:</div>
                      <div className="text-sm text-muted-foreground">
                        Keep using free monitoring for operations and compliance. We still benefit from the data to
                        improve our platform.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">If you want to stop:</div>
                      <div className="text-sm text-muted-foreground">
                        30 days notice, we schedule equipment pickup. Your data exports come with you.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Need From You */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Need From You</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00D9C0]" />
                  During Installation
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Access to electrical room/panels (2-4 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Building internet connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Equipment information if available</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00D9C0]" />
                  Ongoing
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Someone to review weekly reports (~15 minutes/week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Feedback on dashboard usability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Contact for technical questions</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-background rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold mb-3">What we don't need:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Large time commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Major operational changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upfront payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Long-term contracts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Questions You Might Have</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">What's the real catch?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    There isn't one, but I understand the skepticism. Here's the truth: if Singapore's and Australia's
                    grid services markets don't develop as we expect, or if buildings don't want to participate, we've
                    given away a lot of free monitoring and our business model doesn't work. That's our risk, not yours.
                  </p>
                  <p className="text-muted-foreground">
                    We're betting that grid services markets (demand response, peak management, frequency services,
                    energy arbitrage) will mature and expand, buildings will want to participate when they see the
                    revenue opportunity, and enough will participate to make our business viable. If we're wrong, you
                    got free monitoring and we wasted our investment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Why not just charge for monitoring?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Because the real value is in grid services participation (demand response, peak management,
                    frequency services, energy arbitrage), not monitoring. Monitoring is the foundation, but the
                    economic opportunity is in flexibility markets. We'd rather give away the foundation to build toward
                    the bigger opportunity.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What if we already have some monitoring?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If you already have comprehensive, real-time monitoring with grid services-grade measurement and
                    verification, you probably don't need ours. If your current monitoring is limited (utility bills
                    only, or basic BMS data), ours might complement it by providing the granular data needed for grid
                    services participation.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How do you make money if most buildings just take free monitoring?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We don't, unless enough buildings participate in grid services. That's the bet we're making. We need
                    the monitoring infrastructure in place before grid services markets fully mature. We're building the
                    foundation now for the opportunity we see coming. When buildings use our software to participate in
                    demand response, peak management, frequency services, or energy arbitrage, we earn a revenue share.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">What happens to our data?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Your building-specific data stays yours - you have full access and export capability. We use
                    aggregated, anonymized data to improve our algorithms (e.g., "commercial buildings in Singapore show
                    these peak patterns"). We never sell or share your specific data without consent.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">Why should we trust you?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You shouldn't blindly. Do your due diligence. Start with one building if you manage a portfolio. See
                    if we deliver what we promise. Ask for references. Trust is earned, not assumed.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="apply-form"
        className="py-16 md:py-24 bg-gradient-to-br from-[#0A1F2E] via-[#0F2A3A] to-[#1A4D5C] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,192,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(26,77,92,0.3),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Check Your Building's Eligibility
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              See if your building qualifies for free 30-day monitoring trial
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left Side - Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="bg-[#00D9C0]/10 border border-[#00D9C0]/30 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900">Building Qualifications:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">Commercial building 10,000 m²</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">Read Access to BMS</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#00D9C0] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">30-day monitoring commitment</span>
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
                      setFormData({ ...formData, buildingName: e.target.value })
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="squareFootage">Size of the Building</Label>
                    {/* Swap button order - m² first, sq ft second */}
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
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
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
                        Schedule Free Consultation
                      </a>
                    </Button>
                  </>
                )}

                {!isQualified &&
                  formData.squareFootage &&
                  Number.parseInt(formData.squareFootage) < getMinSquareFootageNumber() &&
                  isFormComplete() && (
                    <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-6 my-6 animate-in fade-in-from-bottom-4 duration-500">
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

            {/* Right Side - Dashboard Preview */}
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
                          <p className="text-xs text-muted-foreground">
                            Lighting system active outside business hours.
                          </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Check if your building qualifies for free 30-day monitoring trial. No cost, no contracts, no catch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#00D9C0] hover:bg-[#00C4AD] text-gray-900 font-semibold text-lg px-8"
                onClick={() => {
                  document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Check Your Building's Eligibility
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <a
                  href="https://calendly.com/wattif/exploring-wattif-energy-intelligence-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
