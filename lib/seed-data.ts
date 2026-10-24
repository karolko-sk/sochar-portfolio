import { Artwork, Exhibition, ArtistProfile, SiteSettings } from '@/lib/schemas';

export const SEED_ARTWORKS: Artwork[] = [
  {
    id: 'monolit-vii',
    slug: 'monolit-vii',
    code: 'VM-01',
    title: 'Monolit VII',
    subtitle: 'Tichá vertikála',
    year: 2024,
    category: 'bronze',
    material: 'Patinovaný bronz, leštěný černý diabas',
    dimensions: {
      height: 186,
      width: 42,
      depth: 38,
      weight: 94,
    },
    description:
      'Monumentální vertikální plastika zkoumající rovnováhu mezi vnitřním pnutím litého bronzu a chladnou stabilitou kamenného soklu. Povrch nese jemnou zelenou oxidaci přecházející v temně hnědou hloubku.',
    curatorNote:
      'Dílo z cyklu „Vertikály paměti“, kde autor redukuje figuru na čistý energetický sloup. Vhodné pro reprezentativní interiéry i zastřešená atria.',
    status: 'available',
    priceMode: 'fixed',
    price: '280 000 Kč',
    heroImage: '/images/artworks/monolit-vii.jpg',
    galleryImages: [
      {
        url: '/images/artworks/monolit-vii.jpg',
        alt: 'Monolit VII - celkový pohled',
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
    title: 'Prasklina času',
    subtitle: 'Komorní reflexe',
    year: 2023,
    category: 'stone',
    material: 'Bílý krystalický mramor, ruční pemrlování',
    dimensions: {
      height: 68,
      width: 52,
      depth: 40,
      weight: 62,
    },
    description:
      'Blok krystalického mramoru rozetnutý kontrolovaným lomem a následně zjemněný ručním broušením vnitřních ploch. Kontrast surové lomy a hedvábného lesku vnitřní štěrbiny.',
    curatorNote: 'Oceněno Cenou kritiky na Mezinárodním sochařském bienále 2023.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Soukromá sbírka, Praha 6',
    heroImage: '/images/artworks/prasklina-casu.jpg',
    galleryImages: [
      {
        url: '/images/artworks/prasklina-casu.jpg',
        alt: 'Prasklina času - celková kompozice',
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
    title: 'Cortenová vlna',
    subtitle: 'Exteriérová dynamika',
    year: 2024,
    category: 'steel-glass',
    material: 'Svařovaná ocel Corten s přirozenou stabilizovanou rzí',
    dimensions: {
      height: 145,
      width: 70,
      depth: 55,
      weight: 85,
    },
    description:
      'Prostorová křivka tvarovaná ze tří masivních plátů kortenové oceli. Dílo je konstruováno pro venkovní umístění, kde vlivem srážek a slunce neustále mění barevný odstín sametové rzi.',
    curatorNote:
      'Rezervováno pro privátní rezidenční zahradu v Průhonicích. Možnost objednání autorské variace.',
    status: 'reserved',
    priceMode: 'fixed',
    price: '210 000 Kč',
    heroImage: '/images/artworks/cortenova-vlna.jpg',
    galleryImages: [
      {
        url: '/images/artworks/cortenova-vlna.jpg',
        alt: 'Cortenová vlna - venkovní instalace',
        label: 'Exteriérový záběr',
      },
    ],
    featured: false,
    sortOrder: 3,
  },
  {
    id: 'vnitrni-prostor',
    slug: 'vnitrni-prostor',
    code: 'VM-04',
    title: 'Vnitřní prostor',
    subtitle: 'Světelná refrakce',
    year: 2024,
    category: 'steel-glass',
    material: 'Tavené hutní sklo v kouřovém tónu, kouřový dubový masiv',
    dimensions: {
      height: 54,
      width: 38,
      depth: 32,
      weight: 26,
    },
    description:
      'Optický monolit z taveného skla usazený do hluboce kartáčovaného dubového dřeva. Světlo procházející skleněným jádrem vrhá na okolní stěny proměnlivé prismatické odlesky.',
    curatorNote: 'Práce realizovaná ve spolupráci se sklářskými mistry v Železném Brodě.',
    status: 'available',
    priceMode: 'fixed',
    price: '165 000 Kč',
    heroImage: '/images/artworks/vnitrni-prostor.jpg',
    galleryImages: [
      {
        url: '/images/artworks/vnitrni-prostor.jpg',
        alt: 'Vnitřní prostor - refrakce světla ve skle',
        label: 'Průchod světla',
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
    title: 'Kinetická rovnováha',
    subtitle: 'Gravitační osa',
    year: 2022,
    category: 'steel-glass',
    material: 'Kovaná konstrukční ocel, grafitový mikroskopický nátěr',
    dimensions: {
      height: 215,
      width: 90,
      depth: 60,
      weight: 115,
    },
    description:
      'Prostorové těleso balancující na jediném kaleném hrotu. I přes značnou hmotnost ocelové hmoty reaguje na dotek ruky jemným pomalým houpáním.',
    curatorNote:
      'Představeno na bienále v Linci, následně zakoupeno rakouskou nadací současného umění.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Zahraniční soukromá sbírka, Vídeň',
    heroImage: '/images/artworks/kineticka-rovnovaha.jpg',
    galleryImages: [
      {
        url: '/images/artworks/kineticka-rovnovaha.jpg',
        alt: 'Kinetická rovnováha - vertikální kompozice',
        label: 'Celkový pohled',
      },
    ],
    featured: false,
    sortOrder: 5,
  },
  {
    id: 'geometrie-ticha',
    slug: 'geometrie-ticha',
    code: 'VM-06',
    title: 'Geometrie ticha',
    subtitle: 'Architektonický rytmus',
    year: 2024,
    category: 'stone',
    material: 'Leštěný římský travertin, vkládaná patinovaná mosaz',
    dimensions: {
      height: 82,
      width: 34,
      depth: 30,
      weight: 48,
    },
    description:
      'Striktní geometrické těleso s pórovitou texturou travertinu, do které jsou zapuštěny tenké mosazné proužky. Každá ze čtyř stran nabízí jinou prostorovou kompozici.',
    curatorNote: 'Novinka z ateliéru, dokončeno v září 2024. Doporučeno do minimalistických interiérů.',
    status: 'available',
    priceMode: 'on_request',
    price: 'Cena na dotaz',
    heroImage: '/images/artworks/geometrie-ticha.jpg',
    galleryImages: [
      {
        url: '/images/artworks/geometrie-ticha.jpg',
        alt: 'Geometrie ticha - travertin a mosaz',
        label: 'Čelní pohled',
      },
    ],
    featured: false,
    sortOrder: 6,
  },
  {
    id: 'torzo-pameti',
    slug: 'torzo-pameti',
    code: 'VM-07',
    title: 'Torzo paměti',
    subtitle: 'Hutná matériovost',
    year: 2021,
    category: 'bronze',
    material: 'Šedá litina, zrnitý povrch, přírodní včelí vosk',
    dimensions: {
      height: 95,
      width: 48,
      depth: 36,
      weight: 78,
    },
    description:
      'Litinový odlitek ze ztracené voskové formy. Povrch si uchoval hrubou texturu licího písku a byl konzervován horkým včelím voskem s grafitovým pigmentem.',
    curatorNote: 'Základní kámen raného cyklu „Archeologie hmoty“.',
    status: 'sold',
    priceMode: 'hidden',
    provenance: 'Soukromá sbírka, Brno',
    heroImage: '/images/artworks/torzo-pameti.jpg',
    galleryImages: [
      {
        url: '/images/artworks/torzo-pameti.jpg',
        alt: 'Torzo paměti - litina',
        label: 'Celkový pohled',
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
    subtitle: 'Monumentální figura',
    year: 2023,
    category: 'bronze',
    material: 'Tmavý patinovaný bronz s tyrkysovým oxidem',
    dimensions: {
      height: 192,
      width: 50,
      depth: 44,
      weight: 108,
    },
    description:
      'Působivá monumentální plastika evokující stylizovanou strážní postavu. Hluboká čerň patiny kontrastuje s tyrkysovými akcenty v záhybech a hranách díla.',
    curatorNote: 'Ústřední exponát podzimní výstavy v Galerii Nová síň.',
    status: 'available',
    priceMode: 'fixed',
    price: '320 000 Kč',
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
      'Samostatná retrospektivní výstava představující bronzové plastiky a kamenné monolitické práce z let 2022–2026. Slavnostní vernisáž se uskuteční ve čtvrtek 15. listopadu od 18:00.',
    mapUrl: 'https://maps.google.com/?q=Galerie+Nova+sin+Praha',
    externalEventUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vernisáž+Tvary+paměti+-+MgA.+Viktor+Marek&dates=20261115T170000Z/20261115T210000Z&details=Slavnostní+vernisáž+sochařských+děl+v+Galerii+Nová+síň&location=Galerie+Nová+síň,+Praha',
  },
  {
    id: 'dialog-materialu-2025',
    slug: 'dialog-materialu-2025',
    title: 'Dialog materiálů: Bronz a sklo',
    type: 'group',
    venue: 'Dům umění města Brna',
    city: 'Brno',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    datesFormatted: 'Duben – Červen 2025',
    curator: 'Mgr. Tomáš Vlček',
    description:
      'Společná kurátorská expozice tří současných českých sochařů zkoumající refrakci světla a vnitřní strukturu litého kovu.',
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
      'Mezinárodní přehlídka velkoformátového sochařství se zaměřením na kortenové oceli a architektonické zásahy do krajiny.',
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
      'Cyklus mramorových skulptur vzniklých během tvůrčího pobytu v italské Carraře.',
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
