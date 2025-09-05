"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Eye,
  Zap,
  Palette,
  Monitor,
  Shirt,
  Building2,
  Mail,
  Phone,
  Star,
  ChevronDown,
  Send,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isScheduling, setIsScheduling] = useState(false)
  const [showCalendlyPopup, setShowCalendlyPopup] = useState(false)
  const [calendlyLoading, setCalendlyLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Brand Identity",
    message: "",
  })

  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
  })

  const aboutRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    portfolio: false,
    about: false,
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setIsVisible((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const animateCounters = () => {
      if (hasAnimated) return
      setHasAnimated(true)

      const targets = { projects: 200, clients: 80, experience: 7 }
      const duration = 1200
      const steps = 60
      const stepTime = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setCounters({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          experience: Math.floor(targets.experience * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, stepTime)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters()
        }
      },
      { threshold: 0.3 },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const testimonials = [
    {
      quote:
        "FT-VOX transformed our brand identity completely. Their creative vision and attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "Creative Director",
      company: "LuxeFashion",
    },
    {
      quote: "Working with FT-VOX was a game-changer. They brought our vision to life in ways we never imagined.",
      author: "Michael Chen",
      role: "Founder",
      company: "TechSummit",
    },
    {
      quote: "The team's expertise in both fashion and technology created the perfect blend for our campaign.",
      author: "Emma Rodriguez",
      role: "Marketing Manager",
      company: "AthleteX",
    },
  ]

  const faqs = [
    {
      question: "What's your design process?",
      answer:
        "We follow a collaborative 4-step process: Discovery & Strategy, Creative Development, Design Execution, and Launch & Optimization. Each phase involves close collaboration with your team to ensure we exceed expectations.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope. Brand identity projects typically take 4-6 weeks, while comprehensive campaigns can take 8-12 weeks. We'll provide a detailed timeline during our discovery phase.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "We work with clients worldwide and have experience managing projects across different time zones. Our digital-first approach makes collaboration seamless regardless of location.",
    },
    {
      question: "What makes FT-VOX different?",
      answer:
        "Our unique blend of high-fashion aesthetics and cutting-edge technology sets us apart. We don't just create designs – we craft visual experiences that resonate emotionally and drive business results.",
    },
    {
      question: "Can you handle both print and digital projects?",
      answer:
        "Yes! We specialize in creating cohesive brand experiences across all mediums – from large-scale print campaigns to digital interfaces and everything in between.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleScheduleCall = () => {
    setIsScheduling(true)
    setCalendlyLoading(true)
    setShowCalendlyPopup(true)
    setTimeout(() => setIsScheduling(false), 500)
  }

  const handleCalendlyLoad = () => {
    setCalendlyLoading(false)
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you ${formData.name}! We've received your message and will get back to you within 24 hours.`)
    setFormData({ name: "", email: "", projectType: "Brand Identity", message: "" })
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/ft-vox-logo.png" alt="FT-VOX" className="h-18 sm:h-20 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <a
                href="#services"
                className="text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Portfolio
              </a>
              <a
                href="#process"
                className="text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Process
              </a>
              <a
                href="#testimonials"
                className="text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Contact
              </a>
            </div>
            <Button
              onClick={handleScheduleCall}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 py-2 text-sm tracking-wide"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/premium-design-agency-hero-background-with-fashion.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF8CA2]/90 via-[#FF8CA2]/70 to-[#110271]/80"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
          <Badge
            variant="outline"
            className="mb-6 text-sm font-medium border-white/30 text-white bg-white/10 px-4 py-2"
          >
            ✨ Premium Design Agency
          </Badge>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight text-balance">
            Where Creativity
            <br />
            <span className="text-transparent bg-gradient-to-r from-white to-white/70 bg-clip-text">
              Meets Innovation
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-pretty">
            We specialize in high-end image curation, sporty graphics, fashion magazine design, tech event covers, and
            large-scale print designs that captivate and inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-[#FF8CA2] hover:bg-white/90 font-medium px-8 py-4 text-lg group">
              <a href="#contact">Start Your Project </a>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-medium px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <a href="#projects">View Our Work</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to execution, we deliver premium design solutions that elevate your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Image Curation",
                description:
                  "High-end visual storytelling that captures attention and communicates your brand message effectively.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Sporty Graphics",
                description:
                  "Dynamic and energetic designs for athletic brands, sports events, and active lifestyle companies.",
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Fashion Magazine Design",
                description:
                  "Editorial layouts that blend sophistication with cutting-edge aesthetics for fashion publications.",
              },
              {
                icon: <Monitor className="h-8 w-8" />,
                title: "Tech Event Covers",
                description: "Modern, innovative designs for technology conferences, summits, and digital events.",
              },
              {
                icon: <Shirt className="h-8 w-8" />,
                title: "Print Design",
                description: "Large-scale print campaigns including billboards, posters, and promotional materials.",
              },
              {
                icon: <Building2 className="h-8 w-8" />,
                title: "Brand Identity",
                description: "Complete brand systems that establish strong visual presence across all touchpoints.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-[#110271]/30"
              >
                <CardContent className="p-6">
                  <div className="text-[#110271] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools We Master Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Tools We Master</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading software and technologies that power our creative process.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Adobe Creative Suite",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
              },
              { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
              { name: "Sketch", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" },
              { name: "Cinema 4D", logo: "https://imgs.search.brave.com/6X-WStcwGUb4c6WfNwr81HvmCWBJQsMxLfSd1_Kop8g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FmLzVm/L2Y1L2FmNWZmNTg2/YjExOGRiZDc0MDk0/NWU1ZjQ5ZDY3YmVl/LmpwZw" },
              { name: "Blender", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg" },
              {
                name: "Webflow",
                logo: "https://imgs.search.brave.com/1IqgYDIK6RWT2RMcJCOIQsfCafzxisBEzD0Zk2yiAiA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MDA5ZWM4Y2RhN2Yz/MDU2NDVjOWQ5MWIv/NjUxZWRiN2YxZGQy/NDVkNjQ3N2RjOTcx/X1dlYmZsb3dUZWFt/LUF2aS01MDB4NTAw/LmpwZw",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-4 rounded-xl bg-background border border-border/50 hover:border-[#110271]/30 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={tool.logo || "/placeholder.svg"}
                  alt={tool.name}
                  className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300"
                 onError={(e) => {
  e.currentTarget.style.display = "none";
  const sibling = e.currentTarget.nextElementSibling;
  if (sibling instanceof HTMLElement) {
    sibling.style.display = "block";
  }
}}
                />
                <div className="text-xl mb-3 hidden">
                  {tool.name === "Adobe Creative Suite" && "🎨"}
                  {tool.name === "Figma" && "🎯"}
                  {tool.name === "Sketch" && "✏️"}
                  {tool.name === "Cinema 4D" && "🎬"}
                  {tool.name === "Blender" && "🔮"}
                  {tool.name === "Webflow" && "🌐"}
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" id="projects">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover some of our recent work and the innovative solutions we've delivered for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LuxeFashion",
                description: "A premium fashion magazine redesign with bold typography and immersive layouts.",
                category: "Editorial Design",
                tags: ["Print", "Digital", "Fashion"],
              },
              {
                title: "TechSummit 2024",
                description:
                  "Complete visual identity for a major technology conference including signage and digital assets.",
                category: "Event Branding",
                tags: ["Branding", "Digital", "Print"],
              },
              {
                title: "AthleteX Campaign",
                description:
                  "Multi-platform campaign for a sports brand featuring dynamic visuals and motion graphics.",
                category: "Campaign Design",
                tags: ["Sports", "Digital", "Motion"],
              },
              {
                title: "UrbanWear Collection",
                description: "Streetwear brand identity and apparel graphics that capture urban culture and style.",
                category: "Fashion Design",
                tags: ["Apparel", "Branding", "Street"],
              },
              {
                title: "FinanceFlow App",
                description: "Complete UI/UX design for a fintech application with focus on user experience and trust.",
                category: "UI/UX Design",
                tags: ["Mobile", "Fintech", "UX"],
              },
              {
                title: "Billboard Campaign",
                description: "Large-scale outdoor advertising campaign with bold visuals that command attention.",
                category: "Outdoor Advertising",
                tags: ["Billboard", "Print", "Campaign"],
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border/50 hover:border-accent/20 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=300&width=400&query=${project.description}`}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <Badge variant="secondary" className="mb-2 bg-accent text-accent-foreground">
                          {project.category}
                        </Badge>
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your brand, audience, and market to create the perfect creative strategy.",
              },
              {
                step: "02",
                title: "Design",
                description: "Our designers craft beautiful, user-centered visuals and brand experiences.",
              },
              {
                step: "03",
                title: "Development",
                description: "Expert execution brings your designs to life with precision and attention to detail.",
              },
              {
                step: "04",
                title: "Launch",
                description:
                  "We handle deployment, testing, and ensure a successful brand launch across all platforms.",
              },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{phase.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6 sm:p-8 border border-accent/20 shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-background border border-border hover:border-accent/50 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentTestimonial ? "bg-accent w-6 sm:w-8" : "bg-muted-foreground/30 w-2"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-background border border-border hover:border-accent/50 transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-2xl md:text-3xl font-medium text-foreground mb-6 sm:mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-accent">
                      {testimonials[currentTestimonial].author.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-base sm:text-lg">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About FT-VOX</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a premium design agency that bridges high fashion and cutting-edge technology, creating visual
              experiences that captivate and inspire.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our creative philosophy centers on bold visual storytelling that transforms business communications into
                compelling experiences that resonate emotionally and drive results.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From streetwear graphics to corporate identities, we bring a unique perspective that merges creative
                excellence with strategic business impact.
              </p>
            </div>
            <div className="relative">
              <img
                src="/creative-design-team-working-on-premium-projects-i.png"
                alt="About FT-VOX"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#110271]/10 to-[#FF8CA2]/10 border border-[#110271]/20">
              <div className="text-4xl font-bold text-[#110271] mb-2">{counters.projects}+</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Projects Completed
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF8CA2]/10 to-[#110271]/10 border border-[#FF8CA2]/20">
              <div className="text-4xl font-bold text-[#FF8CA2] mb-2">{counters.clients}+</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Happy Clients</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#110271]/10 to-[#FF8CA2]/10 border border-[#110271]/20">
              <div className="text-4xl font-bold text-[#110271] mb-2">{counters.experience}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by innovative companies worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {["NIKE", "ADIDAS", "APPLE", "GOOGLE", "TESLA", "SPOTIFY"].map((client, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {client}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
               Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your brand into a powerful visual experience? Let's discuss your vision and create
              something extraordinary.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2" id="contact">
                <Send className="w-6 h-6 text-accent" />
                Send us a message
              </h3>
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  >
                    <option>Brand Identity</option>
                    <option>Editorial Design</option>
                    <option>Digital Campaign</option>
                    <option>UI/UX Design</option>
                    <option>Print Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="Tell us about your project vision, goals, and timeline..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Prefer to talk directly?
                </h3>
                <p className="text-muted-foreground mb-6">
                  🗓️ Schedule a 30-minute discovery call with our creative team to discuss your project requirements and
                  get a personalized quote.
                </p>
                <Button
                  onClick={handleScheduleCall}
                  disabled={isScheduling}
                  variant="outline"
                  size="lg"
                  className="group hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                >
                  {isScheduling ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Schedule a Call
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground" ><a href="mailto:fawoleayomide1096@gmail.com ">fawoleayomide1096@gmail.com</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground"> Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground"> Response Time</div>
                    <div className="text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground"> Why Choose APEX?</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 7+ years of premium design experience</li>
                    <li>• 200+ successful projects delivered</li>
                    <li>• 98% client satisfaction rate</li>
                    <li>• Award-winning creative team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about working with FT-VOX.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:border-[#110271]/30 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-1 text-left flex items-center justify-between hover:bg-muted/30 transition-colors rounded-lg"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-3 pb-3">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+2349154172570"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <img
          src="https://imgs.search.brave.com/1tdHoO38OZcsoto1OsdOQfaJT5yvjTWjmNDMNjfcpis/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvTG9nby1XaGF0/c0FwcC03MDB4Mzk0/LnBuZw"
          alt="WhatsApp"
          className="w-14 h-8"
          onError={(e) => {
  e.currentTarget.style.display = "none";
  const sibling = e.currentTarget.nextElementSibling;
  if (sibling instanceof HTMLElement) {
    sibling.style.display = "block";
  }
}}
        />
       
      </a>

      {/* Footer Section */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/ft-vox-logo.png" alt="FT-VOX" className="h-18 w-auto mb-2 brightness-0 invert" />
              <p className="text-background/80 leading-relaxed">
                Creating visual experiences that drive culture, inspire action, and build lasting connections.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-background/80">
                <li>Brand Strategy</li>
                <li>Brand Design</li>
                <li>Digital Experiences</li>
                <li>Brand Innovation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-background/80">
                <p><a href="mailto:fawoleayomide1096@gmail.com ">fawoleayomide1096@gmail.com</a></p>
                <p>+234 (091) 541 725 70</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-background/60 text-sm">© 2025 FT-VOX. All rights reserved.</span>
            <div className="flex space-x-6 text-sm text-background/80">
              <a href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Calendly Popup */}
      {showCalendlyPopup && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Schedule a Discovery Call</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCalendlyPopup(false)} className="hover:bg-muted">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative h-[700px]">
              {calendlyLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading calendar...</p>
                  </div>
                </div>
              )}
              <iframe
                src="https://calendly.com/ezrahel?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting"
                onLoad={handleCalendlyLoad}
                className={calendlyLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}
              ></iframe>
            </div>
            <div className="p-4 border-t bg-muted/30">
              <p className="text-sm text-muted-foreground text-center">
                📅 Select your preferred date and time above, fill in your details, and click "Schedule Event" to
                confirm your meeting.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
