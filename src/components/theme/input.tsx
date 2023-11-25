import { FC } from 'react'
import { cn } from '../utils'

export const Input: FC<Props> = ({ className, label, ...rest }) => {
  return (
    <div className={cn(className)}>
      <label
        htmlFor={rest.id ?? rest.name}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <input
        {...rest}
        className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50'
      />
    </div>
  )
}
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  className?: string
}
