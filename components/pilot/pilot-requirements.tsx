import { Building2, User } from "lucide-react"

export function PilotRequirements() {
  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Requirements</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Your Building</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>30,000+ sq ft commercial space</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Singapore or Australian NEM states</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Peak electrical demand above 100 kW</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Someone who can give us building access</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <User className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">What We Need From You</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Recent electricity bills (for analysis)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>2 hours for site assessment</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>1 day for installation access</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span>Feedback if operations are affected</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
