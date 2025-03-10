// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { cloudinaryStorage } from 'payload-cloudinary'
import { Orders } from './collections/Orders'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Orders, Products, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    cloudinaryStorage({
      config: {
        cloud_name: 'drp77y3zq',
        api_key: '496398855237756',
        api_secret: 'kqIwbNPmJ8obCyoKzuPmmJjtxkA'
      },
      collections: {
        'media': true, // Enable for media collection
        // Add more collections as needed
      },
      disableLocalStorage: true, // Optional, defaults to true
      enabled: true // Optional, defaults to true
    })
    // storage-adapter-placeholder
  ],
})
