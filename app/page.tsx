import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pipeline from "@/components/Pipeline";
import Architecture from "@/components/Architecture";
import ReportExplorer from "@/components/ReportExplorer";
import Benchmarks from "@/components/Benchmarks";
import AccessFooter from "@/components/AccessFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pipeline />
        <Architecture />
        <ReportExplorer />
        <Benchmarks />
        <AccessFooter />
      </main>
    </>
  );
}
