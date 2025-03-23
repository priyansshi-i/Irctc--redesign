"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SeatSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  train: any
  fromStation: string
  toStation: string
}

export function SeatSelectionDialog({ open, onOpenChange, train, fromStation, toStation }: SeatSelectionDialogProps) {
  const [selectedClass, setSelectedClass] = useState("2A")
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Generate seat layout based on class
  const generateSeats = (classType: string) => {
    const seatCount = classType === "1A" ? 24 : classType === "2A" ? 48 : 72
    const seats = []

    // Create a pattern of available/booked seats
    for (let i = 1; i <= seatCount; i++) {
      const seatNumber = `${i}`
      const isBooked = [3, 7, 12, 15, 22, 27, 31, 36, 42, 47, 55, 61].includes(i)
      const isRAC = [9, 19, 39, 49].includes(i)
      const isWL = [5, 25, 45, 65].includes(i)

      let status = "available"
      if (isBooked) status = "booked"
      if (isRAC) status = "rac"
      if (isWL) status = "wl"

      seats.push({ number: seatNumber, status })
    }

    return seats
  }

  const seats = generateSeats(selectedClass)

  const handleSeatClick = (seatNumber: string, status: string) => {
    if (status !== "available") return

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber))
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber])
      } else {
        toast({
          title: "Maximum seats reached",
          description: "You can select up to 6 seats per booking.",
          variant: "destructive",
        })
      }
    }
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive",
      })
      return
    }

    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    // Simulate booking confirmation
    toast({
      title: "Booking Successful!",
      description: `Your tickets for ${train.name} have been booked. PNR: 2457896354`,
    })

    // Show confetti animation
    const confettiElements = document.querySelectorAll(".confetti")
    confettiElements.forEach((el) => {
      el.classList.add("animate-confetti")
    })

    // Close dialog after a delay
    setTimeout(() => {
      onOpenChange(false)
      setShowConfirmation(false)
      setSelectedSeats([])

      // Navigate to confirmation page
      window.location.href = "/bookings"
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Select Your Seats</DialogTitle>
              <DialogDescription>
                {train.name} ({train.number}) - {fromStation} to {toStation}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue={selectedClass} onValueChange={setSelectedClass} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1A">AC First Class (1A)</TabsTrigger>
                <TabsTrigger value="2A">AC 2 Tier (2A)</TabsTrigger>
                <TabsTrigger value="3A">AC 3 Tier (3A)</TabsTrigger>
              </TabsList>

              <div className="flex items-center justify-between my-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green"></div>
                    <span className="text-xs">Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs">Booked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange"></div>
                    <span className="text-xs">RAC</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-pink"></div>
                    <span className="text-xs">Waitlist</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple"></div>
                  <span className="text-xs">Selected</span>
                </div>
              </div>

              <TabsContent value="1A" className="mt-4">
                <div className="seat-map">
                  {seats.slice(0, 24).map((seat) => (
                    <div
                      key={seat.number}
                      className={`seat ${
                        selectedSeats.includes(seat.number)
                          ? "seat-selected"
                          : seat.status === "available"
                            ? "seat-available"
                            : seat.status === "booked"
                              ? "seat-booked"
                              : seat.status === "rac"
                                ? "seat-rac"
                                : "seat-wl"
                      }`}
                      onClick={() => handleSeatClick(seat.number, seat.status)}
                    >
                      {seat.number}
                      {selectedSeats.includes(seat.number) && <Check className="h-3 w-3 ml-1" />}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="2A" className="mt-4">
                <div className="seat-map">
                  {seats.slice(0, 48).map((seat) => (
                    <div
                      key={seat.number}
                      className={`seat ${
                        selectedSeats.includes(seat.number)
                          ? "seat-selected"
                          : seat.status === "available"
                            ? "seat-available"
                            : seat.status === "booked"
                              ? "seat-booked"
                              : seat.status === "rac"
                                ? "seat-rac"
                                : "seat-wl"
                      }`}
                      onClick={() => handleSeatClick(seat.number, seat.status)}
                    >
                      {seat.number}
                      {selectedSeats.includes(seat.number) && <Check className="h-3 w-3 ml-1" />}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="3A" className="mt-4">
                <div className="seat-map">
                  {seats.slice(0, 72).map((seat) => (
                    <div
                      key={seat.number}
                      className={`seat ${
                        selectedSeats.includes(seat.number)
                          ? "seat-selected"
                          : seat.status === "available"
                            ? "seat-available"
                            : seat.status === "booked"
                              ? "seat-booked"
                              : seat.status === "rac"
                                ? "seat-rac"
                                : "seat-wl"
                      }`}
                      onClick={() => handleSeatClick(seat.number, seat.status)}
                    >
                      {seat.number}
                      {selectedSeats.includes(seat.number) && <Check className="h-3 w-3 ml-1" />}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm font-medium">
                  Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </p>
                <p className="text-sm text-muted-foreground">Price: ₹{train.price * selectedSeats.length}</p>
              </div>
              <Button
                className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Confirm Your Booking</DialogTitle>
              <DialogDescription>Please review your booking details before confirming</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  {train.name} ({train.number})
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">From</p>
                    <p className="font-medium">{fromStation}</p>
                    <p>{train.departure}, Wed 20 Mar</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">To</p>
                    <p className="font-medium">{toStation}</p>
                    <p>{train.arrival}, Thu 21 Mar</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Passenger Details</h3>
                <div className="border rounded-lg divide-y">
                  {selectedSeats.map((seat, index) => (
                    <div key={seat} className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Passenger {index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          Seat: {selectedClass}-{seat}
                        </p>
                      </div>
                      <Badge className="bg-green">{selectedClass}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>
                    Base Fare ({selectedSeats.length} x ₹{train.price})
                  </span>
                  <span>₹{train.price * selectedSeats.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Reservation Charges</span>
                  <span>₹{20 * selectedSeats.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>GST</span>
                  <span>₹{Math.round(train.price * selectedSeats.length * 0.05)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>
                    ₹
                    {train.price * selectedSeats.length +
                      20 * selectedSeats.length +
                      Math.round(train.price * selectedSeats.length * 0.05)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Back
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                onClick={handleConfirm}
              >
                Confirm & Pay
              </Button>
            </DialogFooter>

            {/* Confetti for successful booking */}
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
            <div className="confetti confetti-4"></div>
            <div className="confetti confetti-5"></div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

