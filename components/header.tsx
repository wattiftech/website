"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
             <Link href="/">
              <Image src="/wattif-logo.png" alt="Wattif Logo" width={200} height={200} className="w-28 h-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Benefits
            </a>
            <a
              href="#capabilities"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#our-difference"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Wattif Difference
            </a>
            <a
              href="https://calendly.com/wattif/wattif-energy-assessment-complimentary-consultaton"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <a href="#start-free-monitoring">Start 30 Day Free Monitoring</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#how-it-works" className="block text-sm font-medium text-foreground/80 hover:text-foreground">
              How It Works
            </a>
            <a href="#benefits" className="block text-sm font-medium text-foreground/80 hover:text-foreground">
              Benefits
            </a>
            <a href="#capabilities" className="block text-sm font-medium text-foreground/80 hover:text-foreground">
              Capabilities
            </a>
            <a href="#our-difference" className="block text-sm font-medium text-foreground/80 hover:text-foreground">
              Wattif Difference
            </a>
            <a
              href="https://calendly.com/wattif/wattif-energy-assessment-complimentary-consultaton"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              Contact
            </a>
            <div className="pt-4">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="#start-free-monitoring">Start 30 Day Free Monitoring</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
