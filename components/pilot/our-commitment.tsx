import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

export function OurCommitment() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Our Commitment</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">What We Guarantee</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Professional installation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>System works as described</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Transparent reporting</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>No long-term obligation</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">What We Don't Guarantee</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Specific revenue amounts (market dependent)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Number of events (grid decides, not us)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Perfect predictions (we're testing together)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">If It Doesn't Work</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>You cancel after Month 3</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Keep whatever was earned</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>We remove equipment or transfer it to you</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>No hard feelings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
