"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Download, MapPin, Search, Share2, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

export default function PnrPage() {
  const router = useRouter()
  const [pnrNumber, setPnrNumber] = useState("")
  const [showResult, setShowResult] = useState(false)

  const handleSearch = () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      toast({
        title: "Invalid PNR",
        description: "Please enter a valid 10-digit PNR number.",
        variant: "destructive",
      })
      return
    }

    setShowResult(true)

    // Show confetti animation
    const confettiElements = document.querySelectorAll(".confetti")
    confettiElements.forEach((el) => {
      el.classList.add("animate-confetti")
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">PNR Status</h1>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pnr">PNR Number</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pnr"
                  placeholder="Enter 10-digit PNR number"
                  className="pl-9"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={handleSearch}
            >
              Check PNR Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PNR Result */}
      {showResult && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Mumbai Rajdhani (12951)</CardTitle>
                  <p className="text-sm text-muted-foreground">PNR: {pnrNumber}</p>
                </div>
                <Badge className="bg-green text-white">Confirmed</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">New Delhi</span>
                    <span className="text-sm text-muted-foreground">16:25, Wed 20 Mar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">15h 50m</span>
                    <span className="text-sm text-muted-foreground">1384 km</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-medium">Mumbai Central</span>
                    <span className="text-sm text-muted-foreground">08:15, Thu 21 Mar</span>
                  </div>
                </div>

                <div className="border-t border-b py-4">
                  <h3 className="font-medium mb-3">Passenger Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-2 text-sm">
                      <div className="font-medium">Passenger</div>
                      <div className="font-medium">Booking Status</div>
                      <div className="font-medium">Current Status</div>
                      <div className="font-medium">Coach</div>
                      <div className="font-medium">Seat No.</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                      <div>Passenger 1</div>
                      <div>CNF</div>
                      <div className="text-green">CNF</div>
                      <div>B3</div>
                      <div>24 LB</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                      <div>Passenger 2</div>
                      <div>CNF</div>
                      <div className="text-green">CNF</div>
                      <div>B3</div>
                      <div>26 UB</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Train Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Train Number:</span>
                        <span>12951</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Train Name:</span>
                        <span>Mumbai Rajdhani</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class:</span>
                        <span>3A (AC 3 Tier)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chart Status:</span>
                        <span>Chart Prepared</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking Date:</span>
                        <span>15 Mar 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quota:</span>
                        <span>General (GN)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fare:</span>
                        <span>₹1,850</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/30 p-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => {
                  toast({
                    title: "Ticket Downloaded",
                    description: "Your e-ticket has been downloaded successfully.",
                  })
                }}
              >
                <Download className="h-4 w-4" /> Download E-Ticket
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => {
                  toast({
                    title: "Ticket Shared",
                    description: "Ticket details have been copied to clipboard.",
                  })
                }}
              >
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </CardFooter>
          </Card>

          {/* Live Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Train Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Current Location: Near Ratlam Junction</span>
                  <span>65% completed</span>
                </div>
                <div className="relative">
                  <Progress value={65} className="h-3 bg-muted" />
                  <motion.div
                    className="absolute top-0 w-4 h-4 bg-orange rounded-full -mt-0.5"
                    style={{ left: `calc(65% - 8px)` }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Running on time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple" />
                    <span className="text-sm">ETA at Mumbai: 08:15</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                  onClick={() => router.push("/track")}
                >
                  <Train className="mr-2 h-4 w-4" />
                  Track This Train
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Confetti for successful PNR check */}
          <div className="confetti confetti-1"></div>
          <div className="confetti confetti-2"></div>
          <div className="confetti confetti-3"></div>
          <div className="confetti confetti-4"></div>
          <div className="confetti confetti-5"></div>
        </motion.div>
      )}
    </div>
  )
}

