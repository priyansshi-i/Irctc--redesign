"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TrainStatusWidgetProps {
  trainNumber: string
  trainName: string
  from: string
  to: string
  status: string
  nextStation: string
  eta: string
  delayed?: boolean
}

export function TrainStatusWidget({
  trainNumber,
  trainName,
  from,
  to,
  status,
  nextStation,
  eta,
  delayed = false,
}: TrainStatusWidgetProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{trainName}</CardTitle>
            <p className="text-sm text-muted-foreground">{trainNumber}</p>
          </div>
          <Badge
            variant={delayed ? "destructive" : "outline"}
            className={delayed ? "bg-pink text-white" : "bg-green/10 text-green border-green"}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-lg font-medium">{from}</span>
            <span className="text-sm text-muted-foreground">Origin</span>
          </div>
          <Train className="h-5 w-5 text-orange mx-4" />
          <div className="flex flex-col items-end">
            <span className="text-lg font-medium">{to}</span>
            <span className="text-sm text-muted-foreground">Destination</span>
          </div>
        </div>

        <div className="space-y-4">
          <Progress value={65} className="h-2 bg-muted" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple" />
              <span className="text-sm">Next: {nextStation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal" />
              <span className="text-sm">ETA: {eta}</span>
            </div>
          </div>

          <motion.div
            className="w-3 h-3 bg-orange rounded-full"
            style={{ marginLeft: "65%" }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

