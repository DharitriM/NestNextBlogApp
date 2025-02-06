"use client";

import Image from "next/image";
import React, { useState } from "react";

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="bg-white text-center">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <Image
          src="https://img.freepik.com/premium-photo/abstract-gradient-aqua-teal-background_851755-3168.jpg"
          alt="Tech Blog Inspiration"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-cyan-900 bg-opacity-50 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-white">
            {" "}
            Make Someone Happy With a Tech Blog And Get You Motivated!
          </h1>
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold text-cyan-800 uppercase mb-8">
            What You Will Find on This Blog
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Section */}
            <div className="text-center">
              <p className="text-6xl font-bold text-cyan-500">29+</p>
              <p className="uppercase text-sm font-medium text-cyan-600 mt-2">
                Years of Experience in IT
              </p>
              <div className="mt-6">
                <Image
                  src="https://img.freepik.com/premium-photo/abstract-gradient-aqua-teal-background_851755-3168.jpg"
                  alt="Professional Meeting"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Right Section */}
            <div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words roots in a piece of classical Latin
                literature from 45 BC.
              </p>
              <a
                href="#"
                className="text-cyan-500 font-semibold hover:underline"
              >
                Learn More About Success Stories:
              </a>
              <div className="mt-4">
                <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-cyan-600 transition">
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="relative group">
            {showVideo ? (
              <div className="aspect-w-60 aspect-h-50 w-full max-w-[1400px] max-h-[600px]">
                <button
                  className="absolute top-[-8] right-[-4] bg-gray-500 text-white px-1 rounded-md shadow-lg hover:bg-cyan-600 text-xs"
                  onClick={() => setShowVideo(false)}
                >
                  X
                </button>
                <iframe
                  style={{ width: "52vw", height: "60vh" }}
                  src="https://www.youtube.com/embed/OI3gGmJzhVM"
                  title="Tech Blog Inspiration"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow"
                ></iframe>
              </div>
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src="https://img.freepik.com/premium-photo/abstract-gradient-aqua-teal-background_851755-3168.jpg"
                  alt="Tech Blog Inspiration"
                  width={1000}
                  height={800}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-cyan-600">
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Highlight Box */}
        <div className=" mt-12 flex flex-col justify-center items-center gap-8">
          <div className="bg-cyan-100 p-6 rounded-lg text-left shadow-lg max-w-4xl">
            <h2 className="text-xl font-bold mb-4 text-cyan-800">
              Make Someone Happy With a Tech Blog And Get You Motivated!
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              at consectetur lorem donec massa sapien. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Duis at consectetur
              lorem donec massa sapien.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center mt-8 gap-16 text-center">
            <div>
              <h2 className="text-4xl font-bold text-cyan-800">764+</h2>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-cyan-800">1,250+</h2>
              <p className="text-gray-600">Media Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-cyan-50 py-16 mt-6">
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-cyan-800">
            Get In Touch With Our Experienced IT Staffs. We’re Available For 8
            Hours A Day!
          </h2>
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Contact Info */}
            <div className="flex items-center gap-4">
              <div className="bg-cyan-800 text-white p-4 rounded-full">📞</div>
              <div>
                <p className="text-cyan-800">Reach Out Now!</p>
                <h3 className="text-xl font-bold text-cyan-600">
                  +91 1234-56-7890
                </h3>
              </div>
            </div>
            {/* Contact Button */}
            <button className="bg-cyan-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
