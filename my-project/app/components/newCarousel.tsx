"use client"
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'

type MyProps = {
    // using `interface` is also ok
    links: [];
  }

export default class NextJsCarousel extends Component<MyProps> {
    constructor(props: any) {    
        super(props);   
    }
    
    render() {
        const params: any = this.props
        return (
            <div className='h-fit'>
              <Carousel className="" autoPlay={true} infiniteLoop={true} interval={2000} showThumbs={false} dynamicHeight={false} showArrows={false} showIndicators={false}>
              {params.links.map((link: any, i: any) =>{
                return (
                        <div className="w-full lg:h-[32rem] overflow-hidden object-center" key={"slide"+i+1}>
                            <Image fill={true} src={link} alt={"image"+i+1}/>
                        </div>
                )
                })}
              </Carousel>
            </div>
        );
    }
};
/*

*/


