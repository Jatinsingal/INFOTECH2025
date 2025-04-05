import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Our Club</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <Image
              src="/images/college-logo.png"
              alt="CGC Landran"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Our Story</h3>
            <p className="text-gray-300 mb-6">
              Infotech Club was founded in January 2025 by three passionate students: Jatin Singal, Jatin, and Nitin.
              What started as a small initiative has now grown to become the biggest club in the IT Department at
              Chandigarh Engineering College, Landran.
            </p>

            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Our Vision</h3>
            <p className="text-gray-300 mb-6">
              To create an innovative, creative, and hardworking community within the IT department that organizes
              impactful events and fosters technical growth among students.
            </p>

            <h3 className="text-2xl font-semibold text-purple-400 mb-4">What We Do</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Organize technical competitions and hackathons</li>
              <li>Conduct workshops on emerging technologies</li>
              <li>Host cultural and non-technical events</li>
              <li>Provide a platform for students to showcase their talents</li>
              <li>Build a community of tech enthusiasts</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

