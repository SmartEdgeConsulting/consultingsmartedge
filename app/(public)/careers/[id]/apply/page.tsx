import ApplicationForm from "@/forms/ApplicationForm";
import { db } from "@/lib/database";
import { careers } from "@/lib/database/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

const ApplicationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const result = await db
    .select()
    .from(careers)
    .where(eq(careers.sanityId, id))
    .limit(1);

  const career = result[0];
  console.log("Career found:", career);

  if (!career) {
    notFound();
  }

  return (
    <main className="mt-16">
      <ApplicationForm
        careerId={career.id}
        title={career.jobTitle}
        description={career.jobDescription}
      />
    </main>
  );
};

export default ApplicationPage;
