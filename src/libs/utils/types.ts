export type StringifyObject<T> = {
  [K in keyof T]: string
}

export type MakeAny<T> = {
  [K in keyof T]: any
}

export type ServerActionResult = { finished: boolean; success: boolean }

export type ServerPage = {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}
