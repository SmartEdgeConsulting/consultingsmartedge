import ApplicationForm from "@/forms/ApplicationForm";
import React from "react";

const ApplicationPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <main className="mt-16">
      <ApplicationForm careerId={id} />
    </main>
  );
};

export default ApplicationPage;
