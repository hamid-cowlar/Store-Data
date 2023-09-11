const axios = require('axios')

const deleteDataFunc = (url, filledArray, authorizationToken) => {
  const headers = {
    Authorization: authorizationToken,
  }
  filledArray.forEach((id) => {
    axios
      .delete(`${url}/${id}`, { headers })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          console.error(
            'Server Error:',
            error.response.status,
            error.response.data
          )
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No Response from Server', error.message)
        } else {
          // Something happened in setting up the request or handling the response
          console.error('Error:', error.message)
        }
      })
  })
}

module.exports = deleteDataFunc
