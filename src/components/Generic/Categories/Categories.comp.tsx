import Link from "next/link";
import { CategorySectionProps } from "./Categories.types";

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
    return (
      <div className="overflow-x-auto whitespace-nowrap py-4 hide-scrollbar">
        <div className="inline-flex space-x-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`} // Adjust the URL as needed
              passHref
            >
              <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                {/* Category Media (Image or Icon) */}
                <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md">
                  {category.media && (
                    <img
                    src={typeof category.media === 'string' ? category.media : category.media?.url ?? ''}

                    //   src={typeof category.media === 'string' ? category.media : category.media.url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Category Name */}
                <p className="mt-2 text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default CategorySection;