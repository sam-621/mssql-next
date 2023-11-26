import { Article } from '../types'
import { sqlQuery } from './sql-server'

const getMany = async (): Promise<Article[]> => {
  const result = await sqlQuery<Article>`SELECT * FROM articles`

  if (!result.success) {
    console.log(result.error)
    return []
  }

  return result.data
}

const create = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<Article>`
  INSERT INTO articles (name, description, price, famId)
  VALUES (${article.name}, ${article.description}, ${article.price}, ${article.famId})
  RETURNING *
`

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return result.data[0]
}

const update = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<Article>`
  UPDATE articles
  SET name = ${article.name}, description = ${article.description}, price = ${article.price}, famId = ${article.famId}
  WHERE id = ${article.id}
  RETURNING *
`

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return result.data[0]
}

export const ArticleRepository = {
  getMany,
  create,
  update,
}
