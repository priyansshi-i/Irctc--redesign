"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Search, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function TrackPage() {
  const router = useRouter()
  const [trainNumber, setTrainNumber] = useState("12951")
  const [progress, setProgress] = useState(65)

  // Simulate train movement
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 0.1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const stations = [
    { name: "New Delhi", code: "NDLS", arrival: "16:25", departure: "16:35", distance: "0 km", status: "departed" },
    {
      name: "Mathura Junction",
      code: "MTJ",
      arrival: "18:16",
      departure: "18:18",
      distance: "141 km",
      status: "departed",
    },
    {
      name: "Kota Junction",
      code: "KOTA",
      arrival: "22:05",
      departure: "22:15",
      distance: "465 km",
      status: "departed",
    },
    {
      name: "Ratlam Junction",
      code: "RTM",
      arrival: "01:55",
      departure: "02:00",
      distance: "726 km",
      status: "arrived",
    },
    {
      name: "Vadodara Junction",
      code: "BRC",
      arrival: "04:55",
      departure: "05:00",
      distance: "969 km",
      status: "upcoming",
    },
    { name: "Surat", code: "ST", arrival: "06:22", departure: "06:24", distance: "1069 km", status: "upcoming" },
    { name: "Borivali", code: "BVI", arrival: "08:00", departure: "08:02", distance: "1210 km", status: "upcoming" },
    { name: "Mumbai Central", code: "MMCT", arrival: "08:15", departure: "-", distance: "1384 km", status: "upcoming" },
  ]

  const handleSearch = () => {
    if (!trainNumber) {
      toast({
        title: "Please enter train number",
        description: "Train number is required to track the train.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Train Found",
      description: `Showing live status for train ${trainNumber}`,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">Track Your Train</h1>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="train-number">Train Number</Label>
              <div className="relative">
                <Train className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="train-number"
                  placeholder="Enter train number"
                  className="pl-9"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue="2023-03-20" />
            </div>
          </div>
          <div className="flex items-center justify-end mt-6">
            <Button
              type="submit"
              className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
              Track Train
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Train Details */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">Mumbai Rajdhani (12951)</CardTitle>
              <p className="text-sm text-muted-foreground">New Delhi to Mumbai Central</p>
            </div>
            <Badge className="bg-green text-white">Running on time</Badge>
          </div>
        </CardHeader>
        <CardContent>
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

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Location: Near Ratlam Junction</span>
                <span>65% completed</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3 bg-muted" />
                <motion.div
                  className="absolute top-0 w-4 h-4 bg-orange rounded-full -mt-0.5"
                  style={{ left: `calc(${progress}% - 8px)` }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green"></div>
                  <span className="text-sm">Departed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange"></div>
                  <span className="text-sm">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm">Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map and Station List */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="map">Live Map</TabsTrigger>
          <TabsTrigger value="stations">Station List</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-0">
          <Card>
            <CardContent className="p-0 h-[400px] relative bg-muted/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-pink" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Live train tracking with Leaflet.js integration</p>
                </div>
              </div>

              {/* This would be replaced with an actual map implementation */}
              <div className="absolute bottom-4 right-4 bg-background p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Train className="h-4 w-4 text-orange" />
                  <span className="text-sm font-medium">Mumbai Rajdhani</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ETA: 02:00 at Ratlam Jn</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stations" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {stations.map((station, index) => (
                  <div key={station.code} className="relative">
                    <div className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            station.status === "departed"
                              ? "bg-green"
                              : station.status === "arrived"
                                ? "bg-orange"
                                : "bg-gray-300"
                          }`}
                        />
                        {index < stations.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              station.status === "departed"
                                ? "bg-green"
                                : station.status === "arrived"
                                  ? "bg-orange"
                                  : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{station.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {station.code} • {station.distance}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Arr: {station.arrival}</span>
                              <span className="text-sm font-medium">Dep: {station.departure}</span>
                            </div>
                            {station.status === "arrived" && (
                              <Badge className="bg-orange text-white mt-1">Current Station</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Prediction */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg gradient-text">AI-Powered Delay Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-4">
              <div className="bg-purple/10 p-2 rounded-full">
                <Train className="h-5 w-5 text-purple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Prediction</h3>
                <p className="text-sm text-muted-foreground">
                  Based on historical data and current conditions, this train is expected to arrive at Mumbai Central on
                  time. Weather conditions along the route are favorable, and there are no reported track maintenance
                  issues.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

