"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
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
} from "lucide-react"
import { useTheme } from "next-themes"

const translations = {
  en: {
    nav: {
      features: "Features",
      technology: "Technology",
      about: "About",
      download: "Download",
    },
    hero: {
      title: "Drive.log",
      subtitle: "Ultimate GPS Drive Logger for iOS",
      description:
        "Beautifully record and preserve your driving experiences forever. The perfect companion for drive enthusiasts who want to capture every journey.",
      downloadApp: "Download on App Store",
      watchDemo: "Watch Demo",
      rating: "4.9 rating",
      downloads: "50K+ downloads",
      iosOnly: "iOS 18.5+ Only",
    },
    coreValues: {
      title: "Why Drive.log is Different",
      subtitle: "Three core values that make your drive recording experience exceptional",
      items: [
        {
          title: "Never Stop Recording",
          subtitle: "Background Recording Technology",
          description:
            "Latest iOS 18.5 technology ensures continuous recording even when app is closed. Auto-recovery from crashes means you'll never lose precious drive data.",
        },
        {
          title: "Beautiful Trajectories",
          subtitle: "Apple Maps Integration",
          description:
            "High-precision GPS recording (1-second intervals) with auto-completion. Stunning route visualization on Apple Maps with detailed statistics.",
        },
        {
          title: "Sync Everywhere",
          subtitle: "Seamless iCloud Integration",
          description:
            "Automatic sync across all your devices (iPhone, iPad, Apple Watch). Private data management without external servers.",
        },
      ],
    },
    features: {
      title: "Powerful Features for Drive Enthusiasts",
      subtitle: "Everything you need to record, analyze, and cherish your driving memories",
      items: [
        {
          title: "One-Tap Recording",
          description: "Start recording instantly with Live Activity support on lock screen",
        },
        {
          title: "Battery Optimized",
          description: "Auto-pause during stops for extended recording sessions",
        },
        {
          title: "Rich Analytics",
          description: "Detailed graphs for distance, time, speed, and elevation",
        },
        {
          title: "Memory Labels",
          description: "Add custom notes to memorable locations along your route",
        },
        {
          title: "Smart Search",
          description: "Find past drives with powerful filtering and tagging",
        },
        {
          title: "Export & Share",
          description: "GPX/KML export for integration with other apps",
        },
      ],
    },
    technology: {
      title: "Built with Latest iOS Technology",
      subtitle: "Leveraging cutting-edge iOS 18.5 features for the best experience",
      items: [
        {
          title: "iOS 18.5 Optimized",
          description: "Uses latest CLLocationUpdate & CLBackgroundActivitySession",
        },
        {
          title: "Apple Certified",
          description: "App Store approved with highest quality standards",
        },
        {
          title: "Privacy First",
          description: "iCloud-based storage keeps your data completely private",
        },
        {
          title: "Offline Ready",
          description: "Continue recording even without cellular connection",
        },
      ],
    },
    download: {
      title: "Start Recording Your Drive Adventures",
      subtitle: "Join thousands of drive enthusiasts who trust Drive.log with their precious memories",
      appStore: "Download on App Store",
      requirements: "Requires iOS 18.5 or later",
      free: "Free Download",
      note: "iOS Exclusive - Optimized for iPhone, iPad, and Apple Watch",
    },
    footer: {
      copyright: "© 2024 Drive.log. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      support: "Support",
    },
  },
  ja: {
    nav: {
      features: "機能",
      technology: "技術",
      about: "概要",
      download: "ダウンロード",
    },
    hero: {
      title: "Drive.log",
      subtitle: "究極のGPSドライブログ記録アプリ",
      description:
        "あなたのドライブ体験を美しく記録し、思い出として永続的に保存。ドライブ愛好家のための完璧なコンパニオンアプリです。",
      downloadApp: "App Storeでダウンロード",
      watchDemo: "デモを見る",
      rating: "4.9の評価",
      downloads: "5万+ ダウンロード",
      iosOnly: "iOS 18.5以降専用",
    },
    coreValues: {
      title: "Drive.logが選ばれる理由",
      subtitle: "あなたのドライブ記録体験を特別にする3つの核心価値",
      items: [
        {
          title: "止まらない記録",
          subtitle: "バックグラウンド記録技術",
          description:
            "最新iOS 18.5技術により、アプリを閉じても記録が継続。クラッシュ時の自動復元で、大切なドライブデータを絶対に失いません。",
        },
        {
          title: "美しい軌跡",
          subtitle: "Apple Maps統合",
          description:
            "高精度GPS記録（1秒間隔）と自動補完機能。Apple Maps上での美しいルート表示と詳細な統計情報を提供します。",
        },
        {
          title: "どこでも同期",
          subtitle: "iCloudシームレス連携",
          description:
            "複数デバイス間での自動同期（iPhone、iPad、Apple Watch）。サーバー不要のプライベートなデータ管理を実現。",
        },
      ],
    },
    features: {
      title: "ドライブ愛好家のための強力な機能",
      subtitle: "ドライブの記録、分析、そして思い出の保存に必要なすべてを提供",
      items: [
        {
          title: "ワンタップ記録",
          description: "ロック画面でのLive Activity対応で即座に記録開始",
        },
        {
          title: "バッテリー最適化",
          description: "停車時自動一時停止で長時間記録も安心",
        },
        {
          title: "豊富な分析",
          description: "距離、時間、速度、高度の詳細グラフを表示",
        },
        {
          title: "思い出ラベル",
          description: "ルート上の思い出の場所に自由にメモを追加",
        },
        {
          title: "スマート検索",
          description: "強力なフィルタリングとタグで過去のドライブを簡単検索",
        },
        {
          title: "エクスポート・共有",
          description: "GPX/KML形式での他アプリ連携が可能",
        },
      ],
    },
    technology: {
      title: "最新iOS技術で構築",
      subtitle: "最先端のiOS 18.5機能を活用した最高の体験を提供",
      items: [
        {
          title: "iOS 18.5最適化",
          description: "最新のCLLocationUpdate & CLBackgroundActivitySessionを使用",
        },
        {
          title: "Apple認証済み",
          description: "App Store審査通過の最高品質基準をクリア",
        },
        {
          title: "プライバシー重視",
          description: "iCloudベースでデータを完全にプライベート保護",
        },
        {
          title: "オフライン対応",
          description: "電波圏外でも記録継続可能",
        },
      ],
    },
    download: {
      title: "ドライブアドベンチャーの記録を始めよう",
      subtitle: "大切な思い出をDrive.logに託す数千人のドライブ愛好家に仲間入り",
      appStore: "App Storeでダウンロード",
      requirements: "iOS 18.5以降が必要",
      free: "無料ダウンロード",
      note: "iOS専用 - iPhone、iPad、Apple Watch最適化",
    },
    footer: {
      copyright: "© 2024 Drive.log. All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      support: "サポート",
    },
  },
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

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
  )
}

function LanguageToggle({
  currentLang,
  onLanguageChange,
}: { currentLang: string; onLanguageChange: (lang: string) => void }) {
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
  )
}

function VercelTabs({ activeTab, onTabChange, t }: { activeTab: string; onTabChange: (tab: string) => void; t: any }) {
  const tabs = [
    { id: "features", label: t.nav.features },
    { id: "technology", label: t.nav.technology },
    { id: "about", label: t.nav.about },
    { id: "download", label: t.nav.download },
  ]

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
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState("features")
  const [language, setLanguage] = useState("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-blue-800 dark:text-blue-400">{t.hero.title}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <VercelTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />
            <div className="flex items-center space-x-2">
              <LanguageToggle currentLang={language} onLanguageChange={setLanguage} />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle currentLang={language} onLanguageChange={setLanguage} />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-9 w-9">
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4">
              <VercelTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />
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
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {t.hero.rating} ⭐ • {t.hero.downloads}
                  </Badge>
                  <Badge variant="outline" className="border-orange-500 text-orange-600 dark:text-orange-400">
                    {t.hero.iosOnly}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="text-blue-800 dark:text-blue-400">{t.hero.title}</span>
                  <span className="block text-2xl md:text-3xl text-muted-foreground font-normal mt-2">
                    {t.hero.subtitle}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">{t.hero.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-base px-8 bg-blue-800 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t.hero.downloadApp}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/20 bg-transparent"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  {t.hero.watchDemo}
                </Button>
              </div>
            </div>

            {/* iPhone Mockup with Drive.log UI */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* iPhone Frame */}
                <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

                    {/* Drive.log App Screen */}
                    <div className="pt-8 px-4 h-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                      <div className="space-y-4">
                        {/* App Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Drive.log</h2>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">Recording</span>
                          </div>
                        </div>

                        {/* Live Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-blue-600">24.7</div>
                              <div className="text-xs text-gray-500">km</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-orange-500">1:23</div>
                              <div className="text-xs text-gray-500">hours</div>
                            </div>
                          </div>
                        </div>

                        {/* Map Area */}
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl h-32 relative overflow-hidden">
                          {/* Simulated route line */}
                          <svg className="absolute inset-0 w-full h-full">
                            <path
                              d="M20 80 Q60 40 100 60 T180 50 Q220 30 240 60"
                              stroke="#f97316"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                          {/* Current location dot */}
                          <div className="absolute top-12 right-6 w-3 h-3 bg-blue-600 rounded-full shadow-lg animate-pulse"></div>
                        </div>

                        {/* Recent Drives */}
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Drives</h3>
                          {[
                            { name: "Mountain Route", distance: "45.2 km", time: "2h 15m" },
                            { name: "Coastal Drive", distance: "32.8 km", time: "1h 45m" },
                          ].map((drive, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-sm text-gray-900 dark:text-white">{drive.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {drive.distance} • {drive.time}
                                  </div>
                                </div>
                                <MapPin className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Action Button */}
                        <div className="absolute bottom-8 left-4 right-4">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3">
                            <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                            Stop Recording
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.coreValues.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.coreValues.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.coreValues.items.map((value, index) => {
              const icons = [Zap, MapPin, Cloud]
              const Icon = icons[index]
              const colors = ["from-orange-500 to-red-500", "from-blue-500 to-purple-500", "from-green-500 to-blue-500"]

              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center space-y-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center mx-auto`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{value.title}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{value.subtitle}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.features.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => {
              const icons = [Zap, Battery, Star, MapPin, Users, Download]
              const Icon = icons[index]

              return (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.technology.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.technology.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.technology.items.map((tech, index) => {
              const icons = [Smartphone, Shield, Cloud, MapPin]
              const Icon = icons[index]

              return (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{tech.title}</h3>
                    <p className="text-muted-foreground text-sm">{tech.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-600 text-white">
        <div className="container px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">{t.download.title}</h2>
              <p className="text-lg text-blue-100">{t.download.subtitle}</p>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="text-base px-8 bg-white text-blue-800 hover:bg-blue-50">
                <Download className="mr-2 h-5 w-5" />
                {t.download.appStore}
              </Button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-blue-200">
                <span>{t.download.free}</span>
                <span>•</span>
                <span>{t.download.requirements}</span>
              </div>

              <p className="text-sm text-blue-200 max-w-md mx-auto">{t.download.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-blue-800 dark:text-blue-400">{t.hero.title}</span>
            </div>

            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>

            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                {t.footer.privacy}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                {t.footer.terms}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                {t.footer.support}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Component() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AppContent />
    </ThemeProvider>
  )
}
