"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Filter, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function TourismPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">Tourism Packages</h1>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange/80 to-purple/60 z-10" />
        <Image
          src="/images/india-gate.png"
          alt="Tourism in India"
          width={1200}
          height={400}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Discover Incredible India
          </h2>
          <p className="text-white/90 mb-6 max-w-xl">
            Explore the diverse landscapes, rich heritage, and vibrant culture with our exclusive tour packages
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations"
                className="pl-9 bg-white/90 border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-orange to-pink hover:from-orange-dark hover:to-pink-dark"
              onClick={() => {
                toast({
                  title: "Search Results",
                  description: `Showing packages for "${searchTerm || "all destinations"}"`,
                });
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Find Packages
            </Button>
          </div>
        </div>
      </div>

      {/* Package Categories */}
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Packages</TabsTrigger>
          <TabsTrigger value="heritage">Heritage</TabsTrigger>
          <TabsTrigger value="nature">Nature</TabsTrigger>
          <TabsTrigger value="adventure">Adventure</TabsTrigger>
          <TabsTrigger value="beach">Beach</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Package Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-orange text-orange hover:bg-orange hover:text-white"
        >
          <Filter className="h-3 w-3" /> Price
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-pink text-pink hover:bg-pink hover:text-white"
        >
          <Calendar className="h-3 w-3" /> Duration
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-purple text-purple hover:bg-purple hover:text-white"
        >
          <Star className="h-3 w-3" /> Rating
        </Button>
      </div>
    </div>
  );
}
