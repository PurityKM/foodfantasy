import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-6">About Food Fantasy</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Food Fantasy is your one-stop destination for discovering, creating, and
        sharing delicious recipes. Our goal is to inspire home cooks by offering
        a wide variety of recipe options tailored to individual tastes and
        dietary preferences. Whether you&apos;re a beginner or an expert chef, Food
        Fantasy helps you bring creative and tasty meals to life.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-4">Our Mission</h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        At Food Fantasy, our mission is to make cooking enjoyable, accessible,
        and exciting for everyone. We believe that anyone can create amazing
        meals with the right inspiration, and we aim to provide that spark
        through an intuitive platform where you can discover new recipes,
        explore ingredient combinations, and share your culinary experiences
        with others.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-4">Why Choose Us?</h2>
      <ul className="list-disc text-lg text-gray-600 text-center mb-8">
        <li className="mb-2">Wide range of recipes from various cuisines.</li>
        <li className="mb-2">User-friendly interface for easy navigation.</li>
        <li className="mb-2">Personalized recipe suggestions based on your ingredients.</li>
        <li className="mb-2">Community-driven platform to share your creations.</li>
        <li className="mb-2">Expert tips and techniques to enhance your cooking skills.</li>
      </ul>

      <h2 className="text-3xl font-semibold text-center mb-4">Join Us</h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        Become a part of the Food Fantasy community today. Explore new recipes,
        unleash your culinary creativity, and transform your kitchen into a
        playground of flavors. Sign up and start your food adventure!
      </p>
    </div>
  );
};

export default AboutUs;
