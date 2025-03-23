import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/irctc-logo.png" alt="IRCTC Logo" width={40} height={40} className="rounded-md" />
              <span className="font-bold text-xl gradient-text">IRCTC</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Indian Railway Catering and Tourism Corporation Ltd. A Government of India Enterprise.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-orange hover:text-orange-dark transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-pink hover:text-pink-dark transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-purple hover:text-purple-dark transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-teal hover:text-teal-dark transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium gradient-text">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-orange transition-colors">
                  Book Ticket
                </Link>
              </li>
              <li>
                <Link href="/pnr" className="text-muted-foreground hover:text-orange transition-colors">
                  PNR Status
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-muted-foreground hover:text-orange transition-colors">
                  Train Schedule
                </Link>
              </li>
              <li>
                <Link href="/fare" className="text-muted-foreground hover:text-orange transition-colors">
                  Fare Enquiry
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="text-muted-foreground hover:text-orange transition-colors">
                  Tourism Packages
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium gradient-text">Information</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-orange transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-orange transition-colors">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium gradient-text">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-orange transition-colors">
                  Refund Rules
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-orange transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IRCTC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

