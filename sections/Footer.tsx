import { contactInfo, servicesData, socials } from "@/lib/data";

const Footer = () => {
  const year = new Date().getFullYear();

  // Footer links
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Careers", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/" },
  ];

  return (
    <footer className="bg-pry">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/**first  */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl text-acc mb-2 font-bold">
                SmartEdge
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Consulting & Analytics
              </p>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-7">
              Transforming businesses through data-driven insights and
              cutting-edge analytics solutions. Your trusted partner in the data
              revolution.
            </p>
          </div>
          {/**second */}
          <div>
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Quick Links
            </h4>
            <ul className="text-slate-300 text-sm sm:text-base">
              {quickLinks.map((link, index) => {
                return (
                  <li key={index} className="mb-2">
                    <a href={link.href}>{link.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/**third */}
          <div>
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Services
            </h4>
            <ul className="text-slate-300 text-sm sm:text-base">
              {servicesData.map((service) => {
                return (
                  <li key={service.id} className="mb-2">
                    {service.title}
                  </li>
                );
              })}
            </ul>
          </div>
          {/** fourth */}
          <div>
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-2.5">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div key={contact.id} className="flex items-start gap-5">
                    <div className="h-10 w-10 flex items-center justify-center text-sec rounded-lg">
                      <Icon size={20} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-xs sm:text-sm text-slate-200">
                        {contact.info}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t flex flex-col sm:flex-row justify-between items-center pt-10">
          <div className="flex gap-1.5 sm:gap-2 ">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <div
                  key={social.id}
                  className="flex items-center justify-center h-12 w-12 rounded-full border"
                >
                  <a
                    href={social.href}
                    aria-label={social.name}
                    className="mx-2"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-slate-300 text-xs sm:text-sm">
              &copy; {year} SmartEdge Consulting & Analytics. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
