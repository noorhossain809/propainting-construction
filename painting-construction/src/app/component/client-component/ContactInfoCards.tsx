"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";
import { Loader } from "@/components/ui/Loader";

// Committed fallback contact info — used when the backend is empty/unreachable.
const FALLBACK_CONTACT = {
  phoneOne: "+1 (917) 539-8168",
  phoneTwo: "+1 (212) 380-3751" as string | undefined,
  email: "mrh_nyc@yahoo.com",
  location: "4017, ave D, Brooklyn NY 11203",
  workingHours: "Mon-Fri: 7AM-6PM",
};

// Build a `tel:` href from a display phone number.
const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

// The four contact cards on the /contact page, driven by live contact info.
export default function ContactInfoCards() {
  const { data, isLoading } = useGetContactInfoQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader label="Loading contact info" />
      </div>
    );
  }

  const info = data ?? FALLBACK_CONTACT;

  return (
    <section className="grid gap-6 md:grid-cols-4 mt-10">
      <Card className="border rounded-2xl shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
              <Phone className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Call Us</h3>
              <p className="text-muted-foreground">{info.workingHours}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <a
              href={telHref(info.phoneOne)}
              className="text-primary font-bold text-lg hover:text-primary-glow transition-colors"
            >
              {info.phoneOne}
            </a>
            {info.phoneTwo && (
              <a
                href={telHref(info.phoneTwo)}
                className="text-primary font-bold text-lg hover:text-primary-glow transition-colors"
              >
                {info.phoneTwo}
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-2xl shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
              <Mail className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Email Us</h3>
              <p className="text-muted-foreground">Quick response guaranteed</p>
            </div>
          </div>
          <a
            href={`mailto:${info.email}`}
            className="text-primary font-medium hover:text-primary-glow transition-colors"
          >
            {info.email}
          </a>
        </CardContent>
      </Card>

      <Card className="border rounded-2xl shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center">
              <MapPin className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Service Area</h3>
              <p className="text-muted-foreground">{info.location}</p>
            </div>
          </div>
          <p className="text-foreground">
            Serving all five boroughs of New York City (Manhattan, Brooklyn,
            Queens, The Bronx, and Staten Island) and surrounding counties.
          </p>
        </CardContent>
      </Card>

      <Card className="border rounded-2xl shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Emergency Service</h3>
              <p className="text-muted-foreground">24/7 for urgent repairs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
