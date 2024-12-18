const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
let nameArr = []
let defaultVideo = './default.mp4'
const categoryFunc = async (
  url,
  authorizationToken,
  storeId,
  jsonFile,
  filePath
) => {
  const headers = {
    'Content-Type': `multipart/form-data`,
    Authorization: authorizationToken,
  }
  for (const [index, data] of Object.entries(jsonFile)) {
    const name = data.CategoryTitle
    if (nameArr.includes(name)) continue
    nameArr.push(name)
    const logo =
      data.logo ?? data.Subcategories[0].productItems[0].local_image_path
    const link = data.link
    const form = new FormData()
    let videoPath = data.mediaContent
    if (link) {
      form.append('link', link)
    } else {
      if (!videoPath) {
        videoPath = defaultVideo
      }
      const video = fs.createReadStream(videoPath)
      form.append('mediaContent', video, {
        filename: path.basename(videoPath),
        contentType: `video/${path.extname(videoPath).slice(1)}`,
      })
    }
    form.append('storeId', storeId)
    form.append('name', name)

    // Read the image file
    const image = fs.createReadStream(logo)

    form.append('logo', image, {
      filename: path.basename(logo),
      contentType: `image/${path.extname(logo).slice(1)}`,
    })
    try {
      const response = await axios.post(url, form, { headers })
      jsonFile = jsonFile.map((edata) => {
        if (edata.CategoryTitle == response.data.data.name) {
          return {
            ...edata,
            storeId: response.data.data.storeId,
            categoryId: response.data.data.id,
          }
        }
        return edata
      })
      console.log(`Done ${+index + 1} from ${jsonFile.length}`)
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
  fs.writeFileSync(filePath, JSON.stringify(jsonFile, null, 2), 'utf-8')
  console.log('Category Upload Done')
  return jsonFile
}

module.exports = categoryFunc
