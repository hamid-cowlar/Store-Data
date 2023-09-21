require('dotenv').config()
//Json File Path
const {
  generateIntegerArray,
  deleteArrAPI: deleteArrAPIFunc,
} = require('./utils')
const {
  AUTH_TOKEN,
  ENV,
  JSON_FILE_PATH: filePath,
  STORE_ID,
  DELETE_API,
  DELETE_FROM_ID,
  DELETE_TO_ID,
} = process.env

const categoryFunc = require('./createData/categories')
const subCategoriFunc = require('./createData/subCategories')
const dealsFunc = require('./createData/deals')
let jsonData = require(filePath)
//constants
let mainURL =
  ENV === 'dev'
    ? 'https://api.dev.veeve-cms.cowlar.com'
    : ENV === 'stage'
    ? 'https://api.stage.veeve-cms.cowlar.com'
    : ENV === 'prod'
    ? 'https://api.veeve-cms.cowlar.com'
    : 'http://localhost:5001/api/v1'

const categoryUrl = `${mainURL}/categories`
const subCategoriesUrl = `${mainURL}/subcategories`
const dealsUrl = `${mainURL}/deals`

const ApiCalls = async () => {
  jsonData = await categoryFunc(
    categoryUrl,
    AUTH_TOKEN,
    STORE_ID,
    jsonData,
    filePath
  )
  jsonData = await subCategoriFunc(
    subCategoriesUrl,
    AUTH_TOKEN,
    STORE_ID,
    jsonData,
    filePath
  )
  await dealsFunc(dealsUrl, AUTH_TOKEN, jsonData)
}
ApiCalls()

/*
Delete According to id's in  Array :
Category : 1
SubCategory : 2
deals : 3
*/
switch (DELETE_API) {
  case 1:
    deleteArrAPIFunc(
      categoryUrl,
      generateIntegerArray(DELETE_FROM_ID, DELETE_TO_ID),
      AUTH_TOKEN
    )
    break
  case 2:
    deleteArrAPIFunc(
      subCategoriesUrl,
      generateIntegerArray(DELETE_FROM_ID, DELETE_TO_ID),
      AUTH_TOKEN
    )
    break
  case 3:
    deleteArrAPIFunc(
      dealsUrl,
      generateIntegerArray(DELETE_FROM_ID, DELETE_TO_ID),
      AUTH_TOKEN
    )
    break
  default:
    console.log('nothing to delete')
    break
}
