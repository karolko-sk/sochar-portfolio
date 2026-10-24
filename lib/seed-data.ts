import { Artwork, Exhibition, ArtistProfile, SiteSettings } from '@/lib/schemas';

export const SEED_ARTWORKS: Artwork[] = [
  {
    id: 'monolit-vii',
    slug: 'monolit-vii',
    code: 'VM-01',
    title: 'Probuzení hmoty',
    subtitle: 'Figurální vertikála',
    year: 2024,
    category: 'bronze',
    material: 'Patinovaný litý bronz, leštěný černý diabas',
    dimensions: {
      height: 182,
      width: 45,
      depth: 40,
      weight: 88,
    },
    description:
      'Monumentální bronzová figura zkoumající probuzení lidské formy z beztvaré hmoty. Precizní anatomické modelování přechází v hrubší strukturu povrchu s přirozenou tmavě hnědou patinou a jemnými olivovými akcenty.',
    curatorNote:
      'Dílo z cyklu „Postava a prostor“. Zkoumání tělesného napětí a zranitelnosti lidské existence v dialogu s architekturou.',
    status: 'available',
    priceMode: 'fixed',
    price: '280 000 Kč',
    heroImage: '/images/artworks/monolit-vii.jpg',
    galleryImages: [
      {
        url: '/images/artworks/monolit-vii.jpg',
        alt: 'Probuzení hmoty - celkový pohled',
        label: 'Celkový pohled',
      },
    ],
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-white-marble-statue-in-a-museum-41481-large.mp4',
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'prasklina-casu',
    slug: 'prasklina-casu',
    code: 'VM-02',
    title: 'Hledačka hvězd',
    subtitle: 'Abstrahovaná figura',
    year: 2023,
    category: 'stone',
    material: 'Bílý krystalický mramor, ručně jemně broušený povrch',
    dimensions: {
      height: 72,
      width: 28,
      depth: 22,
      weight: 34,
    },
    description:
      'Minimalistická sochařská forma redukující postavu na čistou linii a zakloněný ovál hlavy hledící vzhůru. Hedvábně matný povrch mramoru zachycuje jemné světelné přechody a zdůrazňuje křehkost vertikály.',
    curatorNote:
      'Výrazná pocta rané sochařské abstrakci. Komorní solitér určený pro tichou kontemplaci v soukromém interiéru.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Soukromá sbírka, Praha 6',
    heroImage: '/images/artworks/prasklina-casu.jpg',
    galleryImages: [
      {
        url: '/images/artworks/prasklina-casu.jpg',
        alt: 'Hledačka hvězd - celkový pohled',
        label: 'Celkový pohled',
      },
    ],
    featured: false,
    sortOrder: 2,
  },
  {
    id: 'cortenova-vlna',
    slug: 'cortenova-vlna',
    code: 'VM-03',
    title: 'Strážce paměti',
    subtitle: 'Expresivní studie hlavy',
    year: 2024,
    category: 'bronze',
    material: 'Hrubě patinovaný litý bronz, autorský odlitek',
    dimensions: {
      height: 84,
      width: 52,
      depth: 48,
      weight: 58,
    },
    description:
      'Monumentální plastická studie hlavy zachycující dramatické vnitřní pohnutí a surovou energii lidského vědomí. Hluboké vrypy v modelaci a tmavá patinace vytvářejí silné kontrasty světla a stínu.',
    curatorNote:
      'Cyklus „Tváře přítomnosti“. Socha byla oceněna na mezinárodním bienále plastiky a stala se součástí autorovy profilové série.',
    status: 'reserved',
    priceMode: 'fixed',
    price: '190 000 Kč',
    heroImage: '/images/artworks/cortenova-vlna.jpg',
    galleryImages: [
      {
        url: '/images/artworks/cortenova-vlna.jpg',
        alt: 'Strážce paměti - detail profilu',
        label: 'Detail profilu',
      },
    ],
    featured: false,
    sortOrder: 3,
  },
  {
    id: 'vnitrni-prostor',
    slug: 'vnitrni-prostor',
    code: 'VM-04',
    title: 'Archa – Rituální schránka',
    subtitle: 'Reliéfní kamenné těleso',
    year: 2024,
    category: 'stone',
    material: 'Hloubkově tesaný vápenec, jemný pískový reliéf',
    dimensions: {
      height: 48,
      width: 42,
      depth: 36,
      weight: 42,
    },
    description:
      'Masivní kamenné těleso zkoumající prostor jako vnitřní schránku a útočiště. Vnější plášť nese lineární reliéfní rytmus připomínající archaické architektonické prvky a symboly paměti.',
    curatorNote:
      'Práce zkoumající pomezí užité formy a autonomní skulptury. Určeno jako dominantní solitér pro solitérní podstavec či konzoli.',
    status: 'available',
    priceMode: 'fixed',
    price: '145 000 Kč',
    heroImage: '/images/artworks/vnitrni-prostor.jpg',
    galleryImages: [
      {
        url: '/images/artworks/vnitrni-prostor.jpg',
        alt: 'Archa - pohled na reliéf',
        label: 'Pohled na reliéf',
      },
    ],
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-reflection-of-light-on-a-museum-sculpture-41484-large.mp4',
    featured: false,
    sortOrder: 4,
  },
  {
    id: 'kineticka-rovnovaha',
    slug: 'kineticka-rovnovaha',
    code: 'VM-05',
    title: 'Myslitel – Bod tíže',
    subtitle: 'Monumentální plastika',
    year: 2022,
    category: 'bronze',
    material: 'Patinovaný litý bronz, sokl z tmavé žuly',
    dimensions: {
      height: 180,
      width: 98,
      depth: 140,
      weight: 380,
    },
    description:
      'Monumentální kompozice zkoumající soustředění tělesné síly do jednoho tichého bodu myšlení. Každý svalový záhyb nese napětí vnitřního zápasu mezi hmotnou gravitací a duchem.',
    curatorNote:
      'Autorská parafráze klasického motivu v kontextu moderního ateliéru. Zastoupeno v mezinárodní reprezentativní sbírce.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Soukromá sbírka, Vídeň',
    heroImage: '/images/artworks/kineticka-rovnovaha.jpg',
    galleryImages: [
      {
        url: '/images/artworks/kineticka-rovnovaha.jpg',
        alt: 'Myslitel - celková kompozice',
        label: 'Celková kompozice',
      },
    ],
    featured: false,
    sortOrder: 5,
  },
  {
    id: 'geometrie-ticha',
    slug: 'geometrie-ticha',
    code: 'VM-06',
    title: 'Múza harmonie',
    subtitle: 'Klasická drapérie',
    year: 2024,
    category: 'stone',
    material: 'Bílý kararský mramor, ručně hlazená drapérie',
    dimensions: {
      height: 178,
      width: 62,
      depth: 50,
      weight: 185,
    },
    description:
      'Klasická sochařská studie zkoumající měkkost splývavé látky v protikladu k pevnosti mramorového jádra. Postava s hudebním nástrojem ztělesňuje tichý rytmus a vyváženost proporcí.',
    curatorNote:
      'Špičková ukázka figurální práce s historickým odkazem. Vhodné pro reprezentativní haly a historické prostory.',
    status: 'available',
    priceMode: 'on_request',
    price: 'Cena na dotaz',
    heroImage: '/images/artworks/geometrie-ticha.jpg',
    galleryImages: [
      {
        url: '/images/artworks/geometrie-ticha.jpg',
        alt: 'Múza harmonie - celkový pohled',
        label: 'Celkový pohled',
      },
    ],
    featured: false,
    sortOrder: 6,
  },
  {
    id: 'torzo-pameti',
    slug: 'torzo-pameti',
    code: 'VM-07',
    title: 'Vertikála ticha',
    subtitle: 'Meditativní solitér',
    year: 2021,
    category: 'steel-glass',
    material: 'Tmavá litina, zrnitý povrch, voskovaný dubový sokl',
    dimensions: {
      height: 125,
      width: 38,
      depth: 30,
      weight: 64,
    },
    description:
      'Štíhlá vertikální plastika vyzařující klid a vnitřní rovnováhu. Jemné kaskádovité linie splývajícího roucha stékají podél těla a vytvářejí rytmický ornamentální reliéf.',
    curatorNote:
      'Dílo vzniklé z dialogu mezi východním minimalismem a středoevropskou sochařskou tradicí. V soukromé sbírce.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Soukromá sbírka, Brno',
    heroImage: '/images/artworks/torzo-pameti.jpg',
    galleryImages: [
      {
        url: '/images/artworks/torzo-pameti.jpg',
        alt: 'Vertikála ticha - meditativní linie',
        label: 'Meditativní linie',
      },
    ],
    featured: false,
    sortOrder: 7,
  },
  {
    id: 'nocni-strazce',
    slug: 'nocni-strazce',
    code: 'VM-08',
    title: 'Noční strážce',
    subtitle: 'Monumentální bronzová figura',
    year: 2023,
    category: 'bronze',
    material: 'Tmavý patinovaný bronz s tyrkysovým oxidem na podstavci',
    dimensions: {
      height: 195,
      width: 58,
      depth: 48,
      weight: 115,
    },
    description:
      'Svalnatá, ukotvená bronzová figura stojící v klidném kontrapostu. Tmavý, sametově hluboký tón patiny s jemnými tyrkysovými stopami oxidace v záhybech dává plastice majestátní a nadčasový charakter.',
    curatorNote:
      'Ústřední exponát ateliérového fondu. Určeno pro dominantní umístění v exteriérovém atriu nebo otevřené hale.',
    status: 'available',
    priceMode: 'fixed',
    price: '340 000 Kč',
    heroImage: '/images/artworks/nocni-strazce.jpg',
    galleryImages: [
      {
        url: '/images/artworks/nocni-strazce.jpg',
        alt: 'Noční strážce - bronzová plastika',
        label: 'Celkový pohled',
      },
    ],
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-white-marble-statue-in-a-museum-41481-large.mp4',
    featured: false,
    sortOrder: 8,
  },
];

export const SEED_EXHIBITIONS: Exhibition[] = [
  {
    id: 'tvary-pameti-2026',
    slug: 'tvary-pameti-2026',
    title: 'Tvary paměti: Hmota a prostor',
    type: 'solo',
    venue: 'Galerie Nová síň',
    city: 'Praha 1',
    startDate: '2026-11-15',
    endDate: '2026-12-12',
    datesFormatted: '15. 11. – 12. 12. 2026',
    curator: 'PhDr. Helena Rejchrtová',
    description:
      'Samostatná retrospektivní výstava představující bronzové plastiky a kamenné sochařské práce z let 2022–2026. Slavnostní vernisáž se uskuteční ve čtvrtek 15. listopadu od 18:00.',
    mapUrl: 'https://maps.google.com/?q=Galerie+Nova+sin+Praha',
    externalEventUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vernisáž+Tvary+paměti+-+MgA.+Viktor+Marek&dates=20261115T170000Z/20261115T210000Z&details=Slavnostní+vernisáž+sochařských+děl+v+Galerii+Nová+síň&location=Galerie+Nová+síň,+Praha',
  },
  {
    id: 'dialog-materialu-2025',
    slug: 'dialog-materialu-2025',
    title: 'Dialog materiálů: Bronz a kámen',
    type: 'group',
    venue: 'Dům umění města Brna',
    city: 'Brno',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    datesFormatted: 'Duben – Červen 2025',
    curator: 'Mgr. Tomáš Vlček',
    description:
      'Společná kurátorská expozice tří současných českých sochařů zkoumající refrakci světla a vnitřní strukturu litého kovu v kontrastu s mramorem.',
  },
  {
    id: 'mezi-architekturou-2024',
    slug: 'mezi-architekturou-2024',
    title: 'Plastika ve veřejném prostoru',
    type: 'group',
    venue: 'Kunsthalle Wien',
    city: 'Vídeň, Rakousko',
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    datesFormatted: 'Září – Říjen 2024',
    curator: 'Dr. Stefan Gruber',
    description:
      'Mezinárodní přehlídka velkoformátového sochařství se zaměřením na patinovaný bronz a architektonické zásahy do krajiny a atrií.',
  },
  {
    id: 'vnitrni-ticho-2023',
    slug: 'vnitrni-ticho-2023',
    title: 'Vnitřní ticho (Solitérní práce)',
    type: 'solo',
    venue: 'Galerie moderního umění',
    city: 'Hradec Králové',
    startDate: '2023-01-15',
    endDate: '2023-03-31',
    datesFormatted: 'Leden – Březen 2023',
    curator: 'Mgr. Alena Křížová',
    description:
      'Cyklus mramorových skulptur vzniklých během tvůrčího pobytu v italské Carraře a českých kamenických dílnách.',
  },
];

export const SEED_ARTIST_PROFILE: ArtistProfile = {
  name: 'MgA. Viktor Marek',
  birthYear: 1981,
  manifestoHeading: 'Hmota, prostor a vnitřní napětí',
  manifestoText: [
    'Viktor Marek absolvoval Akademii výtvarných umění v Praze v Ateliéru figurálního sochařství a monumentální tvorby. Ve své práci se dlouhodobě soustředí na hledání hranice mezi figurálním odkazem a radikální abstrakcí.',
    'Základem jeho tvorby je přímý dialog s materiálem. Nepoužívá 3D tisk ani digitální prefabrikaci – každá skulptura vzniká fyzickým opracováním kamenného bloku, svařováním a patinováním kovů či litím bronzu do ztracených forem v rodinných slévárnách.',
  ],
  manifestoQuote:
    'Socha není dekorací prostoru. Je to bod, který prostor nově definuje a nutí člověka zpomalit a vnímat gravitaci vlastního těla.',
  portraitImage: '/images/artist-portrait.jpg',
  catalogPdfUrl: '',
  education: [
    {
      period: '2001–2007',
      title: 'Akademie výtvarných umění v Praze (AVU)',
    },
    {
      period: '2005',
      title: 'Stáž na Universität der Künste Berlin (Sochařství a instalace)',
    },
  ],
  collections: [
    {
      title: 'Galerie hlavního města Prahy (GHMP)',
    },
    {
      title: 'Nadace pro současné umění Vídeň',
    },
    {
      title: 'Soukromé sbírky v Praze, Berlíně, Curychu a Bratislavě',
    },
  ],
  awards: [
    {
      year: 2023,
      title: 'Cena kritiky za sochařské dílo roku (Bienále Brno)',
    },
    {
      year: 2019,
      title: 'Mezinárodní sochařské sympozium Carrara, Itálie',
    },
  ],
};

export const SEED_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Viktor Marek · Sochařský ateliér & Galerie',
  tagline: 'Sochařský ateliér & Galerie moderního sochařství',
  contactEmail: 'atelier@viktormarek.cz',
  contactPhone: '+420 777 123 456',
  studioAddress: {
    street: 'Osadní 26',
    city: 'Praha 7 – Holešovice',
    zip: '170 00',
  },
  socialLinks: {
    instagram: 'https://instagram.com/viktormarek.sculpture',
  },
  inquiryNotice: 'Odeslání je nezávazné. Autor Vás bude osobně kontaktovat do 24 hodin.',
  companyId: 'IČ: 87654321 · Zapsáno v rejstříku',
};
