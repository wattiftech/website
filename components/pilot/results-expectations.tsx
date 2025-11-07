import { AlertCircle, TrendingUp, Calendar } from "lucide-react"

export function ResultsExpectations() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">What Results Look Like</h2>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Honest Expectations (50,000 sq ft office example)</h3>
                  <p className="text-muted-foreground">
                    Grid events are unpredictable. Could be 0, could be 10. Singapore 2020 had 9 events in September,
                    then quiet for months.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <TrendingUp className="h-6 w-6 text-accent flex-shrink-0" />
                  <h3 className="font-semibold text-lg">If Events Happen</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Each event: Few hundred to few thousand dollars</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Depends on: duration, reduction amount, market prices</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>3-month pilot might see: $5K-$40K total</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Your share (50%): $2.5K-$20K</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Calendar className="h-6 w-6 text-accent flex-shrink-0" />
                  <h3 className="font-semibold text-lg">If Events Don't Happen</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>You earn nothing during pilot</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>We extend pilot free until events occur</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Still get visibility into your energy use</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-accent/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">Annual Potential (based on 2023 market activity)</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-accent">$50K-100K</div>
                  <div className="text-sm text-muted-foreground">Conservative</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">$150K-300K</div>
                  <div className="text-sm text-muted-foreground">Active market</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">$300K+</div>
                  <div className="text-sm text-muted-foreground">Peak year like Sept 2020</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                We show you data. You decide if it's worth continuing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
