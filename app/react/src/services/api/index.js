import axios from 'axios'

const endpoint = (uri) => {
  const url = process.env.REACT_APP_API
  return `${url}/${uri}`
}

export default {
  removeTool (id) {
    const url = endpoint(`tools/${id}`)
    return axios.delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  },
  createTool (tool) {
    const url = endpoint(`tools`)
    return axios.post(url, tool)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  },
  getTools () {
    const url = endpoint(`tools`)
    return axios.get(url)
      .then(response => Promise.resolve(response.data))
      .catch(errors => Promise.reject(errors))
  }
}
