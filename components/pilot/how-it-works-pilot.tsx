export function HowItWorks() {
  const phases = [
    {
      week: "Week 1",
      title: "Assessment & Install",
      items: [
        "Visit building, plan sensor placement",
        "Install sensors (1 day, no power interruption)",
        "Connect to our platform",
      ],
    },
    {
      week: "Weeks 2-4",
      title: "Observation",
      items: [
        "System monitors your building",
        "We analyze your energy patterns",
        "Identify demand reduction opportunities",
        "No changes to operations yet",
      ],
    },
    {
      week: "Weeks 5-12",
      title: "Active Participation",
      items: [
        "When grid events happen, we participate",
        "Building reduces demand strategically",
        "You see results in real-time",
        "We track revenue and performance",
      ],
    },
    {
      week: "End of Month 3",
      title: "Decision Point",
      items: [
        "Full report: events participated, revenue earned",
        "Projection: what next 12 months could look like",
        "Your decision: continue or stop",
      ],
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">How It Works</h2>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="relative">
                {index < phases.length - 1 && <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-lg p-6">
                    <div className="text-sm text-accent font-medium mb-1">{phase.week}</div>
                    <h3 className="font-semibold text-lg mb-3">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
