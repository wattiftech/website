import { Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="">
            <div className="flex flex-col gap-y-5">

              <Link href="/" className="">
                <Image src="/wattif-logo.png" alt="Wattif Logo" width={200} height={200} className="w-36 h-auto" />
              </Link>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Energy intelligence for Commercial Buildings
              </p>
            </div>
            <div className="flex gap-3 pt-2">
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
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-foreground transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#our-difference" className="hover:text-foreground transition-colors">
                  Our Difference
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-foreground transition-colors">
                  Benefits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Get Started</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="#start-free-monitoring" className="hover:text-foreground transition-colors">
                  Wattif Monitor
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-foreground transition-colors">
                  Revenue Calculator
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a
                  href="https://calendly.com/wattif/wattif-energy-assessment-complimentary-consultaton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Schedule Consultation
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/104082946/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="mailto:Hello@Wattif.io" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li className="leading-relaxed pt-2">
                The GEAR
                <br />
                19 Changi Business Park Cres
                <br />
                Singapore 489690
              </li>
              <li>
                <a href="mailto:Hello@Wattif.io" className="hover:text-foreground transition-colors">
                  Hello@Wattif.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2025 Wattif Technologies Pte. Ltd.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
