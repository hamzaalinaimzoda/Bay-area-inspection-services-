import { CheckCircle2, Shield, Search, Clock, FileBadge } from "lucide-react";

export function TrustBar() {
  const badges = [
    { icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-secondary" />, text: "InterNACHI Certified" },
    { icon: <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-secondary" />, text: "Fully Insured (GL + E&O)" },
    { icon: <Search className="w-5 h-5 md:w-6 md:h-6 text-secondary" />, text: "500+ Inspections" },
    { icon: <Clock className="w-5 h-5 md:w-6 md:h-6 text-secondary" />, text: "Same-Day Reports" },
    { icon: <FileBadge className="w-5 h-5 md:w-6 md:h-6 text-secondary" />, text: "Licensed CA LLC" },
  ];

  return (
    <section className="bg-white border-b py-5 md:py-7 shadow-sm" data-testid="section-trust-bar">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-2.5 text-sm md:text-base font-semibold text-gray-800">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
