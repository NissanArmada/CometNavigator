const imgLogo =
  "/assets/72c0c286a8f65b6f17cbbe12f0879746225bba10.svg";
const imgTwitterIcon =
  "/assets/7e249c1c7f93b11dbe626e2cb4790ae7e09a584b.svg";
const imgGithubIcon =
  "/assets/43815bb9898b12dfb10588f15ce1512780ce3f34.svg";

const navColumns = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Integrations"],
  },
  {
    heading: "Modules",
    links: ["Calendar", "Study Rooms", "Clubs"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Cookies"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1817] border-t border-white/5 px-6 pt-16 pb-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Brand blurb */}
          <div className="flex flex-col gap-6 lg:w-[378px] shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-[#af5a3c] flex items-center justify-center p-1.5 rounded-2xl">
                <img src={imgLogo} alt="Comet logo" className="w-4 h-4 block" />
              </div>
              <span className="font-bold text-[#f1f5f9] text-lg tracking-[-0.45px]">
                Comet Navigation
              </span>
            </div>
            <p className="text-[#64748b] text-sm leading-5 max-w-[320px]">
              Empowering students to navigate the vast landscape of university
              life through intelligent organization and discovery.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 flex-1 justify-between">
            {navColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-6">
                <h4 className="font-bold text-[#af5a3c] text-xs tracking-[1.4px] uppercase leading-5">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#64748b] text-sm leading-5 hover:text-[#94a3b8] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-between flex-wrap gap-4">
          <p className="text-[#475569] text-xs leading-4">
            © 2024 Comet Navigation. All rights reserved. Built for explorers.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" aria-label="Twitter" className="hover:opacity-70 transition-opacity">
              <img
                src={imgTwitterIcon}
                alt="Twitter"
                className="w-[16.667px] h-[16.667px] block"
              />
            </a>
            <a href="#" aria-label="GitHub" className="hover:opacity-70 transition-opacity">
              <img
                src={imgGithubIcon}
                alt="GitHub"
                className="w-[15px] h-[16.667px] block"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
