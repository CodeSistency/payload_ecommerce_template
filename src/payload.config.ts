// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/Users'
import { Media } from './collections/Media/Media'
import { cloudinaryStorage } from 'payload-cloudinary'
import { Orders } from './collections/Orders/Orders'
import { Products } from './collections/Products/Products'
import { Categories } from './collections/Categories/Categories'
import { generateSeedData, resetCollections } from './collections/hooks/useSeed/generateSeedData'
import { console } from 'inspector'
import { Promotions } from './globals/Promotions/Promotions'
import { SiteSettings } from './globals/SiteConfigs/SiteConfigs'
import { Header } from './globals/Header/Header'
import { Footer } from './globals/Footer/Footer'
import { Pages } from './collections/Pages/Pages'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Type the request body
interface SeedRequestBody {
  action: 'seed' | 'reset';
  productType?: string; // Optional for reset action
  force?: boolean; // Optional, defaults to false
}

export default buildConfig({
  admin: {
    
    user: Users.slug,
    components: {
      beforeDashboard: ['./collections/hooks/useSeed/seedButton'],

    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      globals: ["header", "footer", "site-settings", "promotions"],
      url: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ]
      
    },

  },
  globals: [Promotions, SiteSettings, Header, Footer],
  collections: [Users, Media, Orders, Products, Categories, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '123456789123456789',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/ecommerceTemplate',
  }),
  sharp,
  plugins: [
 
    payloadCloudPlugin(),
    // cloudinaryStorage({
    //   config: {
    //     cloud_name: 'drp77y3zq',
    //     api_key: '496398855237756',
    //     api_secret: 'kqIwbNPmJ8obCyoKzuPmmJjtxkA'
    //   },
    //   collections: {
      
    //     'media': true, // Enable for media collection
    //     // Add more collections as needed
    //   },
    //   disableLocalStorage: true, // Optional, defaults to true
    //   enabled: true // Optional, defaults to true
    // })
    // storage-adapter-placeholder
    ],
    endpoints: [
    {
      path: '/next/seed',
      method: 'post',
      handler: async (req): Promise<Response> => {
      console.log('seed endpoint called', req);
      const body: any = req.json ? await req.json() : {};
      const { action, productType, force = false } = body as SeedRequestBody;

      const payload = req.payload;
      const user = (req as any).user;

      payload.logger.info(`seed endpoint body: ${JSON.stringify(body)}`);

      if (!payload || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        });
      }

      if (action === 'reset') {
        const resetResult = await resetCollections(payload);
        return new Response(JSON.stringify(resetResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
      } else if (action === 'seed') {
        if (!productType) {
        return new Response(JSON.stringify({ error: 'productType is required for seed action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
        }
        const seedResult = await generateSeedData(payload, productType, force);
        return new Response(JSON.stringify(seedResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
      }
      },
    },
    
    ],
  })
