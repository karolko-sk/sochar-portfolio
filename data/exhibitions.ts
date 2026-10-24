import { Exhibition } from '@/types';

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 'tvary-pameti-2026',
    title: 'Tvary paměti: Hmota a prostor',
    type: 'solo',
    status: 'upcoming',
    venue: 'Galerie Nová síň',
    city: 'Praha 1',
    dates: '15. 11. – 12. 12. 2026',
    curator: 'PhDr. Helena Rejchrtová',
    description: 'Samostatná retrospektivní výstava představující bronzové plastiky a kamenné monolitické práce z let 2022–2026. Slavnostní vernisáž se uskuteční ve čtvrtek 15. listopadu od 18:00.',
    mapUrl: 'https://maps.google.com/?q=Galerie+Nova+sin+Praha',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vernisáž+Tvary+paměti+-+MgA.+Viktor+Marek&dates=20261115T170000Z/20261115T210000Z&details=Slavnostní+vernisáž+sochařských+děl+v+Galerii+Nová+síň&location=Galerie+Nová+síň,+Praha'
  },
  {
    id: 'dialog-materialu-2025',
    title: 'Dialog materiálů: Bronz a sklo',
    type: 'group',
    status: 'past',
    venue: 'Dům umění města Brna',
    city: 'Brno',
    dates: 'Duben – Červen 2025',
    curator: 'Mgr. Tomáš Vlček',
    description: 'Společná kurátorská expozice tří současných českých sochařů zkoumající refrakci světla a vnitřní strukturu litého kovu.'
  },
  {
    id: 'mezi-architekturou-2024',
    title: 'Plastika ve veřejném prostoru',
    type: 'group',
    status: 'past',
    venue: 'Kunsthalle Wien',
    city: 'Vídeň, Rakousko',
    dates: 'Září – Říjen 2024',
    curator: 'Dr. Stefan Gruber',
    description: 'Mezinárodní přehlídka velkoformátového sochařství se zaměřením na kortenové oceli a architektonické zásahy do krajiny.'
  },
  {
    id: 'vnitrni-ticho-2023',
    title: 'Vnitřní ticho (Solitérní práce)',
    type: 'solo',
    status: 'past',
    venue: 'Galerie moderního umění',
    city: 'Hradec Králové',
    dates: 'Leden – Březen 2023',
    curator: 'Mgr. Alena Křížová',
    description: 'Cyklus mramorových skulptur vzniklých během tvůrčího pobytu v italské Carraře.'
  }
];
