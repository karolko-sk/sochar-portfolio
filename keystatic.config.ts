import { config, fields, collection, singleton } from '@keystatic/core';

// Storage mode: Local during dev, GitHub in production when client ID is provided
const isProduction = process.env.NODE_ENV === 'production';
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || 'karolko-sk/sochar-portfolio';

export default config({
  storage: isProduction && process.env.KEYSTATIC_GITHUB_CLIENT_ID
    ? {
        kind: 'github',
        repo: githubRepo as `${string}/${string}`,
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'Ateliér Viktor Marek · CMS',
    },
    navigation: {
      'Sochařská tvorba': ['artworks', 'exhibitions'],
      'Nastavení & Profil': ['artistProfile', 'siteSettings'],
    },
  },
  collections: {
    artworks: collection({
      label: 'Díla & Plastiky',
      slugField: 'id',
      path: 'content/artworks/*',
      format: { data: 'json' },
      schema: {
        id: fields.text({ label: 'Interní ID díla (např. monolit-vii)', validation: { isRequired: true } }),
        slug: fields.text({ label: 'Slug URL', validation: { isRequired: true } }),
        code: fields.text({ label: 'Katalogové číslo (např. VM-01)', validation: { isRequired: true } }),
        title: fields.text({ label: 'Název díla', validation: { isRequired: true } }),
        subtitle: fields.text({ label: 'Podtitul / Cyklus (např. Tichá vertikála)' }),
        year: fields.number({ label: 'Rok vzniku', validation: { isRequired: true, min: 1900, max: 2100 } }),
        category: fields.select({
          label: 'Kategorie materiálu',
          options: [
            { label: 'Patinovaný bronz', value: 'bronze' },
            { label: 'Kámen a mramor', value: 'stone' },
            { label: 'Ocel, sklo a dřevo', value: 'steel-glass' },
          ],
          defaultValue: 'bronze',
        }),
        material: fields.text({ label: 'Přesná specifikace materiálu', validation: { isRequired: true } }),
        dimensions: fields.object({
          height: fields.number({ label: 'Výška (cm)', validation: { isRequired: true } }),
          width: fields.number({ label: 'Šířka (cm)', validation: { isRequired: true } }),
          depth: fields.number({ label: 'Hloubka (cm)', validation: { isRequired: true } }),
          weight: fields.number({ label: 'Hmotnost (kg)' }),
        }, { label: 'Rozměry a hmotnost plastiky' }),
        description: fields.text({ label: 'Kurátorský popis díla', multiline: true, validation: { isRequired: true } }),
        curatorNote: fields.text({ label: 'Citát kurátora / ocenění', multiline: true }),
        status: fields.select({
          label: 'Stav díla',
          options: [
            { label: 'K dispozici v ateliéru', value: 'available' },
            { label: 'Předběžně rezervováno', value: 'reserved' },
            { label: 'Prodáno / V soukromé sbírce', value: 'sold' },
            { label: 'Neprodejné (Autorův archiv)', value: 'not_for_sale' },
          ],
          defaultValue: 'available',
        }),
        priceMode: fields.select({
          label: 'Režim zobrazení ceny',
          options: [
            { label: 'Pevná cena', value: 'fixed' },
            { label: 'Cena na dotaz', value: 'on_request' },
            { label: 'Skrytá cena', value: 'hidden' },
          ],
          defaultValue: 'fixed',
        }),
        price: fields.text({ label: 'Zobrazovaná cena (např. 280 000 Kč)' }),
        provenance: fields.text({ label: 'Umístění / Provenience (pokud je dílo prodáno)' }),
        heroImage: fields.text({ label: 'Hlavní fotografie (URL nebo cesta)', validation: { isRequired: true } }),
        galleryImages: fields.array(
          fields.object({
            url: fields.text({ label: 'URL fotografie', validation: { isRequired: true } }),
            alt: fields.text({ label: 'Popis pro čtečky (alt)', validation: { isRequired: true } }),
            label: fields.text({ label: 'Popiska úhlu pohledu (např. Detail patiny)', validation: { isRequired: true } }),
          }),
          {
            label: 'Galerie doplňkových pohledů',
            itemLabel: (props) => props.fields.label.value || 'Pohled',
          }
        ),
        videoUrl: fields.text({ label: 'Video smyčka (URL MP4 nebo WebM)' }),
        featured: fields.checkbox({ label: 'Zvýraznit v úvodu (Hero kompozice)', defaultValue: false }),
        sortOrder: fields.number({ label: 'Pořadí zobrazení (menší číslo = výše)', defaultValue: 10 }),
      },
    }),

    exhibitions: collection({
      label: 'Vernisáže & Výstavy',
      slugField: 'id',
      path: 'content/exhibitions/*',
      format: { data: 'json' },
      schema: {
        id: fields.text({ label: 'Identifikátor', validation: { isRequired: true } }),
        slug: fields.text({ label: 'Slug', validation: { isRequired: true } }),
        title: fields.text({ label: 'Název výstavy', validation: { isRequired: true } }),
        type: fields.select({
          label: 'Typ výstavy',
          options: [
            { label: 'Samostatná výstava', value: 'solo' },
            { label: 'Skupinová expozice', value: 'group' },
          ],
          defaultValue: 'solo',
        }),
        venue: fields.text({ label: 'Galerie / Instituce', validation: { isRequired: true } }),
        city: fields.text({ label: 'Město', validation: { isRequired: true } }),
        startDate: fields.text({ label: 'Začátek výstavy (YYYY-MM-DD)', validation: { isRequired: true } }),
        endDate: fields.text({ label: 'Konec výstavy (YYYY-MM-DD)', validation: { isRequired: true } }),
        datesFormatted: fields.text({ label: 'Zobrazované datum (např. 15. 11. – 12. 12. 2026)', validation: { isRequired: true } }),
        curator: fields.text({ label: 'Kurátor výstavy', validation: { isRequired: true } }),
        description: fields.text({ label: 'Popis výstavy', multiline: true, validation: { isRequired: true } }),
        coverImage: fields.text({ label: 'Náhled / Pozvánka (URL)' }),
        mapUrl: fields.text({ label: 'Odkaz na Google Mapy' }),
        externalEventUrl: fields.text({ label: 'Odkaz na kalendář / FB událost' }),
      },
    }),
  },

  singletons: {
    artistProfile: singleton({
      label: 'Profil autora & Manifest',
      path: 'content/settings/artist-profile',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Jméno a titul autora', validation: { isRequired: true } }),
        birthYear: fields.number({ label: 'Rok narození', validation: { isRequired: true } }),
        manifestoHeading: fields.text({ label: 'Nadpis autorského manifestu', validation: { isRequired: true } }),
        manifestoText: fields.array(fields.text({ label: 'Odstavec textu', multiline: true }), {
          label: 'Odstavce manifestu',
        }),
        manifestoQuote: fields.text({ label: 'Klíčový citát', multiline: true, validation: { isRequired: true } }),
        portraitImage: fields.text({ label: 'Fotografie socháře v ateliéru', validation: { isRequired: true } }),
        catalogPdfUrl: fields.text({ label: 'Odkaz na kurátorské portfolio (PDF)' }),
        education: fields.array(
          fields.object({
            period: fields.text({ label: 'Období (např. 2001–2007)' }),
            title: fields.text({ label: 'Instituce a ateliér' }),
          }),
          { label: 'Vzdělání a stáže', itemLabel: (p) => p.fields.period.value || 'Vzdělání' }
        ),
        collections: fields.array(
          fields.object({
            title: fields.text({ label: 'Instituce / Sbírka' }),
          }),
          { label: 'Zastoupení ve sbírkách', itemLabel: (p) => p.fields.title.value || 'Sbírka' }
        ),
        awards: fields.array(
          fields.object({
            year: fields.number({ label: 'Rok' }),
            title: fields.text({ label: 'Název ocenění / sympozia' }),
          }),
          { label: 'Ocenění & Sympózia', itemLabel: (p) => `${p.fields.year.value || ''} ${p.fields.title.value || ''}` }
        ),
      },
    }),

    siteSettings: singleton({
      label: 'Nastavení webu & Ateliér',
      path: 'content/settings/site-settings',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Titulek webu (SEO)', validation: { isRequired: true } }),
        tagline: fields.text({ label: 'Podtitul webu', validation: { isRequired: true } }),
        contactEmail: fields.text({ label: 'Kontaktní e-mail', validation: { isRequired: true } }),
        contactPhone: fields.text({ label: 'Telefon', validation: { isRequired: true } }),
        studioAddress: fields.object({
          street: fields.text({ label: 'Ulice a číslo' }),
          city: fields.text({ label: 'Město a čtvrť' }),
          zip: fields.text({ label: 'PSČ' }),
        }, { label: 'Adresa ateliéru' }),
        socialLinks: fields.object({
          instagram: fields.text({ label: 'Instagram profil URL' }),
        }, { label: 'Sociální sítě' }),
        inquiryNotice: fields.text({ label: 'Upozornění ve formuláři poptávky' }),
        companyId: fields.text({ label: 'IČO a právní informace' }),
      },
    }),
  },
});
