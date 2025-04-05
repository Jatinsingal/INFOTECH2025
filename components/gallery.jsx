import Image from "next/image"

const galleryImages = [
  {
    id: 1,
    src: "/images/codequest1.png",
    alt: "CodeQuest Event",
    category: "CodeQuest",
  },
  {
    id: 2,
    src: "/images/codequest2.png",
    alt: "Team working together",
    category: "Workshop",
  },
  {
    id: 3,
    src: "/images/ignitefest1.png",
    alt: "IgniteFest Team",
    category: "IgniteFest",
  },
  {
    id: 4,
    src: "/images/ignitefest2.png",
    alt: "Award Ceremony",
    category: "IgniteFest",
  },
  {
    id: 5,
    src: "/images/eminence1.png",
    alt: "Eminence Group Photo",
    category: "Eminence",
  },
  {
    id: 6,
    src: "/images/eminence2.png",
    alt: "Eminence Award Ceremony",
    category: "Eminence",
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Gallery</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Glimpses of our events, workshops, and activities.</p>
          <div className="w-20 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg">
              <div className="aspect-w-16 aspect-h-9 relative h-64">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">{image.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

