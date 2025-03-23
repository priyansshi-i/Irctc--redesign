"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Clock, Filter, MapPin, Search, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SeatSelectionDialog } from "@/components/seat-selection-dialog"
import { toast } from "@/components/ui/use-toast"

export default function BookPage() {
  const router = useRouter()
  const [fromStation, setFromStation] = useState("New Delhi")
  const [toStation, setToStation] = useState("Mumbai Central")
  const [priceRange, setPriceRange] = useState([500, 3000])
  const [sortBy, setSortBy] = useState("departure")
  const [seatDialogOpen, setSeatDialogOpen] = useState(false)
  const [selectedTrain, setSelectedTrain] = useState<any>(null)

  const trains = [
    {
      number: "12951",
      name: "Mumbai Rajdhani",
      departure: "16:25",
      arrival: "08:15",
      duration: "15h 50m",
      classes: ["1A", "2A", "3A"],
      price: 1850,
      availability: {
        "1A": "Available 12",
        "2A": "Available 24",
        "3A": "WL 12",
      },
    },
    {
      number: "12953",
      name: "August Kranti Rajdhani",
      departure: "17:40",
      arrival: "10:55",
      duration: "17h 15m",
      classes: ["1A", "2A", "3A"],
      price: 1750,
      availability: {
        "1A": "Available 8",
        "2A": "Available 16",
        "3A": "Available 42",
      },
    },
    {
      number: "22221",
      name: "CSMT Rajdhani",
      departure: "16:10",
      arrival: "08:35",
      duration: "16h 25m",
      classes: ["1A", "2A", "3A"],
      price: 1800,
      availability: {
        "1A": "Available 4",
        "2A": "RAC 8",
        "3A": "Available 32",
      },
    },
    {
      number: "12909",
      name: "Mumbai Garib Rath",
      departure: "15:35",
      arrival: "11:05",
      duration: "19h 30m",
      classes: ["3A", "CC"],
      price: 950,
      availability: {
        "3A": "Available 86",
        CC: "Available 120",
      },
    },
  ]

  const handleBookNow = (train: any) => {
    setSelectedTrain(train)
    setSeatDialogOpen(true)
  }

  const handleSearch = () => {
    toast({
      title: "Search Updated",
      description: `Showing trains from ${fromStation} to ${toStation}`,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">Book Train Tickets</h1>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="date">Date of Journey</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <DatePicker />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Travel Class</Label>
              <Select defaultValue="all">
                <SelectTrigger id="class">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="1A">AC First Class (1A)</SelectItem>
                  <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                  <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                  <SelectItem value="SL">Sleeper (SL)</SelectItem>
                  <SelectItem value="2S">Second Sitting (2S)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-end mt-6">
            <Button
              type="submit"
              className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
              Search Trains
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {fromStation} to {toStation}
          </h2>
          <p className="text-muted-foreground">4 trains found • Wed, 20 Mar</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="arrival">Arrival Time</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 border-purple text-purple hover:bg-purple hover:text-white">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Trains</SheetTitle>
                <SheetDescription>Customize your search results</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Departure Time</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="morning" />
                      <label htmlFor="morning" className="text-sm">
                        Morning (6AM - 12PM)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="afternoon" />
                      <label htmlFor="afternoon" className="text-sm">
                        Afternoon (12PM - 6PM)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="evening" />
                      <label htmlFor="evening" className="text-sm">
                        Evening (6PM - 12AM)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="night" />
                      <label htmlFor="night" className="text-sm">
                        Night (12AM - 6AM)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[500, 3000]}
                    min={0}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Train Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rajdhani" defaultChecked />
                      <label htmlFor="rajdhani" className="text-sm">
                        Rajdhani Express
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="shatabdi" defaultChecked />
                      <label htmlFor="shatabdi" className="text-sm">
                        Shatabdi Express
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duronto" defaultChecked />
                      <label htmlFor="duronto" className="text-sm">
                        Duronto Express
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="garibrath" defaultChecked />
                      <label htmlFor="garibrath" className="text-sm">
                        Garib Rath
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="superfast" defaultChecked />
                      <label htmlFor="superfast" className="text-sm">
                        Superfast
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mail" defaultChecked />
                      <label htmlFor="mail" className="text-sm">
                        Mail/Express
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Coach Class</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="1a" defaultChecked />
                      <label htmlFor="1a" className="text-sm">
                        AC First Class (1A)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2a" defaultChecked />
                      <label htmlFor="2a" className="text-sm">
                        AC 2 Tier (2A)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="3a" defaultChecked />
                      <label htmlFor="3a" className="text-sm">
                        AC 3 Tier (3A)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sl" defaultChecked />
                      <label htmlFor="sl" className="text-sm">
                        Sleeper (SL)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cc" defaultChecked />
                      <label htmlFor="cc" className="text-sm">
                        Chair Car (CC)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2s" defaultChecked />
                      <label htmlFor="2s" className="text-sm">
                        Second Sitting (2S)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button
                    className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                    onClick={() => {
                      toast({
                        title: "Filters Applied",
                        description: "Your search results have been updated.",
                      })
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Train List */}
      <div className="space-y-4">
        {trains.map((train) => (
          <motion.div
            key={train.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{train.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{train.number}</p>
                  </div>
                  <Badge variant="outline" className="bg-orange/10 text-orange border-orange">
                    Runs Daily
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between md:justify-start md:gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-bold">{train.departure}</p>
                      <p className="text-sm text-muted-foreground">{fromStation}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs text-muted-foreground">{train.duration}</p>
                      <div className="relative w-20 md:w-32 h-0.5 bg-muted my-2">
                        <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-orange"></div>
                        <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-orange"></div>
                      </div>
                      <Train className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-bold">{train.arrival}</p>
                      <p className="text-sm text-muted-foreground">{toStation}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l md:border-r border-dashed px-4 py-4 md:py-0">
                    <div className="grid grid-cols-3 gap-2">
                      {train.classes.map((cls) => (
                        <div key={cls} className="text-center">
                          <Badge
                            variant="outline"
                            className={`mb-1 w-full ${
                              cls === "1A"
                                ? "border-purple text-purple"
                                : cls === "2A"
                                  ? "border-pink text-pink"
                                  : cls === "3A"
                                    ? "border-orange text-orange"
                                    : "border-teal text-teal"
                            }`}
                          >
                            {cls}
                          </Badge>
                          <p
                            className={`text-xs ${
                              train.availability[cls]?.includes("WL")
                                ? "text-pink"
                                : train.availability[cls]?.includes("RAC")
                                  ? "text-orange"
                                  : "text-green"
                            }`}
                          >
                            {train.availability[cls]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center border-t md:border-t-0 py-4 md:py-0">
                    <p className="text-2xl font-bold mb-2">₹{train.price}</p>
                    <Button
                      className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                      onClick={() => handleBookNow(train)}
                    >
                      Book Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-2 px-6 flex justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Fastest train on this route</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Train Details",
                      description: `Viewing details for ${train.name} (${train.number})`,
                    })
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Seat Selection Dialog */}
      {selectedTrain && (
        <SeatSelectionDialog
          open={seatDialogOpen}
          onOpenChange={setSeatDialogOpen}
          train={selectedTrain}
          fromStation={fromStation}
          toStation={toStation}
        />
      )}
    </div>
  )
}

