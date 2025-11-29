import Link from "next/link";
import Image from "next/image";

const Unauthorized = () => {
  return (
    <main className="mt-16 py-8 sm:py-12 lg:py-16 bg-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 shadow-lg rounded-2xl overflow-hidden bg-white">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 bg-white hidden sm:flex justify-center items-center p-6">
            <Image
              src="/locked.png"
              alt="Locked Page image"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          {/* Page Content */}
          <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-12 flex justify-center items-center flex-col text-center">
            {/* Error Code */}
            <h1 className="text-8xl font-bold text-gradient-primary mb-4 tracking-tight">
              403
            </h1>

            {/* Main Title */}
            <h4 className="text-3xl font-semibold text-gray-800 mb-4">
              Unauthorized Access
            </h4>

            {/* Description */}
            <p className="text-base text-gray-600 mb-8 max-w-md leading-relaxed">
              Oops! You&apos;re not authorized to access this page. Please check
              your permissions or log in with the appropriate account.
            </p>

            {/* What can you do section */}
            <div className="mb-8">
              <h5 className="text-xl font-medium text-gray-800 mb-6">
                What can you do?
              </h5>

              <ol className="space-y-4 text-left max-w-sm mx-auto">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    1
                  </span>
                  <span className="text-gray-700">
                    Go back to{" "}
                    <Link
                      href="/"
                      className="text-primary hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                    >
                      home page
                    </Link>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    2
                  </span>
                  <span className="text-gray-700">
                    <Link
                      href="/login"
                      className="text-primary hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                    >
                      Sign up / Login
                    </Link>{" "}
                    to access this page
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 bg-blue-100 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    3
                  </span>
                  <span className="text-gray-700">
                    Contact our{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                    >
                      support team
                    </Link>{" "}
                    for assistance
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
