const https = require('https')
const fs = require('fs')

const authorizationToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZlZXZlLWNtcy1zZXJ2ZXItMSJ9.eyJpZCI6NCwibmFtZSI6IlN1cGVyIEFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGRmLmNvbSIsInBob25lIjpudWxsLCJhZG1pbiI6dHJ1ZSwic3VwZXJfYWRtaW4iOnRydWUsIm9yZ0lkIjpudWxsLCJleHBpcmVfdGltZSI6MzYwMDAwMCwic3RvcmVJZCI6bnVsbCwicmVtZW1iZXIiOnRydWUsImxiX3NhIjpudWxsLCJyb2xlIjp7ImlkIjoxLCJ0aXRsZSI6InN1cGVyIGFkbWluIiwibWFuYWdlVXNlcnMiOmZhbHNlLCJzdXBlciI6dHJ1ZSwiYWRtaW4iOnRydWUsImdldFVzZXJzIjpmYWxzZSwibWFuYWdlRGV2aWNlcyI6ZmFsc2UsImdldERldmljZXMiOmZhbHNlLCJjZW8iOmZhbHNlLCJnZXRMb2dzIjpmYWxzZSwibWFuYWdlTG9ncyI6ZmFsc2UsImdldEtwaXMiOmZhbHNlLCJtYW5hZ2VLcGlzIjpmYWxzZSwiZ2V0T3JnYW5pemF0aW9uIjpmYWxzZSwibWFuYWdlT3JnYW5pemF0aW9uIjpmYWxzZSwibWFuYWdlU2NoZWR1bGVzIjp0cnVlLCJnZXRTY2hlZHVsZXMiOnRydWUsIm1hbmFnZUdyb3VwcyI6dHJ1ZSwiZ2V0R3JvdXBzIjp0cnVlLCJnZXRSb2xlcyI6dHJ1ZSwiZ2V0Q291cnNlcyI6ZmFsc2UsIm1hbmFnZUNvdXJzZXMiOmZhbHNlLCJnZXRDb3Vwb25zIjpmYWxzZSwibWFuYWdlQ291cG9ucyI6ZmFsc2UsImRldmljZU9uYm9hcmRpbmciOmZhbHNlfSwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY5MzUwNzA5NywiZXhwIjoxNjk3MTA3MDk3fQ.i8UQ8OFovNWIVZ7j1cc8S_hFkS_sVT0yNP-PtYS8HmYrm3yp8leoUBwzf5-FolrATzOq_Z6vsLgeTG8P6BkvZUQe22oI1z9maEvG3An_knXZ_psgkI3owG7F0ADTqkAVTZTQHajDaLDBSzT5XuJTUKb2gMOPlwCBg0xiCupuK5sE-8KT3IrDUNhs2yA7AJ3BtzyKfQc7JRlKOyfV9rPXzDCGi3ymVbwGYmNNxUTRrzPupo9egl2rLB65ZkvU0O3b2Pur6tAGBnuyrw5waSdkygJuOGOB83PLz7H-U6m_zGEm8cdLqDhj1pPFA8GhW_VPJsOOTTpShzYvjiEllBhv0Q' // Replace with your actual authorization token
const url = 'https://api.stage.veeve-cms.cowlar.com/categories'
const imagePath = 'imagg.png' // Replace with the correct file path

// Create a boundary string for multipart/form-data
const boundary = '----FormDataBoundary' + Date.now()

// Define the form data fields
const formData =
  `--${boundary}\r\n` +
  'Content-Disposition: form-data; name="link"\r\n\r\nasdf.com\r\n' +
  `--${boundary}\r\n` +
  'Content-Disposition: form-data; name="storeId"\r\n\r\n36\r\n' +
  `--${boundary}\r\n` +
  'Content-Disposition: form-data; name="name"\r\n\r\ntesttest2asdfasdfasdfsasdfdasfa\r\n' +
  `--${boundary}\r\n` +
  `Content-Disposition: form-data; name="logo"; filename="pasted_image_0-removebg-preview.png"\r\n` +
  'Content-Type: image/png\r\n\r\n'

// Read the image file and append it to the form data
const imageBuffer = fs.readFileSync(imagePath)
const finalFormData = Buffer.concat([
  Buffer.from(formData, 'utf-8'),
  imageBuffer,
  Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8'),
])

// Create the request options
const options = {
  method: 'POST',
  headers: {
    Authorization: authorizationToken,
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  },
}

// Send the request
const req = https.request(url, options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log(data)
  })
})

req.on('error', (error) => {
  console.error('Error:', error)
})

// Write the form data to the request body
req.write(finalFormData)

// End the request
req.end()
