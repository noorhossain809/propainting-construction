"use client";

import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";
import { Loader } from "@/components/ui/Loader";

// Committed fallback contact info — used whenever the live backend is
// empty or unreachable (kept, not removed).
const FALLBACK_CONTACT = {
  phoneOne: "+1 (917) 539-8168",
  phoneTwo: "+1 (212) 380-3751",
  email: "mrh_nyc@yahoo.com",
  location: "4017, ave D, Brooklyn New York, 11203",
  licenseNumber: "2105436-DCA",
  insuranceText: "Fully insured for your protection",
};

// Build a `tel:` href from a display phone number.
const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

const Footer = () => {
  const { data, isLoading } = useGetContactInfoQuery();
  const info = data ?? FALLBACK_CONTACT;

  return (
    <footer className=" bg-[url('/assets/city-skiline.png')] bottom-0 top-0 bg-no-repeat text-white lg:bg-cover bg-bottom pt-12 bg-[#0B2653]">
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
               <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src="/assets/propainting_construction_web_logo.png" width={100} height={60} alt="web-logo" />

          </Link>
            </div>
            <p className="text-white/80 mb-6 md:text-base text-sm">
              Professional construction and painting services with over 25 years of experience. 
              Quality craftsmanship and customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-smooth">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-smooth">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-smooth">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-smooth">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-white/80 md:text-base text-sm">
              <li><Link href="/service/building-maintenance-repairs" className="hover:text-orange-400 transition-smooth">General Construction</Link></li>
              <li><Link href="/service/residential-commercial-painting" className="hover:text-orange-400 transition-smooth">Professional Painting</Link></li>
              <li><Link href="/service/flooring-installation-renovation" className="hover:text-orange-400 transition-smooth">Home Renovation</Link></li>
              <li><Link href="/service/building-renovation-remodeling" className="hover:text-orange-400 transition-smooth">Commercial Projects</Link></li>
              <li><Link href="/service/plastering-wall-finishing" className="hover:text-orange-400 transition-smooth">Repairs & Maintenance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-white/80 md:text-base text-sm">
              <li><Link href="/about-us" className="hover:text-orange-400 transition-smooth">About Us</Link></li>
              <li><Link href="/our-work" className="hover:text-orange-400 transition-smooth">Our Portfolio</Link></li>
              <li><Link href="/service" className="hover:text-orange-400 transition-smooth">Service</Link></li>
              <li><Link href="/our-team" className="hover:text-orange-400 transition-smooth">Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-smooth">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            {isLoading ? (
              <Loader size="sm" className="items-start py-4" />
            ) : (
            <>
            <div className="space-y-4 text-white/80 md:text-base text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
               <div>
                 <a
              href={telHref(info.phoneOne)}
              className="mt-2 text-sm block tracking-tight text-white no-underline hover:underline"
            >
               {info.phoneOne}
            </a>
                {info.phoneTwo && (
                <a
              href={telHref(info.phoneTwo)}
              className="mt-2 text-sm block tracking-tight text-white no-underline hover:underline"
            >
               {info.phoneTwo}
            </a>
                )}
               </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href={`mailto:${info.email}`} className="text-sm no-underline hover:underline">{info.email}</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                <span>{info.location}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h5 className="font-semibold mb-2">Licensed & Insured</h5>
              <p className="text-sm text-white/70">
                License #: {info.licenseNumber}<br />
                {info.insuranceText}
              </p>
            </div>
            </>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60 md:text-base text-sm">
          <p>&copy; {new Date().getFullYear()} Pro Painting Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;