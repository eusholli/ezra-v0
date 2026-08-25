import { Footer } from '@/components/ezra/footer'
import { Nav } from '@/components/ezra/nav'

export default function TrustPage() {
  return (
    <main>
      <Nav />
      <section className="bg-canvas py-30">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
            Trust
          </p>
          <h1 className="mt-4 max-w-[680px] text-[36px] font-semibold leading-[1.1] tracking-[-0.022em] text-slate-900 lg:text-[56px] lg:leading-[1.05]">
            Trust centre
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.6] text-slate-500">
            This page is in progress.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
