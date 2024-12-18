const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
const { delay } = require('../utils')

const dealsFunc = async (url, authorizationToken, jsonFile) => {
  const headers = {
    'Content-Type': `multipart/form-data`,
    Authorization: authorizationToken,
  }
  for (const categoryData of jsonFile) {
    let categoryId = categoryData.categoryId
    for (const subCategoryData of categoryData.Subcategories) {
      let subCategoryId = subCategoryData.subCategoryId
      for (const [index, data] of Object.entries(
        subCategoryData.productItems
      )) {
        const form = new FormData()

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
        } else {
          console.log('image is required')
          continue
        }
        await delay(2000)
        try {
          await axios.post(url, form, { headers })
          console.log(
            `Done ${+index + 1} from ${subCategoryData.productItems.length}`
          )
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
