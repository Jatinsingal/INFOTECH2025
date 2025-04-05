"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  Award,
  BarChart2,
  ArrowUp,
  ArrowDown,
  FileText,
  Mail,
  Eye,
  Download,
  Printer,
  RefreshCw,
  Filter,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

// Chart components
const LineChart = () => (
  <div className="w-full h-64 bg-gray-800 rounded-md overflow-hidden">
    <div className="w-full h-full p-4 flex items-end">
      <div className="flex-1 h-[20%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[40%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[30%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[60%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[80%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[70%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
      <div className="flex-1 h-[90%] bg-purple-500/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
      </div>
    </div>
  </div>
)

const BarChart = () => (
  <div className="w-full h-64 bg-gray-800 rounded-md overflow-hidden">
    <div className="w-full h-full p-4 flex items-end justify-around">
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "30%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "50%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "70%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "40%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "60%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "80%" }}></div>
      <div className="w-8 bg-purple-600 rounded-t-md" style={{ height: "45%" }}></div>
    </div>
  </div>
)

const PieChart = () => (
  <div className="w-full h-64 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
    <div className="relative w-40 h-40">
      <div
        className="absolute inset-0 rounded-full border-8 border-purple-600"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full border-8 border-indigo-500"
        style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full border-8 border-pink-500"
        style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%, 0 0)" }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  </div>
)

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Check if user is logged in and is an admin
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      // If not admin, redirect to home
      if (parsedUser.role !== "admin") {
        router.push("/")
      }
    } else {
      // Not logged in, redirect to login
      router.push("/auth/login")
    }

    setIsLoading(false)
  }, [router])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.name}. Here's what's happening with your club.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Generate Report</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400"
            >
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                      <Calendar className="text-purple-400" size={20} />
                      Events
                    </CardTitle>
                    <CardDescription className="text-gray-400">Total events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-purple-400">12</p>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+25%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-gray-700 mt-4">
                      <div className="h-full bg-purple-500" style={{ width: "75%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                      <Users className="text-purple-400" size={20} />
                      Members
                    </CardTitle>
                    <CardDescription className="text-gray-400">Active members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-purple-400">48</p>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+12%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-gray-700 mt-4">
                      <div className="h-full bg-purple-500" style={{ width: "60%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                      <Award className="text-purple-400" size={20} />
                      Achievements
                    </CardTitle>
                    <CardDescription className="text-gray-400">Club achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-purple-400">15</p>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+8%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-gray-700 mt-4">
                      <div className="h-full bg-purple-500" style={{ width: "45%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
                      <BarChart2 className="text-purple-400" size={20} />
                      Registrations
                    </CardTitle>
                    <CardDescription className="text-gray-400">New registrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-purple-400">86</p>
                      <div className="flex items-center text-red-400 text-sm">
                        <ArrowDown size={14} className="mr-1" />
                        <span>-3%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-gray-700 mt-4">
                      <div className="h-full bg-purple-500" style={{ width: "35%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl text-white">Event Participation</CardTitle>
                    <CardDescription className="text-gray-400">Monthly participation trends</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700">
                      <Download size={14} className="mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700">
                      <Printer size={14} className="mr-1" />
                      Print
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">Recent Activities</CardTitle>
                  <CardDescription className="text-gray-400">Latest club activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-purple-900/30 p-2 rounded-full">
                        <Calendar size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-200 font-medium">New event created</p>
                        <p className="text-gray-400 text-sm">CodeQuest 2025 has been scheduled</p>
                        <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-purple-900/30 p-2 rounded-full">
                        <Users size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-200 font-medium">New member joined</p>
                        <p className="text-gray-400 text-sm">Anushka has joined as Logistics Coordinator</p>
                        <p className="text-gray-500 text-xs mt-1">3 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-purple-900/30 p-2 rounded-full">
                        <Award size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-200 font-medium">Achievement unlocked</p>
                        <p className="text-gray-400 text-sm">Club won Best Technical Club award</p>
                        <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-purple-900/30 p-2 rounded-full">
                        <Mail size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-200 font-medium">New contact message</p>
                        <p className="text-gray-400 text-sm">Received inquiry about upcoming workshops</p>
                        <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                    View all activities <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">Upcoming Events</CardTitle>
                  <CardDescription className="text-gray-400">Events in the next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-900/50 p-2 rounded-md">
                          <Calendar size={16} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-200 font-medium">Web Dev Workshop</p>
                          <p className="text-gray-400 text-xs">May 15, 2025 • 10:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded-full">Confirmed</span>
                      </div>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-900/50 p-2 rounded-md">
                          <Calendar size={16} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-200 font-medium">AI Hackathon</p>
                          <p className="text-gray-400 text-xs">May 22-23, 2025 • All day</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded-full">
                          Planning
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-900/50 p-2 rounded-md">
                          <Calendar size={16} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-200 font-medium">Tech Talk: Blockchain</p>
                          <p className="text-gray-400 text-xs">June 5, 2025 • 4:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">New</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                    View all events <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">Member Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Members by role</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Core Team (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Volunteers (45%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Members (30%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">Manage club resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => router.push("/admin/events")}
                      className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <Calendar size={24} className="text-purple-400" />
                      <span className="text-gray-200 text-sm font-medium">Manage Events</span>
                    </Button>

                    <Button
                      onClick={() => router.push("/admin/members")}
                      className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <Users size={24} className="text-purple-400" />
                      <span className="text-gray-200 text-sm font-medium">Manage Members</span>
                    </Button>

                    <Button
                      onClick={() => router.push("/admin/gallery")}
                      className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <Eye size={24} className="text-purple-400" />
                      <span className="text-gray-200 text-sm font-medium">Manage Gallery</span>
                    </Button>

                    <Button
                      onClick={() => router.push("/admin/settings")}
                      className="p-4 h-auto bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center gap-2 transition-colors"
                    >
                      <FileText size={24} className="text-purple-400" />
                      <span className="text-gray-200 text-sm font-medium">Site Content</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl text-white">Event Attendance</CardTitle>
                    <CardDescription className="text-gray-400">Attendance by event type</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl text-white">Member Growth</CardTitle>
                    <CardDescription className="text-gray-400">Monthly member growth</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Performance Metrics</CardTitle>
                <CardDescription className="text-gray-400">Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-300 font-medium">Event Engagement</h3>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+18%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-purple-400 mb-2">87%</p>
                    <div className="w-full h-1 bg-gray-600">
                      <div className="h-full bg-green-500" style={{ width: "87%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-300 font-medium">Member Retention</h3>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+5%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-purple-400 mb-2">92%</p>
                    <div className="w-full h-1 bg-gray-600">
                      <div className="h-full bg-green-500" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-300 font-medium">Budget Utilization</h3>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <ArrowUp size={14} className="mr-1" />
                        <span>+2%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-purple-400 mb-2">68%</p>
                    <div className="w-full h-1 bg-gray-600">
                      <div className="h-full bg-yellow-500" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl text-white">Event Status</CardTitle>
                  <CardDescription className="text-gray-400">Overview of all events</CardDescription>
                </div>
                <Button
                  onClick={() => router.push("/admin/events")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Manage Events
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Event Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Registrations</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-200">Web Dev Workshop</td>
                        <td className="py-3 px-4 text-gray-400">May 15, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-xs">
                            Confirmed
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-200">42</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-200">AI Hackathon</td>
                        <td className="py-3 px-4 text-gray-400">May 22-23, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs">
                            Planning
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-200">18</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-200">Tech Talk: Blockchain</td>
                        <td className="py-3 px-4 text-gray-400">June 5, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs">New</span>
                        </td>
                        <td className="py-3 px-4 text-gray-200">7</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-200">CodeQuest 2025</td>
                        <td className="py-3 px-4 text-gray-400">July 10, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded-full text-xs">Draft</span>
                        </td>
                        <td className="py-3 px-4 text-gray-200">0</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl text-white">Member Directory</CardTitle>
                  <CardDescription className="text-gray-400">All club members</CardDescription>
                </div>
                <Button
                  onClick={() => router.push("/admin/members")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Manage Members
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      JS
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Jatin Singal</p>
                      <p className="text-gray-400 text-sm">President</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      JA
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Jatin</p>
                      <p className="text-gray-400 text-sm">Vice President</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      NI
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Nitin</p>
                      <p className="text-gray-400 text-sm">Technical Head</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      KC
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Kavya Chhabra</p>
                      <p className="text-gray-400 text-sm">Social Head</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      DG
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Disha Gaba</p>
                      <p className="text-gray-400 text-sm">Research & Development</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      AN
                    </div>
                    <div>
                      <p className="text-gray-200 font-medium">Anushka</p>
                      <p className="text-gray-400 text-sm">Logistics Coordinator</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

