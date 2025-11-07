export function PilotCapacity() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Pilot Capacity</h2>

          <div className="bg-card border border-accent/50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Q1 2025 Slots</h3>
              <div className="flex justify-center gap-12 mt-6">
                <div>
                  <div className="text-4xl font-bold text-accent">2</div>
                  <div className="text-sm text-muted-foreground">Singapore</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">2</div>
                  <div className="text-sm text-muted-foreground">Australia</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div>
                <h4 className="font-semibold mb-2">Why limited?</h4>
                <p className="text-sm text-muted-foreground">
                  Each building gets hands-on engineering support. We're learning too—this is early stage for us.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Selection criteria:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Building characteristics (size, type, usage)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Good data access (we need utility bills)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Responsive facilities contact</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">→</span>
                    <span>Genuinely interested in testing (not tire-kickers)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
