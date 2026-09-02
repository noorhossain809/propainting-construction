"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Upload } from "lucide-react";
import { Variants, motion } from "framer-motion";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";

type ContactInfoData = {
  phoneOne: string;
  phoneTwo?: string;
  email: string;
  location: string;
  workingHours: string;
};

// Committed fallback contact info — used when the backend is empty/unreachable.
const FALLBACK_CONTACT: ContactInfoData = {
  phoneOne: "+1 (917) 539-8168",
  phoneTwo: "+1 (212) 380-3751",
  email: "mrh_nyc@yahoo.com",
  location: "4017, ave D, Brooklyn New York, 11203",
  workingHours: "Mon-Fri: 7AM-6PM",
};

// Build a `tel:` href from a display phone number.
const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

type InfoCard = {
  icon: typeof Phone;
  iconBg: string;
  title: string;
  subtitle?: string;
  link?: string | string[];
  linkText?: string | string[];
  text?: string;
};

// Build the contact cards from live/fallback contact info.
const buildContactInfo = (info: ContactInfoData): InfoCard[] => [
  {
    icon: Phone,
    iconBg: "bg-orange-400",
    title: "Call Us",
    subtitle: info.workingHours,
    link: info.phoneTwo
      ? [telHref(info.phoneOne), telHref(info.phoneTwo)]
      : [telHref(info.phoneOne)],
    linkText: info.phoneTwo
      ? [info.phoneOne, info.phoneTwo]
      : [info.phoneOne],
  },
  {
    icon: Mail,
    iconBg: "bg-blue-900",
    title: "Email Us",
    subtitle: "Quick response guaranteed",
    link: `mailto:${info.email}`,
    linkText: info.email,
  },
  {
    icon: MapPin,
    iconBg: "bg-green-800",
    title: "Service Area",
    subtitle: "30+ mile radius",
    text: info.location,
  },
  {
    icon: Clock,
    iconBg: "bg-orange-500",
    title: "Emergency Service",
    subtitle: "24/7 for urgent repairs",
  },
];

const formFields = [
  {
    type: "input",
    label: "Full Name *",
    placeholder: "John Smith",
    name: "fullName",
  },
  {
    type: "input",
    label: "Phone Number *",
    placeholder: "(123) 456-7890",
    name: "phone",
  },
  {
    type: "input",
    label: "Email Address *",
    placeholder: "john@example.com",
    name: "email",
    inputType: "email",
  },
  {
    type: "select",
    label: "Project Type *",
    name: "projectType",
    options: [
      { value: "interior-painting", label: "Interior Painting" },
      { value: "exterior-painting", label: "Exterior Painting" },
      { value: "renovation", label: "Renovation & Remodeling" },
      { value: "drywall", label: "Drywall & Plastering" },
      { value: "flooring", label: "Flooring & Tiling" },
      { value: "custom", label: "Custom Project" },
    ],
  },
  {
    type: "textarea",
    label: "Project Details",
    placeholder:
      "Tell us about your project - size, timeline, specific requirements, etc.",
    name: "projectDetails",
  },
  {
    type: "file",
    label: "Upload Photos (Optional)",
    name: "photos",
  },
];

const headingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headingChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const sentence = `Ready to transform your space? Contact us today for a free, no-obligation estimate on your next project.`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const infoContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const infoChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const formContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const formChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const Contact = () => {
  const words = ["Get Your", "Free Quote"];

  const { data } = useGetContactInfoQuery();
  const contactInfo = buildContactInfo(data ?? FALLBACK_CONTACT);

  return (
    <section
      id="contact"
      className="py-10 bg-[url('/assets/contact-us-bg.png')] bg-cover bg-center bg-no-repeat bg-sky-100"
    >
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#0B2653] mb-4"
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={headingChild}
                className={
                  word === "Free Quote"
                    ? "text-yellow-500 p-1 inline-block"
                    : "inline-block"
                }
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="md:text-xl text-base text-muted-foreground max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {sentence.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={child}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            variants={infoContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={infoChild}>
                  <Card className="border-0 shadow-card">
                    <CardContent className="lg:p-6 md:p-4 p-2 flex flex-col md:justify-start justify-center md:items-start items-center">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`lg:w-12 w-10 h-10 lg:h-12 ${item.iconBg} rounded-full flex items-center justify-center`}
                        >
                          <Icon className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <p className="md:text-base text-sm text-muted-foreground">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.link ? (
                        Array.isArray(item.link) ? (
                          <div className="flex flex-col items-start space-y-1">
                            {item.link.map((singleLink, index) => (
                              <a
                                key={index}
                                href={singleLink}
                                className="text-primary hover:text-primary-glow transition-colors"
                              >
                                {Array.isArray(item.linkText)
                                  ? item.linkText[index]
                                  : item.linkText}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a
                            href={item.link}
                            className="text-primary hover:text-primary-glow transition-colors"
                          >
                            {item.linkText}
                          </a>
                        )
                      ) : (
                        item.text && (
                          <p className="text-foreground">{item.text}</p>
                        )
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quote Form */}
          <motion.div
            className="lg:col-span-2"
            variants={formContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={formChild}>
              <Card className="border-0 shadow-construction">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    {formFields.map((field, i) => (
                      <motion.div key={i} variants={formChild}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {field.label}
                        </label>

                        {field.type === "input" && (
                          <Input
                            type={field.inputType || "text"}
                            placeholder={field.placeholder}
                            className="border-input"
                          />
                        )}

                        {field.type === "select" && (
                          <Select>
                            <SelectTrigger className="w-full border-input">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              {field.type === "select" &&
                                field.options?.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}

                        {field.type === "textarea" && (
                          <Textarea
                            placeholder={field.placeholder}
                            className="min-h-32 border-input"
                          />
                        )}

                        {field.type === "file" && (
                          <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                            <Upload
                              className="mx-auto text-muted-foreground mb-2"
                              size={24}
                            />
                            <p className="text-muted-foreground text-sm">
                              Drag & drop photos or{" "}
                              <span className="text-primary cursor-pointer">
                                browse files
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              JPG, PNG up to 10MB each
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Submit Button */}
                    <motion.div
                      variants={formChild}
                      className="flex justify-end sm:flex-row gap-4"
                    >
                      <Button
                        size="lg"
                        className="group relative overflow-hidden rounded-md bg-amber-500 lg:px-6 px-3 lg:py-6 py-3 text-white text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 left-0 w-0 bg-[#0B2653] transition-[width] duration-400 ease-out group-hover:w-full"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                          Get Free Quote
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;