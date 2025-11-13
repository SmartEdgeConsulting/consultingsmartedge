import TeamsCard from "@/components/TeamsCard";
import { Button } from "@/components/ui/button";
import { teams } from "@/lib/data";

const Teams = () => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 ">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
          Meet Our Team
        </h3>
        <p className="text-base sm:text-xl leading-7 text-slate-300 mx-auto max-w-3xl mb-8">
          Our diverse team of data scientists, engineers, and consultants brings
          together decades of experience in transforming businesses through
          data-driven solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
        {teams.map((team) => {
          return (
            <TeamsCard
              id={team.id}
              key={team.id}
              name={team.name}
              avatar={team.avatar}
              bio={team.bio}
              role={team.role}
              skills={team.skills}
            />
          );
        })}
      </div>

      <div className="my-10 text-center max-w-3xl mx-auto">
        <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">Want to work with our Team?</h5>
        <p className="text-sm sm:text-base text-slate-200 max-w-3xl mb-6">
          Our experts are ready to help you unlock the full potential of your
          data. Let&apos;s start the conversation today.
        </p>
        <Button variant="default" size="sm">Scheule A Meeting</Button>
      </div>
    </section>
  );
};

export default Teams;
