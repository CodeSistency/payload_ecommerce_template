"use client";

import React from "react";
import Link from "next/link";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useDarkModeStore } from "@/lib/models/__stores__/darkMode/darkMode.store";

// Types for globals (assuming payload-types.ts is generated)
interface HeaderData {
  logo: { url: string };
  navLinks: { label: string; type: string; url?: string; reference?: { slug: string } }[];
  ctaButton: { label: string; url: string };
}

interface FooterData {
  logo?: { url: string };
  copyrightText: string;
  navLinks: { label: string; url: string }[];
  socialLinks: { platform: string; url: string }[];
}

interface SiteSettingsData {
  siteName: string;
  colors: {
    lightMode: { primary: string; secondary: string; accent: string; background: string };
    darkMode: { primaryDark: string; secondaryDark: string; accentDark: string; backgroundDark: string };
  };
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Zustand state and actions
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  // Live preview data with proper initialData
  const { data: header } = useLivePreview<HeaderData>({
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000",
    depth: 1,
    initialData: {
      logo: { url: "" },
      navLinks: [],
      ctaButton: { label: "", url: "" },
    },
  });

  const { data: footer } = useLivePreview<FooterData>({
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000",
    depth: 1,
    initialData: {
      logo: undefined,
      copyrightText: "",
      navLinks: [],
      socialLinks: [],
    },
  });

  const { data: settings } = useLivePreview<SiteSettingsData>({
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000",
    depth: 1,
    initialData: {
      siteName: "",
      colors: {
        lightMode: {
          primary: "#000000",
          secondary: "#666666",
          accent: "#333333",
          background: "#FFFFFF",
        },
        darkMode: {
          primaryDark: "#FFFFFF",
          secondaryDark: "#999999",
          accentDark: "#CCCCCC",
          backgroundDark: "#000000",
        },
      },
    },
  });

  // Select colors based on dark mode
  const colors = isDarkMode ? settings?.colors.darkMode : settings?.colors.lightMode;

  return (
    <div
      className="min-h-screen"
      style={{
        "--primary": settings?.colors.lightMode.primary,
        "--secondary": settings?.colors.lightMode.secondary,
        "--accent": settings?.colors.lightMode.accent,
        "--background": settings?.colors.lightMode.background,
        "--primary-dark": settings?.colors.darkMode.primaryDark,
        "--secondary-dark": settings?.colors.darkMode.secondaryDark,
        "--accent-dark": settings?.colors.darkMode.accentDark,
        "--background-dark": settings?.colors.darkMode.backgroundDark,
      } as React.CSSProperties}
    >
      {/* Header */}
      {header && (
        <header className={`p-4 ${isDarkMode ? "bg-secondary-dark" : "bg-secondary"}`}>
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <img src={header.logo.url || undefined} alt="Logo" className="h-12" />
            <nav className="flex space-x-4">
              {header.navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.type === "internal" ? `/${link.reference?.slug || ""}` : link.url || "#"}
                  className={`hover:underline ${isDarkMode ? "text-accent-dark" : "text-accent"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={header.ctaButton.url || "#"}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-primary-dark text-background-dark"
                  : "bg-primary text-background"
              }`}
            >
              {header.ctaButton.label}
            </Link>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`min-h-[80vh] ${isDarkMode ? "bg-background-dark" : "bg-background"} ${
          isDarkMode ? "text-primary-dark" : "text-primary"
        }`}
      >
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer className={`p-4 text-center ${isDarkMode ? "bg-secondary-dark" : "bg-secondary"}`}>
          {footer.logo && (
            <img src={footer.logo.url || undefined} alt="Footer Logo" className="h-10 mx-auto mb-2" />
          )}
          <p className={isDarkMode ? "text-accent-dark" : "text-accent"}>{footer.copyrightText}</p>
          <nav className="flex justify-center space-x-4 mt-2">
            {footer.navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url || "#"}
                className={`hover:underline ${isDarkMode ? "text-accent-dark" : "text-accent"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center space-x-4 mt-2">
            {footer.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:underline ${isDarkMode ? "text-primary-dark" : "text-primary"}`}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </footer>
      )}

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed bottom-4 right-4 px-3 py-1 rounded-full ${
          isDarkMode
            ? "bg-accent-dark text-background-dark"
            : "bg-accent text-background"
        }`}
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Layout;

export type { HeaderData, FooterData, SiteSettingsData };