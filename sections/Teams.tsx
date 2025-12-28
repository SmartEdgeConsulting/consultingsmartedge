import TeamsCard from "@/cards/TeamsCard";
import { getTeams } from "@/src/sanity/queries";
import { client } from "@/src/sanity/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { teamsProps } from "@/types";
import Heading from "@/components/Heading";
import { UsersRound } from "lucide-react";

const Teams = async () => {
  let teamMembers: teamsProps[] = [];

  try {
    teamMembers = await client.fetch(
      getTeams,
      {},
      { next: { revalidate: 30 } }
    );
    console.log("Fetched team members:", teamMembers);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 scroll-mt-16" id="teams">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Heading title="" icon={<UsersRound size={20} />} />
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Meet Our Team
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
            Our diverse team of data scientists, engineers, and consultants
            brings together decades of experience in transforming businesses
            through data-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamMembers.map((team) => {
            return <TeamsCard key={team._id} {...team} />;
          })}
        </div>

        <div className="my-10 text-center max-w-3xl mx-auto">
          <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-6">
            Want to work with our{" "}
            <span className="text-gradient-primary">Team?</span>
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
        </div>
      </div>
    </section>
  );
};

export default Teams;
