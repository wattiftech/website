"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function PilotHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            PILOT PROGRAM
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Test Grid Revenue With Your Building
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
              3-month pilot for Singapore and Australia buildings
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>We cover setup costs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>Share results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>No long-term commitment</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base" asChild>
              <a href="#application">
                Submit Pilot Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <a href="#faq">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
