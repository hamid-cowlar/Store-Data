require('dotenv').config()
const categoryFunc = require('./categories')
const subCategoriFunc = require('./subCategories')
let edekaData = require('./EdekaData.json')

const authorizationToken = process.env.AUTH_TOKEN

const subCategoriesUrl = 'http://localhost:5001/api/v1/subcategories'
const categoryUrl = 'http://localhost:5001/api/v1/categories'
const dealsUrl = 'http://localhost:5001/api/v1/deals'

/*
Category : 1
SubCategory : 2
deals : 3
*/

const runapi = 1

const storeId = 1

if (runapi == 1) {
  categoryFunc(categoryUrl, authorizationToken, storeId, edekaData)
} else if (runapi == 2) {
  subCategoriFunc(subCategoriesUrl, authorizationToken, storeId, edekaData)
} else if (runapi == 3) {
  //dealsFun(dealsUrl, authorizationToken, storeId, edekaData)
} else {
  console.log(
    `Please select According to require scenario :
     Category : 1
     SubCategory : 2
     deals : 3
  `
  )
}
