import { Zap, TrendingUp, Wrench } from "lucide-react"

export function WhyThisExists() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">
            Singapore & Australia Pay Buildings for Flexibility
          </h2>

          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">The Opportunity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When the grid is stressed, they pay commercial buildings to reduce demand temporarily.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Singapore Example</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    September 2020: Grid paid $332-$4500/MWh during peak events. Buildings that participated earned
                    thousands in a few hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Wrench className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">The Catch</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You need sensors, software, and market registration to participate. Most buildings don't have this.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-2">Our Offer</h3>
              <p className="text-muted-foreground leading-relaxed">
                We install everything. Test it for 3 months. See if the revenue potential is real for your specific
                building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
