import { SQLArticle } from './articles'
import { Article } from '../types'

export const getArticleMapped = (sqlArticle: SQLArticle): Article => {
  return {
    id: sqlArticle.artid,
    name: sqlArticle.artnombre,
    description: sqlArticle.artdescripcion,
    price: sqlArticle.artprecio,
    famId: sqlArticle.famid,
  }
}
