require('dotenv').config()
//Json File Path
const filePath = './output.json'
const {
  generateIntegerArray,
  deleteArrAPI: deleteArrAPIFunc,
} = require('./utils')

// Program for API Calls
const categoryFunc = require('./createData/categories')
const subCategoriFunc = require('./createData/subCategories')
const dealsFunc = require('./createData/deals')
let edekaData = require(filePath)
const env = ''
//constants
let authorizationToken = process.env.AUTH_TOKEN
let mainURL =
  env === 'stage'
    ? 'https://api.stage.veeve-cms.cowlar.com'
    : 'https://localhost:5001/api/v1'
if (env === 'stage') {
  authorizationToken = process.env.STAGE_TOKEN
}
const categoryUrl = `${mainURL}/categories`
const subCategoriesUrl = `${mainURL}/subcategories`
const dealsUrl = `${mainURL}/deals`

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
      generateIntegerArray(409, 421),
      authorizationToken
    )
    break
  case 3:
    deleteArrAPIFunc(
      dealsUrl,
      generateIntegerArray(163, 256),
      authorizationToken
    )
    break
  default:
    console.log('nothing to delete')
    break
}
