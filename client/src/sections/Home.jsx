import React from "react";
import NewArrival from "./NewArrival";
import BestSeller from "./BestSeller";
import OurPolicies from "./OurPolicies";
import NewsLetter from "./NewsLetter";
import Brand from "./Brand";
import Review from "./Review";
import Statistics from "./Statistics";
import Hero from "./Hero";

const Home = () => {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <Brand />
      </section>
      <section>
        <NewArrival />
      </section>
      <section>
        <BestSeller />
      </section>
      <section>
        <OurPolicies />
      </section>
      <section>
        <Review />
      </section>
      <section>
        <NewsLetter />
      </section>
      <section>
        <Statistics />
      </section>
    </main>
  );
};

export default Home;
