const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const authorizationToken = process.env.AUTH_TOKEN
const url = 'https://api.stage.veeve-cms.cowlar.com/deals'

const form = new FormData()

const imagePath = 'imagg.png'

form.append('categoryId', '36')
form.append('subCategoryId', '14')
form.append('name', 'testtest2asdfasdfasdfasdfdasfa2s')
form.append('description', 'description of deals')
form.append('')
form.append('link', 'asdf.com')

// Read the image file
const image = fs.createReadStream(imagePath)

form.append('logo', image, {
  filename: imagePath,
  contentType: 'image/png',
})

const headers = {
  ...form.getHeaders(),
  Authorization: authorizationToken,
}

axios
  .post(url, form, { headers })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.error('Server Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response from Server')
    } else {
      // Something happened in setting up the request or handling the response
      console.error('Error:', error.message)
    }
  })
