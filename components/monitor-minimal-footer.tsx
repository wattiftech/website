import { Linkedin } from "lucide-react"

export function MonitorMinimalFooter() {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Brand and description */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="text-xl font-bold text-primary">Wattif</div>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Energy intelligence for Commercial Buildings
            </p>
          </div>

          {/* Contact and social */}
          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-4">
              <a
                href="mailto:Hello@Wattif.io"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Hello@Wattif.io
              </a>
              <a
                href="https://www.linkedin.com/company/104082946/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              &copy; 2025 Wattif Technologies Pte. Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
