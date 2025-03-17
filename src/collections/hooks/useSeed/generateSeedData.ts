import { Categories } from "@/collections/Categories/Categories";
import { Media } from "@/collections/Media/Media";
import { Orders } from "@/collections/Orders/Orders";
import { Products } from "@/collections/Products/Products";
import { Users } from "@/collections/Users/Users";
import { CollectionSlug, Payload } from "payload";

interface CustomFile {
  name: string;
  data: Buffer;
  mimetype: string;
  size: number;
}

async function fetchFileByURL(url: string): Promise<CustomFile> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data), // Using CustomFile interface
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}


type ProductTypes = {
        [key: string]: {
          categories: string[];
          products: { title: string; price: number; description: string; stock: number }[];
          images: { url: string; alt: string }[];
        };
      };

      // Reset collections except admin user
const resetCollections = async (payload: Payload): Promise<{ success: boolean; message: string }> => {
  try {
    const collections: CollectionSlug[] = [Products.slug as CollectionSlug, Orders.slug as CollectionSlug, Media.slug as CollectionSlug, Categories.slug as CollectionSlug];
    const adminUser = await payload.find({
      collection: Users.slug as CollectionSlug,
      where: { role: { equals: 'admin' } },
      limit: 1,
    });

    // Delete all documents from non-user collections
    for (const collection of collections) {
      const { docs } = await payload.find({ collection, limit: 1000 });
      await Promise.all(docs.map((doc) => payload.delete({ collection, id: doc.id })));
    }

    // Delete all users except admin
    const { docs: users } = await payload.find({ collection: Users.slug as CollectionSlug, limit: 1000 });
    await Promise.all(
      users
        .filter((user) => user.id !== adminUser.docs[0]?.id)
        .map((user) => payload.delete({ collection: Users.slug as CollectionSlug, id: user.id }))
    );

    return { success: true, message: 'Collections reset, admin user preserved' };
  } catch (error) {
    console.error("Error in resetCollections:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: `Error resetting collections: ${errorMessage}` };
  }
};

function createRichTextDescription(description: string): { 
  [k: string]: unknown; 
  root: { 
    type: string; 
    children: { 
      type: string; 
      version: number; 
      [k: string]: unknown; 
    }[]; 
    direction: ("ltr" | "rtl") | null; 
    format: "left" | "start" | "center" | "right" | "end" | "justify" | ""; 
    indent: number; 
    version: number; 
  }; 
} {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          version: 1,
          children: [
            {
              type: "text",
              text: description,
              version: 1,
            },
          ],
        },
      ],
      direction: null,
      format: "left",
      indent: 0,
      version: 1,
    },
  };
}

// Check if collections have data
const hasData = async (payload: Payload): Promise<boolean> => {
  try {
    const collections: CollectionSlug[] = [Users.slug as CollectionSlug, Products.slug as CollectionSlug, Orders.slug as CollectionSlug, Media.slug as CollectionSlug, Categories.slug as CollectionSlug];
    for (const collection of collections) {
      const { totalDocs } = await payload.find({ collection, limit: 1 });
      if (collection === Users.slug && totalDocs > 1) return true; // Ignore single admin user
      if (collection !== Users.slug && totalDocs > 0) return true;
    }
    return false;
  } catch (error) {
    console.error("Error in hasData:", error);
    throw error;
  }
};

const generateSeedData = async (
  payload: Payload,
  productType: string,
  force: boolean = false
): Promise<{ success: boolean; message: string }> => {
  try {
    payload.logger.info(`Starting generateSeedData for productType: ${productType}, force: ${force}`);

    // Check if data exists
    if (!force && (await hasData(payload))) {
      payload.logger.info('Data already exists, exiting without seeding');
      return { success: false, message: 'Data already exists. Use reset or force to overwrite.' };
    }
    payload.logger.info('No existing data or force is true, proceeding with seeding');

    const imageUrl = 'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp';

    const productTypesData: ProductTypes = {
      clothes: {
        categories: ['Shirts', 'Pants', 'Jackets'],
        products: [
          { title: 'Cotton T-Shirt', price: 19.99, description: 'A comfy cotton tee.', stock: 50 },
          { title: 'Denim Jeans', price: 49.99, description: 'Classic blue jeans.', stock: 30 },
          { title: 'Leather Jacket', price: 99.99, description: 'Stylish leather jacket.', stock: 20 },
        ],
        images: [
          { url: imageUrl, alt: 'Cotton T-Shirt' },
          { url: imageUrl, alt: 'Denim Jeans' },
          { url: imageUrl, alt: 'Leather Jacket' },
        ],
      },
      donuts: {
        categories: ['Glazed', 'Filled', 'Sprinkled'],
        products: [
          { title: 'Glazed Donut', price: 1.99, description: 'Classic glazed donut.', stock: 100 },
          { title: 'Jelly Filled Donut', price: 2.49, description: 'Sweet jelly inside.', stock: 80 },
          { title: 'Sprinkle Donut', price: 2.29, description: 'Colorful sprinkles.', stock: 90 },
        ],
        images: [
          { url: imageUrl, alt: 'Glazed Donut' },
          { url: imageUrl, alt: 'Jelly Filled Donut' },
          { url: imageUrl, alt: 'Sprinkle Donut' },
        ],
      },
      pets: {
        categories: ['Dog Supplies', 'Cat Supplies', 'Bird Supplies'],
        products: [
          { title: 'Dog Collar', price: 14.99, description: 'Durable dog collar.', stock: 40 },
          { title: 'Cat Toy', price: 9.99, description: 'Fun cat toy with bell.', stock: 60 },
          { title: 'Bird Seed', price: 5.99, description: 'Nutritious bird seed.', stock: 100 },
        ],
        images: [
          { url: imageUrl, alt: 'Dog Collar' },
          { url: imageUrl, alt: 'Cat Toy' },
          { url: imageUrl, alt: 'Bird Seed' },
        ],
      },
      cars: {
        categories: ['Car Parts', 'Accessories', 'Tools'],
        products: [
          { title: 'Oil Filter', price: 12.99, description: 'High-quality oil filter.', stock: 25 },
          { title: 'Car Mats', price: 29.99, description: 'Durable car floor mats.', stock: 15 },
          { title: 'Tire Wrench', price: 19.99, description: 'Heavy-duty tire wrench.', stock: 20 },
        ],
        images: [
          { url: imageUrl, alt: 'Oil Filter' },
          { url: imageUrl, alt: 'Car Mats' },
          { url: imageUrl, alt: 'Tire Wrench' },
        ],
      },
    };

    const data = productTypesData[productType] || productTypesData['clothes'];
    payload.logger.info(`Using product type data for: ${productType || 'clothes'}`);

    // Seed Users
    payload.logger.info('Seeding admin user');
    const existingAdmin = await payload.find({
      collection: Users.slug as CollectionSlug,
      where: { email: { equals: 'admin.seed@example.com' } },
      limit: 1,
    });

    let adminUser;
    if (existingAdmin.totalDocs > 0) {
      payload.logger.info('Admin user already exists, skipping creation');
      adminUser = existingAdmin.docs[0];
    } else {
      adminUser = await payload.create({
      collection: Users.slug as CollectionSlug,
      data: { email: 'admin.seed@example.com', password: 'admin123', role: 'admin', name: 'Admin' },
      });
      payload.logger.info(`Admin user created with ID: ${adminUser.id}`);
    }

    payload.logger.info('Seeding customer user');
    const existingCustomer = await payload.find({
      collection: Users.slug as CollectionSlug,
      where: { email: { equals: 'customer.seed@example.com' } },
      limit: 1,
    });

    let customer;
    if (existingCustomer.totalDocs > 0) {
      payload.logger.info('Customer user already exists, skipping creation');
      customer = existingCustomer.docs[0];
    } else {
      customer = await payload.create({
      collection: Users.slug as CollectionSlug,
      data: { email: 'customer.seed@example.com', password: 'customer123', role: 'customer', name: 'Customer' },
      });
      payload.logger.info(`Customer user created with ID: ${customer.id}`);
    }

    // Seed Media
    payload.logger.info('Seeding media items');
    const mediaIds = await Promise.all(
      data.images.map(async (img, index) => {
        payload.logger.info(`Fetching image from URL: ${img.url}`);
        const file = await fetchFileByURL(img.url);

        const uniqueFilename = `${img.alt.toLowerCase().replace(/\s+/g, '-')}-${index}.jpg`;
        file.name = uniqueFilename; // Ensure file.name matches

        payload.logger.info(`Creating media with alt: ${img.alt} and filename: ${uniqueFilename}`);
        const result = await payload.create({
          collection: Media.slug as CollectionSlug,
          data: { alt: img.alt, filename: uniqueFilename }, // Explicitly set filename in data
          file,
        });
        payload.logger.info(`Media created with ID: ${result.id}`);
        return result;
      })
    );

   // Seed Categories
   payload.logger.info('Seeding categories');
   const categoryIds = await Promise.all(
     data.categories.map(async (cat: string, index: number) => {
       const categorySlug = cat.toLowerCase().replace(/\s+/g, '-');
       payload.logger.info(`Creating category: ${cat} with slug: ${categorySlug}`);
       const result = await payload.create({
         collection: Categories.slug as CollectionSlug,
         data: { name: cat, slug: categorySlug, media: mediaIds[index % mediaIds.length].id },
       });
       payload.logger.info(`Category created with ID: ${result.id}`);
       return result;
     })
   );

    // Seed Products
    payload.logger.info('Seeding products');
    const productIds = await Promise.all(
      data.products.map((prod: { title: string; price: number; description: string; stock: number }, index: number) => {
        const productSlug = `${prod.title.toLowerCase().replace(/\s+/g, '-')}-${index}`; // Ensure uniqueness
        payload.logger.info(`Creating product: ${prod.title} with slug: ${productSlug}`);        return payload.create({
          collection: Products.slug as CollectionSlug,
          data: {
            slug: productSlug,
            title: prod.title,
            description: createRichTextDescription(prod.description),
            price: prod.price,
            stock: prod.stock,
            trackInventory: true,
            availability: 'inStock',
            images: [mediaIds[index % mediaIds.length].id],
            featuredImage: mediaIds[index % mediaIds.length].id,
            categories: [categoryIds[index % categoryIds.length].id],
            status: 'published',
          },
        }).then((result) => {
          payload.logger.info(`Product created with ID: ${result.id}`);
          return result;
        });
      })
    );

    // Seed Orders
    payload.logger.info('Seeding order');
    const order = await payload.create({
      collection: Orders.slug as CollectionSlug,
      data: {
        user: customer.id,
        items: productIds.map((prodId: any, index: number) => ({
          product: prodId.id,
          title: data.products[index].title,
          price: data.products[index].price,
          quantity: Math.floor(Math.random() * 5) + 1,
        })),
        total: productIds.reduce((sum: number, _: any, index: number) => sum + data.products[index].price * 2, 0),
        status: 'pending',
        paymentStatus: 'unpaid',
      },
    });
    payload.logger.info(`Order created with ID: ${order.id}`);

    payload.logger.info(`Seeding completed successfully for ${productType}`);
    return { success: true, message: `Seeded data for ${productType}` };
  } catch (error) {
    payload.logger.info('Error occurred in generateSeedData', { error });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: `Error generating seed data: ${errorMessage}` };
  }
};

export { hasData, resetCollections, generateSeedData };

// import { Categories } from "@/collections/Categories";
// import { Media } from "@/collections/Media";
// import { Orders } from "@/collections/Orders";
// import { Products } from "@/collections/Products";
// import { Users } from "@/collections/Users";
// import { CollectionSlug, Payload } from "payload";

// function createRichTextDescription(description: string): { 
//   [k: string]: unknown; 
//   root: { 
//     type: string; 
//     children: { 
//       type: string; 
//       version: number; 
//       [k: string]: unknown; 
//     }[]; 
//     direction: ("ltr" | "rtl") | null; 
//     format: "left" | "start" | "center" | "right" | "end" | "justify" | ""; 
//     indent: number; 
//     version: number; 
//   }; 
// } {
//   return {
//     root: {
//       type: "root",
//       children: [
//         {
//           type: "paragraph",
//           version: 1,
//           children: [
//             {
//               type: "text",
//               text: description,
//               version: 1,
//             },
//           ],
//         },
//       ],
//       direction: null,
//       format: "left",
//       indent: 0,
//       version: 1,
//     },
//   };
// }

// // Check if collections have data
// const hasData = async (payload: Payload): Promise<boolean> => {
//   try {
//     const collections: CollectionSlug[] = [Users.slug as CollectionSlug, Products.slug as CollectionSlug, Orders.slug as CollectionSlug, Media.slug as CollectionSlug, Categories.slug as CollectionSlug];
//     for (const collection of collections) {
//       const { totalDocs } = await payload.find({ collection, limit: 1 });
//       if (collection === Users.slug && totalDocs > 1) return true; // Ignore single admin user
//       if (collection !== Users.slug && totalDocs > 0) return true;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error in hasData:", error);
//     throw error;
//   }
// };

// // Reset collections except admin user
// const resetCollections = async (payload: Payload): Promise<{ success: boolean; message: string }> => {
//   try {
//     const collections: CollectionSlug[] = [Products.slug as CollectionSlug, Orders.slug as CollectionSlug, Media.slug as CollectionSlug, Categories.slug as CollectionSlug];
//     const adminUser = await payload.find({
//       collection: Users.slug as CollectionSlug,
//       where: { role: { equals: 'admin' } },
//       limit: 1,
//     });

//     // Delete all documents from non-user collections
//     for (const collection of collections) {
//       const { docs } = await payload.find({ collection, limit: 1000 });
//       await Promise.all(docs.map((doc) => payload.delete({ collection, id: doc.id })));
//     }

//     // Delete all users except admin
//     const { docs: users } = await payload.find({ collection: Users.slug as CollectionSlug, limit: 1000 });
//     await Promise.all(
//       users
//         .filter((user) => user.id !== adminUser.docs[0]?.id)
//         .map((user) => payload.delete({ collection: Users.slug as CollectionSlug, id: user.id }))
//     );

//     return { success: true, message: 'Collections reset, admin user preserved' };
//   } catch (error) {
//     console.error("Error in resetCollections:", error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return { success: false, message: `Error resetting collections: ${errorMessage}` };
//   }
// };

// // Dummy data generation based on product type
// const generateSeedData = async (
//   payload: Payload,
//   productType: string,
//   force: boolean = false
// ): Promise<{ success: boolean; message: string }> => {
//   try {
//     if (!force && (await hasData(payload))) {
//       return { success: false, message: 'Data already exists. Use reset or force to overwrite.' };
//     }

//     type ProductTypes = {
//       [key: string]: {
//         categories: string[];
//         products: { title: string; price: number; description: string; stock: number }[];
//         images: { filename: string; alt: string }[];
//       };
//     };

//     const productTypesData: ProductTypes = {
//       clothes: {
//         categories: ['Shirts', 'Pants', 'Jackets'],
//         products: [
//           { title: 'Cotton T-Shirt', price: 19.99, description: 'A comfy cotton tee.', stock: 50 },
//           { title: 'Denim Jeans', price: 49.99, description: 'Classic blue jeans.', stock: 30 },
//           { title: 'Leather Jacket', price: 99.99, description: 'Stylish leather jacket.', stock: 20 },
//         ],
//         images: [
//           { filename: 'tshirt.jpg', alt: 'Cotton T-Shirt' },
//           { filename: 'jeans.jpg', alt: 'Denim Jeans' },
//           { filename: 'jacket.jpg', alt: 'Leather Jacket' },
//         ],
//       },
//       donuts: {
//         categories: ['Glazed', 'Filled', 'Sprinkled'],
//         products: [
//           { title: 'Glazed Donut', price: 1.99, description: 'Classic glazed donut.', stock: 100 },
//           { title: 'Jelly Filled Donut', price: 2.49, description: 'Sweet jelly inside.', stock: 80 },
//           { title: 'Sprinkle Donut', price: 2.29, description: 'Colorful sprinkles.', stock: 90 },
//         ],
//         images: [
//           { filename: 'glazed.jpg', alt: 'Glazed Donut' },
//           { filename: 'jelly.jpg', alt: 'Jelly Filled Donut' },
//           { filename: 'sprinkle.jpg', alt: 'Sprinkle Donut' },
//         ],
//       },
//       pets: {
//         categories: ['Dog Supplies', 'Cat Supplies', 'Bird Supplies'],
//         products: [
//           { title: 'Dog Collar', price: 14.99, description: 'Durable dog collar.', stock: 40 },
//           { title: 'Cat Toy', price: 9.99, description: 'Fun cat toy with bell.', stock: 60 },
//           { title: 'Bird Seed', price: 5.99, description: 'Nutritious bird seed.', stock: 100 },
//         ],
//         images: [
//           { filename: 'collar.jpg', alt: 'Dog Collar' },
//           { filename: 'cattoy.jpg', alt: 'Cat Toy' },
//           { filename: 'birdseed.jpg', alt: 'Bird Seed' },
//         ],
//       },
//       cars: {
//         categories: ['Car Parts', 'Accessories', 'Tools'],
//         products: [
//           { title: 'Oil Filter', price: 12.99, description: 'High-quality oil filter.', stock: 25 },
//           { title: 'Car Mats', price: 29.99, description: 'Durable car floor mats.', stock: 15 },
//           { title: 'Tire Wrench', price: 19.99, description: 'Heavy-duty tire wrench.', stock: 20 },
//         ],
//         images: [
//           { filename: 'filter.jpg', alt: 'Oil Filter' },
//           { filename: 'mats.jpg', alt: 'Car Mats' },
//           { filename: 'wrench.jpg', alt: 'Tire Wrench' },
//         ],
//       },
//     };

//     const data = productTypesData[productType] || productTypesData['clothes'];

//     // Seed Users
//     await payload.create({
//       collection: Users.slug as CollectionSlug,
//       data: { email: 'admin+seed@example.com', password: 'admin123', role: 'admin', name: 'Admin' },
//     });

//     const customer = await payload.create({
//       collection: Users.slug as CollectionSlug,
//       data: { email: 'customer+seed@example.com', password: 'customer123', role: 'customer', name: 'Customer' },
//     });

//     // Seed Media
//     const mediaIds = await Promise.all(
//       data.images.map((img: { filename: string; alt: string }) =>
//         payload.create({
//           collection: Media.slug as CollectionSlug,
//           data: { alt: img.alt, filename: img.filename, mimeType: "image/jpeg" },
//         })
//       )
//     );

//     // Seed Categories
//     const categoryIds = await Promise.all(
//       data.categories.map((cat: string, index: number) =>
//         payload.create({
//           collection: Categories.slug as CollectionSlug,
//           data: { name: cat, media: mediaIds[index % mediaIds.length].id },
//         })
//       )
//     );

//     // Seed Products
//     const productIds = await Promise.all(
//       data.products.map((prod: { title: string; price: number; description: string; stock: number }, index: number) =>
//         payload.create({
//           collection: Products.slug as CollectionSlug,
//           data: {
//             slug: Products.slug,
//             title: prod.title,
//             description: createRichTextDescription(prod.description),
//             price: prod.price,
//             stock: prod.stock,
//             trackInventory: true,
//             availability: 'inStock',
//             images: [mediaIds[index % mediaIds.length].id],
//             featuredImage: mediaIds[index % mediaIds.length].id,
//             categories: [categoryIds[index % categoryIds.length].id],
//             status: 'published',
//           },
//         })
//       )
//     );

//     // Seed Orders
//     await payload.create({
//       collection: Orders.slug as CollectionSlug,
//       data: {
//         user: customer.id,
//         items: productIds.map((prodId: any, index: number) => ({
//           product: prodId.id,
//           title: data.products[index].title,
//           price: data.products[index].price,
//           quantity: Math.floor(Math.random() * 5) + 1,
//         })),
//         total: productIds.reduce((sum: number, _: any, index: number) => sum + data.products[index].price * 2, 0),
//         status: 'pending',
//         paymentStatus: 'unpaid',
//       },
//     });

//     console.log(`Seeded data for ${productType}`);
//     return { success: true, message: `Seeded data for ${productType}` };
//   } catch (error) {
//     console.error("Error in generateSeedData:", error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return { success: false, message: `Error generating seed data: ${errorMessage}` };
//   }
// };

// export { hasData, resetCollections, generateSeedData };