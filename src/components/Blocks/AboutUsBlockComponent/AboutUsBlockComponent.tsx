// import React from 'react';
// import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
// import { RichText } from '@payloadcms/richtext-lexical/react';
// export interface AboutUsBlockData {
//     variant: 'textOnly' | 'withImage' | 'timeline';
//     impactLevel: 'low' | 'normal' | 'high';
//     content: SerializedEditorState;
//     subBlocks?: any[];
//   }

// // Variant: TextOnly
// const TextOnly = ({ block }: { block: AboutUsBlockData }) => (
//   <div className="about-us text-only">
//         <RichText data={block.content} />
//   </div>
// );

// // Variant: WithImage
// const WithImage = ({ block }: { block: AboutUsBlockData }) => (
//   <div className="about-us with-image flex flex-col md:flex-row gap-4">
//     <div className="md:w-1/2">
//       <img src="/placeholder-about-us.jpg" alt="About Us" className="w-full h-64 object-cover" /> {/* Replace with dynamic image if available */}
//     </div>
//     <div className="md:w-1/2">
//         <RichText data={block.content} />
//     </div>
//   </div>
// );

// // Variant: Timeline
// const Timeline = ({ block }: { block: AboutUsBlockData }) => (
//   <div className="about-us timeline">
//     <div className="relative border-l-2 border-gray-300 pl-4">
//         <RichText data={block.content} />
//     {/* Add timeline-specific styling or logic if needed */}
//     </div>
//   </div>
// );

// // Variants Object
// const variants = {
//   textOnly: TextOnly,
//   withImage: WithImage,
//   timeline: Timeline,
// };

// // Main Component
// const AboutUsBlockComponent = ({ block }: { block: AboutUsBlockData }) => {
//     const VariantComponent = variants[block.variant] || variants.textOnly;
//     return <VariantComponent block={block} />;
// };

// export default AboutUsBlockComponent;

// "use client"
import { Users, Calendar } from "lucide-react"

export interface AboutUsBlockData {
  variant: "simple" | "team" | "timeline"
  impactLevel: "low" | "normal" | "high"
  title?: string
  content?: string
  image?: { url: string }
  teamMembers?: {
    name: string
    role: string
    bio?: string
    image?: { url: string }
  }[]
  timelineEvents?: {
    year: string
    title: string
    description?: string
  }[]
  subBlocks?: any[]
}

// Simple variant component
const Simple = ({ block }: { block: AboutUsBlockData }) => {
  // Impact level styling
  const containerClasses = {
    low: "py-4",
    normal: "py-6",
    high: "py-8",
  }

  const titleClasses = {
    low: "text-xl font-medium mb-2",
    normal: "text-2xl font-bold mb-3",
    high: "text-3xl font-extrabold mb-4",
  }

  const contentClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg text-gray-800 leading-relaxed",
  }

  const imageClasses = {
    low: "rounded w-full h-auto mb-4 md:mb-0",
    normal: "rounded-md w-full h-auto mb-4 md:mb-0 shadow-sm",
    high: "rounded-lg w-full h-auto mb-4 md:mb-0 shadow-md",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          {block.image && (
            <div className="w-full md:w-1/2">
              <img
                src={block.image.url || "/placeholder.svg?height=400&width=600"}
                alt={block.title || "About Us"}
                className={imageClasses[block.impactLevel]}
              />
            </div>
          )}

          <div className={`w-full ${block.image ? "md:w-1/2" : ""}`}>
            {block.title && <h2 className={titleClasses[block.impactLevel]}>{block.title}</h2>}

            {block.content && (
              <div className={contentClasses[block.impactLevel]}>
                {block.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Team variant component
const Team = ({ block }: { block: AboutUsBlockData }) => {
  const teamMembers = block.teamMembers || []

  // Impact level styling
  const containerClasses = {
    low: "py-4",
    normal: "py-6",
    high: "py-8",
  }

  const titleClasses = {
    low: "text-xl font-medium mb-4 text-center",
    normal: "text-2xl font-bold mb-6 text-center",
    high: "text-3xl font-extrabold mb-8 text-center",
  }

  const gridClasses = {
    low: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
    normal: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
    high: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",
  }

  const cardClasses = {
    low: "bg-white border border-gray-100 rounded p-3",
    normal: "bg-white border border-gray-200 rounded-md p-4 shadow-sm",
    high: "bg-white border border-gray-300 rounded-lg p-5 shadow hover:shadow-md transition-all duration-200",
  }

  const imageClasses = {
    low: "w-24 h-24 rounded-full mx-auto mb-3 object-cover",
    normal: "w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-sm",
    high: "w-40 h-40 rounded-full mx-auto mb-5 object-cover shadow",
  }

  const nameClasses = {
    low: "text-base font-medium text-center",
    normal: "text-lg font-semibold text-center",
    high: "text-xl font-bold text-center",
  }

  const roleClasses = {
    low: "text-sm text-gray-500 text-center mb-2",
    normal: "text-base text-gray-600 text-center mb-3",
    high: "text-lg text-gray-700 text-center mb-4",
  }

  const bioClasses = {
    low: "text-xs text-gray-600 text-center",
    normal: "text-sm text-gray-700 text-center",
    high: "text-base text-gray-800 text-center",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      <div className="container mx-auto px-4">
        {block.title && <h2 className={titleClasses[block.impactLevel]}>{block.title}</h2>}

        {teamMembers.length > 0 ? (
          <div className={gridClasses[block.impactLevel]}>
            {teamMembers.map((member, index) => (
              <div key={index} className={cardClasses[block.impactLevel]}>
                {member.image ? (
                  <img
                    src={member.image.url || "/placeholder.svg?height=200&width=200"}
                    alt={member.name}
                    className={imageClasses[block.impactLevel]}
                  />
                ) : (
                  <div className={`${imageClasses[block.impactLevel]} bg-gray-200 flex items-center justify-center`}>
                    <Users size={block.impactLevel === "high" ? 48 : 36} className="text-gray-400" />
                  </div>
                )}

                <h3 className={nameClasses[block.impactLevel]}>{member.name}</h3>
                <p className={roleClasses[block.impactLevel]}>{member.role}</p>

                {member.bio && <p className={bioClasses[block.impactLevel]}>{member.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No team members found</div>
        )}
      </div>
    </div>
  )
}

// Timeline variant component
const Timeline = ({ block }: { block: AboutUsBlockData }) => {
  const timelineEvents = block.timelineEvents || []

  // Impact level styling
  const containerClasses = {
    low: "py-4",
    normal: "py-6",
    high: "py-8",
  }

  const titleClasses = {
    low: "text-xl font-medium mb-4 text-center",
    normal: "text-2xl font-bold mb-6 text-center",
    high: "text-3xl font-extrabold mb-8 text-center",
  }

  const timelineClasses = {
    low: "relative border-l border-gray-200 ml-6 pl-6 space-y-4",
    normal: "relative border-l-2 border-gray-300 ml-6 pl-8 space-y-6",
    high: "relative border-l-3 border-gray-400 ml-8 pl-10 space-y-8",
  }

  const eventClasses = {
    low: "relative",
    normal: "relative",
    high: "relative",
  }

  const dotClasses = {
    low: "absolute -left-9 w-4 h-4 rounded-full bg-gray-200 border border-white",
    normal: "absolute -left-11 w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center",
    high: "absolute -left-14 w-8 h-8 rounded-full bg-primary text-primary-foreground border-2 border-white flex items-center justify-center",
  }

  const yearClasses = {
    low: "text-sm font-bold text-gray-500",
    normal: "text-base font-bold text-gray-600",
    high: "text-lg font-bold text-gray-700",
  }

  const eventTitleClasses = {
    low: "text-base font-medium",
    normal: "text-lg font-semibold",
    high: "text-xl font-bold",
  }

  const descriptionClasses = {
    low: "text-sm text-gray-600 mt-1",
    normal: "text-base text-gray-700 mt-2",
    high: "text-lg text-gray-800 mt-3",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      <div className="container mx-auto px-4">
        {block.title && <h2 className={titleClasses[block.impactLevel]}>{block.title}</h2>}

        {timelineEvents.length > 0 ? (
          <div className={timelineClasses[block.impactLevel]}>
            {timelineEvents.map((event, index) => (
              <div key={index} className={eventClasses[block.impactLevel]}>
                <div className={dotClasses[block.impactLevel]}>
                  {block.impactLevel === "high" && <Calendar size={16} />}
                </div>

                <div className={yearClasses[block.impactLevel]}>{event.year}</div>
                <h3 className={eventTitleClasses[block.impactLevel]}>{event.title}</h3>

                {event.description && <p className={descriptionClasses[block.impactLevel]}>{event.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No timeline events found</div>
        )}
      </div>
    </div>
  )
}

// Variant mapping
const variants = {
  simple: Simple,
  team: Team,
  timeline: Timeline,
}

// Main component
const AboutUsBlockComponent = ({ block }: { block: AboutUsBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="about-us-block">
      <VariantComponent block={block} />
      {block.subBlocks && block.subBlocks.length > 0 && (
        <div className="sub-blocks container mx-auto px-4 py-4">
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

export default AboutUsBlockComponent

