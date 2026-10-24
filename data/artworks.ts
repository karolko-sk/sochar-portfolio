import { Artwork } from '@/types';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'monolit-vii',
    code: 'VM-01',
    title: 'Monolit VII',
    subtitle: 'Tichá vertikála',
    material: 'Patinovaný bronz, leštěný černý diabas',
    category: 'bronze',
    year: 2024,
    dimensions: {
      height: 186,
      width: 42,
      depth: 38,
      weight: 94,
    },
    status: 'available',
    price: '280 000 Kč',
    description: 'Monumentální vertikální plastika zkoumající rovnováhu mezi vnitřním pnutím litého bronzu a chladnou stabilitou kamenného soklu. Povrch nese jemnou zelenou oxidaci přecházející v temně hnědou hloubku.',
    curatorNote: 'Dílo z cyklu „Vertikály paměti“, kde autor redukuje figuru na čistý energetický sloup. Vhodné pro reprezentativní interiéry i zastřešená atria.',
    primaryImage: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1400&q=85',
        alt: 'Monolit VII - celkový pohled',
        label: 'Celkový pohled'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1400&q=85',
        alt: 'Monolit VII - detail bronzové patiny',
        label: 'Detail patiny'
      },
      {
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=85',
        alt: 'Monolit VII - profil a hra stínů',
        label: 'Profil a plasticita'
      }
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-marble-statue-in-a-museum-41481-large.mp4',
    scaleProfile: 'human-tall'
  },
  {
    id: 'prasklina-casu',
    code: 'VM-02',
    title: 'Prasklina času',
    subtitle: 'Komorní reflexe',
    material: 'Bílý slivenecký mramor, ruční pemrlování',
    category: 'stone',
    year: 2023,
    dimensions: {
      height: 68,
      width: 52,
      depth: 40,
      weight: 62,
    },
    status: 'sold',
    provenance: 'Soukromá sbírka, Praha 6',
    description: 'Blok krystalického mramoru rozetnutý kontrolovaným lomem a následně zjemněný ručním broušením vnitřních ploch. Kontrast surové lomy a hedvábného lesku vnitřní štěrbiny.',
    curatorNote: 'Oceněno Cenou kritiky na Mezinárodním sochařském bienále 2023.',
    primaryImage: 'https://images.unsplash.com/photo-1569172122301-bc500f309134?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1569172122301-bc500f309134?auto=format&fit=crop&w=1400&q=85',
        alt: 'Prasklina času - celková kompozice',
        label: 'Celkový pohled'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85',
        alt: 'Prasklina času - makro struktury kamene',
        label: 'Makro lomu'
      }
    ],
    scaleProfile: 'pedestal'
  },
  {
    id: 'cortenova-vlna',
    code: 'VM-03',
    title: 'Cortenová vlna',
    subtitle: 'Exteriérová dynamika',
    material: 'Svařovaná ocel Corten s přirozenou stabilizovanou rzí',
    category: 'steel-glass',
    year: 2024,
    dimensions: {
      height: 145,
      width: 70,
      depth: 55,
      weight: 85,
    },
    status: 'reserved',
    price: '210 000 Kč',
    description: 'Prostorová křivka tvarovaná ze tří masivních plátů kortenové oceli. Dílo je konstruováno pro venkovní umístění, kde vlivem srážek a slunce neustále mění barevný odstín sametové rzi.',
    curatorNote: 'Rezervováno pro privátní rezidenční zahradu v Průhonicích. Možnost objednání autorské variace.',
    primaryImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=85',
        alt: 'Cortenová vlna - venkovní instalace',
        label: 'Exteriérový záběr'
      },
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85',
        alt: 'Cortenová vlna - detail svařované hrany',
        label: 'Detail rzi a hrany'
      }
    ],
    scaleProfile: 'human-medium'
  },
  {
    id: 'vnitrni-prostor',
    code: 'VM-04',
    title: 'Vnitřní prostor',
    subtitle: 'Světelná refrakce',
    material: 'Tavené hutní sklo v kouřovém tónu, kouřový dubový masiv',
    category: 'steel-glass',
    year: 2024,
    dimensions: {
      height: 54,
      width: 38,
      depth: 32,
      weight: 26,
    },
    status: 'available',
    price: '165 000 Kč',
    description: 'Optický monolit z taveného skla usazený do hluboce kartáčovaného dubového dřeva. Světlo procházející skleněným jádrem vrhá na okolní stěny proměnlivé prismatické odlesky.',
    curatorNote: 'Práce realizovaná ve spolupráci se sklářskými mistry v Železném Brodě.',
    primaryImage: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1400&q=85',
        alt: 'Vnitřní prostor - refrakce světla ve skle',
        label: 'Průchod světla'
      },
      {
        url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1400&q=85',
        alt: 'Vnitřní prostor - usazení do dřeva',
        label: 'Detail dubového soklu'
      }
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-reflection-of-light-on-a-museum-sculpture-41484-large.mp4',
    scaleProfile: 'pedestal'
  },
  {
    id: 'kineticka-rovnovaha',
    code: 'VM-05',
    title: 'Kinetická rovnováha',
    subtitle: 'Gravitační osa',
    material: 'Kovaná konstrukční ocel, grafitový mikroskopický nátěr',
    category: 'steel-glass',
    year: 2022,
    dimensions: {
      height: 215,
      width: 90,
      depth: 60,
      weight: 115,
    },
    status: 'sold',
    provenance: 'Zahraniční soukromá sbírka, Vídeň',
    description: 'Prostorové těleso balancující na jediném kaleném hrotu. I přes značnou hmotnost ocelové hmoty reaguje na dotek ruky jemným pomalým houpáním.',
    curatorNote: 'Představeno na bienále v Linci, následně zakoupeno rakouskou nadací současného umění.',
    primaryImage: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1400&q=85',
        alt: 'Kinetická rovnováha - vertikální kompozice',
        label: 'Celkový pohled'
      }
    ],
    scaleProfile: 'human-tall'
  },
  {
    id: 'geometrie-ticha',
    code: 'VM-06',
    title: 'Geometrie ticha',
    subtitle: 'Architektonický rytmus',
    material: 'Leštěný římský travertin, vkládaná patinovaná mosaz',
    category: 'stone',
    year: 2024,
    dimensions: {
      height: 82,
      width: 34,
      depth: 30,
      weight: 48,
    },
    status: 'available',
    price: 'Cena na dotaz',
    description: 'Striktní geometrické těleso s pórovitou texturou travertinu, do které jsou zapuštěny tenké mosazné proužky. Každá ze čtyř stran nabízí jinou prostorovou kompozici.',
    curatorNote: 'Novinka z ateliéru, dokončeno v září 2024. Doporučeno do minimalistických interiérů.',
    primaryImage: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=1400&q=85',
        alt: 'Geometrie ticha - travertin a mosaz',
        label: 'Čelní pohled'
      }
    ],
    scaleProfile: 'pedestal'
  },
  {
    id: 'torzo-pameti',
    code: 'VM-07',
    title: 'Torzo paměti',
    subtitle: 'Hutná matériovost',
    material: 'Šedá litina, zrnitý povrch, přírodní včelí vosk',
    category: 'bronze',
    year: 2021,
    dimensions: {
      height: 95,
      width: 48,
      depth: 36,
      weight: 78,
    },
    status: 'sold',
    provenance: 'Soukromá sbírka, Brno',
    description: 'Litinový odlitek ze ztracené voskové formy. Povrch si uchoval hrubou texturu licího písku a byl konzervován horkým včelím voskem s grafitovým pigmentem.',
    curatorNote: 'Základní kámen raného cyklu „Archeologie hmoty“.',
    primaryImage: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1400&q=85',
        alt: 'Torzo paměti - litina',
        label: 'Celkový pohled'
      }
    ],
    scaleProfile: 'pedestal'
  },
  {
    id: 'nocni-strazce',
    code: 'VM-08',
    title: 'Noční strážce',
    subtitle: 'Monumentální figura',
    material: 'Tmavý patinovaný bronz s tyrkysovým oxidem',
    category: 'bronze',
    year: 2023,
    dimensions: {
      height: 192,
      width: 50,
      depth: 44,
      weight: 108,
    },
    status: 'available',
    price: '320 000 Kč',
    description: 'Působivá monumentální plastika evokující stylizovanou strážní postavu. Hluboká čerň patiny kontrastuje s tyrkysovými akcenty v záhybech a hranách díla.',
    curatorNote: 'Ústřední exponát podzimní výstavy v Galerii Nová síň.',
    primaryImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1400&q=85',
        alt: 'Noční strážce - bronzová plastika',
        label: 'Celkový pohled'
      },
      {
        url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&w=1400&q=85',
        alt: 'Noční strážce - detail oxidu v záhybech',
        label: 'Detail patiny'
      }
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-marble-statue-in-a-museum-41481-large.mp4',
    scaleProfile: 'human-tall'
  }
];
