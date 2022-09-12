export const fetchData = async (url: string, options: Record<string, unknown>) => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json'},
    ...options,
  })
  const data = await response.json()
  return data
}