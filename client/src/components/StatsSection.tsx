export function StatsSection() {
  const stats = [
    { value: "1,200+", label: "Active Users" },
    { value: "450+", label: "Premium Modules" },
    { value: "99.9%", label: "Uptime" },
    { value: "180+", label: "Countries" },
  ];

  return (
    <section className="py-20 night-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div 
                className="text-4xl font-bold mb-2" 
                style={{ color: 'var(--night-accent)' }}
              >
                {stat.value}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
