"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Zap,
  TrendingUp,
  Clock,
  Leaf,
  CheckCircle2,
  XCircle,
  Info,
  ArrowRight,
  Calendar,
} from "lucide-react"

interface CalculatorResultsProps {
  results: any // The complete calculation results object
  inputs: any // The form inputs
  onClose?: () => void
}

export function CalculatorResults({ results, inputs, onClose }: CalculatorResultsProps) {
  const currency = inputs.country === "Singapore" ? "SGD" : "AUD"
  const isSingapore = inputs.country === "Singapore"

  // Format currency
  const formatCurrency = (amount: number) => {
    // Safety check for invalid values
    if (amount === null || amount === undefined || isNaN(amount)) {
      return `${currency} 0`
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace(currency, `${currency} `)
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    // Safety check for invalid values
    if (num === null || num === undefined || isNaN(num)) {
      return "0"
    }
    return new Intl.NumberFormat("en-US").format(Math.round(num))
  }

  // Get confidence color
  const getConfidenceColor = (score: number) => {
    if (score >= 86) return "text-green-600"
    if (score >= 71) return "text-yellow-600"
    if (score >= 51) return "text-orange-600"
    return "text-red-600"
  }

  const getConfidenceBg = (score: number) => {
    if (score >= 86) return "bg-green-600"
    if (score >= 71) return "bg-yellow-600"
    if (score >= 51) return "bg-orange-600"
    return "bg-red-600"
  }

  const getConfidenceLabel = (score: number) => {
    if (score >= 86) return "Excellent"
    if (score >= 71) return "Good"
    if (score >= 51) return "Medium"
    return "Low"
  }

  return (
    <div id="wattif-report-container" className="min-h-screen bg-background">
      {/* Header - Hidden in print */}
      <div className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{inputs.buildingName || "Your Building"}</h1>
            <p className="text-sm text-muted-foreground">
              {inputs.buildingType} • {inputs.city || inputs.country}
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Revenue Section */}
        <div className="mb-12 text-center">
          <div className="hidden print:block mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">{inputs.buildingName || "Your Building"}</h1>
            <p className="text-muted-foreground">
              {inputs.buildingType} • {inputs.city || inputs.country}
            </p>
          </div>
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Annual Revenue Potential</Badge>
          <div className="mb-2">
            <span className="text-5xl md:text-6xl font-bold text-foreground">
              {formatCurrency(results.revenue.total.conservative)}
            </span>
            <span className="text-3xl md:text-4xl text-muted-foreground mx-3">-</span>
            <span className="text-5xl md:text-6xl font-bold text-foreground">
              {formatCurrency(results.revenue.total.optimistic)}
            </span>
          </div>
          <p className="text-lg text-muted-foreground mb-6">Revenue from grid services and demand optimization</p>

          {/* Building Context */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{formatNumber(inputs.buildingSize)} sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>{formatNumber(results.consumption.finalMonthlyKwh)} kWh/month</span>
            </div>
          </div>
        </div>

        {/* Revenue Scenarios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Revenue Scenarios</CardTitle>
            <CardDescription>Three projections based on different participation levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Conservative */}
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">Conservative</div>
                <div className="text-2xl font-semibold mb-1">{formatCurrency(results.revenue.total.conservative)}</div>
                <div className="text-xs text-muted-foreground">60% participation</div>
              </div>

              {/* Realistic - Highlighted */}
              <div className="p-4 rounded-lg border-2 border-accent bg-accent/5 relative">
                <Badge className="absolute -top-2 right-4 bg-accent text-accent-foreground">Most Likely</Badge>
                <div className="text-sm text-muted-foreground mb-2">Realistic</div>
                <div className="text-2xl font-semibold mb-1 text-accent">
                  {formatCurrency(results.revenue.total.realistic)}
                </div>
                <div className="text-xs text-muted-foreground">75% participation</div>
              </div>

              {/* Optimistic */}
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">Optimistic</div>
                <div className="text-2xl font-semibold mb-1">{formatCurrency(results.revenue.total.optimistic)}</div>
                <div className="text-xs text-muted-foreground">90% participation</div>
              </div>
            </div>

            {/* Customer Share */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Your Share (70%)</div>
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(results.customerShare.realistic)}
                  </div>
                </div>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Wattif receives 30% revenue share only when you earn from grid services
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Breakdown of realistic scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Demand Charge Reduction / Load Shifting */}
              {results.breakdown.demandReduction.realistic > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <div className="font-medium">{isSingapore ? "Load Shifting" : "Demand Charge Reduction"}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(
                          (results.breakdown.demandReduction.realistic / results.revenue.total.realistic) * 100,
                        )}
                        % of total
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(results.breakdown.demandReduction.realistic)}
                  </div>
                </div>
              )}

              {/* DR Market */}
              {results.breakdown.drMarket.realistic > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <div className="font-medium">{isSingapore ? "DR Program Revenue" : "Grid Services (DR)"}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((results.breakdown.drMarket.realistic / results.revenue.total.realistic) * 100)}% of
                        total
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">{formatCurrency(results.breakdown.drMarket.realistic)}</div>
                </div>
              )}

              {/* FCAS */}
              {results.breakdown.fcas.realistic > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <div className="font-medium">FCAS Revenue</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((results.breakdown.fcas.realistic / results.revenue.total.realistic) * 100)}% of
                        total
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">{formatCurrency(results.breakdown.fcas.realistic)}</div>
                </div>
              )}

              {/* Solar */}
              {results.breakdown.solar.realistic > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <div className="font-medium">Solar Optimization</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((results.breakdown.solar.realistic / results.revenue.total.realistic) * 100)}% of
                        total
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">{formatCurrency(results.breakdown.solar.realistic)}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Flexible Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flexible Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                {formatNumber(results.flexCapacity.totalAvg)} <span className="text-xl text-muted-foreground">kW</span>
              </div>
              <div className="space-y-2 text-sm">
                {results.flexCapacity.hvacAvg > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HVAC</span>
                    <span className="font-medium">
                      {formatNumber(results.flexCapacity.hvacAvg)} kW
                      {results.flexCapacity.hvacAvgDuration > 0 && (
                        <span className="text-muted-foreground ml-1">({results.flexCapacity.hvacAvgDuration} min)</span>
                      )}
                    </span>
                  </div>
                )}
                {results.hvacCapacity?.isEstimated && (
                  <div className="text-xs text-muted-foreground italic">
                    HVAC capacity estimated: {results.hvacCapacity.tons} tons
                  </div>
                )}
                {results.flexCapacity.battery > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Battery</span>
                    <span className="font-medium">{formatNumber(results.flexCapacity.battery)} kW</span>
                  </div>
                )}
                {results.flexCapacity.ev > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EV Chargers</span>
                    <span className="font-medium">{formatNumber(results.flexCapacity.ev)} kW</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Time to Revenue */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time to First Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">{results.timeToRevenue.display}</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Assessment & installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Baseline & training period</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Market registration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CO2 Reduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CO₂ Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                {formatNumber(results.co2Reduction)} <span className="text-xl text-muted-foreground">tonnes/year</span>
              </div>
              <p className="text-sm text-muted-foreground">By shifting load away from peak fossil fuel hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Confidence Scores */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Confidence Scores</CardTitle>
            <CardDescription>How reliable are these estimates?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grid Competitiveness */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium mb-1">Grid Competitiveness</div>
                  <div className="text-sm text-muted-foreground">{results.confidence.explanations.gridExplanation}</div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getConfidenceColor(results.confidence.gridCompetitiveness)}`}>
                    {results.confidence.gridCompetitiveness}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getConfidenceLabel(results.confidence.gridCompetitiveness)}
                  </div>
                </div>
              </div>
              <Progress
                value={results.confidence.gridCompetitiveness}
                className="h-2"
                indicatorClassName={getConfidenceBg(results.confidence.gridCompetitiveness)}
              />
            </div>

            {/* Savings Confidence */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium mb-1">Savings Confidence</div>
                  <div className="text-sm text-muted-foreground">
                    {results.confidence.explanations.savingsExplanation}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getConfidenceColor(results.confidence.savingsConfidence)}`}>
                    {results.confidence.savingsConfidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getConfidenceLabel(results.confidence.savingsConfidence)}
                  </div>
                </div>
              </div>
              <Progress
                value={results.confidence.savingsConfidence}
                className="h-2"
                indicatorClassName={getConfidenceBg(results.confidence.savingsConfidence)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Program Eligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Eligibility</CardTitle>
            <CardDescription>Which grid programs your building qualifies for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(results.eligibility).map(([key, program]: [string, any]) => (
                <div key={key} className="flex items-start gap-3 p-3 rounded-lg border">
                  {program.eligible ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {key === "wdrm" && "WDRM (Wholesale Demand Response)"}
                      {key === "fcas" && "FCAS (Frequency Control)"}
                      {key === "peakReduction" && "Peak Reduction Program"}
                      {key === "stateCertificates" && "State Energy Certificates"}
                      {key === "vpp" && "Virtual Power Plant"}
                      {key === "singaporeDR" && "Singapore DR Markets"}
                    </div>
                    <div className="text-sm text-muted-foreground">{program.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 print:hidden border-2 border-accent bg-gradient-to-br from-accent/5 via-background to-accent/5">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-foreground">Start Your Free 30 Days Monitoring</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                See your actual energy patterns, validate these projections with real data, and discover hidden savings
                opportunities—all at zero cost and zero risk.
              </p>
              <div className="flex justify-center items-center mb-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <a
                    href="https://calendly.com/wattif/exploring-wattif-energy-intelligence-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>No upfront costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Real-time insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Expert support included</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <div className="text-xs text-muted-foreground space-y-2 border-t pt-6">
          <p>
            <strong>Disclaimer:</strong> Estimates based on industry benchmarks and typical building profiles. Actual
            results vary based on operational patterns, equipment efficiency, and market conditions. Detailed assessment
            will provide accurate projections.
          </p>
          <p>
            <strong>Data Sources:</strong> BCA Energy Benchmarking Report 2024 (Singapore), NABERS Database (Australia),
            AEMO Market Data (Australia)
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide everything except the report container */
          body > *:not(#__next) {
            display: none !important;
          }
          
          #__next > *:not(:has(#wattif-report-container)) {
            display: none !important;
          }
          
          /* Show only the report container */
          #wattif-report-container {
            display: block !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
          
          /* Prevent page breaks inside cards */
          .card {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Add page breaks between major sections */
          .mb-8 {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  )
}
