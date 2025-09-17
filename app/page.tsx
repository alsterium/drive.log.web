"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Moon,
  Sun,
  Download,
  Star,
  Shield,
  Zap,
  Users,
  Globe,
  Menu,
  X,
  MapPin,
  Clock,
  Cloud,
  Smartphone,
  Battery,
  Eye,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const translations = {
  en: {
    nav: {
      coreValues: "About",
      features: "Features",
      download: "Download",
    },
    hero: {
      title: "Drive.log",
      subtitle: "Ultimate GPS Drive Logger for iOS",
      description:
        "Beautifully record and preserve your driving experiences forever. The perfect companion for drive enthusiasts who want to capture every journey.",
      downloadApp: "Download App",
      watchDemo: "Watch Demo",
      rating: "4.9 rating",
      downloads: "50K+ downloads",
      iosOnly: "iOS 18.5+ Only",
    },
    coreValues: {
      title: "Key Features of Drive.log",
      subtitle:
        "Three essential capabilities that make Drive.log the ultimate drive recording companion",
      items: [
        {
          title: "Simple Drive Recording",
          subtitle: "Effortless Operation",
          description:
            "Start and stop recording with just a single tap. Intuitive interface designed for drivers, allowing you to focus on the road while capturing every moment of your journey.",
        },
        {
          title: "Advanced Route Editing",
          subtitle: "Professional-Grade Tools",
          description:
            "Merge multiple routes seamlessly, trim recorded GPS data with precision, and edit your drives with advanced tools. Perfect for creating the exact route you want to preserve.",
        },
        {
          title: "Immersive Route Viewing",
          subtitle: "Visual Journey Experience",
          description:
            "View photos taken during your drive directly on the route map. Visualize speed, elevation, and other metrics through interactive graphs and charts for a complete journey analysis.",
        },
      ],
    },
    features: {
      title: "Powerful Features for Drive Enthusiasts",
      subtitle:
        "Everything you need to record, analyze, and cherish your driving memories",
      items: [
        {
          title: "Rich Analytics",
          description:
            "Detailed graphs for distance, time, speed, and elevation",
        },
        {
          title: "Drive Widgets",
          description:
            "Start and stop new recordings instantly from your home screen",
        },
        {
          title: "Export & Share",
          description: "GPX/KML export for integration with other apps",
        },
      ],
    },

    download: {
      title: "Download Drive.log",
      subtitle: "Experience the complete Drive.log app on your iPhone today",
      appStore: "Download on the App Store",
      requirements: "Requires iOS 18.5 or later",
      free: "Free Download",
      note: "Official App Store release - iPhone",
    },
    footer: {
      copyright: "© 2025 Drive.log. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      support: "Support",
    },
  },
  ja: {
    nav: {
      coreValues: "概要",
      features: "機能",
      download: "ダウンロード",
    },
    hero: {
      title: "Drive.log",
      subtitle: "究極のGPSドライブログ記録アプリ",
      description:
        "あなたのドライブ体験を美しく記録し、思い出として永続的に保存。ドライブ愛好家のための完璧なコンパニオンアプリです。",
      downloadApp: "アプリをダウンロード",
      watchDemo: "デモを見る",
      rating: "4.9の評価",
      downloads: "5万+ ダウンロード",
      iosOnly: "iOS 18.5以降専用",
    },
    coreValues: {
      title: "Drive.logの主要機能",
      subtitle: "Drive.logを究極のドライブ記録アプリにする3つの重要な機能",
      items: [
        {
          title: "シンプルな操作でドライブを記録",
          subtitle: "簡単操作",
          description:
            "ワンタップで記録の開始と停止が可能。ドライバーのために設計された直感的なインターフェースで、運転に集中しながら旅の瞬間を記録できます。",
        },
        {
          title: "高度なルート編集機能",
          subtitle: "プロ仕様のツール",
          description:
            "複数ルートの統合、記録済みGPSデータのトリミング機能など、高度な編集ツールでルートを自在に編集。保存したい正確なルートを作成できます。",
        },
        {
          title: "先進的なルート閲覧機能",
          subtitle: "視覚的な旅の体験",
          description:
            "ルート記録中に撮影した画像をルートマップ上に直接表示。速度、高度などの情報をインタラクティブなグラフで視覚化し、完全な旅の分析を提供します。",
        },
      ],
    },
    features: {
      title: "ドライブ愛好家のための強力な機能",
      subtitle: "ドライブの記録、分析、そして思い出の保存に必要なすべてを提供",
      items: [
        {
          title: "豊富な分析",
          description: "距離、時間、速度、高度の詳細グラフを表示",
        },
        {
          title: "ドライブウィジェット",
          description:
            "ホーム画面のウィジェットからワンタップで記録の開始・停止が可能",
        },
        {
          title: "エクスポート・共有",
          description: "GPX/KML形式での他アプリ連携が可能",
        },
      ],
    },

    download: {
      title: "Drive.logをダウンロード",
      subtitle: "今すぐDrive.logのすべての機能をiPhoneで体験しよう",
      appStore: "App Storeでダウンロード",
      requirements: "iOS 18.5以降が必要",
      free: "無料ダウンロード",
      note: "App Storeで正式リリース - iPhone対応",
    },
    footer: {
      copyright: "© 2025 Drive.log. All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      support: "サポート",
    },
  },
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function LanguageToggle({
  currentLang,
  onLanguageChange,
}: {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(currentLang === "en" ? "ja" : "en")}
      className="h-9 px-3"
    >
      <Globe className="h-4 w-4 mr-2" />
      {currentLang === "en" ? "日本語" : "English"}
    </Button>
  );
}

function VercelTabs({
  activeTab,
  onTabChange,
  t,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  t: any;
}) {
  const tabs = [
    { id: "coreValues", label: t.nav.coreValues },
    { id: "features", label: t.nav.features },
    { id: "download", label: t.nav.download },
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted/50 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState("coreValues");
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language as keyof typeof translations];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    scrollToSection(tabId);
    setMobileMenuOpen(false); // Close mobile menu when tab is clicked
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="/icons/app-icon.png"
                alt="Drive.log App Icon"
                className="h-8 w-8 rounded-lg"
              />
              <span className="font-bold text-xl text-gray-700 dark:text-gray-300">
                {t.hero.title}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <VercelTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              t={t}
            />
            <div className="flex items-center space-x-2">
              <LanguageToggle
                currentLang={language}
                onLanguageChange={setLanguage}
              />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle
              currentLang={language}
              onLanguageChange={setLanguage}
            />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4">
              <VercelTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                t={t}
              />
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-950/20 dark:to-orange-950/20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-orange-500 text-orange-600 dark:text-orange-400"
                  >
                    {t.hero.iosOnly}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="text-gray-700 dark:text-gray-300">
                    {t.hero.title}
                  </span>
                  <span className="block text-2xl md:text-3xl text-muted-foreground font-normal mt-2">
                    {t.hero.subtitle}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  {t.hero.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-base px-8 bg-blue-800 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                  onClick={() =>
                    window.open(
                      "https://testflight.apple.com/join/3gUvySTe",
                      "_blank"
                    )
                  }
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t.hero.downloadApp}
                </Button>
              </div>
            </div>

            {/* App Screenshot with iPhone Frame */}
            <div className="relative flex justify-center lg:justify-center">
              <div className="relative max-w-xs">
                {/* iPhone Frame */}
                <div className="relative w-fit h-fit bg-black rounded-[3rem] p-2 shadow-2xl transform scale-75sur">
                  {/* Screen Area */}
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                    {/* Screenshot Image */}
                    <img
                      src="/screenshots/screen-shot-hero.png"
                      alt="Drive.log App Screenshot"
                      className="w-full h-full object-contain rounded-[2.5rem]"
                    />
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="coreValues" className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.coreValues.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.coreValues.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.coreValues.items.map((value, index) => {
              const icons = [Zap, MapPin, Cloud];
              const Icon = icons[index];
              const colors = [
                "from-orange-500 to-red-500",
                "from-blue-500 to-purple-500",
                "from-green-500 to-blue-500",
              ];

              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center mx-auto`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{value.title}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {value.subtitle}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.features.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => {
              const icons = [Zap, Battery, Star, MapPin, Users, Download];
              const Icon = icons[index];

              return (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-20 bg-gradient-to-br from-blue-800 to-blue-600 text-white"
      >
        <div className="container px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t.download.title}
              </h2>
              <p className="text-lg text-blue-100">{t.download.subtitle}</p>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="text-base px-8 bg-white text-blue-800 hover:bg-blue-50"
                onClick={() =>
                  window.open(
                    "https://testflight.apple.com/join/3gUvySTe",
                    "_blank"
                  )
                }
              >
                <Download className="mr-2 h-5 w-5" />
                {t.download.appStore}
              </Button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-blue-200">
                <span>{t.download.free}</span>
                <span>•</span>
                <span>{t.download.requirements}</span>
              </div>

              <p className="text-sm text-blue-200 max-w-md mx-auto">
                {t.download.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img
                src="/icons/app-icon.png"
                alt="Drive.log App Icon"
                className="h-6 w-6 rounded"
              />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {t.hero.title}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>

            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.footer.terms}
              </Link>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.footer.support}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Component() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppContent />
    </ThemeProvider>
  );
}
