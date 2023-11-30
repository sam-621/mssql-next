'use server'

import {
  ArticleRepository,
  FamilyRepository,
  checkReaderPermissions,
  checkWriterPermissions,
  executeMutateArticle,
  getConnection,
  sqlQuery,
} from '@/libs/repositories'
import { Article } from '@/libs/types'
import { ServerActionResult, getJsonFromFormData } from '@/libs/utils'
import { cookies } from 'next/headers'

type AuthenticateInput = { username: string; password: string }

export const authenticate = async (prevState: ServerActionResult, formData: FormData) => {
  const { username, password } = getJsonFromFormData<AuthenticateInput>(formData)

  cookies().set('username', username)
  cookies().set('password', password)

  const pool = await getConnection(username, password)

  if (!pool) {
    return {
      success: false,
      error: 'El usuario o la contraseña son incorrectos o no tienes los permisos necesarios',
      finished: true,
    }
  }

  return {
    success: true,
    finished: true,
  }
}

export const getArticlesFiltered = async (
  id: string,
  name: string,
  description: string,
  price: string,
  familyId: string
) => {
  return ArticleRepository.getMany(id, name, description, price, familyId)
}

export const getFamilies = () => {
  return FamilyRepository.getMany()
}

export const getArticleById = async (id: string) => {
  return ArticleRepository.getById(id)
}

export const createArticle = async (article: Omit<Article, 'famName'>) => {
  await executeMutateArticle(article)
  // return ArticleRepository.create(article)
}

export const updateArticle = async (article: Omit<Article, 'famName'>) => {
  return ArticleRepository.update(article)
}

export const removeArticle = async (id: string) => {
  return ArticleRepository.remove(id)
}

export const checkPermission = (type: 'read' | 'write') => {
  const isSaUser = cookies().get('username')?.value === 'sa'

  if (isSaUser) return true

  return type === 'read' ? checkReaderPermissions() : checkWriterPermissions()
}
