import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <AnimatedBackground
      particleCount={90}
      connectionDistance={180}
      primaryColor="59, 130, 246"
      backgroundColor="#09007D"
      className="min-h-screen"
    >
      <header
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 mx-auto max-w-5xl text-center"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-tight font-bold text-white mb-6">
          Data. Intelligence. Growth Powered by{" "}
          <span className="text-accent">SmartEdge</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 leading-8 max-w-3xl mb-8">
          We help businesses uncover clarity and accelerate growth through data
          analytics, research, and intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Button
            variant="default"
            className="text-md font-bold"
            aria-label="Book Consultation"
            aria-roledescription="navigation button"
          >
            Get a Free Data Consultation
          </Button>
          <Button
            variant="outline"
            className="text-md font-bold"
            aria-label="Upload Data for Analysis"
            aria-roledescription="navigation button"
          >
            Upload Your Data
          </Button>
        </div>
      </header>
    </AnimatedBackground>
  );
};

export default Hero;
