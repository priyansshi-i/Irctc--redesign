"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Gift, HelpCircle, LogIn, LogOut, Menu, Settings, Train, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginDialog } from "@/components/login-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Book Tickets", href: "/book" },
  { name: "PNR Status", href: "/pnr" },
  { name: "Track Train", href: "/track" },
  { name: "My Bookings", href: "/bookings" },
  { name: "Tourism", href: "/tourism" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [showNotificationBadge, setShowNotificationBadge] = useState(true)

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    if (email && password) {
      setIsLoggedIn(true)
      setLoginOpen(false)
      toast({
        title: "Login Successful",
        description: "Welcome back to IRCTC!",
      })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const handleNotificationClick = () => {
    setShowNotificationBadge(false)
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications.",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center gap-2 mb-8">
                <Image src="/images/irctc-logo.png" alt="IRCTC Logo" width={40} height={40} className="rounded-md" />
                <span className="font-bold text-xl">IRCTC</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-orange ${
                      pathname === item.href ? "text-orange" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image src="/images/irctc-logo.png" alt="IRCTC Logo" fill className="object-contain rounded-md" />
            </div>
            <span className="hidden font-bold text-xl md:inline-block gradient-text">IRCTC</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-orange ${
                  pathname === item.href ? "text-orange" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            onClick={handleNotificationClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {showNotificationBadge && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-pink text-white">{notifications}</Badge>
            )}
          </Button>
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-orange">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-orange text-white">UR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/bookings")}>
                  <Train className="w-4 h-4 mr-2" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/rewards")}>
                  <Gift className="w-4 h-4 mr-2" />
                  Rewards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/help")}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex gap-1 text-orange hover:text-orange-dark"
                onClick={() => setLoginOpen(true)}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button
                onClick={() => setLoginOpen(true)}
                className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark text-white"
              >
                Sign Up
              </Button>
              <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

