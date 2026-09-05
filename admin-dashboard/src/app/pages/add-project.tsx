// "use client"

// import * as React from "react"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import DashboardLayout from "../dashboard/layout"

// export function ProjectForm() {
//   const [completedDate, setCompletedDate] = React.useState<Date>()

//   return (
//     <DashboardLayout>
//         <form className="space-y-8 className='max-w-7xl'">
//       {/* Section: Basic Information */}
//       <Card >
//         <CardHeader>
//           <CardTitle>Basic Project Information</CardTitle>
//           <CardDescription>Enter the main details of the project.</CardDescription>
//         {/* </CardHeader */}
//         <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2 w-full ">
//             <Label htmlFor="title">Project Title</Label>
//             <Input id="title" placeholder="e.g., Luxury Interior Painting" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="slug">Slug (URL)</Label>
//             <Input id="slug" placeholder="e.g., luxury-interior-painting-nyc" />
//           </div>
//           <div className="space-y-2 w-full">
//             <Label htmlFor="type">Project Type</Label>
//             <Select>
//               <SelectTrigger id="type">
//                 <SelectValue placeholder="Select a type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Interior Painting">Interior Painting</SelectItem>
//                 <SelectItem value="Exterior Painting">Exterior Painting</SelectItem>
//                 <SelectItem value="Commercial Painting">Commercial Painting</SelectItem>
//                 <SelectItem value="Renovation">Renovation</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="category">Category</Label>
//              <Select>
//               <SelectTrigger id="category">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="interior">Interior</SelectItem>
//                 <SelectItem value="exterior">Exterior</SelectItem>
//                 <SelectItem value="commercial">Commercial</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2 md:col-span-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea id="description" placeholder="A brief description of the project..." />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="location">Location</Label>
//             <Input id="location" placeholder="e.g., Manhattan, New York, USA" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="duration">Duration</Label>
//             <Input id="duration" placeholder="e.g., 2 Weeks" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="completedDate">Completion Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   id="completedDate"
//                   variant={"outline"}
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !completedDate && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {completedDate ? format(completedDate, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={completedDate}
//                   onSelect={setCompletedDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Section: Images */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Project Images</CardTitle>
//           <CardDescription>Upload the main image and gallery photos.</CardDescription>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//                 <Label htmlFor="main-image">Main Image</Label>
//                 <Input id="main-image" type="file" />
//             </div>
//              <div className="space-y-2">
//                 <Label htmlFor="alt-text">Alt Text for Main Image</Label>
//                 <Input id="alt-text" placeholder="A descriptive alt text..." />
//             </div>
//              <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="gallery">Image Gallery (Multiple Files)</Label>
//                 <Input id="gallery" type="file" multiple />
//             </div>
//         </CardContent>
//       </Card>

//       {/* Section: Project Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle>In-Depth Project Details</CardTitle>
//           <CardDescription>Describe the challenges, solutions, and results.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//             <div className="space-y-2">
//                 <Label htmlFor="challenge">Challenge</Label>
//                 <Textarea id="challenge" placeholder="What was the main challenge?" />
//             </div>
//              <div className="space-y-2">
//                 <Label htmlFor="solution">Solution</Label>
//                 <Textarea id="solution" placeholder="How did you solve it?" />
//             </div>
//              <div className="space-y-2">
//                 <Label htmlFor="results">Results</Label>
//                 <Textarea id="results" placeholder="List the key results, one per line." />
//                 <p className="text-sm text-muted-foreground">Enter each result on a new line.</p>
//             </div>
//         </CardContent>
//       </Card>

//       {/* Section: Testimonial */}
//       <Card>
//         <CardHeader>
//             <CardTitle>Client Testimonial</CardTitle>
//             <CardDescription>Add the client&apos;s feedback if available.</CardDescription>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="testimonial-text">Testimonial Text</Label>
//                 <Textarea id="testimonial-text" placeholder="Client's feedback..." />
//             </div>
//             <div className="space-y-2">
//                 <Label htmlFor="testimonial-author">Author</Label>
//                 <Input id="testimonial-author" placeholder="e.g., Jonathan Reeves, Manhattan Resident" />
//             </div>
//              <div className="space-y-2">
//                 <Label>Rating (1-5)</Label>
//                 <RadioGroup defaultValue="5" className="flex space-x-4 pt-2">
//                     {[1, 2, 3, 4, 5].map(value => (
//                         <div key={value} className="flex items-center space-x-2">
//                             <RadioGroupItem value={String(value)} id={`r${value}`} />
//                             <Label htmlFor={`r${value}`}>{value}</Label>
//                         </div>
//                     ))}
//                 </RadioGroup>
//             </div>
//         </CardContent>
//       </Card>
      
//        {/* Section: SEO */}
//       <Card>
//         <CardHeader>
//             <CardTitle>SEO Information</CardTitle>
//             <CardDescription>Optimize for search engines.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//             <div className="space-y-2">
//                 <Label htmlFor="meta-title">Meta Title</Label>
//                 <Input id="meta-title" placeholder="A catchy title for search results..." />
//             </div>
//             <div className="space-y-2">
//                 <Label htmlFor="meta-description">Meta Description</Label>
//                 <Textarea id="meta-description" placeholder="A brief summary for search engines..."/>
//             </div>
//             <div className="space-y-2">
//                 <Label htmlFor="keywords">Keywords</Label>
//                 <Textarea id="keywords" placeholder="Enter keywords separated by commas or on new lines..."/>
//                 <p className="text-sm text-muted-foreground">Separate each keyword with a comma or enter on a new line.</p>
//             </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-end">
//         <Button type="submit">Save Project</Button>
//       </div>
//     </form>
//     </DashboardLayout>
//   )
// }




// components/forms/ProjectForm.tsx
"use client"

import * as React from "react"
import BackButton from "@/components/ui/BackButton"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProjectMutation } from "@/redux/api/constructionProjectApi"
import { PROJECT_CATEGORIES, PROJECT_TYPES } from "@/lib/categories"


type FormState = {
  title: string
  slug: string
  projectType: string
  category: string
  description: string
  location: string
  duration: string
  challenge: string
  solution: string
  results: string // textarea, newline-separated
  testimonialText: string
  testimonialAuthor: string
  testimonialRating: string
  metaTitle: string
  metaDescription: string
  keywords: string // comma/newline-separated
  altText: string
}

const initialState: FormState = {
  title: "",
  slug: "",
  projectType: "",
  category: "",
  description: "",
  location: "",
  duration: "",
  challenge: "",
  solution: "",
  results: "",
  testimonialText: "",
  testimonialAuthor: "",
  testimonialRating: "5",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  altText: "",
}

export function ProjectForm() {
  const router = useRouter()
  const [createProject, { isLoading }] = useCreateProjectMutation()

  const [form, setForm] = React.useState<FormState>(initialState)
  // Tracks the category dropdown choice; "others" reveals a custom input.
  const [categoryChoice, setCategoryChoice] = React.useState<string>("")
  // Same pattern for project type.
  const [projectTypeChoice, setProjectTypeChoice] = React.useState<string>("")
  const [completedDate, setCompletedDate] = React.useState<Date>()
  const [mainImage, setMainImage] = React.useState<File | null>(null)
  const [gallery, setGallery] = React.useState<File[]>([])
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // auto-generate slug from title unless the user edits it manually
  const [slugTouched, setSlugTouched] = React.useState(false)
  React.useEffect(() => {
    if (!slugTouched) {
      const autoSlug = form.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      setForm((prev) => ({ ...prev, slug: autoSlug }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)

  if (!form.title || !form.slug || !form.projectType || !form.category || !form.description) {
    setError("Title, Slug, Project Type, Category and Description are required.")
    return
  }
  if (!mainImage) {
    setError("Main Image is required.")
    return
  }

  const formData = new FormData()

  // ---- Plain text fields ----
  formData.append("title", form.title)
  formData.append("slug", form.slug)
  formData.append("projectType", form.projectType)
  formData.append("category", form.category)
  formData.append("description", form.description)
  if (form.location) formData.append("location", form.location)
  if (form.duration) formData.append("duration", form.duration)
  if (completedDate) formData.append("completedDate", completedDate.toISOString())
  if (form.challenge) formData.append("challenge", form.challenge)
  if (form.solution) formData.append("solution", form.solution)

  // results — backend splits on newlines, so send a plain multiline string
  formData.append("results", form.results)

  // testimonial — as a JSON string (backend runs parseJSONField)
  if (form.testimonialText) {
    formData.append(
      "testimonial",
      JSON.stringify({
        text: form.testimonialText,
        author: form.testimonialAuthor,
        rating: Number(form.testimonialRating),
      })
    )
  }

  // seo — as a JSON string
  formData.append(
    "seo",
    JSON.stringify({
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      keywords: form.keywords
        .split(/[,\n]/)
        .map((k) => k.trim())
        .filter(Boolean),
    })
  )

  // mainImage — temporary until the middleware is confirmed
  // assuming the raw file goes as the "mainImage" field + alt text sent separately
  formData.append("mainImage", mainImage)
  if (form.altText) formData.append("mainImageAlt", form.altText)

  // gallery — multiple raw files
  gallery.forEach((file) => formData.append("gallery", file))

  try {
    await createProject(formData).unwrap()
    router.push("/our-projects")
  } catch (err) {
    console.error(err)
    setError("Something went wrong saving the project. Please try again.")
  }
}

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-8">
      <BackButton href="/our-projects" label="Back to Projects" />
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Section: Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Project Information</CardTitle>
          <CardDescription>Enter the main details of the project.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="e.g., Luxury Interior Painting"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              placeholder="e.g., luxury-interior-painting-nyc"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                handleChange("slug", e.target.value)
              }}
            />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={projectTypeChoice}
              onValueChange={(v) => {
                setProjectTypeChoice(v)
                handleChange("projectType", v === "others" ? "" : v)
              }}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {projectTypeChoice === "others" && (
              <Input
                placeholder="Enter custom project type"
                value={form.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={categoryChoice}
              onValueChange={(v) => {
                setCategoryChoice(v)
                handleChange("category", v === "others" ? "" : v)
              }}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {categoryChoice === "others" && (
              <Input
                placeholder="Enter custom category"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A brief description of the project..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Manhattan, New York, USA"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 2 Weeks"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="completedDate">Completion Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  id="completedDate"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !completedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {completedDate ? format(completedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={completedDate} onSelect={setCompletedDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Section: Images */}
      <Card>
        <CardHeader>
          <CardTitle>Project Images</CardTitle>
          <CardDescription>Upload the main image and gallery photos.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="main-image">Main Image</Label>
            <Input
              id="main-image"
              type="file"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt-text">Alt Text for Main Image</Label>
            <Input
              id="alt-text"
              placeholder="A descriptive alt text..."
              value={form.altText}
              onChange={(e) => handleChange("altText", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="gallery">Image Gallery (Multiple Files)</Label>
            <Input
              id="gallery"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setGallery(e.target.files ? Array.from(e.target.files) : [])}
            />
            {gallery.length > 0 && (
              <p className="text-xs text-muted-foreground">{gallery.length} image(s) selected</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section: Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>In-Depth Project Details</CardTitle>
          <CardDescription>Describe the challenges, solutions, and results.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea
              id="challenge"
              placeholder="What was the main challenge?"
              value={form.challenge}
              onChange={(e) => handleChange("challenge", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              placeholder="How did you solve it?"
              value={form.solution}
              onChange={(e) => handleChange("solution", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="results">Results</Label>
            <Textarea
              id="results"
              placeholder="List the key results, one per line."
              value={form.results}
              onChange={(e) => handleChange("results", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Enter each result on a new line.</p>
          </div>
        </CardContent>
      </Card>

      {/* Section: Testimonial */}
      <Card>
        <CardHeader>
          <CardTitle>Client Testimonial</CardTitle>
          <CardDescription>Add the client&apos;s feedback if available.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="testimonial-text">Testimonial Text</Label>
            <Textarea
              id="testimonial-text"
              placeholder="Client's feedback..."
              value={form.testimonialText}
              onChange={(e) => handleChange("testimonialText", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-author">Author</Label>
            <Input
              id="testimonial-author"
              placeholder="e.g., Jonathan Reeves, Manhattan Resident"
              value={form.testimonialAuthor}
              onChange={(e) => handleChange("testimonialAuthor", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Rating (1-5)</Label>
            <RadioGroup
              value={form.testimonialRating}
              onValueChange={(v) => handleChange("testimonialRating", v)}
              className="flex space-x-4 pt-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(value)} id={`r${value}`} />
                  <Label htmlFor={`r${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Section: SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Information</CardTitle>
          <CardDescription>Optimize for search engines.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input
              id="meta-title"
              placeholder="A catchy title for search results..."
              value={form.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              placeholder="A brief summary for search engines..."
              value={form.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Textarea
              id="keywords"
              placeholder="Enter keywords separated by commas or on new lines..."
              value={form.keywords}
              onChange={(e) => handleChange("keywords", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Separate each keyword with a comma or enter on a new line.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Project"
          )}
        </Button>
      </div>
    </form>
  )
}