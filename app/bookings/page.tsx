"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Download, Filter, Search, Train, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function BookingsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const upcomingBookings = [
    {
      pnr: "2457896354",
      trainNumber: "12951",
      trainName: "Mumbai Rajdhani",
      from: "New Delhi",
      to: "Mumbai Central",
      departureDate: "20 Mar 2023",
      departureTime: "16:25",
      arrivalDate: "21 Mar 2023",
      arrivalTime: "08:15",
      status: "Confirmed",
      passengers: 2,
      class: "3A",
    },
    {
      pnr: "8765432198",
      trainNumber: "12301",
      trainName: "Howrah Rajdhani",
      from: "New Delhi",
      to: "Howrah",
      departureDate: "15 Apr 2023",
      departureTime: "16:55",
      arrivalDate: "16 Apr 2023",
      arrivalTime: "09:55",
      status: "Confirmed",
      passengers: 1,
      class: "2A",
    },
  ]

  const completedBookings = [
    {
      pnr: "1234567890",
      trainNumber: "12309",
      trainName: "Rajdhani Express",
      from: "New Delhi",
      to: "Patna",
      departureDate: "10 Feb 2023",
      departureTime: "19:55",
      arrivalDate: "11 Feb 2023",
      arrivalTime: "11:45",
      status: "Completed",
      passengers: 3,
      class: "2A",
    },
    {
      pnr: "9876543210",
      trainNumber: "12302",
      trainName: "Howrah Rajdhani",
      from: "Howrah",
      to: "New Delhi",
      departureDate: "25 Jan 2023",
      departureTime: "14:05",
      arrivalDate: "26 Jan 2023",
      arrivalTime: "10:00",
      status: "Completed",
      passengers: 2,
      class: "1A",
    },
    {
      pnr: "5678901234",
      trainNumber: "12952",
      trainName: "Mumbai Rajdhani",
      from: "Mumbai Central",
      to: "New Delhi",
      departureDate: "05 Jan 2023",
      departureTime: "17:40",
      arrivalDate: "06 Jan 2023",
      arrivalTime: "08:35",
      status: "Completed",
      passengers: 1,
      class: "3A",
    },
  ]

  const cancelledBookings = [
    {
      pnr: "3456789012",
      trainNumber: "12910",
      trainName: "Hazrat Nizamuddin - Mumbai Central Garib Rath Express",
      from: "Hazrat Nizamuddin",
      to: "Mumbai Central",
      departureDate: "15 Mar 2023",
      departureTime: "15:35",
      arrivalDate: "16 Mar 2023",
      arrivalTime: "11:05",
      status: "Cancelled",
      passengers: 2,
      class: "3A",
      refundAmount: "₹1,900",
      refundStatus: "Processed",
    },
  ]

  const handleViewTicket = (pnr: string) => {
    router.push(`/pnr?pnr=${pnr}`)
  }

  const handleCancelTicket = (pnr: string) => {
    toast({
      title: "Ticket Cancellation",
      description: `Are you sure you want to cancel ticket with PNR ${pnr}?`,
    })
  }

  const handleDownloadTicket = (pnr: string) => {
    toast({
      title: "Ticket Downloaded",
      description: `E-ticket with PNR ${pnr} has been downloaded successfully.`,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">My Bookings</h1>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by PNR, train name or number"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2 border-purple text-purple hover:bg-purple hover:text-white">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={() => router.push("/book")}
            >
              <Train className="mr-2 h-4 w-4" />
              Book New Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0 space-y-4">
          {upcomingBookings.map((booking) => (
            <motion.div
              key={booking.pnr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.trainName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {booking.trainNumber} • PNR: {booking.pnr}
                      </p>
                    </div>
                    <Badge className="bg-green text-white">{booking.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between md:justify-start md:gap-8">
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.departureTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.departureDate}</p>
                        <p className="text-sm font-medium">{booking.from}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Train className="h-4 w-4 text-muted-foreground mb-1" />
                        <div className="relative w-16 md:w-24 h-0.5 bg-muted my-1">
                          <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-orange"></div>
                          <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-orange"></div>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.arrivalTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.arrivalDate}</p>
                        <p className="text-sm font-medium">{booking.to}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l md:border-r border-dashed px-4 py-4 md:py-0">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Class:</span>
                        <Badge variant="outline" className="border-purple text-purple">
                          {booking.class}
                        </Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Passengers:</span>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{booking.passengers}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Journey Date:</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{booking.departureDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center border-t md:border-t-0 py-4 md:py-0">
                      <Button
                        className="w-full gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                        onClick={() => handleViewTicket(booking.pnr)}
                      >
                        View E-Ticket
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-teal text-teal hover:bg-teal hover:text-white"
                        onClick={() => handleDownloadTicket(booking.pnr)}
                      >
                        <Download className="h-4 w-4" /> Download
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-pink text-pink hover:bg-pink hover:text-white"
                        onClick={() => handleCancelTicket(booking.pnr)}
                      >
                        Cancel Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-0 space-y-4">
          {completedBookings.map((booking) => (
            <motion.div
              key={booking.pnr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.trainName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {booking.trainNumber} • PNR: {booking.pnr}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between md:justify-start md:gap-8">
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.departureTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.departureDate}</p>
                        <p className="text-sm font-medium">{booking.from}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Train className="h-4 w-4 text-muted-foreground mb-1" />
                        <div className="relative w-16 md:w-24 h-0.5 bg-muted my-1">
                          <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-muted-foreground"></div>
                          <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-muted-foreground"></div>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.arrivalTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.arrivalDate}</p>
                        <p className="text-sm font-medium">{booking.to}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l md:border-r border-dashed px-4 py-4 md:py-0">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Class:</span>
                        <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                          {booking.class}
                        </Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Passengers:</span>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{booking.passengers}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Journey Date:</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{booking.departureDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center border-t md:border-t-0 py-4 md:py-0">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => handleDownloadTicket(booking.pnr)}
                      >
                        <Download className="h-4 w-4" /> Download E-Ticket
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          toast({
                            title: "Book Again",
                            description: "Redirecting to booking page with same journey details.",
                          })
                          router.push("/book")
                        }}
                      >
                        Book Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-0 space-y-4">
          {cancelledBookings.map((booking) => (
            <motion.div
              key={booking.pnr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{booking.trainName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {booking.trainNumber} • PNR: {booking.pnr}
                      </p>
                    </div>
                    <Badge variant="destructive">{booking.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between md:justify-start md:gap-8">
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.departureTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.departureDate}</p>
                        <p className="text-sm font-medium">{booking.from}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Train className="h-4 w-4 text-muted-foreground mb-1" />
                        <div className="relative w-16 md:w-24 h-0.5 bg-muted my-1">
                          <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-pink"></div>
                          <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-pink"></div>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-xl font-bold">{booking.arrivalTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.arrivalDate}</p>
                        <p className="text-sm font-medium">{booking.to}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l md:border-r border-dashed px-4 py-4 md:py-0">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Refund Amount:</span>
                        <span className="font-medium">{booking.refundAmount}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Refund Status:</span>
                        <Badge variant="outline" className="border-green text-green">
                          {booking.refundStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cancelled On:</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>18 Mar 2023</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center border-t md:border-t-0 py-4 md:py-0">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          toast({
                            title: "Cancellation Details",
                            description: "Viewing cancellation details and refund status.",
                          })
                        }}
                      >
                        View Cancellation Details
                      </Button>
                      <Button
                        className="w-full gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                        onClick={() => {
                          toast({
                            title: "Book Again",
                            description: "Redirecting to booking page with same journey details.",
                          })
                          router.push("/book")
                        }}
                      >
                        Book Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

