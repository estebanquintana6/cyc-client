import MainHeader from "@/components/Header/MainHeader"
import ContactSection from "@/components/Contact/ContactSection";
import ProjectSection from "@/components/Content/ProjectsSection";
import BlogSection from "@/components/Content/BlogSection";

export default function Home() {
  return (
    <main>
      <MainHeader />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
