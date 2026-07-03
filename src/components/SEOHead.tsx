import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://planto.com'
const SITE_NAME = 'Planto'
const DEFAULT_IMAGE = '/icons/LOGO_PLANT.png'

interface SEOHeadProps {
  title?: string
  description?: string
  canonicalPath?: string
  image?: string
  type?: 'website' | 'product' | 'article'
  structuredData?: object | object[]
}

export default function SEOHead({
  title,
  description,
  canonicalPath = '/',
  image,
  type = 'website',
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullDescription = description ?? 'Planto — Premium indoor plants, botanical decor, and plant care essentials. Breathe new life into every room.'
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image ?? DEFAULT_IMAGE}`
  const canonical = `${SITE_URL}${canonicalPath}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icons/LOGO_PLANT.png`,
  sameAs: [],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}
