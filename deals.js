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

//module.exports = subCategoriesFunc

const dealsFunc = async (url, authorizationToken, storeId, jsonFile) => {
  for (const categoryData of jsonFile) {
    let categoryId = data.categoryId
    for (const subCategoryData of data.Subcategories) {
      let subCategoryId = subCategoryData.subCategoryId
      for (const data of subCategoryData.productItems) {
        if ('default_subcategory' === innerData.subcategoryTitle) continue
        const logo = './Images/' + +'.jpg'
        const link = 'www.testtt.com'
        const form = new FormData()
        const headers = {
          ...form.getHeaders(),
          Authorization: authorizationToken,
        }
        form.append('storeId', storeId)
        if (!subCategoryId) {
          form.append('categoryId', categoryId)
        }
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
  }
  //edekaData.forEach((dataa) => {
  //  console.log(dataa)
  //})
  //fs.writeFileSync(
  //  './EdekaData.json',
  //  JSON.stringify(jsonFile, null, 2),
  //  'utf-8'
  //)
}

module.exports = dealsFunc
