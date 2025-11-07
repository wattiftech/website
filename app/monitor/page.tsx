import { WattifMonitorLanding } from "@/components/wattif-monitor-landing"
import { MonitorMinimalFooter } from "@/components/monitor-minimal-footer"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Wattif Monitor - Free Energy Monitoring for Commercial Buildings",
  description:
    "Free 30-day energy monitoring trial for commercial buildings in Singapore and Australia. Track consumption, maintain compliance, and discover your grid revenue potential with Wattif Monitor.",
}

export default function WattifMonitorPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/">
              <Image src="/wattif-logo.png" alt="Wattif Logo" width={200} height={200} className="w-28 h-auto" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <WattifMonitorLanding />
      </main>
      <MonitorMinimalFooter />
    </div>
  )
}
