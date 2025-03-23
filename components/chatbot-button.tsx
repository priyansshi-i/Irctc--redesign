"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm your IRCTC assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate bot response based on keywords
    setTimeout(() => {
      let botResponse = "Thanks for your message! I'll help you with that."

      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("book") || lowerInput.includes("ticket")) {
        botResponse =
          "To book a ticket, you can use our booking page. Would you like me to guide you through the process?"
      } else if (lowerInput.includes("pnr") || lowerInput.includes("status")) {
        botResponse = "You can check your PNR status by entering your 10-digit PNR number on our PNR Status page."
      } else if (lowerInput.includes("cancel") || lowerInput.includes("refund")) {
        botResponse =
          "Ticket cancellations can be done from the My Bookings section. Refunds typically process within 5-7 working days."
      } else if (lowerInput.includes("train") && lowerInput.includes("late")) {
        botResponse =
          "You can check real-time train status on our Track Train page. Would you like me to direct you there?"
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)

    setInput("")
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 z-50"
          >
            <Card className="shadow-xl border-primary/10">
              <CardHeader className="pb-2 bg-gradient-to-r from-orange to-pink text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src="/placeholder.svg" alt="AI" />
                      <AvatarFallback className="bg-white text-orange">AI</AvatarFallback>
                    </Avatar>
                    IRCTC Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-80 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message, i) => (
                    <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user" ? "bg-gradient-to-r from-orange to-pink text-white" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
                  >
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

