import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <AnimatedBackground
      particleCount={90}
      connectionDistance={180}
      primaryColor="59, 130, 246"
      backgroundColor="#0b1d3a"
      className="min-h-screen"
    >
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Data. Intelligence. Growth — Powered by <span className="text-sec">SmartEdge.</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
          We help businesses uncover clarity and accelerate growth through data
          analytics, research, and intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Button variant="default" className="text-md font-bold">Get a Free Data Consultation</Button>
          <Button variant="outline" className="text-md font-bold">Upload Your Data</Button>
        </div>
      </section>
    </AnimatedBackground>
  );
};

export default Hero;
