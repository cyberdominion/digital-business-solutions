"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Business {
  name: string
  category: string
  location: string
  url: string
}

const businesses: Business[] = [
  { name: "Patience Sewing", category: "Fashion & Apparel", location: "Lagos", url: "https://patiencesewing.ltd" },
  { name: "Grace Kitchen", category: "Food & Restaurant", location: "Abuja", url: "https://gracekitchen.com.ng" },
  { name: "Urban Threads", category: "Fashion & Apparel", location: "Port Harcourt", url: "https://urbanthreads.com.ng" },
  { name: "TechHub Solutions", category: "Professional Services", location: "Lagos", url: "https://techhub.ng" },
  { name: "FreshMarket", category: "Retail", location: "Kano", url: "https://freshmarket.ng" },
  { name: "Beauty Glow", category: "Beauty & Wellness", location: "Ibadan", url: "https://beautyglow.ng" },
]

const cardWidth = 320 + 16 // 320px card + 16px gap

export function BusinessCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)
  const isUserInteractingRef = useRef(false)
  const lastInteractionTimeRef = useRef(0)
  const [showControls, setShowControls] = useState(false)

  const scrollStep = 1 // pixels per frame
  const scrollInterval = 30 // ms per frame
  const resumeDelay = 3000 // ms to wait before resuming after interaction

  const scrollContainer = scrollRef.current

  const animate = useCallback(() => {
    if (!scrollContainer || isHoveringRef.current || isUserInteractingRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const now = Date.now()
    if (now - lastInteractionTimeRef.current < resumeDelay) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
      // Seamless loop: clone content so we can reset without visual jump
      scrollContainer.scrollLeft = 0
    } else {
      scrollContainer.scrollLeft += scrollStep
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Mouse wheel handling - pause auto-scroll temporarily
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      isUserInteractingRef.current = true
      lastInteractionTimeRef.current = Date.now()
      
      // Allow native scroll
      if (scrollContainer) {
        scrollContainer.scrollLeft += e.deltaY
      }
    }
  }, [])

  // Touch handling for mobile
  const handleTouchStart = useCallback(() => {
    isUserInteractingRef.current = true
  }, [])

  const handleTouchEnd = useCallback(() => {
    lastInteractionTimeRef.current = Date.now()
    // Resume after delay
    setTimeout(() => {
      isUserInteractingRef.current = false
    }, resumeDelay)
  }, [])

  // Mouse enter/leave
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true
    setShowControls(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
    setShowControls(false)
  }, [])

  // Button controls
  const scrollLeft = useCallback(() => {
    if (scrollContainer) {
      isUserInteractingRef.current = true
      lastInteractionTimeRef.current = Date.now()
      scrollContainer.scrollBy({ left: -cardWidth * 2, behavior: "smooth" })
      setTimeout(() => { isUserInteractingRef.current = false }, resumeDelay)
    }
  }, [])

  const scrollRight = useCallback(() => {
    if (scrollContainer) {
      isUserInteractingRef.current = true
      lastInteractionTimeRef.current = Date.now()
      scrollContainer.scrollBy({ left: cardWidth * 2, behavior: "smooth" })
      setTimeout(() => { isUserInteractingRef.current = false }, resumeDelay)
    }
  }, [])

  // Start animation on mount
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate])

  // Clone businesses for infinite loop effect
  const extendedBusinesses = [...businesses, ...businesses, ...businesses]

  return (
    <div 
      ref={scrollRef}
      className="relative"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 space-x-4" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 min-w-0" style={{ minWidth: 'max-content' }}>
          {extendedBusinesses.map((biz, i) => (
            <Card key={i} className="snap-start w-[300px] sm:w-[320px] flex-shrink-0 shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-center mb-2 text-gradient">{biz.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-3">{biz.category} · {biz.location}</p>
                <div className="text-center">
                  <a
                    href={biz.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Visit Website
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-muted/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />
      
      {/* Navigation arrows - visible on hover or mobile */}
      <button 
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 border border-border/50 rounded-full hover:bg-muted/50 transition-smooth ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-primary" />
      </button>
      <button 
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 border border-border/50 rounded-full hover:bg-muted/50 transition-smooth ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-primary" />
      </button>
    </div>
  )
}