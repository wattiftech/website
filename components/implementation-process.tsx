import { Button } from "@/components/ui/button"
import { Check, Plug, Brain, TestTube, Zap, ArrowRight } from "lucide-react"

export function ImplementationProcess() {
  const steps = [
    {
      number: 1,
      title: "Connect & Integrate",
      timeline: "Week 1",
      icon: Plug,
      color: "from-blue-500 to-cyan-500",
      description: "We integrate with your existing building systems to start collecting data.",
      details: {
        heading: "What we connect to:",
        items: [
          "Building Management Systems (BMS) via standard protocols",
          "Energy meters and sub-meters",
          "HVAC equipment controllers",
          "Occupancy and temperature sensors",
        ],
      },
      process: {
        heading: "What happens:",
        items: [
          "Site survey and equipment assessment",
          "Data connection setup (read-only initially)",
          "Baseline measurement begins",
          "Historical utility bill analysis",
        ],
      },
      involvement: "2-hour site walkthrough, network access permissions",
    },
    {
      number: 2,
      title: "Learn & Model",
      timeline: "Weeks 2-3",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      description: "Our AI observes your building and creates a digital twin model.",
      details: {
        heading: "What we learn:",
        items: [
          "Thermal response of each zone to HVAC changes",
          "Equipment performance curves and efficiency patterns",
          "Occupancy schedules and usage patterns",
          "Weather impact on energy demand",
        ],
      },
      process: {
        heading: "What you see:",
        items: [
          "Weekly progress reports",
          "Preliminary savings opportunities identified",
          "Baseline vs. optimized performance comparison",
          "Estimated revenue potential from DR participation",
        ],
      },
      involvement: "Review findings, confirm operational constraints",
    },
    {
      number: 3,
      title: "Optimize & Test",
      timeline: "Week 4",
      icon: TestTube,
      color: "from-orange-500 to-red-500",
      description: "We activate smart control and validate performance before full deployment.",
      details: {
        heading: "What we optimize:",
        items: [
          "Pre-cooling strategies before peak price periods",
          "Equipment sequencing for maximum efficiency",
          "Load coordination across multiple systems",
          "Demand response event preparation",
        ],
      },
      process: {
        heading: "Controlled testing:",
        items: [
          "Small optimization tests during low-risk hours",
          "Temperature predictions validated against actual results",
          "Operational compliance confirmed",
          "DR capacity verified",
        ],
      },
      involvement: "Approve test scenarios, provide feedback on operational compliance",
    },
    {
      number: 4,
      title: "Automate & Earn",
      timeline: "Week 5+",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      description: "Full automation activated. Revenue generation begins.",
      details: {
        heading: "Continuous operation:",
        items: [
          "24/7 automated optimization within your constraints",
          "Automatic bidding into demand response markets",
          "Real-time adjustments based on weather and prices",
        ],
      },
      process: {
        heading: "What you track:",
        items: [
          "Live revenue dashboard (DR payments + savings)",
          "Performance metrics vs. baseline",
          "Operational compliance across all zones",
          "Equipment efficiency trends",
        ],
      },
      involvement:
        "Revenue payments begin after activation. Timing depends on market program settlement cycles and varies by location.",
    },
  ]

  const benefits = [
    "Activation in 8 weeks - Simply connect to your BMS",
    "No operational disruption during installation",
    "Guaranteed operational compliance",
    "24/7 support and monitoring",
  ]

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight px-4">
            Four Steps to Transform Your Building into a{" "}
            <span className="bg-gradient-to-r from-accent via-orange-500 to-accent bg-clip-text text-transparent">
              Grid-Responsive Asset
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Deploy in weeks. Earn from day one. No disruption to operations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-[52px] top-20 bottom-20 w-0.5 bg-gradient-to-b from-accent/20 via-accent/50 to-accent/20" />

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative group">
                  {/* Timeline connector dot */}
                  <div className="hidden lg:block absolute left-[42px] top-12 w-5 h-5 rounded-full bg-accent border-4 border-background shadow-lg shadow-accent/20 z-10 group-hover:scale-110 transition-transform duration-300" />

                  <div className="lg:ml-24 bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
                    {/* Colored top bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${step.color}`} />

                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-3 flex-shrink-0">
                        {/* Left: Icon, Number, Timeline */}
                        <div className="flex lg:flex-col items-center lg:items-start gap-3 sm:gap-4 lg:gap-3 flex-shrink-0">
                          <div
                            className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg shadow-accent/20 group-hover:shadow-xl group-hover:shadow-accent/30 transition-all duration-300 group-hover:scale-105`}
                          >
                            <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-card/80 transition-colors duration-300">
                              <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                            </div>
                          </div>
                          <div className="lg:text-center space-y-1">
                            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                              {String(step.number).padStart(2, "0")}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-accent px-2 sm:px-3 py-1 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300 invisible lg:flex hidden">
                              {step.timeline}
                            </div>
                          </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 space-y-4 sm:space-y-6">
                          <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-balance leading-tight">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                              {step.description}
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Details Column */}
                            <div className="space-y-2 sm:space-y-3 bg-secondary/30 rounded-xl p-4 sm:p-5">
                              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-accent flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-accent" />
                                {step.details.heading}
                              </h4>
                              <ul className="space-y-2 sm:space-y-2.5">
                                {step.details.items.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-xs sm:text-sm text-foreground/80 leading-relaxed flex gap-2 sm:gap-3"
                                  >
                                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Process Column */}
                            <div className="space-y-2 sm:space-y-3 bg-secondary/30 rounded-xl p-4 sm:p-5">
                              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-accent flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-accent" />
                                {step.process.heading}
                              </h4>
                              <ul className="space-y-2 sm:space-y-2.5">
                                {step.process.items.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-xs sm:text-sm text-foreground/80 leading-relaxed flex gap-2 sm:gap-3"
                                  >
                                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Your Involvement */}
                          <div className="pt-3 sm:pt-4 border-t border-border/50">
                            <p className="text-xs sm:text-sm leading-relaxed">
                              <span className="font-bold text-foreground">Your involvement:</span>{" "}
                              <span className="text-muted-foreground">{step.involvement}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-accent/5 via-secondary/50 to-accent/5 border-2 border-accent/20 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 bg-card/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50"
                  >
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col flex-wrap sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm sm:text-base group w-full sm:w-auto"
                  asChild
                >
                  <a href="#calculator" className="flex items-center justify-center">
                    <span className="text-left whitespace-break-spaces leading-[1.3]">Calculate Your Building's Revenue Potential</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-sm sm:text-base bg-transparent w-full sm:w-auto"
                  asChild
                >
                  <a href="#start-free-monitoring">Start 30-Day Free Monitoring</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
