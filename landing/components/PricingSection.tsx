"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

type PlanLevel = "starter" | "pro" | "enterprise"

interface PricingFeature {
  name: string
  included: PlanLevel | "all"
}

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
}

const features: PricingFeature[] = [
  { name: "Subject dashboard with search and filter", included: "starter" },
  { name: "Filter by semester and course", included: "starter" },
  { name: "Practicals with problem statements", included: "starter" },
  { name: "Notes and Drive-linked resources by unit", included: "starter" },
  { name: "Full-screen split-view IDE", included: "pro" },
  { name: "Real-time code execution via Piston API", included: "pro" },
  { name: "Support for C, C++, Java, Python", included: "pro" },
  { name: "Solution hints on demand", included: "pro" },
  { name: "Company-specific PYQ questions", included: "enterprise" },
  { name: "MCQ and coding question formats", included: "enterprise" },
  { name: "Viva questions with difficulty levels", included: "enterprise" },
  { name: "Instant feedback and explanations", included: "enterprise" },
  { name: "Responsive UI for all devices", included: "all" },
  { name: "Color-coded difficulty badges", included: "all" },
]

const plans: PricingPlan[] = [
  {
    name: "Dashboard",
    price: { monthly: 0, yearly: 0 },
    level: "starter",
  },
  {
    name: "IDE",
    price: { monthly: 0, yearly: 0 },
    level: "pro",
    popular: true,
  },
  {
    name: "Prep",
    price: { monthly: 0, yearly: 0 },
    level: "enterprise",
  },
]

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true
  if (included === "enterprise" && level === "enterprise") return true
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true
  if (included === "starter") return true
  return false
}

export function PricingSection() {
  const [isYearly, setIsYearly] = React.useState(false)
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>("pro")

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-figtree text-[40px] font-normal leading-tight mb-4">Platform Features</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Virtual Lab is free for all university students. Access practicals, notes, MCQs, and the interactive IDE with no setup required.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full font-figtree text-lg transition-all",
                !isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full font-figtree text-lg transition-all",
                isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span className="ml-2 text-sm text-[#156d95]">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={cn(
                "relative p-8 rounded-2xl text-left transition-all border-2",
                selectedPlan === plan.level
                  ? "border-[#156d95] bg-[#156d95]/5"
                  : "border-border hover:border-[#156d95]/50",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#156d95] text-white px-4 py-1 rounded-full text-sm font-figtree">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-figtree text-2xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-figtree text-4xl font-medium">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="font-figtree text-lg text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                </div>
              </div>
              <div
                className={cn(
                  "w-full py-3 px-6 rounded-full font-figtree text-lg transition-all text-center",
                  selectedPlan === plan.level ? "bg-[#156d95] text-white" : "bg-secondary text-foreground",
                )}
              >
                {selectedPlan === plan.level ? "Selected" : "Select Plan"}
              </div>
            </button>
          ))}
        </div>

        {/* Features Table */}
        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Table Header */}
              <div className="flex items-center p-6 bg-secondary border-b border-border">
                <div className="flex-1">
                  <h3 className="font-figtree text-xl font-medium">Features</h3>
                </div>
                <div className="flex items-center gap-8">
                  {plans.map((plan) => (
                    <div key={plan.level} className="w-24 text-center font-figtree text-lg font-medium">
                      {plan.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Rows */}
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={cn(
                    "flex items-center p-6 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-secondary/30",
                    feature.included === selectedPlan && "bg-[#156d95]/5",
                  )}
                >
                  <div className="flex-1">
                    <span className="font-figtree text-lg">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-24 flex justify-center">
                        {shouldShowCheck(feature.included, plan.level) ? (
                          <div className="w-6 h-6 rounded-full bg-[#156d95] flex items-center justify-center">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="bg-[#156d95] text-white px-[18px] py-[15px] rounded-full font-figtree text-lg hover:rounded-2xl transition-all">
            Get started with {plans.find((p) => p.level === selectedPlan)?.name}
          </button>
        </div>
      </div>
    </section>
  )
}
