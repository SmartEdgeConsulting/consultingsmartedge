import { Users, Globe, Banknote } from "lucide-react";
import React from "react";

const RegistrationHero = () => {
  return (
    <header className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl ">
        <div className="pt-8 pb-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              DataEdge Bootcamp
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Registration Form
            </p>
          </div>

          {/* Welcome Message */}
          <div className="bg-primary/10 p-6 rounded-xl mb-8 border border-primary/20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Welcome to SmartEdge&apos;s DataEdge Bootcamp
            </h2>
            <p className="text-gray-700 mb-4">
              This scholarship is sponsored by The ZA Foundation and the program
              is designed to help participants gain practical, hands-on skills
              in data analytics, covering everything from data cleaning and
              visualization to real-world business applications.
            </p>
            <p className="text-gray-700 font-medium">
              Please fill out this registration form to secure your spot. Our
              team will review your application and send you next steps.
            </p>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Payment Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Local Payment */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Banknote className="w-4 h-4 text-blue-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Local Payment (Nigeria)
                  </h4>
                </div>
                <div className="space-y-2 pl-10">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[140px]">
                      Bank Name:
                    </span>
                    <span className="text-gray-900 font-semibold">Kuda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[140px]">
                      Account Name:
                    </span>
                    <span className="text-gray-900 text-sm">
                      Smart Edge Consulting & Analytics Limited
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[140px]">
                      Account Number:
                    </span>
                    <code className="bg-gray-100 px-3 py-1 rounded font-mono font-bold text-gray-900">
                      3002787900
                    </code>
                  </div>
                </div>
              </div>
              {/* International Payment */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Globe className="w-4 h-4 text-green-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    International Payment 🌍
                  </h4>
                </div>
                <div className="pl-10">
                  <div className="mb-3">
                    <span className="font-medium text-gray-700">
                      Flutterwave:
                    </span>
                  </div>
                  <a
                    href="https://flutterwave.com/pay/nw4cjgztqlyc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary/70 transition-all duration-200 shadow hover:shadow-md"
                  >
                    <Globe className="w-4 h-4" />
                    Pay Now via Flutterwave
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Click the button above to complete your payment securely
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Important:</strong> Please complete your payment
                before proceeding with registration. You&apos;ll need to upload
                proof of payment in the next steps.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-700 mb-4">
              Ready to start your data analytics journey?
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Scroll down to begin registration</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHero;
