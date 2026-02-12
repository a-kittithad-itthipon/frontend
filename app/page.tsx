import { ArrowUpRight } from "lucide-react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* HERO */}
        <section className="relative flex items-center">
          {/* background */}
          <div className="absolute inset-0 bg-img bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />

          {/* content */}
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col gap-8">
            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-7xl">
              Learn.
              <br />
              Build.
              <br />
              Deploy.
            </h1>

            <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl">
              Manage containers, launch environments, and deploy websites
              through a clean, developer-friendly platform built for speed
              and reliability.
            </p>

            <a
              href="https://docs.addp.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 w-fit text-white font-semibold text-lg lg:text-2xl transition"
            >
              <span className="relative">
                Get Started
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-400 transition-all group-hover:w-full" />
              </span>
              <ArrowUpRight
                size={28}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </section>

        {/* CATEGORY */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-center text-2xl lg:text-4xl font-bold tracking-tight mb-14">
              Deploy Categories
            </h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {[
                { name: "HTML", icon: "bxl-html5", link: "/docs/html" },
                { name: "Python", icon: "bxl-python", link: "/docs/python/flask" },
                { name: "Node.js", icon: "bxl-nodejs", link: "/docs/nodejs/express" },
                { name: "PHP", icon: "bxl-php", link: "/docs/php/php" },
                { name: "Database", icon: "bxs-data", link: "/docs/mysql" },
                { name: "Maintenance", icon: "bxs-cog", link: "/docs/docker-engine/introduction" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={`https://docs.addp.site${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-gray-200 bg-white p-10 flex flex-col items-center justify-center gap-4 text-gray-900 font-semibold transition
                             hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
                >
                  <i className={`bx ${item.icon} text-5xl text-gray-700 transition group-hover:text-gray-900`} />
                  <span className="text-lg tracking-wide">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
