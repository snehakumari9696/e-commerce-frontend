import { Truck, Shield, RefreshCcw, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Complimentary Shipping",
    description: "Free worldwide delivery on orders over $150",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "256-bit SSL encryption for all transactions",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: HeartHandshake,
    title: "Concierge Service",
    description: "Personal shopping assistance available",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
