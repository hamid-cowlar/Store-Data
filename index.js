require('dotenv').config()

const { generateIntegerArray } = require('./utils')
// Program for API Calls
const categoryFunc = require('./categories')
const subCategoriFunc = require('./subCategories')
let edekaData = require('./EdekaData.json')

// Program to Delete without API call
const deleteArrAPIFunc = require('./deleteArrAPI')
//constants
const authorizationToken = process.env.AUTH_TOKEN

const categoryUrl = 'http://localhost:5001/api/v1/categories'
const subCategoriesUrl = 'http://localhost:5001/api/v1/subcategories'
const dealsUrl = 'http://localhost:5001/api/v1/deals'

/*
Category : 1
SubCategory : 2
deals : 3
*/
const runapi = 0
const storeId = 1

switch (runapi) {
  case 1:
    categoryFunc(categoryUrl, authorizationToken, storeId, edekaData)
    break
  case 2:
    subCategoriFunc(subCategoriesUrl, authorizationToken, storeId, edekaData)
    break
  case 3:
    //dealsFunc(dealsUrl, authorizationToken, storeId, edekaData)
    break
  default:
    console.log(
      `Please select According to require scenario :
     Category : 1
     SubCategory : 2
     deals : 3
  `
    )
    break
}
/*
Delete According to id's in  Array :
Category : 1
SubCategory : 2
deals : 3
*/
const deleteAPI = 0
switch (deleteAPI) {
  case 1:
    deleteArrAPIFunc(
      categoryUrl,
      generateIntegerArray(104, 225),
      authorizationToken
    )
    break
  case 2:
    deleteArrAPIFunc(
      subCategoriesUrl,
      generateIntegerArray(201, 229),
      authorizationToken
    )
    break
  case 3:
    //deleteArrAPIFunc(dealsURL, generateIntegerArray(88, 95), authorizationToken)
    break
  default:
    console.log('nothing to delete')
    break
}
