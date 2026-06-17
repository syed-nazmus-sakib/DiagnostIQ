import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyBangladesh from "@/components/WhyBangladesh";
import Pipeline from "@/components/Pipeline";
import Architecture from "@/components/Architecture";
import ReportExplorer from "@/components/ReportExplorer";
import Benchmarks from "@/components/Benchmarks";
import Team from "@/components/Team";
import AccessFooter from "@/components/AccessFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyBangladesh />
        <Pipeline />
        <Architecture />
        <ReportExplorer />
        <Benchmarks />
        <Team />
        <AccessFooter />
      </main>
    </>
  );
}
