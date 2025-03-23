"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  unlocked?: boolean
}

export function AchievementBadge({ title, description, icon: Icon, color, unlocked = false }: AchievementBadgeProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-${color}/10`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className={`h-8 w-8 text-${color}`} />
        </motion.div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div
          className={`text-xs px-3 py-1 rounded-full ${
            unlocked ? `bg-${color} text-white` : "bg-muted text-muted-foreground"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </div>
      </CardContent>
    </Card>
  )
}

