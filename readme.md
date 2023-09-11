## Codebase Setup

#### index file

- include API url in categoryUrl , subCategoryUrl and dealsUrl
- Include Json file to upload the data.
- Include file path of json file in variable called filePath

#### For Three Sheet Excel should be :

1. **Category Sheet**:
   - Columns:
     1. storeId (unique identifier for each row)
     2. CategoryTitle
     3. logo
     4. mediaContent

| storeId | CategoryTitle | logo               | mediaContent        |
| ------- | ------------- | ------------------ | ------------------- |
| 1       | Electronics   | /path/to/logo1.png | /path/to/video1.mp4 |

2. **SubCategories Sheet**:
   - Columns:
     1. storeId (to relate to Category)
     2. subcategoryTitle
     3. logo
     4. mediaContent
     5. subCategoryId (unique identifier for each row)

| storeId | subCategoryId | subcategoryTitle | logo                | mediaContent        |
| ------- | ------------- | ---------------- | ------------------- | ------------------- |
| 1       | 1             | Mobiles          | /path/to/mobile.png | /path/to/media2.mp4 |
| 1       | 2             | Laptops          | /path/to/laptop.png | /path/to/media3.mp4 |

3. **Product Items (Deals) Sheet**:
   - Columns:
     1. subCategoryId (to relate to SubCategories)
     2. ItemTitle
     3. description
     4. ItemPrice
     5. local_image_path

| subCategoryId | ItemTitle     | description                        | ItemPrice | local_image_path     |
| ------------- | ------------- | ---------------------------------- | --------- | -------------------- |
| 1             | iPhone Deal   | Get the latest iPhone at 10% off!  | $999      | /path/to/iphone.png  |
| 2             | Gaming Laptop | Exclusive deals on gaming laptops! | $1099     | /path/to/laptop2.png |

When converting this Excel structure to JSON, you'd start with the `Category Sheet` and then for each category, fetch related subcategories from the `SubCategories Sheet` using the `storeId`. For each subcategory, you'd then fetch related product items from the `Product Items Sheet` using the `subCategoryId`.

##### For Single Excel Sheet should be :

**Unified Sheet**:

Columns:

1. storeId
2. CategoryTitle
3. logo (for category)
4. mediaContent (for category)
5. subcategoryId (unique identifier for subcategories)
6. subcategoryTitle
7. subcatLogo (logo for subcategory)
8. subcatMediaContent (media content for subcategory)
9. ItemTitle
10. description
11. ItemPrice
12. local_image_path

The data might look something like:

| storeId | CategoryTitle | logo               | mediaContent        | subcategoryId | subcategoryTitle | subcatLogo          | subcatMediaContent  | ItemTitle     | description                        | ItemPrice | local_image_path     |
| ------- | ------------- | ------------------ | ------------------- | ------------- | ---------------- | ------------------- | ------------------- | ------------- | ---------------------------------- | --------- | -------------------- |
| 1       | Electronics   | /path/to/logo1.png | /path/to/video1.mp4 | 1             | Mobiles          | /path/to/mobile.png | /path/to/media2.mp4 | iPhone Deal   | Get the latest iPhone at 10% off!  | $999      | /path/to/iphone.png  |
| 1       | Electronics   | /path/to/logo1.png | /path/to/video1.mp4 | 2             | Laptops          | /path/to/laptop.png | /path/to/media3.mp4 | Gaming Laptop | Exclusive deals on gaming laptops! | $1099     | /path/to/laptop2.png |

Note:

- Each row represents a product item.
- Data for the category and subcategory will be duplicated across rows that belong to the same category or subcategory.

When creating the JSON structure from this format, you'll need to be careful to avoid duplicating categories and subcategories in the final output. This can be achieved by keeping track of processed categories and subcategories during the conversion.
