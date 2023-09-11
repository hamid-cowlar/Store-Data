require('dotenv').config()
//Json File Path
const filePath = './EdekaData.json'
const {
  generateIntegerArray,
  deleteArrAPI: deleteArrAPIFunc,
} = require('./utils')

// Program for API Calls
const categoryFunc = require('./categories')
const subCategoriFunc = require('./subCategories')
const dealsFunc = require('./deals')
let edekaData = require(filePath)

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
const runapi = 3
const storeId = 1

switch (runapi) {
  case 1:
    categoryFunc(categoryUrl, authorizationToken, storeId, edekaData, filePath)
    break
  case 2:
    subCategoriFunc(
      subCategoriesUrl,
      authorizationToken,
      storeId,
      edekaData,
      filePath
    )
    break
  case 3:
    dealsFunc(dealsUrl, authorizationToken, edekaData)
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
    deleteArrAPIFunc(dealsUrl, generateIntegerArray(30, 58), authorizationToken)
    break
  default:
    console.log('nothing to delete')
    break
}
