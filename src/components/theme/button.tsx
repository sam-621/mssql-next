import { FC, PropsWithChildren } from 'react'
import { cn } from '../utils'
import { Loader2Icon } from 'lucide-react'

export const Button: FC<Props> = ({
  children,
  className,
  variant = 'primary',
  withNoIcon,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center text-white disabled:pointer-events-none disabled:opacity-50 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
        {
          'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800':
            variant === 'primary',
          'text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 ':
            variant === 'secondary',
          'text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-red-300 ':
            variant === 'danger',
        },
        className
      )}
    >
      {rest.disabled && !withNoIcon && <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </button>
  )
}

type Props = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger'
    withNoIcon?: boolean
  }
