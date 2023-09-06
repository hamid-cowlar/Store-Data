require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
let edekaData = require('./EdekaData.json')
const authorizationToken = process.env.AUTH_TOKEN
const url = 'http://localhost:5001/api/v1/categories'

const storeId = 1
let name
let nameArr = []

;(async () => {
  for (const data of edekaData) {
    name = data.CategoryTitle
    console.log(nameArr)
    if (nameArr.includes(name)) continue
    nameArr.push(name)
    const logo =
      './Images/' +
      data.Subcategories[0].productItems[0].local_image_path +
      '.jpg'
    const link = 'www.test.com'
    const form = new FormData()
    const headers = {
      ...form.getHeaders(),
      Authorization: authorizationToken,
    }
    form.append('storeId', storeId)
    form.append('name', name)
    form.append('link', link)

    // Read the image file
    const image = fs.createReadStream(logo)

    form.append('logo', image, {
      filename: logo,
      contentType: 'image/jpg',
    })
    try {
      const response = await axios.post(url, form, { headers })
      console.log(response.data)
      edekaData = edekaData.map((edata) => {
        if (edata.CategoryTitle == response.data.data.name) {
          return {
            ...edata,
            categoryId: response.data.data.id,
          }
        }
        return edata
      })
    } catch (error) {
      if (error.response) {
        console.error(
          'Server Error:',
          error.response.status,
          error.response.data
        )
      } else if (error.request) {
        console.error('No Response from Server', error.message)
      } else {
        console.error('Error:', error.message)
      }
    }
  }
  fs.writeFileSync(
    './EdekaData.json',
    JSON.stringify(edekaData, null, 2),
    'utf-8'
  )
})()
