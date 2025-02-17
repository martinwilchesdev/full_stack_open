import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl, {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzYXJtaWVudG8iLCJpZCI6IjY3YWMwN2JmYWNiZGE1ZjIxODA3ZTkzZiIsImlhdCI6MTczOTc1ODcwOX0.smRMuWaDHWXaQ5Z0Y2xgkC1w7modtPGMUYWkPfeXmE4'}})
  return request.then(response => response.data)
}

export default { getAll }