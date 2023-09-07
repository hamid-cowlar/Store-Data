const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

let name
let nameArr = []

const categoryFunc = async (url, authorizationToken, storeId, jsonFile) => {
  for (const data of jsonFile) {
    name = data.CategoryTitle
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
      jsonFile = jsonFile.map((edata) => {
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
    JSON.stringify(jsonFile, null, 2),
    'utf-8'
  )
}

module.exports = categoryFunc
