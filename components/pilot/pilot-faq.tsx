"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function PilotFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Why are you doing pilots instead of just selling this?",
      answer:
        "Honest answer: We're still proving it. Every building is different. We learn from each deployment. Pilots let us test before asking for big commitments.",
    },
    {
      question: "What's the catch?",
      answer:
        "No catch. We need reference customers and real-world data. You need to know if this creates actual value for your building. Mutual benefit.",
    },
    {
      question: "What if no grid events happen during my pilot?",
      answer:
        "We extend it free until events occur. But you should know: Some months are quiet. That's the nature of grid markets.",
    },
    {
      question: "Will this mess up my building operations?",
      answer:
        "That's what we're testing. If operations are affected, we dial it back or cancel. Building operations always come first.",
    },
    {
      question: "Do you actually know what you're doing?",
      answer:
        "Our tech is based on university research (NUS/Berkeley Lab). But real-world deployment is different than research. That's why we're doing pilots carefully, not rushing to scale.",
    },
    {
      question: "What happens to my data?",
      answer:
        "We use it to optimize your building and improve our platform. It's not sold or shared. You can request deletion if you cancel.",
    },
    {
      question: "Can I really cancel anytime after Month 3?",
      answer: "Yes. Month-to-month after pilot. 30 days notice.",
    },
    {
      question: "Why should I trust you?",
      answer:
        "You shouldn't blindly trust us. That's why it's a pilot. 3 months, no upfront cost, you see real results (or lack thereof), then decide. We earn your trust through performance.",
    },
  ]

  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">Straight Answers</h2>
          <p className="text-center text-muted-foreground mb-12">No marketing fluff. Just honest responses.</p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-semibold pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && <div className="px-6 pb-4 text-muted-foreground">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
