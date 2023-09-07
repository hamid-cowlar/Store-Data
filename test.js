require('dotenv').config()

const axios = require('axios')
const authorizationToken = process.env.AUTH_TOKEN
const filledArray = [
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87,
]

const url = 'http://localhost:5001/api/v1/categories'

const headers = {
  Authorization: authorizationToken,
}
filledArray.forEach((id) => {
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
