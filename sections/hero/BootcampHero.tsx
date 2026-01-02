import Image from "next/image";
import Link from "next/link";
import React from "react";

const BootcampHero = () => {
  return (
    <header className="relative overflow-hidden bg-linear-to-b from-white to-gray-50/50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
                DataEdge Analytics{" "}
                <span className="text-gradient-primary">Bootcamp</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
                8 Weeks of Practical, Career-Ready Data Skills
              </h2>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              SmartEdge Consulting & Analytics designed this program to help you
              go from zero to producing real dashboards, insights, and business
              reports that employers actually want. This is not just another
              online class—it&apos;s a hands-on, project-driven, career-focused
              experience built for the African market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Link href="/services/bootcamp/registration">Apply Now</Link>
              </button>
              <button className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors">
                <a href="#curriculum">View Curriculum</a>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="font-bold text-green-600">✓</span>
                </div>
                <span>Live Online Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="font-bold text-blue-600">✓</span>
                </div>
                <span>Hands-on Projects</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/bootcamp.jpg"
                  width={600}
                  height={400}
                  alt="DataEdge Analytics Bootcamp - Students learning data analytics"
                  className="object-cover w-full h-auto"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />
                <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-linear-to-r from-primary/20 to-blue-500/20 blur-2xl" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
                <div className="text-sm font-bold text-gray-900">
                  20+ Alumni
                </div>
                <div className="text-xs text-gray-600">
                  Now working at top companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BootcampHero;
