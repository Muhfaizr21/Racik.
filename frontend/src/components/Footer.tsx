import { footerColumns } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">Platform manajemen bisnis parfum untuk pelaku industri di Indonesia.</p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-neutral-200 mb-4 tracking-wider uppercase text-[11px]">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-[#D4AF37] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-neutral-600">© 2026 Racik. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((s) => (
              <a key={s} href="#" className="text-xs text-neutral-600 hover:text-[#D4AF37] transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
