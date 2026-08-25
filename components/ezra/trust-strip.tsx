const items = [
  'READ-ONLY OBSERVER',
  'SOURCE STAYS IN YOUR ESTATE',
  'DETERMINISTICALLY RE-DERIVABLE',
  'SOC 2 TYPE II',
]

export function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-canvas py-16">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-0 gap-y-4 px-6">
        {items.map((item, i) => (
          <div key={item} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="mx-6 hidden h-4 w-px bg-hairline sm:block"
              />
            )}
            <span className="font-mono text-[13px] text-muted-text">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
