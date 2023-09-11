const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

const subCategoriesFunc = async (
  url,
  authorizationToken,
  storeId,
  jsonFile
) => {
  for (const data of jsonFile) {
    let categoryId = data.categoryId
    for (const innerData of data.Subcategories) {
      if ('default_subcategory' === innerData.subcategoryTitle) continue
      const logo =
        './Images/' + innerData.productItems[1].local_image_path + '.jpg'
      const link = 'www.testtt.com'
      const form = new FormData()
      const headers = {
        ...form.getHeaders(),
        Authorization: authorizationToken,
      }
      form.append('storeId', storeId)
      form.append('categoryId', categoryId)
      form.append('name', innerData.subcategoryTitle)
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
          return {
            ...edata,
            Subcategories: edata.Subcategories.map((innerdata) => {
              if (innerdata.subcategoryTitle === response.data.data.name) {
                return { ...innerdata, subCategoryId: response.data.data.id }
              }
              return innerdata
            }),
          }
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
  }
  jsonFile.forEach((dataa) => {
    console.log(dataa)
  })
  fs.writeFileSync(
    './EdekaData.json',
    JSON.stringify(jsonFile, null, 2),
    'utf-8'
  )
}

module.exports = subCategoriesFunc
