import LoginPromptSection from "@/components/home/LoginPromptSection";
import WelcomeSection from "@/components/home/WelcomeSection";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <WelcomeSection />
      <LoginPromptSection />
    </div>
  );
}
