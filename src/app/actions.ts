'use server'

// import {
//   ArticleRepository,
//   FamilyRepository,
//   checkReaderPermissions,
//   checkWriterPermissions,
//   executeMutateArticle,
// } from '@/libs/repositories'
import { getConnection, MutationRepository, QueryRepository } from '@/lib/sql'
import { Article } from '@/lib/types'
import { ServerActionResult, getJsonFromFormData } from '@/lib/utils'
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
  return QueryRepository.getManyArticles(id, name, description, price, familyId)
}

export const getFamilies = () => {
  return QueryRepository.getManyFamilies()
}

export const getArticleById = async (id: string) => {
  return QueryRepository.getArticleById(id)
}

export const createArticle = async (article: Omit<Article, 'famName' | 'id'>) => {
  console.log('create')
  return await MutationRepository.mutateArticle({ id: '', ...article })
}

export const updateArticle = async (article: Omit<Article, 'famName'>) => {
  console.log('update')

  return await MutationRepository.mutateArticle(article)
}

export const removeArticle = async (id: string) => {
  return MutationRepository.removeArticle(id)
}
