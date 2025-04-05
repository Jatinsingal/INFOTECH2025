"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Instagram } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)

      // Reset success message after 3 seconds
      if (submitSuccess) {
        setTimeout(() => setSubmitSuccess(false), 3000)
      }
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Have questions or want to join our club? Reach out to us!</p>
          <div className="w-20 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <MapPin className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Location</h4>
                  <p className="text-gray-300">Chandigarh Engineering College, CGC Landran, Mohali, Punjab</p>
                  <a
                    href="https://maps.app.goo.gl/8zheqikA9gBgsnva8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Mail className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Email</h4>
                  <a href="mailto:jatinsingal456@gmail.com" className="text-gray-300 hover:text-purple-400">
                    jatinsingal456@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Phone className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Phone</h4>
                  <a href="tel:+919694620296" className="text-gray-300 hover:text-purple-400">
                    +91 9694620296
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-900/50 p-3 rounded-full">
                  <Instagram className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Instagram</h4>
                  <a
                    href="https://www.instagram.com/info_tech_cgc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400"
                  >
                    @info_tech_cgc
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-gray-700 bg-gray-800 text-gray-200 focus:border-purple-500 focus:ring-purple-500 min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitSuccess && (
                <div className="bg-green-900/50 text-green-300 p-3 rounded-md text-center">
                  Your message has been sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

