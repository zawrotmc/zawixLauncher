import { useQuery } from "@tanstack/react-query";
import {
  Download,
  Zap,
  Target,
  Settings,
  Rocket,
  BarChart3,
  Palette,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { DownloadUrlResponse } from "@shared/schema";

export default function EnglishHome() {
  const { toast } = useToast();

  const { data: downloadData, isLoading } = useQuery<DownloadUrlResponse>({
    queryKey: ["/api/download-url"],
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/download";
    link.download = "zawixLauncher.apk";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: "File will be downloaded automatically.",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="relative z-50 p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[var(--neon-cyan)] neon-text animate-neon-flicker">
            zawix<span className="text-[var(--neon-pink)]">Launcher</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-[var(--neon-cyan)] transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 cursor-pointer select-none"
                data-testid="nav-features"
              >
                Features
              </button>
              <button
                onClick={handleDownload}
                className="text-gray-300 hover:text-[var(--neon-cyan)] transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 cursor-pointer select-none"
                data-testid="nav-download"
              >
                Download
              </button>
            </div>

            {/* Language Flags */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = "/pl")}
                className="w-8 h-6 rounded border-2 border-gray-600 overflow-hidden transition-all duration-300 hover:scale-110 hover:border-[var(--neon-cyan)]"
                data-testid="flag-poland"
                title="Polski"
              >
                <svg viewBox="0 0 640 480" className="w-full h-full">
                  <rect width="640" height="240" fill="#ffffff" />
                  <rect y="240" width="640" height="240" fill="#dc143c" />
                </svg>
              </button>
              <button
                onClick={() => (window.location.href = "/en")}
                className="w-8 h-6 rounded border-2 border-[var(--neon-cyan)] shadow-lg shadow-[var(--neon-cyan)]/50 neon-border overflow-hidden transition-all duration-300 hover:scale-110"
                data-testid="flag-england"
                title="English"
              >
                <svg viewBox="0 0 640 480" className="w-full h-full">
                  <rect width="640" height="480" fill="#ffffff" />
                  <rect y="160" width="640" height="160" fill="#ce1124" />
                  <rect x="213" y="0" width="214" height="480" fill="#ce1124" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 -mt-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="mb-8 animate-float">
              <h1
                className="text-6xl md:text-8xl font-black mb-4 gradient-text animate-pulse-glow"
                data-testid="main-title"
              >
                zawixLauncher
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-cyan)] to-[var(--neon-purple)] mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
              data-testid="subtitle"
            >
              Your own app store
            </p>
            <p
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              data-testid="description"
            >
              Fast app downloads, completely free and secure. Discover new apps
              and games in your private store.
            </p>

            {/* Download Button */}
            <div className="mb-16">
              <Button
                onClick={handleDownload}
                disabled={isLoading || !downloadData?.downloadUrl}
                className="glow-button bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-[var(--neon-cyan)] neon-border transform transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
                data-testid="download-button-main"
              >
                <Download className="w-6 h-6" />
                <span>Download zawixLauncher</span>
              </Button>
              <p
                className="text-sm text-gray-500 mt-4"
                data-testid="download-info"
              >
                Free Download • Android
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div
                className="feature-card p-6 rounded-xl"
                data-testid="feature-speed"
              >
                <div className="text-[var(--neon-green)] text-3xl mb-4">
                  <Zap className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--neon-cyan)] mb-2">
                  Fast Downloads
                </h3>
                <p className="text-gray-400">
                  Lightning-fast app downloads without limits
                </p>
              </div>
              <div
                className="feature-card p-6 rounded-xl"
                data-testid="feature-search"
              >
                <div className="text-[var(--neon-pink)] text-3xl mb-4">
                  <Target className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--neon-cyan)] mb-2">
                  Free Apps
                </h3>
                <p className="text-gray-400">
                  All apps available for free without hidden costs
                </p>
              </div>
              <div
                className="feature-card p-6 rounded-xl"
                data-testid="feature-custom"
              >
                <div className="text-[var(--neon-purple)] text-3xl mb-4">
                  <Settings className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--neon-cyan)] mb-2">
                  Secure
                </h3>
                <p className="text-gray-400">
                  All apps verified and safe to use
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-[var(--dark-secondary)] relative"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            data-testid="features-title"
          >
            Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="feature-card p-6 rounded-xl text-center"
              data-testid="feature-quick-launch"
            >
              <div className="text-4xl mb-4">
                <Rocket className="w-10 h-10 mx-auto text-[var(--neon-blue)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">
                Quick Access
              </h3>
              <p className="text-gray-400 text-sm">
                Instant access to your favorite apps
              </p>
            </div>
            <div
              className="feature-card p-6 rounded-xl text-center"
              data-testid="feature-analytics"
            >
              <div className="text-4xl mb-4">
                <BarChart3 className="w-10 h-10 mx-auto text-[var(--neon-green)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">
                Checking
              </h3>
              <p className="text-gray-400 text-sm">
                Track the releases of every game from zawix
              </p>
            </div>
            <div
              className="feature-card p-6 rounded-xl text-center"
              data-testid="feature-themes"
            >
              <div className="text-4xl mb-4">
                <Palette className="w-10 h-10 mx-auto text-[var(--neon-pink)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">
                Updates
              </h3>
              <p className="text-gray-400 text-sm">
                Update your apps without downloading them from the internet
              </p>
            </div>
            <div
              className="feature-card p-6 rounded-xl text-center"
              data-testid="feature-secure"
            >
              <div className="text-4xl mb-4">
                <Shield className="w-10 h-10 mx-auto text-[var(--neon-purple)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">
                Security
              </h3>
              <p className="text-gray-400 text-sm">
                Advanced security and data encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8 gradient-text"
            data-testid="download-title"
          >
            Ready to Get Started?
          </h2>
          <p
            className="text-xl text-gray-300 mb-12"
            data-testid="download-subtitle"
          >
            Join thousands of users using zawixLauncher
          </p>

          <div className="flex justify-center items-center mb-12">
            <Button
              onClick={handleDownload}
              disabled={isLoading || !downloadData?.downloadUrl}
              className="glow-button bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-[var(--neon-pink)] neon-border transform transition-all duration-300 hover:scale-105"
              data-testid="download-button-secondary"
            >
              Download for Android
            </Button>
          </div>

          <div
            className="text-sm text-gray-500 space-y-2"
            data-testid="system-requirements"
          >
            <p>System Requirements: Android 7.0+</p>
            <p>File Size: 20MB • Version 1.10 • Last Update: July 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[var(--dark-secondary)] py-12 px-6 border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div
              className="text-2xl font-bold text-[var(--neon-cyan)] neon-text mb-4"
              data-testid="footer-logo"
            >
              zawix<span className="text-[var(--neon-pink)]">Launcher</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm" data-testid="copyright">
            © 2025 zawixLauncher. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
