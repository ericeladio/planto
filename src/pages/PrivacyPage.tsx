import SEOHead from '../components/SEOHead'

interface PrivacySection {
  title: string
  content: string
}

const sections: PrivacySection[] = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you provide directly, such as your name and email address when you sign up or contact us. We also automatically collect certain data when you visit our site, including your IP address, browser type, device information, and browsing behavior through cookies and similar technologies.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to operate, maintain, and improve our services, to communicate with you, to personalize your experience, and to send you updates, marketing materials, and other information that may be of interest to you. You may opt out of receiving these communications at any time.',
  },
  {
    title: 'Cookies',
    content:
      'We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
  },
  {
    title: 'Data Sharing and Disclosure',
    content:
      'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services, comply with the law, or protect our rights. We may share anonymized or aggregated data that cannot reasonably be used to identify you.',
  },
  {
    title: 'Data Security',
    content:
      'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: 'Your Rights',
    content:
      'You have the rights to access, update, or delete your personal information at any time. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information below.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this policy periodically for any changes.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have any questions about this Privacy Policy, please contact us at support@planto.com or write to us at: Planto Inc., 123 Green Street, Plant City, PC 10001.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Planto's privacy policy. Learn how we collect, use, and protect your personal information."
        canonicalPath="/privacy"
      />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 max-sm:pb-15 max-w-4xl mx-auto">
      <h1 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white mb-2">Privacy Policy</h1>
      <p className="text-white/40 text-sm mb-12">Last updated: June 24, 2026</p>

      <div className="flex flex-col gap-10">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-xl font-semibold text-white mb-3">
              {i + 1}. {section.title}
            </h2>
            <p className="text-white/60 leading-[1.8] text-base">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
