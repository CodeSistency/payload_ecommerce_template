import { CollectionSlug, Payload } from "payload";
import { Users } from "../../Users";
import { Products } from "../../Products";
import { Orders } from "../../Orders";
import { Media } from "../../Media";
import { Categories } from "../../Categories";


// Define types for product data
interface ProductData {
    title: string;
    price: number;
    description: string;
    stock: number;
  }
  
  interface ImageData {
    filename: string;
    alt: string;
  }
  
  interface ProductTypeData {
    categories: string[];
    products: ProductData[];
    images: ImageData[];
  }
  
  // Define the product types with an index signature
  interface ProductTypes {
    [key: string]: ProductTypeData;
    clothes: ProductTypeData;
    donuts: ProductTypeData;
    pets: ProductTypeData;
    cars: ProductTypeData;
  }

  interface RichTextNode {
    [k: string]: unknown;
    type: string;
    version: number;
  }

  interface RichTextRoot {
    [k: string]: unknown;
    root: {
      type: string;
      children: RichTextNode[];
      direction: 'ltr' | 'rtl' | null;
      format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
      indent: number;
      version: number;
    };
  }

  const createRichTextDescription = (text: string): RichTextRoot => ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          version: 1,
          children: [
            {
              type: 'text',
              text: text,
              version: 1,
              format: 0,
              mode: 'normal',
              detail: 0,
            },
          ],
          direction: 'ltr' as const, // Update this line
        },
      ],
      direction: 'ltr' as const, // Update this line
    },
  });
  
  // Check if collections have data
  const hasData = async (payload: Payload): Promise<boolean> => {
    const collections: CollectionSlug[] = [Users.slug as CollectionSlug, Products.slug as CollectionSlug, Orders.slug as CollectionSlug, Media.slug as CollectionSlug, Categories.slug as CollectionSlug];
    for (const collection of collections) {
      const { totalDocs } = await payload.find({ collection, limit: 1 });
      if (collection === Users.slug && totalDocs > 1) return true; // Ignore single admin user
      if (collection !== Users.slug && totalDocs > 0) return true;
    }
    return false;
  };
  
  // Reset collections except admin user
  const resetCollections = async (payload: Payload): Promise<{ success: boolean; message: string }> => {
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
  };
  
  // Dummy data generation based on product type
  const generateSeedData = async (
    payload: Payload,
    productType: string,
    force: boolean = false
  ): Promise<{ success: boolean; message: string }> => {
    if (!force && (await hasData(payload))) {
      return { success: false, message: 'Data already exists. Use reset or force to overwrite.' };
    }
  
    const productTypesData: ProductTypes = {
      clothes: {
        categories: ['Shirts', 'Pants', 'Jackets'],
        products: [
          { title: 'Cotton T-Shirt', price: 19.99, description: 'A comfy cotton tee.', stock: 50 },
          { title: 'Denim Jeans', price: 49.99, description: 'Classic blue jeans.', stock: 30 },
          { title: 'Leather Jacket', price: 99.99, description: 'Stylish leather jacket.', stock: 20 },
        ],
        images: [
          { filename: 'tshirt.jpg', alt: 'Cotton T-Shirt' },
          { filename: 'jeans.jpg', alt: 'Denim Jeans' },
          { filename: 'jacket.jpg', alt: 'Leather Jacket' },
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
          { filename: 'glazed.jpg', alt: 'Glazed Donut' },
          { filename: 'jelly.jpg', alt: 'Jelly Filled Donut' },
          { filename: 'sprinkle.jpg', alt: 'Sprinkle Donut' },
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
          { filename: 'collar.jpg', alt: 'Dog Collar' },
          { filename: 'cattoy.jpg', alt: 'Cat Toy' },
          { filename: 'birdseed.jpg', alt: 'Bird Seed' },
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
          { filename: 'filter.jpg', alt: 'Oil Filter' },
          { filename: 'mats.jpg', alt: 'Car Mats' },
          { filename: 'wrench.jpg', alt: 'Tire Wrench' },
        ],
      },
    };
  
    const data = productTypesData[productType] || productTypesData['clothes'];
  
    // Seed Users
    const users = await payload.create({
      collection: Users.slug as CollectionSlug,
      data: { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    });
  
    const customer = await payload.create({
      collection: Users.slug as CollectionSlug,
      data: { email: 'customer@example.com', password: 'customer123', role: 'customer' },
    });
  
    // Seed Media
    const mediaIds = await Promise.all(
      data.images.map((img: ImageData) =>
        payload.create({
          collection: Media.slug as CollectionSlug,
          data: { alt: img.alt,   },
          filePath: `./seed-images/${img.filename}`,
        //   file: { path: `./seed-images/${img.filename}` },
        })
      )
    );
  
    // Seed Categories
    const categoryIds = await Promise.all(
      data.categories.map((cat: string, index: number) =>
        payload.create({
          collection: Categories.slug as CollectionSlug,
          data: { name: cat, media: mediaIds[index % mediaIds.length].id },
        })
      )
    );
  
    // Seed Products
    const productIds = await Promise.all(
      data.products.map((prod: ProductData, index: number) =>
        payload.create({
          collection: Products.slug as CollectionSlug,
          data: {
            slug: Products.slug,
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
        })
      )
    );
  
    // Seed Orders
    await payload.create({
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
  
    return { success: true, message: `Seeded data for ${productType}` };
  };
  
  export { generateSeedData, resetCollections, hasData };