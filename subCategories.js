const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const edekaData = require('./EdekaData.json')
const authorizationToken = process.env.AUTH_TOKEN
const url = 'http://localhost:5001/api/v1/categories'

const storeId = 1
const categoryId = 1
let name
let nameArr = []
console.log(edekaData)
edekaData.forEach((data) => {
  return
  name = data.CategoryTitle
  if (nameArr.includes(name)) return
  nameArr.push(name)
  const logo = './Images/' + data.productItems[0].local_image_path + '.jpg'
  const link = 'www.test.com'
  const form = new FormData()
  const headers = {
    ...form.getHeaders(),
    Authorization: authorizationToken,
  }
  form.append('storeId', storeId)
  form.append('categoryId', categoryId)
  form.append('name', name)
  form.append('link', link)

  // Read the image file
  const image = fs.createReadStream(logo)

  form.append('logo', image, {
    filename: logo,
    contentType: 'image/jpg',
  })

  axios
    .post(url, form, { headers })
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
