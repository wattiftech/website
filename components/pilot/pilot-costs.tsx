import { DollarSign } from "lucide-react"

export function PilotCosts() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Costs</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Pilot (Months 1-3)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>$0 upfront from you</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>We cover installation ($5K-8K value)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Revenue split: 50% you, 50% us</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-3">If You Continue</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Still $0 upfront</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Revenue split: 70% you, 30% us</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Month-to-month, cancel anytime</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-3">If You Stop</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>No cancellation fee</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Equipment: we remove or you keep it</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
