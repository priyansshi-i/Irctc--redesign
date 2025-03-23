"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, MapPin, Mic, Search, Star, Train, TrendingUp, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { TrainStatusWidget } from "@/components/train-status-widget"
import { ChatbotButton } from "@/components/chatbot-button"
import { AchievementBadge } from "@/components/achievement-badge"
import { toast } from "@/components/ui/use-toast"

export default function Home() {
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const popularRoutes = [
    { from: "Delhi", to: "Mumbai", trains: 24, image: "/images/india-gate.png" },
    { from: "Bangalore", to: "Chennai", trains: 18, image: "/images/bangalore.png" },
    { from: "Kolkata", to: "Delhi", trains: 15, image: "/images/howrah-bridge.png" },
    { from: "Mumbai", to: "Ahmedabad", trains: 20, image: "/images/cst-mumbai.png" },
  ]

  const offers = [
    {
      id: 1,
      title: "10% off on first booking",
      description: "Use code FIRST10",
      image: "/images/train-green.png",
    },
    {
      id: 2,
      title: "Senior citizen discount",
      description: "Extra 5% off for senior citizens",
      image: "/images/cst-mumbai.png",
    },
    {
      id: 3,
      title: "Weekend getaway offer",
      description: "Special fares for weekend travel",
      image: "/images/howrah-bridge.png",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Journey",
      description: "Complete your first train journey",
      icon: Train,
      color: "orange",
    },
    {
      id: 2,
      title: "Explorer",
      description: "Travel to 5 different states",
      icon: MapPin,
      color: "pink",
    },
    {
      id: 3,
      title: "Frequent Traveler",
      description: "Book 10 tickets in a month",
      icon: TrendingUp,
      color: "purple",
    },
    {
      id: 4,
      title: "Group Master",
      description: "Book for a group of 5+ people",
      icon: Users,
      color: "teal",
    },
  ]

  useEffect(() => {
    // Show confetti animation when component mounts
    setShowConfetti(true)

    // Hide confetti after animation completes
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    if (!fromStation || !toStation) {
      toast({
        title: "Please fill in all fields",
        description: "Both origin and destination stations are required.",
        variant: "destructive",
      })
      return
    }

    // Navigate to book page
    window.location.href = "/book"
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange/90 to-purple/70 dark:from-orange/80 dark:to-purple/60 z-10" />
        <Image
          src="/images/train-green.png"
          alt="Indian Railways"
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover"
        />
        <div className="container relative z-20 pt-12 pb-20 md:pt-24 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Book Your Train Tickets with Ease
            </motion.h1>
            <motion.p
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Fast, secure, and convenient way to book train tickets across India
            </motion.p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto bg-background rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="book" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="book">Book Ticket</TabsTrigger>
                <TabsTrigger value="pnr">PNR Status</TabsTrigger>
                <TabsTrigger value="track">Track Train</TabsTrigger>
              </TabsList>
              <TabsContent value="book" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="from"
                        placeholder="Enter city or station"
                        className="pl-9"
                        value={fromStation}
                        onChange={(e) => setFromStation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="to"
                        placeholder="Enter city or station"
                        className="pl-9"
                        value={toStation}
                        onChange={(e) => setToStation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Journey</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <DatePicker />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Travel Class</Label>
                    <select
                      id="class"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">All Classes</option>
                      <option value="1A">AC First Class (1A)</option>
                      <option value="2A">AC 2 Tier (2A)</option>
                      <option value="3A">AC 3 Tier (3A)</option>
                      <option value="SL">Sleeper (SL)</option>
                      <option value="2S">Second Sitting (2S)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quota">Quota</Label>
                    <select
                      id="quota"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="GN">General Quota</option>
                      <option value="LD">Ladies Quota</option>
                      <option value="TQ">Tatkal Quota</option>
                      <option value="PT">Premium Tatkal</option>
                      <option value="SS">Senior Citizen</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Voice search</span>
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4" />
                    Search Trains
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="pnr" className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pnr">PNR Number</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="pnr" placeholder="Enter 10-digit PNR number" className="pl-9" />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                    onClick={() => (window.location.href = "/pnr")}
                  >
                    Check PNR Status
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="track" className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="train-number">Train Number/Name</Label>
                    <div className="relative">
                      <Train className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="train-number" placeholder="Enter train number or name" className="pl-9" />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                    onClick={() => (window.location.href = "/track")}
                  >
                    Track Train
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Confetti Animation */}
        {showConfetti && (
          <>
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
            <div className="confetti confetti-4"></div>
            <div className="confetti confetti-5"></div>
            <div className="confetti confetti-6"></div>
            <div className="confetti confetti-7"></div>
            <div className="confetti confetti-8"></div>
            <div className="confetti confetti-9"></div>
            <div className="confetti confetti-10"></div>
          </>
        )}
      </section>

      {/* Popular Routes */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold gradient-text">Popular Routes</h2>
            <Link
              href="/routes"
              className="text-orange flex items-center gap-1 text-sm font-medium hover:text-orange-dark transition-colors"
            >
              View all routes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={route.image || "/placeholder.svg"}
                      alt={`${route.from} to ${route.to}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex flex-col">
                          <span className="text-lg font-medium">{route.from}</span>
                          <span className="text-sm opacity-80">Origin</span>
                        </div>
                        <Train className="h-5 w-5 text-white" />
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-medium">{route.to}</span>
                          <span className="text-sm opacity-80">Destination</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-orange/10 text-orange border-orange">
                        {route.trains} Trains
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-orange hover:text-orange-dark"
                        onClick={() => {
                          setFromStation(route.from)
                          setToStation(route.to)
                          window.location.href = "/book"
                        }}
                      >
                        Book Now <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offers & Promotions */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 gradient-text">Offers & Promotions</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <CardContent className="p-4 relative">
                      <div className="absolute -top-10 left-4 bg-pink text-white px-4 py-1 rounded-md">
                        Limited Time
                      </div>
                      <h3 className="font-semibold text-lg mb-2 mt-2">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-orange text-orange hover:bg-orange hover:text-white"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Live Train Status */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 gradient-text">Live Train Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrainStatusWidget
              trainNumber="12301"
              trainName="Howrah Rajdhani"
              from="New Delhi"
              to="Howrah"
              status="Running on time"
              nextStation="Kanpur"
              eta="15:45"
            />
            <TrainStatusWidget
              trainNumber="12951"
              trainName="Mumbai Rajdhani"
              from="New Delhi"
              to="Mumbai Central"
              status="Delayed by 15 mins"
              nextStation="Kota Jn"
              eta="18:30"
              delayed
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="border-purple text-purple hover:bg-purple hover:text-white"
              onClick={() => (window.location.href = "/track")}
            >
              View All Running Trains
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements & Gamification */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-4 gradient-text">Achievements & Rewards</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Earn badges, collect points, and unlock exclusive rewards as you travel with IRCTC
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button
              className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={() => (window.location.href = "/rewards")}
            >
              <Trophy className="mr-2 h-4 w-4" />
              View All Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 gradient-text">Why Book with Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-orange" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quick Booking</h3>
              <p className="text-sm text-muted-foreground">
                Book your tickets in less than 2 minutes with our streamlined process
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-pink/10 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-pink" />
              </div>
              <h3 className="text-lg font-medium mb-2">Exclusive Offers</h3>
              <p className="text-sm text-muted-foreground">
                Get access to exclusive discounts and offers on train bookings
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple/10 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-purple" />
              </div>
              <h3 className="text-lg font-medium mb-2">Live Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Track your train in real-time with our advanced tracking system
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal/10 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-teal" />
              </div>
              <h3 className="text-lg font-medium mb-2">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                Find the best trains with our AI-powered search recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  )
}

