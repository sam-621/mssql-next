import { FC } from 'react'
import { cn } from './utils'

export const Input: FC<Props> = ({ className, label, ...rest }) => {
  return (
    <div className={cn(className)}>
      <label
        htmlFor={rest.id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <input
        {...rest}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </div>
  )
}
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  className?: string
}
