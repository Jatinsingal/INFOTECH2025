"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  Users,
  ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  FileText,
  BarChart2,
  Shield,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New member registration", time: "2 minutes ago", read: false },
    { id: 2, text: "Event updated: CodeQuest", time: "1 hour ago", read: false },
    { id: 3, text: "New contact form submission", time: "3 hours ago", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/auth/login")
    }

    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const isActive = (path) => {
    return pathname === path
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 border-b border-gray-800 py-3 px-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 shadow-md">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 mr-2 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex text-gray-400 mr-2 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/infotech-logo.png"
              alt="Infotech Club Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-white hidden sm:inline">
              Infotech <span className="text-purple-400">Admin</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-400 hover:text-white transition-colors relative"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50"
                >
                  <div className="flex items-center justify-between p-3 border-b border-gray-700">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button onClick={markAllAsRead} className="text-xs text-purple-400 hover:text-purple-300">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${!notification.read ? "bg-gray-700/50" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-purple-500" : "bg-gray-600"}`}
                            ></div>
                            <div>
                              <p className="text-gray-200 text-sm">{notification.text}</p>
                              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-700">
                    <button className="w-full text-center text-purple-400 text-sm hover:text-purple-300 py-1">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50"
                  >
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <div className="mt-2 flex items-center">
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">
                          Administrator
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/admin/profile">
                        <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2 transition-colors">
                          <Shield size={14} />
                          Admin Profile
                        </button>
                      </Link>
                      <Link href="/">
                        <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2 transition-colors">
                          <LayoutDashboard size={14} />
                          View Website
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md text-sm flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <aside
          className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out hidden md:block fixed h-[calc(100vh-57px)] z-40 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="p-4 h-full flex flex-col">
            <nav className="space-y-1 flex-1">
              <Link href="/admin/dashboard">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/dashboard")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <LayoutDashboard size={20} />
                  {isSidebarOpen && <span>Dashboard</span>}
                </motion.button>
              </Link>

              <Link href="/admin/events">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/events")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <Calendar size={20} />
                  {isSidebarOpen && <span>Events</span>}
                </motion.button>
              </Link>

              <Link href="/admin/members">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/members")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <Users size={20} />
                  {isSidebarOpen && <span>Members</span>}
                </motion.button>
              </Link>

              <Link href="/admin/gallery">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/gallery")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <ImageIcon size={20} />
                  {isSidebarOpen && <span>Gallery</span>}
                </motion.button>
              </Link>

              <Link href="/admin/reports">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/reports")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <BarChart2 size={20} />
                  {isSidebarOpen && <span>Reports</span>}
                </motion.button>
              </Link>

              <Link href="/admin/content">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/content")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <FileText size={20} />
                  {isSidebarOpen && <span>Content</span>}
                </motion.button>
              </Link>

              <Link href="/admin/settings">
                <motion.button
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/admin/settings")
                      ? "bg-purple-900/50 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } transition-colors`}
                >
                  <Settings size={20} />
                  {isSidebarOpen && <span>Settings</span>}
                </motion.button>
              </Link>
            </nav>

            <div className="mt-auto">
              <div className={`p-3 rounded-md bg-gray-800/50 mb-4 ${!isSidebarOpen && "hidden"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400">
                    <Bell size={16} />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-300 font-medium">Pro Tip</p>
                    <p className="text-gray-400 text-xs">Use keyboard shortcuts for faster navigation</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white text-xs"
                >
                  View All Tips
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                {isSidebarOpen && "Logout"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-[57px] bottom-0 w-64 bg-gray-900 border-r border-gray-800 z-50 md:hidden"
              >
                <div className="p-4 h-full flex flex-col">
                  <nav className="space-y-1 flex-1">
                    <Link href="/admin/dashboard">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/dashboard")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                      </button>
                    </Link>

                    <Link href="/admin/events">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/events")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Calendar size={20} />
                        <span>Events</span>
                      </button>
                    </Link>

                    <Link href="/admin/members">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/members")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Users size={20} />
                        <span>Members</span>
                      </button>
                    </Link>

                    <Link href="/admin/gallery">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/gallery")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ImageIcon size={20} />
                        <span>Gallery</span>
                      </button>
                    </Link>

                    <Link href="/admin/reports">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/reports")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <BarChart2 size={20} />
                        <span>Reports</span>
                      </button>
                    </Link>

                    <Link href="/admin/content">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/content")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FileText size={20} />
                        <span>Content</span>
                      </button>
                    </Link>

                    <Link href="/admin/settings">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md ${
                          isActive("/admin/settings")
                            ? "bg-purple-900/50 text-purple-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        } transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings size={20} />
                        <span>Settings</span>
                      </button>
                    </Link>
                  </nav>

                  <div className="mt-auto">
                    <div className="p-3 rounded-md bg-gray-800/50 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400">
                          <Bell size={16} />
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-300 font-medium">Pro Tip</p>
                          <p className="text-gray-400 text-xs">Use keyboard shortcuts for faster navigation</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-1 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white text-xs"
                      >
                        View All Tips
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

