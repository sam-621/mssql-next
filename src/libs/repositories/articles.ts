import { Article } from '../types'
import { getArticleMapped } from './mappers'
import { sqlQuery } from './sql-server'

export type SQLArticle = {
  artid: string
  artnombre: string
  artdescripcion: string
  artprecio: string
  famid: string
}

const getMany = async (): Promise<Article[]> => {
  const result = await sqlQuery<SQLArticle>`SELECT * FROM articles`

  if (!result.success) {
    console.log(result.error)
    return []
  }

  return result.data.map((article) => getArticleMapped(article))
}

const create = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<SQLArticle>`
  INSERT INTO articles (name, description, price, famId)
  VALUES (${article.name}, ${article.description}, ${article.price}, ${article.famId})
  RETURNING *
`

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return getArticleMapped(result.data[0])
}

const update = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<SQLArticle>`
  UPDATE articles
  SET name = ${article.name}, description = ${article.description}, price = ${article.price}, famId = ${article.famId}
  WHERE id = ${article.id}
  RETURNING *
`

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return getArticleMapped(result.data[0])
}

export const ArticleRepository = {
  getMany,
  create,
  update,
}
