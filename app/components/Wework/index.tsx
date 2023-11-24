"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";
import {ProductInfo} from "@/app/karma";

export default class MultipleItems extends Component<{ products: ProductInfo[] }> {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 5,
            // centerMode: true,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };


        return (
            <div className="bg-wework py-32">

                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 '>

                    <div className="text-center">
                        <h3 className="text-4xl sm:text-6xl font-bold text-black my-2">The Latests Strains.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-50 lg:mr-48 my-2">The Latests Strains.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-25 lg:-mr-32 my-2">The Latests Strains.</h3>
                    </div>

                </div>

                <Slider {...settings}>
                    {this.props.products.map((items, i) => (
                        <div key={i}>
                            <div className='bg-white m-3 py-14 my-10 text-center shadow-xl rounded-3xl'>
                                <div className='relative'>
                                    <Image src={items.productImage} alt="gaby" width={182} height={182} className="inline-block m-auto object-center object-cover" style={{ height: 150, width: 150 }} />
                                    <Image src={items.organisationImage} alt="greenbg" width={120} height={120} className=" absolute inline-block position-linkedin" />
                                </div>
                                <h4 className='text-4xl font-bold pt-14'>{items.organisationName}</h4>
                                <h3 className='text-2xl font-normal pt-4 pb-2 opacity-50'>{items.productName}</h3>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>

        );
    }
}
