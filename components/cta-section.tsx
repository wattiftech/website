"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calculator, ArrowRight, CheckCircle2, Calendar, AlertCircle, Info, MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalculatorResults } from "@/components/calculator-results" // Import the new CalculatorResults component

import { Checkbox } from "@/components/ui/checkbox"

type BuildingSystem = {
  hvac: boolean
  hvacCapacity?: string // Added hvacCapacity
  bms: "none" | "basic" | "advanced"
  evCharging: boolean
  evChargerCount?: string
  battery: boolean
  batteryCapacity?: string
  solar: boolean
  solarCapacity?: string
  generators: boolean
  generatorCapacity?: string
  buildingRating?: string // Changed from nabersRating
}

type SingaporeData = {
  operatingHours: "Business" | "Extended" | "24/7" | "Seasonal" // Added operatingHours
}

type AustraliaData = {
  city: string
  state: string // Added state field
  operatingHours: "Business" | "Extended" | "24/7" | "Seasonal" // Added operatingHours
  demandTariff: "Standard" | "Peak" // Added demandTariff field
}

type BuildingData = {
  location: string
  buildingName: string
  buildingType: string
  floorArea: string
  monthlyConsumption: string
  actualAnnualMwh?: string // Added actualAnnualMwh
  systems: BuildingSystem
  singapore?: SingaporeData
  australia?: AustraliaData
}

// Define ContactData type
type ContactData = {
  name: string
  email: string
  company: string
  phone: string
}

type RevenueResults = {
  flexibleCapacity: {
    hvac: number
    hvacMinDuration: number
    hvacAvgDuration: number
    hvacMaxDuration: number
    battery: number
    ev: number
    total: number
  }
  conservativeRevenue: number
  realisticRevenue: number
  optimisticRevenue: number
  customerShare: {
    // Changed from ownerShare
    conservative: number
    realistic: number
    optimistic: number
  }
  revenueBreakdown: {
    // Updated structure
    demandReduction: { conservative: number; realistic: number; optimistic: number }
    drMarket: { conservative: number; realistic: number; optimistic: number }
    fcas?: { conservative: number; realistic: number; optimistic: number }
    solar?: { conservative: number; realistic: number; optimistic: number }
  }
  metrics: {
    // Updated structure
    peakDemand: number
    annualConsumption: number
    co2Reduction: number
  }
  confidence: {
    // Updated structure
    gridCompetitiveness: number
    savingsConfidence: number
    gridExplanation: string
    savingsExplanation: string
  }
  eligibility: Record<string, { eligible: boolean; reason: string }> // Updated structure
  timeToRevenue: {
    // Added timeToRevenue
    weeks: number
    months: number
    display: string
  }
  hvacCapacity?: {
    tons: number
    kW: number
    isEstimated: boolean
  }
  baseEUI?: number
  climateFactor?: number
  ratingFactor?: number
  adjustedEUI?: number
}

export function CTASection() {
  const [step, setStep] = useState<"form" | "contact" | "results" | "non-contestable">("form")

  const [buildingData, setBuildingData] = useState<BuildingData>({
    location: "",
    buildingName: "",
    buildingType: "",
    floorArea: "",
    monthlyConsumption: "",
    systems: {
      hvac: false,
      bms: "none",
      evCharging: false,
      battery: false,
      solar: false,
      generators: false,
    },
  })

  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    company: "",
    phone: "",
  })

  const [results, setResults] = useState<RevenueResults | null>(null)

  const calculateRevenue = (): RevenueResults => {
    if (buildingData.location === "singapore") {
      return calculateRevenueSingapore()
    } else {
      return calculateRevenueAustralia()
    }
  }

  const calculateRevenueSingapore = (): RevenueResults => {
    // STEP 1: Energy Consumption Calculation
    const EUI_DATABASE = {
      office: { low: 18, avg: 22, high: 28 },
      retail: { low: 28, avg: 35, high: 45 },
      hotel: { low: 30, avg: 38, high: 48 },
      hospital: { low: 45, avg: 60, high: 80 },
      education: { low: 12, avg: 16, high: 20 },
      mixed: { low: 20, avg: 26, high: 34 },
    }

    const RATING_FACTORS = {
      None: 1.0,
      Certified: 0.95,
      Gold: 0.9,
      GoldPLUS: 0.85,
      Platinum: 0.8,
      SLE: 0.7,
    }

    let eui = EUI_DATABASE[buildingData.buildingType as keyof typeof EUI_DATABASE]?.avg || 22
    const ratingFactor = RATING_FACTORS[buildingData.systems.buildingRating as keyof typeof RATING_FACTORS] || 1.0
    eui = eui * ratingFactor

    const floorArea = Number.parseFloat(buildingData.floorArea) || 0
    const estimatedAnnualKwh = floorArea * eui * 10.764 // Convert sqm to sqft
    const actualAnnualKwh = buildingData.actualAnnualMwh
      ? Number.parseFloat(buildingData.actualAnnualMwh) * 1000000
      : null
    const finalAnnualKwh = actualAnnualKwh || estimatedAnnualKwh

    // STEP 2: Peak Demand Calculation
    const OPERATING_HOURS = {
      Business: { hoursPerWeek: 50, peakFactor: 0.2 },
      Extended: { hoursPerWeek: 75, peakFactor: 0.25 },
      "24/7": { hoursPerWeek: 168, peakFactor: 0.35 },
      Seasonal: { hoursPerWeek: 40, peakFactor: 0.18 },
    }

    const operatingHours = buildingData.singapore?.operatingHours || "Business"
    const { hoursPerWeek, peakFactor } = OPERATING_HOURS[operatingHours]
    const annualOperatingHours = hoursPerWeek * 52
    const avgLoad = finalAnnualKwh / annualOperatingHours
    const peakDemand = avgLoad / peakFactor

    // STEP 3: Flexible Capacity Calculation
    let hvacFlex = { min: 0, avg: 0, max: 0, minDuration: 0, avgDuration: 0, maxDuration: 0 }
    let hvacCapacityEstimated = false
    let hvacCapacityMetadata: { tons: number; kW: number; isEstimated: boolean } | undefined

    if (buildingData.systems.hvac) {
      // Cooling density factors for estimation (tons per 100 sqm)
      const COOLING_DENSITY = {
        office: 0.4,
        retail: 0.6,
        hotel: 0.45,
        hospital: 0.7,
        education: 0.35,
        mixed: 0.45,
      }

      // COP (Coefficient of Performance) by building type
      const COP_MAP = {
        office: 3.2,
        retail: 2.8,
        hotel: 3.0,
        hospital: 2.8,
        education: 3.5,
        mixed: 3.0,
      }

      // Thermal mass factors (affects curtailment duration)
      const THERMAL_MASS_MAP = {
        office: 1.2,
        retail: 0.8,
        hotel: 1.0,
        hospital: 0.7,
        education: 1.3,
        mixed: 1.0,
      }

      const buildingTypeKey = buildingData.buildingType as keyof typeof COOLING_DENSITY
      const density = COOLING_DENSITY[buildingTypeKey] || 0.4
      const cop = COP_MAP[buildingTypeKey] || 3.0
      const thermalMass = THERMAL_MASS_MAP[buildingTypeKey] || 1.0

      // Determine HVAC capacity (actual or estimated)
      let coolingCapacityTons = 0
      if (buildingData.systems.hvacCapacity && Number.parseFloat(buildingData.systems.hvacCapacity) > 0) {
        // Use actual capacity provided by user
        coolingCapacityTons = Number.parseFloat(buildingData.systems.hvacCapacity)
        hvacCapacityEstimated = false
      } else {
        // Estimate capacity from building area
        const climateFactor = 1.0 // Singapore has consistent climate
        coolingCapacityTons = floorArea * (density / 100) * climateFactor
        hvacCapacityEstimated = true
      }

      // Calculate HVAC electrical demand
      const totalHVACDemand = (coolingCapacityTons * 3.517) / cop // 1 ton = 3.517 kW cooling
      const availableDemand = totalHVACDemand * 0.7 // 70% load factor during peak periods

      // Temperature derating for Singapore (32°C typical)
      const outdoorTemp = 32
      const tempDeration = outdoorTemp < 32 ? 1.0 : 0.85

      // BMS control factor (assumed for commercial buildings)
      const controlFactor = 0.95

      // Calculate flexibility ranges
      hvacFlex = {
        min: availableDemand * 0.3 * tempDeration * controlFactor,
        minDuration: 15,
        avg: availableDemand * 0.5 * thermalMass * tempDeration * controlFactor,
        avgDuration: Math.round(30 * thermalMass), // Duration in minutes
        max: availableDemand * 0.7 * thermalMass * tempDeration * controlFactor,
        maxDuration: Math.round(60 * thermalMass), // Duration in minutes
      }

      hvacCapacityMetadata = {
        tons: Math.round(coolingCapacityTons),
        kW: Math.round(totalHVACDemand),
        isEstimated: hvacCapacityEstimated,
      }
    }

    // Battery and EV flexibility (unchanged)
    const batteryKw = buildingData.systems.battery
      ? Number.parseFloat(buildingData.systems.batteryCapacity || "0") * 0.8
      : 0

    const evKw = buildingData.systems.evCharging
      ? Number.parseFloat(buildingData.systems.evChargerCount || "0") * 50 * 0.7
      : 0

    const totalFlexCapacity = {
      min: hvacFlex.min + batteryKw + evKw,
      avg: hvacFlex.avg + batteryKw + evKw,
      max: hvacFlex.max + batteryKw + evKw,
    }

    // STEP 4: Revenue Calculation

    // 4.1 Demand Shift Optimization Strategies
    const demandShiftOptimization = { conservative: 0, realistic: 0, optimistic: 0 }
    const strategies: string[] = []

    const hasHVAC = buildingData.systems.hvac && hvacFlex.avg > 0
    const hasSolar = buildingData.systems.solar && Number.parseFloat(buildingData.systems.solarCapacity || "0") > 0
    const hasBattery = buildingData.systems.battery && batteryKw > 0
    const hasEV = buildingData.systems.evCharging && evKw > 0

    // Strategy 1: HVAC Pre-Cooling (Singapore has limited 1-hour off-peak overlap)
    if (hasHVAC) {
      const preCoolingWindow = 1 // hour (6-7 AM off-peak overlap)
      const operatingDays = 260 // weekdays only
      const rateDifferential = 0.1 // SGD/kWh (peak vs off-peak)

      const thermalMassFactors: Record<string, number> = {
        office: 0.3,
        retail: 0.2,
        hotel: 0.25,
        hospital: 0.15,
        education: 0.35,
        mixed: 0.25,
      }

      const shiftableFactor = thermalMassFactors[buildingData.buildingType] || 0.25
      const shiftableLoad = hvacFlex.avg * shiftableFactor

      const preCooling = {
        conservative: shiftableLoad * preCoolingWindow * operatingDays * rateDifferential * 0.8,
        realistic: shiftableLoad * preCoolingWindow * operatingDays * rateDifferential * 1.0,
        optimistic: shiftableLoad * preCoolingWindow * operatingDays * rateDifferential * 1.2,
      }

      demandShiftOptimization.conservative += preCooling.conservative
      demandShiftOptimization.realistic += preCooling.realistic
      demandShiftOptimization.optimistic += preCooling.optimistic
      strategies.push("HVAC Pre-Cooling")
    }

    // Strategy 2: Solar Self-Consumption (HVAC + Solar)
    if (hasHVAC && hasSolar && !hasBattery) {
      const solarCapacity = Number.parseFloat(buildingData.systems.solarCapacity || "0")
      const solarProfile = {
        peakGeneration: solarCapacity,
        generationHours: 4.5,
      }

      const feedInTariff = 0.1 // SGD/kWh
      const retailRate = 0.3 // SGD/kWh (peak rate)
      const valueDifferential = retailRate - feedInTariff

      const baselineSelfConsumption = 0.6
      const optimizedSelfConsumption = 0.75
      const additionalSelfConsumption = optimizedSelfConsumption - baselineSelfConsumption

      const annualGeneration = solarCapacity * solarProfile.generationHours * 365
      const additionalValue = annualGeneration * additionalSelfConsumption * valueDifferential

      const solarOpt = {
        conservative: additionalValue * 0.8,
        realistic: additionalValue * 1.0,
        optimistic: additionalValue * 1.2,
      }

      demandShiftOptimization.conservative += solarOpt.conservative
      demandShiftOptimization.realistic += solarOpt.realistic
      demandShiftOptimization.optimistic += solarOpt.optimistic
      strategies.push("Solar Self-Consumption")
    }

    // Strategy 3: Battery-HVAC Coordination (HVAC + Battery, no Solar)
    if (hasHVAC && hasBattery && !hasSolar) {
      const batteryUsableCapacity = batteryKw * 0.9
      const roundTripEfficiency = 0.95
      const peakRate = 0.3
      const offPeakRate = 0.2
      const differential = 0.1

      const dailyCycles = 1
      const batteryArbitrage = batteryUsableCapacity * dailyCycles * 365 * differential * roundTripEfficiency

      const hvacPeakLoad = hvacFlex.avg * 0.7
      const hoursCovered = Math.min(4, batteryUsableCapacity / hvacPeakLoad)
      const hvacPeakAvoidance = hvacPeakLoad * hoursCovered * 260 * differential

      const batteryOpt = {
        conservative: (batteryArbitrage + hvacPeakAvoidance) * 0.7,
        realistic: (batteryArbitrage + hvacPeakAvoidance) * 0.85,
        optimistic: (batteryArbitrage + hvacPeakAvoidance) * 1.0,
      }

      demandShiftOptimization.conservative += batteryOpt.conservative
      demandShiftOptimization.realistic += batteryOpt.realistic
      demandShiftOptimization.optimistic += batteryOpt.optimistic
      strategies.push("Battery-HVAC Coordination")
    }

    // Strategy 4: Triple Asset Optimization (HVAC + Solar + Battery)
    if (hasHVAC && hasSolar && hasBattery) {
      const solarCapacity = Number.parseFloat(buildingData.systems.solarCapacity || "0")
      const batteryUsable = batteryKw * 0.9
      const efficiency = 0.95

      // 1. Solar self-consumption maximization
      const solarAnnualGen = solarCapacity * 4.5 * 365
      const baselineSelfCons = 0.6
      const withBatteryBuffering = 0.85
      const additionalSelfCons = withBatteryBuffering - baselineSelfCons
      const solarValue = solarAnnualGen * additionalSelfCons * (0.3 - 0.1)

      // 2. Battery arbitrage
      const batteryArbitrage = batteryUsable * 1 * 365 * 0.1 * efficiency

      // 3. Peak avoidance synergy
      const hvacPeakLoad = hvacFlex.avg * 0.7
      const solarCoverage = Math.min(solarCapacity, hvacPeakLoad) * 4 * 260
      const batteryCoverage = Math.min(batteryUsable / hvacPeakLoad, 8) * hvacPeakLoad * 260
      const peakAvoidance = (solarCoverage + batteryCoverage) * 0.1 * 0.8

      const totalValue = solarValue + batteryArbitrage + peakAvoidance

      const tripleOpt = {
        conservative: totalValue * 0.75,
        realistic: totalValue * 0.9,
        optimistic: totalValue * 1.0,
      }

      demandShiftOptimization.conservative += tripleOpt.conservative
      demandShiftOptimization.realistic += tripleOpt.realistic
      demandShiftOptimization.optimistic += tripleOpt.optimistic
      strategies.push("Integrated Asset Optimization")
    }

    // Strategy 5: EV Smart Charging
    if (hasEV) {
      const numChargers = Number.parseFloat(buildingData.systems.evChargerCount || "0")
      const chargerPower = 50 // kW per charger
      const avgUtilization = 0.5
      const avgSessionDuration = 3 // hours
      const operatingDays = 260

      const dailyChargingkWh = numChargers * chargerPower * avgUtilization * avgSessionDuration
      const differential = 0.1
      const shiftablePercent = 0.8

      const annualSavings = dailyChargingkWh * operatingDays * shiftablePercent * differential

      const evOpt = {
        conservative: annualSavings * 0.7,
        realistic: annualSavings * 0.85,
        optimistic: annualSavings * 1.0,
      }

      demandShiftOptimization.conservative += evOpt.conservative
      demandShiftOptimization.realistic += evOpt.realistic
      demandShiftOptimization.optimistic += evOpt.optimistic
      strategies.push("EV Smart Charging")
    }

    // 4.2 DR Market Revenue (Active NOW - Capacity + Energy Payments)
    const SINGAPORE_DR_RATES = {
      capacityPayment: { min: 20, avg: 25, max: 30 }, // SGD/kW/year
      energyPayment: { min: 1.0, avg: 1.5, max: 2.0 }, // SGD/kWh
      expectedEvents: { min: 3, avg: 5, max: 8 }, // events per year
      eventDuration: 3, // hours per event
    }

    const drCapacity = {
      min: hvacFlex.min + evKw,
      avg: hvacFlex.avg + evKw,
      max: hvacFlex.max + evKw,
    }

    const drRevenue = {
      conservative:
        drCapacity.min * SINGAPORE_DR_RATES.capacityPayment.min +
        drCapacity.min *
          SINGAPORE_DR_RATES.eventDuration *
          SINGAPORE_DR_RATES.expectedEvents.min *
          SINGAPORE_DR_RATES.energyPayment.min,
      realistic:
        drCapacity.avg * SINGAPORE_DR_RATES.capacityPayment.avg +
        drCapacity.avg *
          SINGAPORE_DR_RATES.eventDuration *
          SINGAPORE_DR_RATES.expectedEvents.avg *
          SINGAPORE_DR_RATES.energyPayment.avg,
      optimistic:
        drCapacity.max * SINGAPORE_DR_RATES.capacityPayment.max +
        drCapacity.max *
          SINGAPORE_DR_RATES.eventDuration *
          SINGAPORE_DR_RATES.expectedEvents.max *
          SINGAPORE_DR_RATES.energyPayment.max,
    }

    // 4.3 Solar Optimization (if applicable) - REMOVED, now part of demand shift optimization
    const solarValue = { conservative: 0, realistic: 0, optimistic: 0 }

    // Total Revenue
    const totalRevenue = {
      conservative: demandShiftOptimization.conservative + drRevenue.conservative + solarValue.conservative,
      realistic: demandShiftOptimization.realistic + drRevenue.realistic + solarValue.realistic,
      optimistic: demandShiftOptimization.optimistic + drRevenue.optimistic + solarValue.optimistic,
    }

    // Customer Share (70%)
    const wattifShare = 0.3
    const customerShare = {
      conservative: totalRevenue.conservative * (1 - wattifShare),
      realistic: totalRevenue.realistic * (1 - wattifShare),
      optimistic: totalRevenue.optimistic * (1 - wattifShare),
    }

    // STEP 5: Program Eligibility
    const eligibility = {
      singaporeDR: {
        eligible: totalFlexCapacity.avg >= 100,
        reason:
          totalFlexCapacity.avg >= 100
            ? "Your building qualifies for Singapore's DR market"
            : "Requires minimum 100 kW flexible capacity for Singapore DR market",
      },
      vpp: {
        eligible: buildingData.systems.battery && buildingData.systems.solar,
        reason:
          buildingData.systems.battery && buildingData.systems.solar
            ? "Battery + solar combination enables VPP participation"
            : "Requires both battery storage and solar PV",
      },
    }

    // STEP 6: Confidence Scoring
    let gridScore = 0
    const flexRatio = totalFlexCapacity.avg / peakDemand
    if (flexRatio >= 0.5) gridScore += 30
    else if (flexRatio >= 0.4) gridScore += 25
    else if (flexRatio >= 0.3) gridScore += 20
    else if (flexRatio >= 0.2) gridScore += 15
    else gridScore += 10

    const highFlexTypes = ["office", "education"]
    if (highFlexTypes.includes(buildingData.buildingType)) {
      gridScore += 20
    } else {
      gridScore += 15
    }

    gridScore += 10 // Future markets
    const eligiblePrograms = Object.values(eligibility).filter((p) => p.eligible).length
    gridScore += Math.min(20, eligiblePrograms * 5) // Max 20 points for eligible programs

    if (buildingData.systems.battery && buildingData.systems.solar) {
      gridScore += 10
    } else if (buildingData.systems.battery || buildingData.systems.solar) {
      gridScore += 6
    } else {
      gridScore += 3
    }

    const gridCompetitiveness = Math.min(100, gridScore)

    let savingsScore = 0
    if (actualAnnualKwh) {
      savingsScore += 40
    } else {
      savingsScore += 15
    }

    if (buildingData.systems.buildingRating && buildingData.systems.buildingRating !== "None") {
      savingsScore += 20
    } else {
      savingsScore += 10
    }

    // Add points for HVAC capacity data quality
    if (buildingData.systems.hvac) {
      if (buildingData.systems.hvacCapacity && Number.parseFloat(buildingData.systems.hvacCapacity) > 0) {
        savingsScore += 15 // Actual HVAC capacity provided
      } else {
        savingsScore += 5 // Estimated HVAC capacity
      }
    }

    // Check presence of key systems
    const systems = [
      buildingData.systems.hvac,
      buildingData.systems.solar,
      buildingData.systems.battery,
      buildingData.systems.evCharging,
      buildingData.systems.buildingRating !== "None", // Consider rating as a system feature
    ]
    const knownSystems = systems.filter(Boolean).length
    savingsScore += (knownSystems / 5) * 20 // Max 20 points for known systems

    const highPredictability = ["office", "education", "retail"]
    if (highPredictability.includes(buildingData.buildingType)) {
      savingsScore += 20
    } else {
      savingsScore += 15
    }

    const savingsConfidence = Math.min(100, savingsScore)

    let gridExplanation = ""
    if (gridCompetitiveness >= 85) {
      gridExplanation = "Highly competitive - strong flexible capacity, ideal building type, multiple programs"
    } else if (gridCompetitiveness >= 70) {
      gridExplanation = "Good potential - consider adding battery or expanding HVAC flexibility"
    } else if (gridCompetitiveness >= 50) {
      gridExplanation = "Can participate but limited opportunities - focus on demand charge reduction first"
    } else {
      gridExplanation = "Limited potential - start with monitoring to identify specific opportunities"
    }

    let savingsExplanation = ""
    if (savingsConfidence >= 80) {
      savingsExplanation = "High confidence - based on actual consumption data and verified building characteristics"
    } else if (savingsConfidence >= 60) {
      savingsExplanation =
        "Moderate confidence - estimates based on industry benchmarks. Free monitoring will provide precise calculations"
    } else if (savingsConfidence >= 40) {
      savingsExplanation = "Lower confidence due to limited building data. Assessment recommended"
    } else {
      savingsExplanation = "Limited confidence - building type has high variability. Detailed assessment essential"
    }

    if (hvacCapacityEstimated && buildingData.systems.hvac) {
      savingsExplanation +=
        ". HVAC capacity was estimated - providing actual capacity would improve accuracy by up to 10 points"
    }

    // STEP 7: Time to Revenue
    let weeks = 1.5 // Assessment phase
    if (floorArea < 5000) {
      weeks += 1
    } else if (floorArea < 15000) {
      weeks += 2
    } else {
      weeks += 4
    }
    weeks += 12 // Baseline for future markets
    weeks += 2 // Training
    weeks += 2 // Testing
    if (totalFlexCapacity.avg >= 100) {
      weeks += 2 // Registration
    }

    const months = Math.round(weeks / 4)
    const years = months >= 12 ? Math.round(months / 12) : 0
    const timeToRevenue = {
      weeks: Math.round(weeks),
      months: months,
      display: years > 0 ? `${years} year${years > 1 ? "s" : ""}` : `${months} months`,
    }

    // STEP 8: CO2 Reduction
    const emissionFactor = 0.4085 // kg CO2/kWh for Singapore grid
    const carbonAvoidanceHours = 365 * 2 // Assume 2 hours per day for DR participation
    const co2ReductionKg = totalFlexCapacity.avg * carbonAvoidanceHours * emissionFactor
    const co2Reduction = Math.round(co2ReductionKg / 1000) // Convert kg to tonnes

    return {
      flexibleCapacity: {
        hvac: Math.round(hvacFlex.avg),
        hvacMinDuration: hvacFlex.minDuration,
        hvacAvgDuration: hvacFlex.avgDuration,
        hvacMaxDuration: hvacFlex.maxDuration,
        battery: Math.round(batteryKw),
        ev: Math.round(evKw),
        total: Math.round(totalFlexCapacity.avg),
      },
      conservativeRevenue: totalRevenue.conservative,
      realisticRevenue: totalRevenue.realistic,
      optimisticRevenue: totalRevenue.optimistic,
      customerShare: customerShare,
      revenueBreakdown: {
        demandReduction: demandShiftOptimization, // Now represents comprehensive demand shift optimization
        drMarket: drRevenue,
        solar: solarValue,
      },
      metrics: {
        peakDemand: Math.round(peakDemand),
        annualConsumption: Math.round(finalAnnualKwh),
        co2Reduction: co2Reduction,
      },
      confidence: {
        gridCompetitiveness: gridCompetitiveness,
        savingsConfidence: savingsConfidence,
        gridExplanation: gridExplanation,
        savingsExplanation: savingsExplanation,
      },
      eligibility: eligibility,
      timeToRevenue: timeToRevenue,
      hvacCapacity: hvacCapacityMetadata,
      baseEUI: EUI_DATABASE[buildingData.buildingType as keyof typeof EUI_DATABASE]?.avg || 22,
      climateFactor: 1.0, // No climate factor in Singapore
      ratingFactor: ratingFactor,
      adjustedEUI: eui,
    }
  }

  const calculateRevenueAustralia = (): RevenueResults => {
    // STEP 1: Energy Consumption Calculation
    const EUI_DATABASE = {
      office: { low: 15, avg: 20, high: 26 },
      retail: { low: 25, avg: 32, high: 42 },
      hotel: { low: 25, avg: 35, high: 45 },
      hospital: { low: 40, avg: 55, high: 75 },
      education: { low: 10, avg: 14, high: 18 },
      mixed: { low: 18, avg: 24, high: 32 },
    }

    const CLIMATE_FACTORS = {
      Sydney: 0.95,
      Melbourne: 0.9,
      Brisbane: 1.05,
      Adelaide: 1.1,
      Perth: 1.05,
    }

    const RATING_FACTORS = {
      None: 1.0,
      "1": 1.1,
      "2": 1.05,
      "3": 1.0,
      "4": 0.9,
      "4.5": 0.85,
      "5": 0.8,
      "5.5": 0.75,
      "6": 0.7,
    }

    let eui = EUI_DATABASE[buildingData.buildingType as keyof typeof EUI_DATABASE]?.avg || 20
    const city = buildingData.australia?.city || "Sydney"
    const climateFactor = CLIMATE_FACTORS[city as keyof typeof CLIMATE_FACTORS] || 1.0
    eui = eui * climateFactor

    const ratingFactor = RATING_FACTORS[buildingData.systems.buildingRating as keyof typeof RATING_FACTORS] || 1.0
    eui = eui * ratingFactor

    const floorArea = Number.parseFloat(buildingData.floorArea) || 0
    const estimatedAnnualKwh = floorArea * eui * 10.764 // Convert sqm to sqft
    const actualAnnualKwh = buildingData.actualAnnualMwh
      ? Number.parseFloat(buildingData.actualAnnualMwh) * 1000000
      : null
    const finalAnnualKwh = actualAnnualKwh || estimatedAnnualKwh

    // STEP 2: Peak Demand Calculation
    const OPERATING_HOURS = {
      Business: { hoursPerWeek: 50, peakFactor: 0.2 },
      Extended: { hoursPerWeek: 75, peakFactor: 0.25 },
      "24/7": { hoursPerWeek: 168, peakFactor: 0.35 },
      Seasonal: { hoursPerWeek: 40, peakFactor: 0.18 },
    }

    const operatingHours = buildingData.australia?.operatingHours || "Business"
    const { hoursPerWeek, peakFactor } = OPERATING_HOURS[operatingHours]
    const annualOperatingHours = hoursPerWeek * 52
    const avgLoad = finalAnnualKwh / annualOperatingHours
    const peakDemand = avgLoad / peakFactor

    // STEP 3: Flexible Capacity Calculation
    let hvacFlex = { min: 0, avg: 0, max: 0, minDuration: 0, avgDuration: 0, maxDuration: 0 }
    let hvacCapacityEstimated = false
    let hvacCapacityMetadata: { tons: number; kW: number; isEstimated: boolean } | undefined

    if (buildingData.systems.hvac) {
      // Cooling density factors for estimation (tons per 100 sqm)
      const COOLING_DENSITY = {
        office: 0.4,
        retail: 0.6,
        hotel: 0.45,
        hospital: 0.7,
        education: 0.35,
        mixed: 0.45,
      }

      // COP (Coefficient of Performance) by building type
      const COP_MAP = {
        office: 3.2,
        retail: 2.8,
        hotel: 3.0,
        hospital: 2.8,
        education: 3.5,
        mixed: 3.0,
      }

      // Thermal mass factors (affects curtailment duration)
      const THERMAL_MASS_MAP = {
        office: 1.2,
        retail: 0.8,
        hotel: 1.0,
        hospital: 0.7,
        education: 1.3,
        mixed: 1.0,
      }

      // City-specific outdoor temperatures (peak demand periods)
      const CITY_TEMPERATURES = {
        Sydney: 35,
        Melbourne: 38,
        Brisbane: 34,
        Adelaide: 40,
        Perth: 38,
      }

      const buildingTypeKey = buildingData.buildingType as keyof typeof COOLING_DENSITY
      const density = COOLING_DENSITY[buildingTypeKey] || 0.4
      const cop = COP_MAP[buildingTypeKey] || 3.0
      const thermalMass = THERMAL_MASS_MAP[buildingTypeKey] || 1.0
      const outdoorTemp = CITY_TEMPERATURES[city as keyof typeof CITY_TEMPERATURES] || 35

      // Determine HVAC capacity (actual or estimated)
      let coolingCapacityTons = 0
      if (buildingData.systems.hvacCapacity && Number.parseFloat(buildingData.systems.hvacCapacity) > 0) {
        // Use actual capacity provided by user
        coolingCapacityTons = Number.parseFloat(buildingData.systems.hvacCapacity)
        hvacCapacityEstimated = false
      } else {
        // Estimate capacity from building area with climate adjustment
        coolingCapacityTons = floorArea * (density / 100) * climateFactor
        hvacCapacityEstimated = true
      }

      // Calculate HVAC electrical demand
      const totalHVACDemand = (coolingCapacityTons * 3.517) / cop // 1 ton = 3.517 kW cooling
      const availableDemand = totalHVACDemand * 0.7 // 70% load factor during peak periods

      // Temperature derating based on city
      let tempDeration
      if (outdoorTemp < 28) tempDeration = 1.0
      else if (outdoorTemp < 32) tempDeration = 0.85
      else if (outdoorTemp < 35) tempDeration = 0.7
      else if (outdoorTemp < 38) tempDeration = 0.55
      else tempDeration = 0.45 // Adelaide extreme heat

      // BMS control factor (assumed for commercial buildings)
      const controlFactor = 0.95

      // Calculate flexibility ranges
      hvacFlex = {
        min: availableDemand * 0.3 * tempDeration * controlFactor,
        minDuration: 15,
        avg: availableDemand * 0.5 * thermalMass * tempDeration * controlFactor,
        avgDuration: Math.round(30 * thermalMass), // Duration in minutes
        max: availableDemand * 0.7 * thermalMass * tempDeration * controlFactor,
        maxDuration: Math.round(60 * thermalMass), // Duration in minutes
      }

      hvacCapacityMetadata = {
        tons: Math.round(coolingCapacityTons),
        kW: Math.round(totalHVACDemand),
        isEstimated: hvacCapacityEstimated,
      }
    }

    // Battery and EV flexibility (unchanged)
    const batteryKw = buildingData.systems.battery
      ? Number.parseFloat(buildingData.systems.batteryCapacity || "0") * 0.8
      : 0

    const evKw = buildingData.systems.evCharging
      ? Number.parseFloat(buildingData.systems.evChargerCount || "0") * 50 * 0.7
      : 0

    const totalFlexCapacity = {
      min: hvacFlex.min + batteryKw + evKw,
      avg: hvacFlex.avg + batteryKw + evKw,
      max: hvacFlex.max + batteryKw + evKw,
    }

    // STEP 4: Revenue Calculation
    // 4.1 Demand Charge Savings
    const DEMAND_CHARGES = {
      Sydney: 20.0, // AUD/kW/month
      Melbourne: 19.0, // Updated Melbourne demand charge
      Brisbane: 18.0,
      Adelaide: 19.0,
      Perth: 17.5,
    }

    const demandRate = DEMAND_CHARGES[city as keyof typeof DEMAND_CHARGES] || 19.0
    const demandSavings = {
      conservative: totalFlexCapacity.min * 0.3 * demandRate * 12, // Using 30% reduction factor
      realistic: totalFlexCapacity.avg * 0.5 * demandRate * 12, // Using 50% reduction factor
      optimistic: totalFlexCapacity.max * 0.7 * demandRate * 12, // Using 70% reduction factor
    }

    // 4.1.5 Demand Shift Optimization Strategies
    const demandShiftOptimization = { conservative: 0, realistic: 0, optimistic: 0 }
    const strategies: string[] = []

    const hasHVAC = buildingData.systems.hvac && hvacFlex.avg > 0
    const hasSolar = buildingData.systems.solar && Number.parseFloat(buildingData.systems.solarCapacity || "0") > 0
    const hasBattery = buildingData.systems.battery && batteryKw > 0
    const hasEV = buildingData.systems.evCharging && evKw > 0

    // TOU rate structures by state
    const TOU_RATES: Record<string, { peakToOffPeak: number; peakToShoulder: number; shoulderRate: number }> = {
      NSW: { peakToOffPeak: 0.27, peakToShoulder: 0.17, shoulderRate: 0.28 },
      VIC: { peakToOffPeak: 0.26, peakToShoulder: 0.16, shoulderRate: 0.26 },
      QLD: { peakToOffPeak: 0.23, peakToShoulder: 0.15, shoulderRate: 0.25 },
      SA: { peakToOffPeak: 0.29, peakToShoulder: 0.18, shoulderRate: 0.3 },
      WA: { peakToOffPeak: 0.23, peakToShoulder: 0.14, shoulderRate: 0.24 },
    }

    const CITY_TO_STATE = {
      Sydney: "NSW",
      Melbourne: "VIC",
      Brisbane: "QLD",
      Adelaide: "SA",
      Perth: "WA",
    }

    const state = buildingData.australia?.state || CITY_TO_STATE[city as keyof typeof CITY_TO_STATE] || "NSW"
    const touRates = TOU_RATES[state] || TOU_RATES.NSW

    // Strategy 1: HVAC Load Shifting (Pre-cooling + Shoulder Shifting)
    if (hasHVAC) {
      const operatingDays = 260
      const thermalMassFactors: Record<string, number> = {
        office: 0.35,
        retail: 0.25,
        hotel: 0.3,
        hospital: 0.2,
        education: 0.4,
        mixed: 0.3,
      }

      const shiftableFactor = thermalMassFactors[buildingData.buildingType] || 0.3

      // Pre-cooling: 2 hours before peak
      const preCooling = {
        window: 2,
        shiftableLoad: hvacFlex.avg * shiftableFactor,
        differential: touRates.peakToShoulder,
      }

      // Evening shift: 1 hour to shoulder
      const eveningShift = {
        window: 1,
        shiftableLoad: hvacFlex.avg * shiftableFactor * 0.5,
        differential: touRates.peakToShoulder,
      }

      const totalDailyShift =
        preCooling.shiftableLoad * preCooling.window + eveningShift.shiftableLoad * eveningShift.window

      const hvacShift = {
        conservative: totalDailyShift * operatingDays * preCooling.differential * 0.7,
        realistic: totalDailyShift * operatingDays * preCooling.differential * 0.85,
        optimistic: totalDailyShift * operatingDays * preCooling.differential * 1.0,
      }

      demandShiftOptimization.conservative += hvacShift.conservative
      demandShiftOptimization.realistic += hvacShift.realistic
      demandShiftOptimization.optimistic += hvacShift.optimistic
      strategies.push("HVAC Load Shifting")
    }

    // Strategy 2: Solar Self-Consumption (HVAC + Solar, no Battery)
    if (hasHVAC && hasSolar && !hasBattery) {
      const solarCapacity = Number.parseFloat(buildingData.systems.solarCapacity || "0")
      const solarProfile = {
        peakGeneration: solarCapacity,
        generationHours: 4.0,
      }

      const feedInTariff = 0.08 // AUD/kWh
      const retailRate = touRates.shoulderRate
      const valueDifferential = retailRate - feedInTariff

      const baselineSelfConsumption = 0.6
      const optimizedSelfConsumption = 0.75
      const additionalSelfConsumption = optimizedSelfConsumption - baselineSelfConsumption

      const annualGeneration = solarCapacity * solarProfile.generationHours * 365
      const additionalValue = annualGeneration * additionalSelfConsumption * valueDifferential

      const solarOpt = {
        conservative: additionalValue * 0.8,
        realistic: additionalValue * 1.0,
        optimistic: additionalValue * 1.2,
      }

      demandShiftOptimization.conservative += solarOpt.conservative
      demandShiftOptimization.realistic += solarOpt.realistic
      demandShiftOptimization.optimistic += solarOpt.optimistic
      strategies.push("Solar Self-Consumption")
    }

    // Strategy 3: Battery-HVAC Coordination (HVAC + Battery, no Solar)
    if (hasHVAC && hasBattery && !hasSolar) {
      const batteryUsableCapacity = batteryKw * 0.9
      const roundTripEfficiency = 0.95
      const peakRate = 0.3
      const offPeakRate = 0.2
      const differential = 0.1

      const dailyCycles = 1
      const batteryArbitrage = batteryUsableCapacity * dailyCycles * 365 * differential * roundTripEfficiency

      const hvacPeakLoad = hvacFlex.avg * 0.7
      const hoursCovered = Math.min(4, batteryUsableCapacity / hvacPeakLoad)
      const hvacPeakAvoidance = hvacPeakLoad * hoursCovered * 260 * differential

      const batteryOpt = {
        conservative: (batteryArbitrage + hvacPeakAvoidance) * 0.7,
        realistic: (batteryArbitrage + hvacPeakAvoidance) * 0.85,
        optimistic: (batteryArbitrage + hvacPeakAvoidance) * 1.0,
      }

      demandShiftOptimization.conservative += batteryOpt.conservative
      demandShiftOptimization.realistic += batteryOpt.realistic
      demandShiftOptimization.optimistic += batteryOpt.optimistic
      strategies.push("Battery-HVAC Coordination")
    }

    // Strategy 4: Triple Asset Optimization (HVAC + Solar + Battery)
    if (hasHVAC && hasSolar && hasBattery) {
      const solarCapacity = Number.parseFloat(buildingData.systems.solarCapacity || "0")
      const batteryUsable = batteryKw * 0.9
      const efficiency = 0.95

      // 1. Solar self-consumption maximization
      const solarAnnualGen = solarCapacity * 4.0 * 365

      // 1. Midday solar direct use
      const middaySolar = Math.min(solarCapacity, hvacFlex.avg * 0.6) * 4 * 260
      const middayValue = middaySolar * (touRates.shoulderRate - 0.08)

      // 2. Battery peak coverage
      const peakHours = 6
      const hvacPeakLoad = hvacFlex.avg * 0.8
      const batteryPeakDischarge = Math.min(batteryUsable, hvacPeakLoad * peakHours) * 260
      const peakValue = batteryPeakDischarge * touRates.peakToShoulder * efficiency

      // 3. Remaining battery arbitrage
      const remainingBatteryCapacity = batteryUsable * 0.3 // 30% for additional arbitrage
      const offPeakArbitrage = remainingBatteryCapacity * 260 * touRates.peakToOffPeak * efficiency

      const totalValue = middayValue + peakValue + offPeakArbitrage

      const tripleOpt = {
        conservative: totalValue * 0.75,
        realistic: totalValue * 0.9,
        optimistic: totalValue * 1.0,
      }

      demandShiftOptimization.conservative += tripleOpt.conservative
      demandShiftOptimization.realistic += tripleOpt.realistic
      demandShiftOptimization.optimistic += tripleOpt.optimistic
      strategies.push("Integrated Asset Optimization")
    }

    // Strategy 5: EV Smart Charging
    if (hasEV) {
      const numChargers = Number.parseFloat(buildingData.systems.evChargerCount || "0")
      const chargerPower = 50
      const avgUtilization = 0.5
      const avgSessionDuration = 3
      const operatingDays = 260

      const dailyChargingkWh = numChargers * chargerPower * avgUtilization * avgSessionDuration
      const shiftablePercent = 0.75

      const annualSavings = dailyChargingkWh * operatingDays * shiftablePercent * touRates.peakToOffPeak

      const evOpt = {
        conservative: annualSavings * 0.7,
        realistic: annualSavings * 0.85,
        optimistic: annualSavings * 1.0,
      }

      demandShiftOptimization.conservative += evOpt.conservative
      demandShiftOptimization.realistic += evOpt.realistic
      demandShiftOptimization.optimistic += evOpt.optimistic
      strategies.push("EV Smart Charging")
    }

    // 4.2 WDRM Revenue (Event-based, net of aggregator cut)
    const wdrmCapacity = {
      min: hvacFlex.min + evKw,
      avg: hvacFlex.avg + evKw,
      max: hvacFlex.max + evKw,
    }

    const drRevenue = {
      conservative: wdrmCapacity.min >= 50 ? wdrmCapacity.min * 10 * 2 * 1.5 : 0, // 10 events × 2 hrs × $1.50/kWh
      realistic: wdrmCapacity.avg >= 50 ? wdrmCapacity.avg * 15 * 2.5 * 2.0 : 0, // 15 events × 2.5 hrs × $2.00/kWh
      optimistic: wdrmCapacity.max >= 50 ? wdrmCapacity.max * 20 * 3 * 3.0 : 0, // 20 events × 3 hrs × $3.00/kWh
    }

    // 4.3 FCAS Revenue (Battery only, net rates)
    const FCAS_NET_RATES = {
      NSW: { conservative: 220, realistic: 330, optimistic: 480 }, // AUD/kW/year (net)
      VIC: { conservative: 200, realistic: 300, optimistic: 450 },
      QLD: { conservative: 180, realistic: 270, optimistic: 400 },
      SA: { conservative: 280, realistic: 420, optimistic: 600 },
      WA: { conservative: 150, realistic: 220, optimistic: 320 },
    }

    const fcasRevenue =
      buildingData.systems.battery && batteryKw >= 50 // Added 50 kW minimum for FCAS
        ? (() => {
            const fcasRates = FCAS_NET_RATES[state as keyof typeof FCAS_NET_RATES]
            return {
              conservative: batteryKw * fcasRates.conservative,
              realistic: batteryKw * fcasRates.realistic,
              optimistic: batteryKw * fcasRates.optimistic,
            }
          })()
        : { conservative: 0, realistic: 0, optimistic: 0 }

    // 4.4 Solar Optimization (if applicable) - REMOVED, now part of demand shift optimization
    const solarValue = { conservative: 0, realistic: 0, optimistic: 0 }

    // 4.5 State Certificates (NSW/VIC only)
    const stateCertificates = ["NSW", "VIC"].includes(state)
      ? (() => {
          const certValue = state === "NSW" ? 40 : 30 // AUD per certificate
          const certsPerKW = 0.65
          const flexCapacity = totalFlexCapacity.avg
          return flexCapacity * certsPerKW * certValue
        })()
      : 0

    // Total Revenue
    const totalRevenue = {
      conservative:
        demandSavings.conservative +
        demandShiftOptimization.conservative +
        drRevenue.conservative +
        fcasRevenue.conservative +
        solarValue.conservative +
        stateCertificates,
      realistic:
        demandSavings.realistic +
        demandShiftOptimization.realistic +
        drRevenue.realistic +
        fcasRevenue.realistic +
        solarValue.realistic +
        stateCertificates,
      optimistic:
        demandSavings.optimistic +
        demandShiftOptimization.optimistic +
        drRevenue.optimistic +
        fcasRevenue.optimistic +
        solarValue.optimistic +
        stateCertificates,
    }

    // Customer Share (70%)
    const wattifShare = 0.3
    const customerShare = {
      conservative: totalRevenue.conservative * (1 - wattifShare),
      realistic: totalRevenue.realistic * (1 - wattifShare),
      optimistic: totalRevenue.optimistic * (1 - wattifShare),
    }

    // STEP 5: Program Eligibility
    const eligibility = {
      wdrm: {
        eligible: totalFlexCapacity.avg >= 100, // Updated WDRM eligibility to 100 kW minimum (0.1 MW)
        reason:
          totalFlexCapacity.avg >= 100
            ? "Your building meets the 0.1 MW minimum for WDRM participation"
            : "Requires minimum 0.1 MW (100 kW) flexible capacity",
      },
      fcas: {
        eligible: buildingData.systems.battery && batteryKw >= 50, // Updated FCAS eligibility to 50 kW minimum
        reason:
          buildingData.systems.battery && batteryKw >= 50
            ? "Battery storage enables fast frequency response services"
            : "Requires battery storage ≥ 50 kW",
      },
      peakReduction: {
        eligible: buildingData.systems.hvac && hvacFlex.avg >= 50,
        reason:
          hvacFlex.avg >= 50
            ? "Eligible for utility peak demand reduction programs and RERT"
            : "Requires minimum 50 kW HVAC flexibility",
      },
      stateCertificates: {
        eligible: ["NSW", "VIC"].includes(state), // Added state certificates for NSW/VIC
        reason: ["NSW", "VIC"].includes(state)
          ? "Your state offers energy savings certificates for demand response"
          : "State certificate programs not available in your location",
      },
      vpp: {
        eligible: buildingData.systems.battery && buildingData.systems.solar,
        reason:
          buildingData.systems.battery && buildingData.systems.solar
            ? "Battery + solar combination enables VPP participation"
            : "Requires both battery storage and solar PV",
      },
    }

    // STEP 6: Confidence Scoring
    let gridScore = 0
    const flexRatio = totalFlexCapacity.avg / peakDemand
    if (flexRatio >= 0.5) gridScore += 30
    else if (flexRatio >= 0.4) gridScore += 25
    else if (flexRatio >= 0.3) gridScore += 20
    else if (flexRatio >= 0.2) gridScore += 15
    else gridScore += 10

    const highFlexTypes = ["office", "education"]
    if (highFlexTypes.includes(buildingData.buildingType)) {
      gridScore += 20
    } else {
      gridScore += 15
    }

    gridScore += 20 // Active markets
    const eligiblePrograms = Object.values(eligibility).filter((p) => p.eligible).length
    gridScore += Math.min(20, eligiblePrograms * 5) // Max 20 points for eligible programs

    if (buildingData.systems.battery && buildingData.systems.solar) {
      gridScore += 10
    } else if (buildingData.systems.battery || buildingData.systems.solar) {
      gridScore += 6
    } else {
      gridScore += 3
    }

    const gridCompetitiveness = Math.min(100, gridScore)

    let savingsScore = 0
    if (actualAnnualKwh) {
      savingsScore += 40
    } else {
      savingsScore += 15
    }

    if (buildingData.systems.buildingRating && buildingData.systems.buildingRating !== "None") {
      savingsScore += 20
    } else {
      savingsScore += 10
    }

    // Add points for HVAC capacity data quality
    if (buildingData.systems.hvac) {
      if (buildingData.systems.hvacCapacity && Number.parseFloat(buildingData.systems.hvacCapacity) > 0) {
        savingsScore += 15 // Actual HVAC capacity provided
      } else {
        savingsScore += 5 // Estimated HVAC capacity
      }
    }

    // Check presence of key systems
    const systems = [
      buildingData.systems.hvac,
      buildingData.systems.solar,
      buildingData.systems.battery,
      buildingData.systems.evCharging,
      buildingData.systems.buildingRating !== "None", // Consider rating as a system feature
    ]
    const knownSystems = systems.filter(Boolean).length
    savingsScore += (knownSystems / 5) * 20 // Max 20 points for known systems

    const highPredictability = ["office", "education", "retail"]
    if (highPredictability.includes(buildingData.buildingType)) {
      savingsScore += 20
    } else {
      savingsScore += 15
    }

    const savingsConfidence = Math.min(100, savingsScore)

    let gridExplanation = ""
    if (gridCompetitiveness >= 85) {
      gridExplanation = "Highly competitive - strong flexible capacity, ideal building type, multiple programs"
    } else if (gridCompetitiveness >= 70) {
      gridExplanation = "Good potential - consider adding battery or expanding HVAC flexibility"
    } else if (gridCompetitiveness >= 50) {
      gridExplanation = "Can participate but limited opportunities - focus on demand charge reduction first"
    } else {
      gridExplanation = "Limited potential - start with monitoring to identify specific opportunities"
    }

    let savingsExplanation = ""
    if (savingsConfidence >= 80) {
      savingsExplanation = "High confidence - based on actual consumption data and verified building characteristics"
    } else if (savingsConfidence >= 60) {
      savingsExplanation =
        "Moderate confidence - estimates based on industry benchmarks. Free monitoring will provide precise calculations"
    } else if (savingsConfidence >= 40) {
      savingsExplanation = "Lower confidence due to limited building data. Assessment recommended"
    } else {
      savingsExplanation = "Limited confidence - building type has high variability. Detailed assessment essential"
    }

    if (hvacCapacityEstimated && buildingData.systems.hvac) {
      savingsExplanation +=
        ". HVAC capacity was estimated - providing actual capacity would improve accuracy by up to 10 points"
    }

    // STEP 7: Time to Revenue
    let weeks = 1.5 // Assessment phase
    if (floorArea < 5000) {
      weeks += 1
    } else if (floorArea < 15000) {
      weeks += 2
    } else {
      weeks += 4
    }
    weeks += 4 // Baseline
    weeks += 2 // Training
    weeks += 2 // Testing
    if (totalFlexCapacity.avg >= 100) {
      weeks += 2 // Registration
    }

    const months = Math.round(weeks / 4)
    const years = months >= 12 ? Math.round(months / 12) : 0
    const timeToRevenue = {
      weeks: Math.round(weeks),
      months: months,
      display: years > 0 ? `${years} year${years > 1 ? "s" : ""}` : `${months} months`,
    }

    // STEP 8: CO2 Reduction
    // Emission factors vary by state grid
    const EMISSION_FACTORS = {
      NSW: 0.81, // kg CO2/kWh
      VIC: 0.95,
      QLD: 0.82,
      SA: 0.51,
      WA: 0.71,
    }

    const emissionFactor = EMISSION_FACTORS[state as keyof typeof EMISSION_FACTORS] || 0.81 // Default to NSW
    const carbonAvoidanceHours = 365 * 2 // Assume 2 hours per day for DR participation
    const co2ReductionKg = totalFlexCapacity.avg * carbonAvoidanceHours * emissionFactor
    const co2Reduction = Math.round(co2ReductionKg / 1000) // Convert kg to tonnes

    return {
      flexibleCapacity: {
        hvac: Math.round(hvacFlex.avg),
        hvacMinDuration: hvacFlex.minDuration,
        hvacAvgDuration: hvacFlex.avgDuration,
        hvacMaxDuration: hvacFlex.maxDuration,
        battery: Math.round(batteryKw),
        ev: Math.round(evKw),
        total: Math.round(totalFlexCapacity.avg),
      },
      conservativeRevenue: totalRevenue.conservative,
      realisticRevenue: totalRevenue.realistic,
      optimisticRevenue: totalRevenue.optimistic,
      customerShare: customerShare,
      revenueBreakdown: {
        demandReduction: demandSavings, // Keep as demand charge savings for Australia
        drMarket: drRevenue,
        fcas: fcasRevenue,
        solar: demandShiftOptimization, // Use solar field for demand shift optimization display
      },
      metrics: {
        peakDemand: Math.round(peakDemand),
        annualConsumption: Math.round(finalAnnualKwh),
        co2Reduction: co2Reduction,
      },
      confidence: {
        gridCompetitiveness: gridCompetitiveness,
        savingsConfidence: savingsConfidence,
        gridExplanation: gridExplanation,
        savingsExplanation: savingsExplanation,
      },
      eligibility: eligibility,
      timeToRevenue: timeToRevenue,
      hvacCapacity: hvacCapacityMetadata,
      baseEUI: EUI_DATABASE[buildingData.buildingType as keyof typeof EUI_DATABASE]?.avg || 20,
      climateFactor: climateFactor,
      ratingFactor: ratingFactor,
      adjustedEUI: eui,
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] handleFormSubmit called")
    console.log("[v0] buildingData:", JSON.stringify(buildingData))

    // Check for Singapore's non-contestable customer criteria
    if (buildingData.location === "singapore") {
      const monthlyConsumptionNum = Number.parseFloat(buildingData.monthlyConsumption)
      // Only check if user provided consumption data AND it's a positive number
      if (buildingData.monthlyConsumption && monthlyConsumptionNum > 0 && monthlyConsumptionNum < 2000) {
        console.log("[v0] Singapore building does not meet contestable customer threshold")
        setStep("non-contestable")
        return
      }
    }
    // </CHANGE>

    console.log("[v0] Calculating revenue...")
    const calculatedResults = calculateRevenue()
    console.log("[v0] Results calculated:", calculatedResults)
    setResults(calculatedResults)
    setStep("results")
  }

  const handleContactSubmit = () => {
    if (!contactData.name || !contactData.email || !contactData.company) {
      alert("Please fill in all contact fields")
      return
    }
    // const calculatedResults = calculateRevenue() // REMOVED - results are set in handleFormSubmit
    // setResults(calculatedResults)
    // setStep("results")
  }

  const resetCalculator = () => {
    setStep("form")
    setBuildingData({
      location: "",
      buildingName: "", // Resetting buildingName
      buildingType: "",
      floorArea: "",
      monthlyConsumption: "",
      actualAnnualMwh: "", // Resetting the new field
      systems: {
        hvac: false,
        bms: "none",
        evCharging: false,
        battery: false,
        solar: false,
        generators: false,
      },
    })
    setContactData({ name: "", email: "", company: "", phone: "" })
    setResults(null)
  }

  return (
    <section id="calculator" className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {step === "form" && (
            <Card className="p-6 sm:p-8 lg:p-12 shadow-2xl border-2">
              <TooltipProvider>
                <div className="space-y-6 sm:space-8">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/10 mb-2 sm:mb-4">
                      <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                      Discover How Much Your Building Can Earn
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg text-pretty">
                      Calculate your building's revenue potential from demand response and grid services in 2 minutes
                    </p>
                  </div>

                  <div className="space-y-5 sm:space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm sm:text-base font-semibold">
                        {/* Updated numbering from 1 to 1 */}
                        1. Building Location *
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setBuildingData({
                              ...buildingData,
                              location: "australia",
                              australia: { state: "NSW", operatingHours: "Business", demandTariff: "Standard" },
                              singapore: undefined,
                            })
                          }
                          className={`relative p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 text-left group hover:border-accent/50 hover:shadow-md ${
                            buildingData.location === "australia"
                              ? "border-accent bg-accent/5 shadow-md"
                              : "border-border bg-background"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                                buildingData.location === "australia"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground group-hover:bg-accent/10"
                              }`}
                            >
                              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base sm:text-lg mb-1">Australia</h3>
                            </div>
                            {buildingData.location === "australia" && (
                              <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-accent" />
                            )}
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setBuildingData({
                              ...buildingData,
                              location: "singapore",
                              singapore: { operatingHours: "Business" },
                              australia: undefined,
                            })
                          }
                          className={`relative p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 text-left group hover:border-accent/50 hover:shadow-md ${
                            buildingData.location === "singapore"
                              ? "border-accent bg-accent/5 shadow-md"
                              : "border-border bg-background"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                                buildingData.location === "singapore"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground group-hover:bg-accent/10"
                              }`}
                            >
                              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base sm:text-lg mb-1">Singapore</h3>
                            </div>
                            {buildingData.location === "singapore" && (
                              <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-accent" />
                            )}
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="building-name" className="text-sm sm:text-base font-semibold">
                        2. Building Name *
                      </Label>
                      <Input
                        id="building-name"
                        type="text"
                        placeholder="e.g., Marina Bay Tower"
                        value={buildingData.buildingName}
                        onChange={(e) => setBuildingData({ ...buildingData, buildingName: e.target.value })}
                        required
                      />
                    </div>

                    {buildingData.location === "australia" && (
                      <div className="space-y-2">
                        <Label htmlFor="au-city" className="text-sm sm:text-base font-semibold">
                          {/* Updated numbering from 2 to 3 */}
                          3. City *
                        </Label>
                        <Select
                          value={buildingData.australia?.city || ""}
                          onValueChange={(value) =>
                            setBuildingData({
                              ...buildingData,
                              australia: { ...buildingData.australia, city: value } as AustraliaData,
                            })
                          }
                        >
                          <SelectTrigger id="au-city">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sydney">Sydney</SelectItem>
                            <SelectItem value="Melbourne">Melbourne</SelectItem>
                            <SelectItem value="Brisbane">Brisbane</SelectItem>
                            <SelectItem value="Adelaide">Adelaide</SelectItem>
                            <SelectItem value="Perth">Perth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Common questions for both locations */}
                    {buildingData.location && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="building-type" className="text-sm sm:text-base font-semibold">
                            4. Building Type *
                          </Label>
                          <Select
                            value={buildingData.buildingType}
                            onValueChange={(value) => setBuildingData({ ...buildingData, buildingType: value })}
                          >
                            <SelectTrigger id="building-type">
                              <SelectValue placeholder="Select building type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office">Office</SelectItem>
                              <SelectItem value="retail">Retail / Shopping Mall</SelectItem>
                              <SelectItem value="hotel">Hotel</SelectItem>
                              <SelectItem value="hospital">Hospital / Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="mixed">Mixed-use</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="floor-area" className="text-base font-medium">
                            5. Total Floor Area (sqm) *
                          </Label>
                          <div className="flex items-center gap-3">
                            <Input
                              id="floor-area"
                              type="number"
                              min={10000}
                              step={500}
                              placeholder="e.g., 15000"
                              value={buildingData.floorArea}
                              onChange={(e) => {
                                setBuildingData({ ...buildingData, floorArea: e.target.value })
                              }}
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground whitespace-nowrap">sqm (min 10,000)</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="operating-hours" className="text-sm sm:text-base font-semibold">
                            6. Operating Hours *
                          </Label>
                          <Select
                            value={
                              buildingData.location === "singapore"
                                ? buildingData.singapore?.operatingHours || ""
                                : buildingData.australia?.operatingHours || ""
                            }
                            onValueChange={(value: "Business" | "Extended" | "24/7" | "Seasonal") => {
                              if (buildingData.location === "singapore") {
                                setBuildingData({
                                  ...buildingData,
                                  singapore: { ...buildingData.singapore, operatingHours: value } as SingaporeData,
                                })
                              } else {
                                setBuildingData({
                                  ...buildingData,
                                  australia: { ...buildingData.australia, operatingHours: value } as AustraliaData,
                                })
                              }
                            }}
                          >
                            <SelectTrigger id="operating-hours">
                              <SelectValue placeholder="Select operating hours" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Business">Business Hours (Mon-Fri, 9am-6pm)</SelectItem>
                              <SelectItem value="Extended">Extended Hours (Mon-Sat, 7am-10pm)</SelectItem>
                              <SelectItem value="24/7">24/7 Operations</SelectItem>
                              <SelectItem value="Seasonal">Seasonal Operations</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="monthly-consumption" className="text-sm sm:text-base font-semibold">
                              7. Monthly Electricity Consumption (kWh)
                            </Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" className="inline-flex items-center">
                                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-semibold mb-1">Improves Accuracy</p>
                                <p className="text-sm">
                                  We'll estimate consumption based on your building characteristics. Providing actual
                                  data increases your confidence score by up to 25 points and gives more precise revenue
                                  calculations.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-xs text-muted-foreground italic ml-auto">Optional</span>
                          </div>
                          <Input
                            id="monthly-consumption"
                            type="number"
                            placeholder="e.g., 180000"
                            value={buildingData.monthlyConsumption}
                            onChange={(e) => setBuildingData({ ...buildingData, monthlyConsumption: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="building-rating" className="text-sm sm:text-base font-semibold">
                            8. Building Rating (Optional)
                          </Label>
                          <Select
                            value={buildingData.systems.buildingRating || ""}
                            onValueChange={(value) =>
                              setBuildingData({
                                ...buildingData,
                                systems: { ...buildingData.systems, buildingRating: value },
                              })
                            }
                          >
                            <SelectTrigger id="building-rating">
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                              {buildingData.location === "singapore" ? (
                                <>
                                  <SelectItem value="None">No Rating</SelectItem>
                                  <SelectItem value="Certified">Green Mark Certified</SelectItem>
                                  <SelectItem value="Gold">Green Mark Gold</SelectItem>
                                  <SelectItem value="GoldPLUS">Green Mark GoldPLUS</SelectItem>
                                  <SelectItem value="Platinum">Green Mark Platinum</SelectItem>
                                  <SelectItem value="SLE">Green Mark SLE</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="None">No Rating</SelectItem>
                                  <SelectItem value="1">1 Star</SelectItem>
                                  <SelectItem value="2">2 Stars</SelectItem>
                                  <SelectItem value="3">3 Stars</SelectItem>
                                  <SelectItem value="4">4 Stars</SelectItem>
                                  <SelectItem value="4.5">4.5 Stars</SelectItem>
                                  <SelectItem value="5">5 Stars</SelectItem>
                                  <SelectItem value="5.5">5.5 Stars</SelectItem>
                                  <SelectItem value="6">6 Stars</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm sm:text-base font-semibold">9. Key Systems & Assets</Label>
                          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hvac"
                                  checked={buildingData.systems.hvac}
                                  onCheckedChange={(checked) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, hvac: checked as boolean },
                                    })
                                  }
                                />
                                <label htmlFor="hvac" className="text-sm cursor-pointer">
                                  Central HVAC
                                </label>
                              </div>
                              {buildingData.systems.hvac && (
                                <div className="space-y-1">
                                  <Input
                                    type="number"
                                    placeholder="Cooling Capacity (tons/RT)"
                                    className="text-sm"
                                    value={buildingData.systems.hvacCapacity || ""}
                                    onChange={(e) =>
                                      setBuildingData({
                                        ...buildingData,
                                        systems: { ...buildingData.systems, hvacCapacity: e.target.value },
                                      })
                                    }
                                  />
                                  <p className="text-xs text-muted-foreground italic">
                                    Optional - We'll estimate if not provided
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="battery"
                                  checked={buildingData.systems.battery}
                                  onCheckedChange={(checked) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, battery: checked as boolean },
                                    })
                                  }
                                />
                                <label htmlFor="battery" className="text-sm cursor-pointer">
                                  Battery Storage
                                </label>
                              </div>
                              {buildingData.systems.battery && (
                                <Input
                                  type="number"
                                  placeholder="Capacity (kWh)"
                                  className="text-sm"
                                  value={buildingData.systems.batteryCapacity || ""}
                                  onChange={(e) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, batteryCapacity: e.target.value },
                                    })
                                  }
                                />
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="solar"
                                  checked={buildingData.systems.solar}
                                  onCheckedChange={(checked) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, solar: checked as boolean },
                                    })
                                  }
                                />
                                <label htmlFor="solar" className="text-sm cursor-pointer">
                                  Solar PV
                                </label>
                              </div>
                              {buildingData.systems.solar && (
                                <Input
                                  type="number"
                                  placeholder="Capacity (kW)"
                                  className="text-sm"
                                  value={buildingData.systems.solarCapacity || ""}
                                  onChange={(e) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, solarCapacity: e.target.value },
                                    })
                                  }
                                />
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="ev-charging"
                                  checked={buildingData.systems.evCharging}
                                  onCheckedChange={(checked) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, evCharging: checked as boolean },
                                    })
                                  }
                                />
                                <label htmlFor="ev-charging" className="text-sm cursor-pointer">
                                  EV Chargers
                                </label>
                              </div>
                              {buildingData.systems.evCharging && (
                                <Input
                                  type="number"
                                  placeholder="Quantity"
                                  className="text-sm"
                                  value={buildingData.systems.evChargerCount || ""}
                                  onChange={(e) =>
                                    setBuildingData({
                                      ...buildingData,
                                      systems: { ...buildingData.systems, evChargerCount: e.target.value },
                                    })
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={handleFormSubmit}
                  >
                    Calculate Revenue Potential
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </TooltipProvider>
            </Card>
          )}

          {step === "non-contestable" && (
            <Card className="p-6 sm:p-8 lg:p-12 shadow-2xl border-2 border-orange-500/50">
              <div className="space-y-6 sm:space-8">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-orange-500/10 mb-2 sm:mb-4">
                    <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                    Your Building Does Not Currently Qualify
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg text-pretty">
                    Singapore's DR and IL programmes are available only to <strong>contestable customers</strong>{" "}
                    consuming ≥2,000 kWh/month (approximately $550+ monthly bill).
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Your reported consumption: <strong>{buildingData.monthlyConsumption} kWh/month</strong>
                  </AlertDescription>
                </Alert>

                <Card className="p-4 sm:p-6 bg-muted/50">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Your Options:</h3>
                  <div className="space-y-3 sm:space-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Energy Efficiency</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Reduce SP Services costs through optimized consumption
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Future Eligibility</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Expand operations to exceed 2,000 kWh/month threshold
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Portfolio Aggregation</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Combine multiple buildings to reach contestable status
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 bg-accent/5">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">What We Can Still Help With:</h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Tariff optimization within regulated SP Services rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Energy efficiency improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Preparation for future DR participation when you grow</span>
                    </li>
                  </ul>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent" onClick={resetCalculator}>
                    Try Another Building
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === "contact" && (
            <Card className="p-6 sm:p-8 lg:p-12 shadow-2xl border-2">
              <div className="space-y-6 sm:space-8">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/10 mb-2 sm:mb-4">
                    <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                    Almost There!
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg text-pretty">
                    Enter your details to see your personalized revenue potential
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Tan"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.tan@company.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="ABC Properties Pte Ltd"
                      value={contactData.company}
                      onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+65 9123 4567"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("form")}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={handleContactSubmit}
                  >
                    See My Results
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === "results" && results && (
            <CalculatorResults
              results={{
                revenue: {
                  total: {
                    conservative: results.conservativeRevenue,
                    realistic: results.realisticRevenue,
                    optimistic: results.optimisticRevenue,
                  },
                },
                customerShare: {
                  conservative: results.customerShare.conservative,
                  realistic: results.customerShare.realistic,
                  optimistic: results.customerShare.optimistic,
                },
                breakdown: {
                  demandReduction: results.revenueBreakdown.demandReduction,
                  drMarket: {
                    conservative: results.revenueBreakdown.drMarket.conservative,
                    realistic: results.revenueBreakdown.drMarket.realistic,
                    optimistic: results.revenueBreakdown.drMarket.optimistic,
                  },
                  fcas: results.revenueBreakdown.fcas || {
                    conservative: 0,
                    realistic: 0,
                    optimistic: 0,
                  },
                  solar: results.revenueBreakdown.solar || {
                    conservative: 0,
                    realistic: 0,
                    optimistic: 0,
                  },
                },
                consumption: {
                  finalMonthlyKwh: Number.parseFloat(buildingData.monthlyConsumption) || 0,
                  baseEUI: results.baseEUI || 0,
                  climateFactor: results.climateFactor || 1,
                  ratingFactor: results.ratingFactor || 1,
                  adjustedEUI: results.adjustedEUI || 0,
                  annualKwh: (Number.parseFloat(buildingData.monthlyConsumption) || 0) * 12,
                },
                flexCapacity: {
                  totalAvg: results.flexibleCapacity?.total || 0,
                  hvacAvg: results.flexibleCapacity?.hvac || 0,
                  // Pass duration fields to CalculatorResults
                  hvacMinDuration: results.flexibleCapacity?.hvacMinDuration || 0,
                  hvacAvgDuration: results.flexibleCapacity?.hvacAvgDuration || 0,
                  hvacMaxDuration: results.flexibleCapacity?.hvacMaxDuration || 0,
                  battery: results.flexibleCapacity?.battery || 0,
                  ev: results.flexibleCapacity?.ev || 0,
                },
                timeToRevenue: {
                  display: results.timeToRevenue?.display || "3-6 months",
                },
                co2Reduction: results.metrics?.co2Reduction || 0,
                confidence: {
                  gridCompetitiveness: results.confidence?.gridCompetitiveness || 0,
                  savingsConfidence: results.confidence?.savingsConfidence || 0,
                  explanations: {
                    gridExplanation: results.confidence?.gridExplanation || "",
                    savingsExplanation: results.confidence?.savingsExplanation || "",
                  },
                },
                eligibility: results.eligibility || {},
                // Pass HVAC capacity metadata
                hvacCapacity: results.hvacCapacity,
              }}
              inputs={{
                buildingName: buildingData.buildingName || "",
                buildingSize: Number.parseFloat(buildingData.floorArea) || 0,
                buildingType: buildingData.buildingType,
                city: buildingData.australia?.city || "", // Assuming city is only for Australia now
                country: buildingData.location === "singapore" ? "Singapore" : "Australia",
                batteryCapacity: buildingData.systems.battery
                  ? Number.parseFloat(buildingData.systems.batteryCapacity || "0")
                  : 0,
                evChargers: buildingData.systems.evCharging
                  ? Number.parseFloat(buildingData.systems.evChargerCount || "0")
                  : 0,
              }}
              onClose={() => setStep("form")}
            />
          )}
        </div>
      </div>
    </section>
  )
}
