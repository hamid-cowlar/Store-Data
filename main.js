;(async () => {
  try {
    const response = await fetch(
      'https://api.stage.veeve-cms.cowlar.com/categories',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          storeId: 36,
          name: 'Test',
          link: 'abc.com',
          logo: '',
        }),
      }
    )
    console.log(response.json())
  } catch (error) {
    console.log(error)
  }
})()
