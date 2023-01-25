"use client"
import React, { useState } from "react"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import hdate from 'human-date'

export default function Carousel({events}: any) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    mode: "free-snap",
    slides: {
      perView: 3,
    },
  })
  
  return (
    <><></>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
        {events.map((event: any, i:any) => {
            return (
              <div className={"keen-slider__slide number-slide"+i+1} key={event.id}>
                <Event event={event} />
              </div>
            );
          })}
        </div>
        
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

function Event({ event }: any) {
    return (
      <div>
        <div className="card card-bordered bg-base-200 shadow-xl h-fit w-fit">
          <div className="card-body h-fit w-fit">
            {event.summary !== undefined ? (
              <h2 className="card-title">{event.summary}</h2>
            ) : (
              <h2 className="card-title">(No Name)</h2>
            )}
  
            {event.location !== undefined ? (
              <h4>{event.location}</h4>
            ) : (
              <h4>Undefined/Online</h4>
            )}
  
            {event.start.timeZone !== undefined ? (
              <h6>Timezone: {event.start.timeZone}</h6>
            ) : (
              <h6>(No Timezone)</h6>
            )}
  
            {event.start.dateTime !== undefined ? (
              <p className="text-red-400">End Time: {hdate.prettyPrint(new Date(event.start.dateTime), { showTime: true })}</p>
            ) : (
              <p></p>
            )}
  
            {event.end.dateTime !== undefined ? (
              <p className="text-red-400">End Time: {hdate.prettyPrint(new Date(event.end.dateTime), { showTime: true })}</p>
            ) : (
              <p></p>
            )}
  
            {event.start.date !== undefined ? (
              <p>Start Date: {event.start.date}</p>
            ) : (
              <p></p>
            )}
  
            {event.end.date !== undefined ? (
              <p>End Date: {event.end.date}</p>
            ) : (
              <p></p>
            )}
  
            {event.description !== undefined ? (
              <p>{event.description}</p>
            ) : (
              <p>Undefined</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  