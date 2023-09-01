const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const authorizationToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZlZXZlLWNtcy1zZXJ2ZXItMSJ9.eyJpZCI6NCwibmFtZSI6IlN1cGVyIEFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGRmLmNvbSIsInBob25lIjpudWxsLCJhZG1pbiI6dHJ1ZSwic3VwZXJfYWRtaW4iOnRydWUsIm9yZ0lkIjpudWxsLCJleHBpcmVfdGltZSI6MzYwMDAwMCwic3RvcmVJZCI6bnVsbCwicmVtZW1iZXIiOnRydWUsImxiX3NhIjpudWxsLCJyb2xlIjp7ImlkIjoxLCJ0aXRsZSI6InN1cGVyIGFkbWluIiwibWFuYWdlVXNlcnMiOmZhbHNlLCJzdXBlciI6dHJ1ZSwiYWRtaW4iOnRydWUsImdldFVzZXJzIjpmYWxzZSwibWFuYWdlRGV2aWNlcyI6ZmFsc2UsImdldERldmljZXMiOmZhbHNlLCJjZW8iOmZhbHNlLCJnZXRMb2dzIjpmYWxzZSwibWFuYWdlTG9ncyI6ZmFsc2UsImdldEtwaXMiOmZhbHNlLCJtYW5hZ2VLcGlzIjpmYWxzZSwiZ2V0T3JnYW5pemF0aW9uIjpmYWxzZSwibWFuYWdlT3JnYW5pemF0aW9uIjpmYWxzZSwibWFuYWdlU2NoZWR1bGVzIjp0cnVlLCJnZXRTY2hlZHVsZXMiOnRydWUsIm1hbmFnZUdyb3VwcyI6dHJ1ZSwiZ2V0R3JvdXBzIjp0cnVlLCJnZXRSb2xlcyI6dHJ1ZSwiZ2V0Q291cnNlcyI6ZmFsc2UsIm1hbmFnZUNvdXJzZXMiOmZhbHNlLCJnZXRDb3Vwb25zIjpmYWxzZSwibWFuYWdlQ291cG9ucyI6ZmFsc2UsImRldmljZU9uYm9hcmRpbmciOmZhbHNlfSwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY5MzUwNzA5NywiZXhwIjoxNjk3MTA3MDk3fQ.i8UQ8OFovNWIVZ7j1cc8S_hFkS_sVT0yNP-PtYS8HmYrm3yp8leoUBwzf5-FolrATzOq_Z6vsLgeTG8P6BkvZUQe22oI1z9maEvG3An_knXZ_psgkI3owG7F0ADTqkAVTZTQHajDaLDBSzT5XuJTUKb2gMOPlwCBg0xiCupuK5sE-8KT3IrDUNhs2yA7AJ3BtzyKfQc7JRlKOyfV9rPXzDCGi3ymVbwGYmNNxUTRrzPupo9egl2rLB65ZkvU0O3b2Pur6tAGBnuyrw5waSdkygJuOGOB83PLz7H-U6m_zGEm8cdLqDhj1pPFA8GhW_VPJsOOTTpShzYvjiEllBhv0Q'
const url = 'https://api.stage.veeve-cms.cowlar.com/categories'
const imagePath = 'imagg.png'

const form = new FormData()

form.append('storeId', '36')
form.append('name', 'testtest2asdfasdfasdfasdfdasfa2s')
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
