import React from "react";
import {
  BookOpen,
  BarChart3,
  Database,
  TrendingUp,
  Users,
  FileSpreadsheet,
  Target,
  Briefcase,
  Award,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import Heading from "@/components/Heading";

const BootcampDetails = () => {
  const curriculumModules = [
    {
      week: "Week 1",
      title: "Data Analytics Foundations",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      topics: [
        "Introduction to Data Analytics - Data types, roles, use cases ",
        "Analytical Thinking - Turning problems into data questions ",
        "Excel Basics - Navigation, formatting, cell referencing",
      ],
    },
    {
      week: "Week 2",
      title: "Excel Functions & Data Cleaning",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      topics: [
        "Functions I - SUM, IF, COUNT, nested IF ",
        "Functions II  - VLOOKUP, HLOOKUP, INDEX-MATCH ",
        "Data Cleaning - Text-to-columns, duplicates, Power Query intro",
      ],
    },
    {
      week: "Week 3",
      title: "Excel for Business Intelligence ",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      topics: [
        "Pivot Tables 101 - Summaries, grouping, filters ",
        "Charts & Visualization - Bar, line, combo charts ",
        "Excel Dashboard - Slicers, layout, formatting",
      ],
      outcome: "#1: Excel Sales Dashboard ",
    },
    {
      week: "Week 4",
      title: "Power BI Foundations",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      topics: [
        "Intro to Power BI - Interface, imports",
        "Power Query - Merging, transforming data ",
        "Data Modeling - Relationships, star schema",
      ],
    },
    {
      week: "Week 5",
      title: "Power BI for Insight & KPI development",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      topics: [
        "DAX Fundamentals - Columns vs measures",
        "KPI Development - Revenue, retention, margins",
        "Dashboard Building - Interactive visuals",
      ],
      outcome: "#2: Power BI Dashboard ",
    },
    {
      week: "Week 6",
      title: "Tableau Fundamentals",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-blue-600 to-cyan-600",
      topics: [
        "Intro to Tableau - Interface, data prep",
        "Calculations & Parameters - Filters, calculations",
        "Tableau Dashboards - Storyboards & layouts",
      ],
    },
    {
      week: "Week 7",
      title: "Storytelling, Presentation & KPIs",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-blue-600 to-cyan-600",
      topics: [
        "Storytelling Framework - Insight narration",
        "Presenting to Non-Tech Audiences - Simplicity, clarity",
        "KPIs & Decision Making - Aligning visuals with strategy",
      ],
      outcome: "#3: Storytelling Assignment",
    },
    {
      week: "Week 8",
      title: "CAPSTONE PROJECT WEEK ",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-600 to-emerald-600",
      topics: [
        "Capstone Kickoff  - Choose domain: Retail, Logistics, Fintech, Agriculture",
        "Work Session + Guidance - Cleaning → Modeling → Dashboard → Story",
        "Final Presentation & Graduation - Certificates + portfolio review ",
      ],
    },
  ];

  const toolsTechnologies = [
    { name: "Microsoft Excel", level: "Professional", icon: "📊" },
    { name: "Power BI", level: "Advanced", icon: "📈" },
    { name: "Tableau", level: "Intermediate+", icon: "🎨" },
  ];

  const learningOutcomes = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Practical Skills",
      description: "Build professional dashboards from scratch",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Real Projects",
      description: "Complete 3+ portfolio-ready projects",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Career Support",
      description: "Get job placement assistance",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification",
      description: "Earn industry-recognized certificate",
    },
  ];

  return (
    <section
      id="curriculum"
      className="scroll-mt-16 py-10 sm:py-12 lg:py-16 bg-linear-to-b from-white to-gray-50/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Heading title="Curriculum Breakdown" icon={<BookOpen size={18} />} />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            What You&apos;ll Learn in{" "}
            <span className="text-gradient-primary">8 Weeks</span>
          </h2>
          <p className="text-lg text-gray-600">
            A comprehensive, project-driven curriculum designed to transform you
            from beginner to job-ready data analyst
          </p>
        </div>

        {/* Curriculum Timeline */}
        <div className="mb-16 lg:mb-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {curriculumModules.map((module, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                {/* Decorative gradient bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-linear-to-r ${module.color}`}
                />

                <div className="p-6 lg:p-8">
                  {/* Week & Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.week}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                        {module.title}
                      </h3>
                    </div>
                    <div
                      className={`p-3 rounded-xl bg-linear-to-br ${module.color} text-white`}
                    >
                      {module.icon}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Topics Covered
                    </h4>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 mr-2 shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mini Project */}
                  {module.outcome && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Mini Project{" "}
                          </p>
                          <p className="text-sm text-gray-600">
                            {module.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Tools & Technologies You&apos;ll Master
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-standard tools used by global companies
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {toolsTechnologies.map((tool, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {tool.name}
                </h4>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {tool.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-linear-to-r from-primary/5 to-blue-500/5 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              What You&apos;ll Achieve
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              By the end of the bootcamp, you will have:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningOutcomes.map((outcome, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                  {outcome.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {outcome.title}
                </h4>
                <p className="text-gray-600">{outcome.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                60+
              </div>
              <div className="text-sm text-gray-600">
                Hours of Live Instruction
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                3+
              </div>
              <div className="text-sm text-gray-600">Portfolio Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                100+
              </div>
              <div className="text-sm text-gray-600">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                1:1
              </div>
              <div className="text-sm text-gray-600">Mentorship Sessions</div>
            </div>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-gray-900">Schedule:</span>
              <span className="ml-2 text-gray-600">Evenings</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300" />
            <div className="flex items-center">
              <Users className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-gray-900">Format:</span>
              <span className="ml-2 text-gray-600">
                Live Online + Recordings
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300" />
            <div className="flex items-center">
              <Award className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-gray-900">Certificate:</span>
              <span className="ml-2 text-gray-600">Industry-Recognized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootcampDetails;
