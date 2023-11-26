import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'

export const PageLayout: FC<Props> = ({ children, className }) => {
  return <div className={cn('flex py-14 min-h-screen max-w-xl mx-auto', className)}>{children}</div>
}

type Props = PropsWithChildren & {
  className?: string
}
