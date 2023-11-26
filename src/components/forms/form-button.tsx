'use client'

import { type FC, type PropsWithChildren, type ReactElement } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../theme/button'

export const FormButton: FC<Props> = ({ icon: propIcon, children }) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' aria-disabled={pending} disabled={pending}>
      {children}
    </Button>
  )
}
type Props = PropsWithChildren & {
  icon?: ReactElement
}
