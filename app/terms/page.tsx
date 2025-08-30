"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const translations = {
  ja: {
    title: "利用規約",
    lastUpdated: "最終更新日：2025年1月",
    sections: {
      intro: {
        title: "はじめに",
        content: "本利用規約（「本規約」）は、Drive.log（「当サービス」）の利用に関する条件を定めるものです。当サービスをご利用いただく際は、本規約に同意いただいたものとみなされます。"
      },
      service: {
        title: "サービス概要",
        content: "Drive.logは、GPS機能を活用して運転記録を保存・管理できるiOSアプリケーションです。ルート記録、写真撮影、データ分析等の機能を提供いたします。"
      },
      subscription: {
        title: "サブスクリプション",
        content: `
• プレミアム機能は月額200円（日本）または$1.99 USD（その他地域）でご利用いただけます
• サブスクリプションは14日間の無料トライアルから開始されます
• サブスクリプションは自動更新され、解約するまで継続します
• 解約は設定アプリの「サブスクリプション」セクションから、次回更新の24時間前までに行ってください
• 料金は更新日の24時間以内に請求されます
• 無料トライアル期間中に解約した場合、料金は発生しません`
      },
      license: {
        title: "利用許諾",
        content: "当サービスは、個人的かつ非商業的な用途に限定して利用許諾されます。本アプリケーションの複製、配布、逆アセンブル、逆コンパイルは禁止されています。"
      },
      prohibited: {
        title: "禁止事項",
        content: `
以下の行為を禁止いたします：
• 法令に違反する行為
• 他者の権利を侵害する行為
• サービスの運営を妨害する行為
• 不正アクセスやハッキング行為
• 商業目的での利用`
      },
      disclaimer: {
        title: "免責事項",
        content: "当サービスは「現状有姿」で提供され、いかなる保証も行いません。サービス利用により生じた損害について、当社は一切の責任を負いません。運転時は安全運転を心がけ、アプリの操作は安全な場所で行ってください。"
      },
      privacy: {
        title: "プライバシー",
        content: "個人情報の取り扱いについては、別途定めるプライバシーポリシーをご確認ください。"
      },
      changes: {
        title: "規約の変更",
        content: "当社は、必要に応じて本規約を変更することがあります。重要な変更については、アプリ内通知またはWebサイトでお知らせいたします。"
      },
      governing: {
        title: "準拠法・管轄",
        content: "本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。"
      },
      contact: {
        title: "お問い合わせ",
        content: "本規約に関するご質問は、アプリ内のお問い合わせ機能またはApp Storeレビューよりお願いいたします。"
      }
    }
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 2025",
    sections: {
      intro: {
        title: "Introduction",
        content: "These Terms of Service ('Terms') govern your use of Drive.log ('the Service'). By using our Service, you agree to be bound by these Terms."
      },
      service: {
        title: "Service Description",
        content: "Drive.log is an iOS application that uses GPS functionality to record and manage driving data. We provide features including route recording, photo capture, and data analysis."
      },
      subscription: {
        title: "Subscription",
        content: `
• Premium features are available for ¥200/month (Japan) or $1.99 USD/month (other regions)
• Subscriptions start with a 14-day free trial
• Subscriptions automatically renew until cancelled
• Cancel anytime in your device Settings under Subscriptions, at least 24 hours before renewal
• Payment will be charged within 24 hours prior to renewal
• No charges apply if you cancel during the free trial period`
      },
      license: {
        title: "License Grant",
        content: "The Service is licensed for personal, non-commercial use only. You may not copy, distribute, reverse engineer, or decompile the application."
      },
      prohibited: {
        title: "Prohibited Uses",
        content: `
The following activities are prohibited:
• Violating any applicable laws or regulations
• Infringing on others' rights
• Interfering with service operations
• Unauthorized access or hacking attempts
• Commercial use without permission`
      },
      disclaimer: {
        title: "Disclaimer",
        content: "The Service is provided 'as is' without warranties of any kind. We disclaim all liability for damages arising from use of the Service. Always prioritize safe driving and operate the app only when safely parked."
      },
      privacy: {
        title: "Privacy",
        content: "Please refer to our Privacy Policy for information about how we collect and use your personal information."
      },
      changes: {
        title: "Changes to Terms",
        content: "We may modify these Terms as necessary. Significant changes will be communicated through in-app notifications or our website."
      },
      governing: {
        title: "Governing Law",
        content: "These Terms are governed by Japanese law, with Tokyo District Court having exclusive jurisdiction for first instance proceedings."
      },
      contact: {
        title: "Contact",
        content: "For questions about these Terms, please use the in-app contact feature or App Store reviews."
      }
    }
  }
};

export default function TermsPage() {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Toggle */}
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('ja')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      language === 'ja'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    日本語
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      language === 'en'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
                
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="h-9 w-9"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {t.lastUpdated}
                  </p>
                </div>

                <div className="space-y-8">
                  {Object.entries(t.sections).map(([key, section]) => (
                    <section key={key} className="scroll-mt-20" id={key}>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {section.title}
                      </h2>
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
    </div>
  );
}