const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const { contentTypeMap } = require('./utils')
const path = require('path')

const dealsFunc = async (url, authorizationToken, jsonFile) => {
  for (const categoryData of jsonFile) {
    let categoryId = categoryData.categoryId
    for (const subCategoryData of categoryData.Subcategories) {
      let subCategoryId = subCategoryData.subCategoryId
      for (const data of subCategoryData.productItems) {
        const logo = './Images/' + data.local_image_path
        const form = new FormData()
        const headers = {
          ...form.getHeaders(),
          Authorization: authorizationToken,
        }

        form.append('categoryId', categoryId)
        form.append('name', data.ItemTitle)
        form.append('discount', data.ItemSalePrice)
        form.append('description', data.description ?? '')

        // Not Required Fields
        if (!!subCategoryId) {
          form.append('subCategoryId', subCategoryId)
        }
        if (!!data.originalPrice) {
          form.append('originalPrice', data.originalPrice)
        }

        // Read the image file
        const image = fs.createReadStream(logo)

        // Get the file extension
        const fileExtension = path.extname(logo)

        // Determine the content type based on the file extension
        const contentType =
          contentTypeMap[fileExtension.toLowerCase()] ||
          'application/octet-stream'

        form.append('image', image, {
          filename: path.basename(logo),
          contentType,
        })
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
