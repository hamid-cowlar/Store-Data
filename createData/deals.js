const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
const { delay } = require('../utils')
const dealsFunc = async (url, authorizationToken, jsonFile) => {
  for (const categoryData of jsonFile) {
    let categoryId = categoryData.categoryId
    for (const subCategoryData of categoryData.Subcategories) {
      let subCategoryId = subCategoryData.subCategoryId
      for (const data of subCategoryData.productItems) {
        const form = new FormData()
        const headers = {
          ...form.getHeaders(),
          Authorization: authorizationToken,
        }

        form.append('categoryId', categoryId)
        form.append('name', data.ItemTitle)
        form.append('discount', data.ItemPrice)
        form.append('description', data.description ?? '')

        // Not Required Fields
        if (subCategoryId) {
          form.append('subCategoryId', subCategoryId)
        }
        if (data.originalPrice) {
          form.append('originalPrice', data.originalPrice)
        }

        // Read the image file

        const logo = data?.local_image_path
        if (logo) {
          const image = fs.createReadStream(logo)
          form.append('image', image, {
            filename: path.basename(logo),
            contentType: `image/${path.extname(logo).slice(1)}`,
          })
        }
        await delay(2000)
        try {
          const response = await axios.post(url, form, { headers })
          console.log(response.data)
        } catch (error) {
          if (error.response) {
            console.error(
              'Server Error:',
              error.response.status,
              error.response.data,
              error.response.data?.data?.errors
            )
          } else if (error.request) {
            console.error('No Response from Server', error.message)
          } else {
            console.error('Error:', error.message)
          }
        }
      }
    }
  }
}

module.exports = dealsFunc
