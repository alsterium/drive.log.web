"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const translations = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日：2025年8月",
    sections: {
      intro: {
        title: "はじめに",
        content: "本プライバシーポリシー（「本ポリシー」）は、Drive.log（「当サービス」）における個人情報の取り扱いについて説明するものです。当サービスをご利用いただく際は、本ポリシーに同意いただいたものとみなされます。"
      },
      collected: {
        title: "データの取り扱い",
        content: `
当アプリでは、ユーザーのプライバシーを最優先に考え、以下のようにデータを取り扱います：

【ローカル保存データ（外部送信されません）】
• GPS座標データ
• 移動経路情報
• 速度・高度データ
• タイムスタンプ
• カメラで撮影した写真
• 写真のメタデータ（撮影日時、位置情報等）

これらのデータは全てお客様のデバイス内にのみ保存され、外部のサーバーに送信されることはありません。

【分析目的で送信される可能性があるデータ】
• アプリの使用状況（匿名化）
• 機能の利用履歴（匿名化）
• エラーログ
• デバイス情報（OS バージョン、アプリバージョン等）

これらは最小限の情報のみで、サービス改善と不具合修正のためにのみ使用されます。`
      },
      usage: {
        title: "データの利用目的",
        content: `
データは以下の目的でのみ利用いたします：

【ローカルデータの利用】
• 運転記録の作成・保存
• ルート分析・統計情報の提供
• アプリ機能の提供

これらのデータはお客様のデバイス内でのみ処理され、外部に送信されることはありません。

【送信される匿名データの利用】
• サービスの改善
• アプリの不具合修正・機能改善

送信されるデータは完全に匿名化され、お客様個人を特定できない形でサービス改善にのみ使用されます。`
      },
      sharing: {
        title: "第三者への提供",
        content: `
当社は、以下の場合を除き、個人情報を第三者に提供いたしません：

• ユーザーの同意がある場合
• 法令に基づく開示が必要な場合
• 生命、身体または財産の保護のため必要な場合
• サービス提供に必要な業務委託先への提供

なお、統計的に処理された匿名データについては、サービス改善のため分析に使用する場合があります。`
      },
      storage: {
        title: "データの保存と管理",
        content: `
• 位置情報、写真、運転記録等の個人データは全てお客様のデバイス内にのみ保存されます
• iCloudへの同期は行われません
• 外部サーバーには一切の個人データを保存しません
• サーバーには匿名化された統計データのみが送信される可能性があります
• デバイス内のデータはセキュリティ対策として暗号化されています
• アプリを削除することで、デバイス内のデータは完全に削除されます`
      },
      rights: {
        title: "ユーザーの権利",
        content: `
ユーザーは以下の権利を有します：

【アクセス権】
• 自身の個人情報の利用状況を確認する権利

【削除権】
• 個人情報の削除を要求する権利
• アプリをアンインストールすることで、デバイス内のデータを削除できます

【利用停止権】
• 個人情報の利用停止を要求する権利

これらの権利を行使される場合は、お問い合わせ機能よりご連絡ください。`
      },
      security: {
        title: "セキュリティ対策",
        content: `
個人情報の保護のため、以下の対策を実施しています：

• データの暗号化
• アクセス制御
• 定期的なセキュリティ監査
• 従業員への教育・研修

ただし、インターネット通信や電子的なデータ保存に完全なセキュリティはないことをご理解ください。`
      },
      cookies: {
        title: "Cookieの使用",
        content: "当Webサイトでは、ユーザー体験の向上のためCookieを使用する場合があります。Cookieの設定は、ブラウザの設定で無効にすることが可能です。"
      },
      children: {
        title: "子供のプライバシー",
        content: "当サービスは13歳未満の児童を対象としておりません。13歳未満の児童の個人情報を意図的に収集することはありません。"
      },
      international: {
        title: "国際データ転送",
        content: "サービス運営上必要な場合、個人情報を日本国外に転送することがあります。その際は、適切な保護措置を講じます。"
      },
      changes: {
        title: "ポリシーの変更",
        content: "本ポリシーは必要に応じて変更される場合があります。重要な変更については、アプリ内通知またはWebサイトでお知らせいたします。"
      },
      contact: {
        title: "お問い合わせ",
        content: "プライバシーに関するご質問やご意見は、アプリ内のお問い合わせ機能またはApp Storeレビューよりお願いいたします。"
      }
    }
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: August 2025",
    sections: {
      intro: {
        title: "Introduction",
        content: "This Privacy Policy ('Policy') explains how Drive.log ('the Service') collects, uses, and protects your personal information. By using our Service, you consent to the practices described in this Policy."
      },
      collected: {
        title: "Data Handling",
        content: `
We prioritize user privacy and handle data as follows:

【Locally Stored Data (Never transmitted externally)】
• GPS coordinate data
• Route and travel information
• Speed and altitude data
• Timestamps
• Photos taken with the camera
• Photo metadata (date, time, location, etc.)

All this data is stored exclusively on your device and is never transmitted to external servers.

【Data That May Be Transmitted for Analysis】
• App usage statistics (anonymized)
• Feature usage history (anonymized)
• Error logs
• Device information (OS version, app version, etc.)

Only minimal information is transmitted, used solely for service improvement and bug fixes.`
      },
      usage: {
        title: "How We Use Data",
        content: `
Data is used only for the following purposes:

【Local Data Usage】
• Creating and storing driving records
• Providing route analysis and statistics
• App functionality provision

This data is processed exclusively on your device and is never transmitted externally.

【Transmitted Anonymous Data Usage】
• Service improvement
• Bug fixes and feature improvements

Transmitted data is completely anonymized and used solely for service improvement in a way that cannot identify individual users.`
      },
      sharing: {
        title: "Information Sharing",
        content: `
We do not share personal information with third parties except in the following cases:

• With user consent
• When required by law
• To protect life, health, or property
• With service providers necessary for operations

Anonymized statistical data may be used for service improvement analysis.`
      },
      storage: {
        title: "Data Storage and Management",
        content: `
• Location data, photos, driving records, and other personal data are stored exclusively on your device
• No synchronization to iCloud is performed
• No personal data is stored on external servers
• Only anonymized statistical data may be transmitted to servers
• Data on your device is encrypted for security
• Uninstalling the app completely removes all device data`
      },
      rights: {
        title: "Your Rights",
        content: `
You have the following rights:

【Access Rights】
• Right to review how your personal information is used

【Deletion Rights】
• Right to request deletion of personal information
• You can delete device data by uninstalling the app

【Opt-out Rights】
• Right to request cessation of personal information use

To exercise these rights, please contact us through the in-app contact feature.`
      },
      security: {
        title: "Security Measures",
        content: `
We implement the following security measures to protect personal information:

• Data encryption
• Access controls
• Regular security audits
• Employee education and training

Please understand that no internet transmission or electronic storage is completely secure.`
      },
      cookies: {
        title: "Cookie Usage",
        content: "Our website may use cookies to enhance user experience. Cookie settings can be disabled in your browser settings."
      },
      children: {
        title: "Children's Privacy",
        content: "Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13."
      },
      international: {
        title: "International Data Transfers",
        content: "Personal information may be transferred outside Japan for service operations. We implement appropriate safeguards for such transfers."
      },
      changes: {
        title: "Policy Changes",
        content: "This Policy may be updated as necessary. Significant changes will be communicated through in-app notifications or our website."
      },
      contact: {
        title: "Contact Us",
        content: "For questions or concerns about privacy, please use the in-app contact feature or App Store reviews."
      }
    }
  }
};

export default function PrivacyPage() {
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
