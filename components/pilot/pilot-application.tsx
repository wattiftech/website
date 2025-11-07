"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Phone } from "lucide-react"

export function PilotApplication() {
  const steps = [
    {
      number: "1",
      title: "Initial Form",
      items: ["Building details", "Recent electricity bill", "Contact info", "Takes 5 minutes"],
    },
    {
      number: "2",
      title: "Qualification Call",
      items: [
        "We review if building is suitable",
        "Explain exactly what happens",
        "You ask questions",
        "Decide on site visit",
      ],
    },
    {
      number: "3",
      title: "Site Assessment",
      items: [
        "2-hour walkthrough",
        "Sensor placement planning",
        "Preliminary analysis",
        "Honest discussion of potential",
      ],
    },
    {
      number: "4",
      title: "Decision",
      items: [
        "You: Is this worth trying?",
        "Us: Can we deliver results here?",
        "Both agree: Sign pilot agreement",
        "Install and begin",
      ],
    },
  ]

  return (
    <section id="application" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">Application Process</h2>
          <p className="text-center text-muted-foreground mb-12">
            Timeline: Application to installation typically 2-3 weeks
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                </div>
                <ul className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-card border border-accent/50 rounded-lg p-8 text-center space-y-6">
            <h3 className="text-2xl font-bold">Ready to Apply?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="#contact">
                  Submit Pilot Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Book 20-Minute Call
                </a>
              </Button>
            </div>
            <div className="pt-4">
              <a href="#" className="text-sm text-accent hover:underline inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Download pilot terms (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
