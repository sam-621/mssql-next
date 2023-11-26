import { DetailedHTMLProps, HTMLAttributes, SelectHTMLAttributes } from 'react'

export const Select: React.FC<Props> = ({
  options,
  label,
  onChange,
  placeholder,
  errorMessage,
  ...rest
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <div>
      <label
        htmlFor='countries'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <select
        onChange={handleSelectChange}
        defaultValue={placeholder}
        id='countries'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        {...rest}
      >
        {placeholder && <option>{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div>
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

type Props = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  errorMessage?: string
}
