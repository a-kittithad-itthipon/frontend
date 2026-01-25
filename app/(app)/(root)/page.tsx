import { Hero } from "./components/hero";
import { Features } from "./components/features";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-background">
      <Hero />
      <Features />
    </div>
  );
}
