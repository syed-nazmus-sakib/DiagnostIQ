import { LocaleProvider } from "@/components/LocaleProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyBangladesh from "@/components/WhyBangladesh";
import PatientJourney from "@/components/PatientJourney";
import Pipeline from "@/components/Pipeline";
import Architecture from "@/components/Architecture";
import ReportExplorer from "@/components/ReportExplorer";
import Benchmarks from "@/components/Benchmarks";
import ImpactCalculator from "@/components/ImpactCalculator";
import Team from "@/components/Team";
import AccessFooter from "@/components/AccessFooter";

export default function Home() {
  return (
    <LocaleProvider>
      <Nav />
      <main>
        <Hero />
        <WhyBangladesh />
        <PatientJourney />
        <Pipeline />
        <Architecture />
        <ReportExplorer />
        <Benchmarks />
        <ImpactCalculator />
        <Team />
        <AccessFooter />
      </main>
    </LocaleProvider>
  );
}
