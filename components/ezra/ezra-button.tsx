import Link from 'next/link'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type EzraButtonProps = ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary' | 'primary-on-deep' | 'secondary-on-deep'
}

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary:
    'border border-hairline bg-white text-ink shadow-card hover:bg-blue-50 hover:border-blue-200',
  'primary-on-deep': 'bg-white text-deep hover:bg-on-deep',
  'secondary-on-deep':
    'border border-hairline-dark bg-transparent text-on-deep hover:border-blue-400',
}

export function EzraButton({
  variant = 'primary',
  className,
  children,
  ...props
}: EzraButtonProps) {
  return (
    <Link
      className={cn(
        'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-lg px-6 text-[15px] font-medium transition-all duration-150 ease-out hover:-translate-y-px',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
