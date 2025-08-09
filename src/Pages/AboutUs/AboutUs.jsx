import React from "react";
import { FaUsers, FaBullseye, FaLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-base-200 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-primary mb-4">
          About <span className="text-primary">Us</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At <span className="font-semibold">Product Recommendation System</span>, 
          we believe that every purchase should be informed and confident.  
          Our platform empowers users to share their experiences, seek better alternatives, 
          and make smarter buying decisions together as a community.
        </p>
      </div>

      {/* Mission / Vision / Values */}
      <div className="grid md:grid-cols-3 gap-10 mt-14">
        {/* Mission */}
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="flex justify-center mb-4 text-blue-600 text-4xl">
            <FaBullseye />
          </div>
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To provide a trusted platform where users can voice their concerns 
            about products and receive valuable recommendations from real people.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="flex justify-center mb-4 text-green-600 text-4xl">
            <FaLightbulb />
          </div>
          <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-600">
            To create a global community that transforms product feedback into 
            collective wisdom, helping people make better choices every day.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="flex justify-center mb-4 text-yellow-500 text-4xl">
            <FaUsers />
          </div>
          <h3 className="text-xl font-semibold mb-3">Our Values</h3>
          <p className="text-gray-600">
            Transparency, collaboration, and trust are at the heart of everything 
            we do. We prioritize honesty and user empowerment in every interaction.
          </p>
        </div>
      </div>

      {/* Bottom Statement */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Together, we’re redefining the way people choose products — 
          not based on ads, but on real experiences and genuine recommendations.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
