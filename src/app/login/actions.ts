'use server'

import { getConnection } from '@/libs/repositories'
import { ServerActionResult, getJsonFromFormData } from '@/libs/utils'
import { cookies } from 'next/headers'

type AuthenticateInput = { username: string; password: string }

export const authenticate = async (prevState: ServerActionResult, formData: FormData) => {
  const { username, password } = getJsonFromFormData<AuthenticateInput>(formData)

  // TODO: add validations

  cookies().set('username', username)
  cookies().set('password', password)

  const pool = await getConnection(username, password)

  if (!pool) {
    return {
      success: false,
      error: 'El usuario o la contraseña son incorrectos',
      finished: true,
    }
  }

  return {
    success: true,
    finished: true,
  }
}
