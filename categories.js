const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
const { contentTypeMap } = require('./utils')
let name
let nameArr = []
let defaultVideo = './default.mp4'
const categoryFunc = async (url, authorizationToken, storeId, jsonFile) => {
  for (const data of jsonFile) {
    name = data.CategoryTitle
    if (nameArr.includes(name)) continue
    nameArr.push(name)
    const logo =
      './Images/' + data.Subcategories[0].productItems[0].local_image_path
    const link = data.link
    const form = new FormData()
    let videoPath = data.local_video_path
    const headers = {
      ...form.getHeaders(),
      Authorization: authorizationToken,
    }
    if (!!link) {
      form.append('link', link)
    } else {
      if (!videoPath) {
        videoPath = defaultVideo
      }
      const video = fs.createReadStream(videoPath)
      form.append('mediaContent', video, {
        filename: path.basename(videoPath),
        contentType: 'video/mp4',
      })
    }
    form.append('storeId', storeId)
    form.append('name', name)

    // Read the image file
    const image = fs.createReadStream(logo)

    // Get the file extension
    const fileExtension = path.extname(imageFilePath)

    // Determine the content type based on the file extension
    const contentType =
      contentTypeMap[fileExtension.toLowerCase()] || 'application/octet-stream'

    form.append('logo', image, {
      filename: path.basename(logo),
      contentType,
    })
    try {
      const response = await axios.post(url, form, { headers })
      console.log(response.data)
      jsonFile = jsonFile.map((edata) => {
        if (edata.CategoryTitle == response.data.data.name) {
          return {
            ...edata,
            categoryId: response.data.data.id,
          }
        }
        return edata
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
  console.log(jsonFile)
  fs.writeFileSync(
    './EdekaData.json',
    JSON.stringify(jsonFile, null, 2),
    'utf-8'
  )
}

module.exports = categoryFunc
