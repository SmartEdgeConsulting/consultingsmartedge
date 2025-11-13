import ProcessCard from "@/components/ProcessCard";
import { Button } from "@/components/ui/button";
import { process } from "@/lib/data";

const Works = () => {
  return (
    <section className="py-10 items-center flex flex-col">
      <div className="mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white  text-center mb-8">
          From <span className="text-acc">Data</span> to Impact — Our Process
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 text-white text-center gap-6">
        {process.map((process) => (
          <ProcessCard
            key={process.id}
            id={process.id}
            title={process.title}
            description={process.description}
          />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-6">
        Book A Discovery Session
      </Button>
    </section>
  );
};

export default Works;
