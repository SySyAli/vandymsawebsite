"use client"
import React, { useState, useEffect } from "react"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const animation = { duration: 5000, easing: (t: number) => t }

export default function Carousel({links}: any) {
  const [loaded, setLoaded] = React.useState<boolean[]>([])
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    animationEnded(s) {
      setCurrentSlide(s.track.details.rel)
    },
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
    },
  },
  [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 2000)
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ])
  React.useEffect(() => {
    const new_loaded = [...loaded]
    new_loaded[currentSlide] = true
    setLoaded(new_loaded)
  }, [currentSlide])

  return (
    <><></>
      <div className="navigation-wrapper lg:w-[50%]">
        <div ref={sliderRef} className="keen-slider w-full h-[32rem] lg:rounded-lg">
        {links.map((link: any, i:any) => {
            return (
              <div className={"h-full w-[50%] overflow-hidden keen-slider__slide lazy__slide number-slide"+(i)} key={i}>
                <img className="h-full object-center object-cover" src={loaded[i] ? link : ""}></img>
              </div>
            );
          })}
        </div>
        
        
      </div>
    </>
  )
}
