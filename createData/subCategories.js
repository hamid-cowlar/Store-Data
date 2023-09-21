const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
const { delay } = require('../utils')

const subCategoriesFunc = async (
  url,
  authorizationToken,
  storeId,
  jsonFile,
  filePath
) => {
  let previousName
  const headers = {
    'Content-Type': `multipart/form-data`,
    Authorization: authorizationToken,
  }

  for (const data of jsonFile) {
    let categoryId = data.categoryId
    for (const [index, innerData] of Object.entries(data.Subcategories)) {
      if ('default_subcategory' === innerData.subcategoryTitle) continue
      const logo = innerData.logo
      if (!logo) {
        console.log('image is required ')
        continue
      }
      const form = new FormData()
      form.append('storeId', storeId)
      form.append('categoryId', categoryId)
      if (previousName == innerData.subcategoryTitle) continue
      previousName = innerData.subcategoryTitle
      form.append('name', previousName)

      if (innerData.mediaContent) {
        const video = fs.createReadStream(innerData.mediaContent)
        form.append('mediaContent', video, {
          filename: path.basename(innerData.mediaContent),
          contentType: `video/${path.extname(innerData.mediaContent).slice(1)}`,
        })
      }

      // Read the image file
      const image = fs.createReadStream(logo)

      form.append('logo', image, {
        filename: path.basename(logo),
        contentType: `image/${path.extname(logo).slice(1)}`,
      })
      await delay(1000)
      try {
        const response = await axios.post(url, form, { headers })
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
        console.log(`Done ${+index + 1} from ${data.Subcategories.length}`)
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
  fs.writeFileSync(filePath, JSON.stringify(jsonFile, null, 2), 'utf-8')
  console.log('SubCategory Upload Done')
  return jsonFile
}

module.exports = subCategoriesFunc
