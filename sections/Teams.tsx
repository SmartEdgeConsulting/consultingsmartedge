import TeamsCard from "@/card-components/TeamsCard";
import { teams } from "@/lib/data";
import { getTeams } from "@/src/sanity/queries";
import { client } from "@/src/sanity/client";

const Teams = async () => {
  let teamMembers = [];

  try {
    teamMembers = await client.fetch(
      getTeams,
      {},
      { next: { revalidate: 30 } }
    );
    console.log("Fetched team members:", teamMembers);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    // Fall back to static data
    teamMembers = teams; // Use your local teams data as fallback
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 scroll-mt-16" id="teams">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Meet Our Team
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
            Our diverse team of data scientists, engineers, and consultants
            brings together decades of experience in transforming businesses
            through data-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          {teams.map((team) => {
            return <TeamsCard key={team.id} {...team} />;
          })}
        </div>

        {/**<div className="my-10 text-center max-w-3xl mx-auto">
          <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-6">
            Want to work with our Team?
          </h5>
          <p className="text-sm sm:text-base text-slate-800 mb-6">
            Our experts are ready to help you unlock the full potential of your
            data. Let&apos;s start the conversation today.
          </p>
          <Button
            variant="default"
            asChild
            className="text-md font-bold"
            aria-label="Get in Touch with our team members"
          >
            <Link href="/contact" prefetch={false}>
              Get in Touch
            </Link>
          </Button>
        </div>*/}
      </div>
    </section>
  );
};

export default Teams;
