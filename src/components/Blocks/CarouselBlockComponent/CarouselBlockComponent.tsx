// import React from 'react';
// import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

// export interface CarouselBlockData {
//   variant: 'imageOnly' | 'withText' | 'product';
//   impactLevel: 'low' | 'normal' | 'high';
//   items: { image?: { url: string }; caption?: string; product?: { id: string; title: string; images?: { image: { url: string } }[] } }[];
//   subBlocks?: any[];
// }

// // Variant: ImageOnly
// const ImageOnly = ({ block }: { block: CarouselBlockData }) => (
//   <div className={`carousel image-only impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
//     {block.items.map((item, index) => (
//       <div key={index} className="flex-shrink-0">
//         {item.image && <img src={item.image.url} alt={item.caption || 'Carousel Image'} className="h-48 w-48 object-cover" />}
//       </div>
//     ))}
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: WithText
// const WithText = ({ block }: { block: CarouselBlockData }) => (
//   <div className={`carousel with-text impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
//     {block.items.map((item, index) => (
//       <div key={index} className="flex-shrink-0 text-center">
//         {item.image && <img src={item.image.url} alt={item.caption || 'Carousel Image'} className="h-48 w-48 object-cover" />}
//         {item.caption && <p className="mt-2">{item.caption}</p>}
//       </div>
//     ))}
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: Product
// const Product = ({ block }: { block: CarouselBlockData }) => (
//   <div className={`carousel product impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
//     {block.items.map((item, index) => (
//       <div key={index} className="flex-shrink-0 text-center">
//         {item.product && (
//           <>
//             {item.product.images?.[0]?.image && (
//               <img src={item.product.images[0].image.url} alt={item.product.title} className="h-48 w-48 object-cover" />
//             )}
//             <p className="mt-2">{item.product.title}</p>
//           </>
//         )}
//       </div>
//     ))}
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Main Component
// const CarouselBlockComponent = ({ block }: { block: CarouselBlockData }) => {
//   switch (block.variant) {
//     case 'imageOnly':
//       return <ImageOnly block={block} />;
//     case 'withText':
//       return <WithText block={block} />;
//     case 'product':
//       return <Product block={block} />;
//     default:
//       return <ImageOnly block={block} />;
//   }
// };

// export default CarouselBlockComponent;

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export interface CarouselBlockData {
  variant: "image" | "card" | "testimonial"
  impactLevel: "low" | "normal" | "high"
  autoplay?: boolean
  interval?: number
  items: {
    id: string
    title?: string
    description?: string
    image?: { url: string }
    author?: string
    role?: string
    rating?: number
  }[]
  subBlocks?: any[]
}

// Image variant component
const ImageCarousel = ({ block }: { block: CarouselBlockData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const items = block.items || []
  const autoplay = block.autoplay || false
  const interval = block.interval || 5000

  // Impact level styling
  const containerClasses = {
    low: "relative rounded overflow-hidden",
    normal: "relative rounded-md overflow-hidden shadow-sm",
    high: "relative rounded-lg overflow-hidden shadow-md",
  }

  const slideClasses = {
    low: "w-full h-48 sm:h-64 md:h-80 object-cover",
    normal: "w-full h-56 sm:h-72 md:h-96 object-cover",
    high: "w-full h-64 sm:h-80 md:h-[32rem] object-cover",
  }

  const captionClasses = {
    low: "absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2",
    normal: "absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3",
    high: "absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4",
  }

  const titleClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-semibold",
    high: "text-lg font-bold",
  }

  const descriptionClasses = {
    low: "text-xs",
    normal: "text-sm",
    high: "text-base",
  }

  const buttonClasses = {
    low: "absolute top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full",
    normal: "absolute top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full",
    high: "absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full",
  }

  const indicatorClasses = {
    low: "absolute bottom-0 left-0 right-0 flex justify-center p-2 gap-1",
    normal: "absolute bottom-0 left-0 right-0 flex justify-center p-3 gap-1.5",
    high: "absolute bottom-0 left-0 right-0 flex justify-center p-4 gap-2",
  }

  const dotClasses = {
    low: "w-2 h-2 rounded-full bg-white/50 hover:bg-white",
    normal: "w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white",
    high: "w-3 h-3 rounded-full bg-white/50 hover:bg-white",
  }

  // Handle next slide
  const nextSlide = () => {
    if (isTransitioning || items.length <= 1) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Handle previous slide
  const prevSlide = () => {
    if (isTransitioning || items.length <= 1) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay && items.length > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, interval, items.length, currentIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay && items.length > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }
  }

  if (items.length === 0) {
    return <div className="text-center py-8 text-gray-500">No carousel items found</div>
  }

  return (
    <div className={containerClasses[block.impactLevel]} onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Carousel slides */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <img
                src={item.image?.url || "/placeholder.svg?height=600&width=1200"}
                alt={item.title || "Carousel image"}
                className={slideClasses[block.impactLevel]}
              />

              {(item.title || item.description) && (
                <div className={captionClasses[block.impactLevel]}>
                  {item.title && <h3 className={titleClasses[block.impactLevel]}>{item.title}</h3>}
                  {item.description && <p className={descriptionClasses[block.impactLevel]}>{item.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {items.length > 1 && (
        <>
          <button
            className={`${buttonClasses[block.impactLevel]} left-2`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={block.impactLevel === "high" ? 24 : 20} />
          </button>

          <button className={`${buttonClasses[block.impactLevel]} right-2`} onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={block.impactLevel === "high" ? 24 : 20} />
          </button>

          {/* Indicators */}
          <div className={indicatorClasses[block.impactLevel]}>
            {items.map((_, index) => (
              <button
                key={index}
                className={`${dotClasses[block.impactLevel]} ${index === currentIndex ? "bg-white" : ""}`}
                onClick={() => {
                  setCurrentIndex(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Card variant component
const CardCarousel = ({ block }: { block: CarouselBlockData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const items = block.items || []
  const autoplay = block.autoplay || false
  const interval = block.interval || 5000

  // Calculate items per slide based on impact level
  const itemsPerSlide = {
    low: 1,
    normal: 2,
    high: 3,
  }[block.impactLevel]

  // Calculate total number of slides
  const totalSlides = Math.ceil(items.length / itemsPerSlide)

  // Impact level styling
  const containerClasses = {
    low: "relative py-4",
    normal: "relative py-6",
    high: "relative py-8",
  }

  const slideContainerClasses = {
    low: "overflow-hidden mx-6",
    normal: "overflow-hidden mx-8",
    high: "overflow-hidden mx-10",
  }

  const cardClasses = {
    low: "border border-gray-100 rounded p-3 bg-white h-full",
    normal: "border border-gray-200 rounded-md p-4 shadow-sm bg-white h-full",
    high: "border border-gray-300 rounded-lg p-5 shadow bg-white h-full",
  }

  const imageClasses = {
    low: "w-full h-32 object-cover rounded mb-2",
    normal: "w-full h-40 object-cover rounded-md mb-3",
    high: "w-full h-48 object-cover rounded-lg mb-4",
  }

  const titleClasses = {
    low: "text-sm font-medium mb-1",
    normal: "text-base font-semibold mb-2",
    high: "text-lg font-bold mb-3",
  }

  const descriptionClasses = {
    low: "text-xs text-gray-600",
    normal: "text-sm text-gray-700",
    high: "text-base text-gray-800",
  }

  const buttonClasses = {
    low: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full",
    normal: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-sm",
    high: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow",
  }

  const indicatorClasses = {
    low: "flex justify-center mt-2 gap-1",
    normal: "flex justify-center mt-3 gap-1.5",
    high: "flex justify-center mt-4 gap-2",
  }

  const dotClasses = {
    low: "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400",
    normal: "w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400",
    high: "w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400",
  }

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
  }

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, interval, totalSlides, currentIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay && totalSlides > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }
  }

  // Get current slide items
  const getCurrentSlideItems = () => {
    const startIndex = currentIndex * itemsPerSlide
    return items.slice(startIndex, startIndex + itemsPerSlide)
  }

  if (items.length === 0) {
    return <div className="text-center py-8 text-gray-500">No carousel items found</div>
  }

  return (
    <div className={containerClasses[block.impactLevel]} onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Navigation buttons */}
      {totalSlides > 1 && (
        <>
          <button
            className={`${buttonClasses[block.impactLevel]} left-0`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={block.impactLevel === "high" ? 24 : 20} />
          </button>

          <button className={`${buttonClasses[block.impactLevel]} right-0`} onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={block.impactLevel === "high" ? 24 : 20} />
          </button>
        </>
      )}

      {/* Carousel slides */}
      <div className={slideContainerClasses[block.impactLevel]}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const slideItems = items.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)

            return (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className={`grid grid-cols-${itemsPerSlide} gap-4`}>
                  {slideItems.map((item) => (
                    <div key={item.id} className={cardClasses[block.impactLevel]}>
                      {item.image && (
                        <img
                          src={item.image.url || "/placeholder.svg?height=300&width=400"}
                          alt={item.title || "Card image"}
                          className={imageClasses[block.impactLevel]}
                        />
                      )}

                      {item.title && <h3 className={titleClasses[block.impactLevel]}>{item.title}</h3>}
                      {item.description && <p className={descriptionClasses[block.impactLevel]}>{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Indicators */}
      {totalSlides > 1 && (
        <div className={indicatorClasses[block.impactLevel]}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`${dotClasses[block.impactLevel]} ${index === currentIndex ? "bg-primary" : ""}`}
              onClick={() => {
                setCurrentIndex(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Testimonial variant component
const TestimonialCarousel = ({ block }: { block: CarouselBlockData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const items = block.items || []
  const autoplay = block.autoplay || false
  const interval = block.interval || 5000

  // Impact level styling
  const containerClasses = {
    low: "relative py-4",
    normal: "relative py-6",
    high: "relative py-8",
  }

  const slideContainerClasses = {
    low: "overflow-hidden mx-6",
    normal: "overflow-hidden mx-8",
    high: "overflow-hidden mx-10",
  }

  const testimonialClasses = {
    low: "border border-gray-100 rounded p-3 bg-white text-center mx-auto max-w-lg",
    normal: "border border-gray-200 rounded-md p-4 shadow-sm bg-white text-center mx-auto max-w-xl",
    high: "border border-gray-300 rounded-lg p-5 shadow bg-white text-center mx-auto max-w-2xl",
  }

  const quoteIconClasses = {
    low: "text-gray-200 mb-2 mx-auto",
    normal: "text-gray-300 mb-3 mx-auto",
    high: "text-gray-400 mb-4 mx-auto",
  }

  const textClasses = {
    low: "text-sm text-gray-600 italic mb-3",
    normal: "text-base text-gray-700 italic mb-4",
    high: "text-lg text-gray-800 italic mb-5",
  }

  const authorContainerClasses = {
    low: "flex items-center justify-center",
    normal: "flex items-center justify-center",
    high: "flex items-center justify-center",
  }

  const authorImageClasses = {
    low: "w-8 h-8 rounded-full mr-2",
    normal: "w-10 h-10 rounded-full mr-3",
    high: "w-12 h-12 rounded-full mr-4",
  }

  const authorNameClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-semibold",
    high: "text-lg font-bold",
  }

  const authorRoleClasses = {
    low: "text-xs text-gray-500",
    normal: "text-sm text-gray-600",
    high: "text-base text-gray-700",
  }

  const ratingClasses = {
    low: "flex justify-center mt-2",
    normal: "flex justify-center mt-3",
    high: "flex justify-center mt-4",
  }

  const buttonClasses = {
    low: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full",
    normal: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-sm",
    high: "absolute top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow",
  }

  const indicatorClasses = {
    low: "flex justify-center mt-2 gap-1",
    normal: "flex justify-center mt-3 gap-1.5",
    high: "flex justify-center mt-4 gap-2",
  }

  const dotClasses = {
    low: "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400",
    normal: "w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400",
    high: "w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400",
  }

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay && items.length > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, interval, items.length, currentIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay && items.length > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }
  }

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className={ratingClasses[block.impactLevel]}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={block.impactLevel === "high" ? 20 : 16}
            className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return <div className="text-center py-8 text-gray-500">No testimonials found</div>
  }

  return (
    <div className={containerClasses[block.impactLevel]} onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Navigation buttons */}
      {items.length > 1 && (
        <>
          <button
            className={`${buttonClasses[block.impactLevel]} left-0`}
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={block.impactLevel === "high" ? 24 : 20} />
          </button>

          <button
            className={`${buttonClasses[block.impactLevel]} right-0`}
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={block.impactLevel === "high" ? 24 : 20} />
          </button>
        </>
      )}

      {/* Testimonial slides */}
      <div className={slideContainerClasses[block.impactLevel]}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 flex items-center justify-center">
              <div className={testimonialClasses[block.impactLevel]}>
                <Quote className={quoteIconClasses[block.impactLevel]} size={block.impactLevel === "high" ? 36 : 24} />

                {item.description && <p className={textClasses[block.impactLevel]}>"{item.description}"</p>}

                <div className={authorContainerClasses[block.impactLevel]}>
                  {item.image && (
                    <img
                      src={item.image.url || "/placeholder.svg?height=100&width=100"}
                      alt={item.author || "Testimonial author"}
                      className={authorImageClasses[block.impactLevel]}
                    />
                  )}

                  <div className="text-left">
                    {item.author && <div className={authorNameClasses[block.impactLevel]}>{item.author}</div>}
                    {item.role && <div className={authorRoleClasses[block.impactLevel]}>{item.role}</div>}
                  </div>
                </div>

                {item.rating && renderRating(item.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {items.length > 1 && (
        <div className={indicatorClasses[block.impactLevel]}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${dotClasses[block.impactLevel]} ${index === currentIndex ? "bg-primary" : ""}`}
              onClick={() => {
                setCurrentIndex(index)
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Variant mapping
const variants = {
  image: ImageCarousel,
  card: CardCarousel,
  testimonial: TestimonialCarousel,
}

// Main component
const CarouselBlockComponent = ({ block }: { block: CarouselBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="carousel-block py-4">
      <VariantComponent block={block} />
      {block.subBlocks && block.subBlocks.length > 0 && (
        <div className="sub-blocks mt-4">
          {block.subBlocks.map((subBlock, index) => (
            <div key={index} className="sub-block">
              {/* Render sub-block content */}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CarouselBlockComponent

