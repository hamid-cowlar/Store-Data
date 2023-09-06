require('dotenv').config()

const axios = require('axios')
const authorizationToken = process.env.AUTH_TOKEN
const filledArray = [49, 44, 45, 46, 47, 48, 49, 50, 51]
const url = 'http://localhost:5001/api/v1/categories'

const headers = {
  Authorization: authorizationToken,
}
filledArray.forEach((id, index) => {
  axios
    .delete(`${url}/${id}`, { headers })
    .then((response) => {
      console.log(response)
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
