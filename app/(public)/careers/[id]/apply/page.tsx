import ApplicationForm from "@/forms/ApplicationForm";
import { db } from "@/lib/database";
import { careers } from "@/lib/database/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = await db
    .select()
    .from(careers)
    .where(eq(careers.sanityId, id))
    .limit(1);
  const career = result[0];

  if (!career) notFound();

  return {
    title: `Apply for ${career.jobTitle} - SmartEdge Consulting & Analytics`,
    description: career.jobDescription,
    keywords: [
      "SmartEdge",
      "Careers",
      "Data Science",
      "Analytics",
      "Data-Driven Decisions",
      "Consulting",
      "Job Opportunities",
      "Join Our Team",
      career.jobTitle,
    ],
    openGraph: {
      title: `Apply for ${career.jobTitle} - SmartEdge Consulting & Analytics`,
      description: career.jobDescription || "",
      url: `https://www.consultingsmartedge.com/careers/${career.sanityId}/apply`,
      siteName: "SmartEdge Consulting & Analytics",
      images: [
        {
          url: "/smartedge_logo.png",
          width: 1200,
          height: 630,
          alt: "SmartEdge Consulting & Analytics",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Apply for ${career.jobTitle} - SmartEdge Consulting & Analytics`,
      description: career.jobDescription || "",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.consultingsmartedge.com/careers/${career.sanityId}/apply`,
    }
  };
}

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
