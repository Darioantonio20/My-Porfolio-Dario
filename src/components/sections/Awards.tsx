'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import CedulaProfesional from '@/assets/img/certifications/CedulaProfesional.png';
import ConstanciaEgreso from '@/assets/img/university/ConstanciadeEgreso.png';
import ConstanciaTitulacion from '@/assets/img/university/ConstanciaTitulacion.png';
import ConstanciaToefl from '@/assets/img/university/PuntajeTOEFEL.png';
import KardexUpHoja1 from '@/assets/img/university/KardexUpHoja1.png';
import KardexUpHoja2 from '@/assets/img/university/KardexUpHoja2.png';
import CertificadoCOEPES from '@/assets/img/certifications/CertificadoCOEPES.png';
import CartaLiberacionEstadia from '@/assets/img/university/CartaLiberacionEstadia.png';
import CertificadoPreparatoriaHoja1 from '@/assets/img/highschool/CertificadoPreparatoriaHoja1.png';
import CertificadoPreparatoriaHoja2 from '@/assets/img/highschool/CertificadoPreparatoriaHoja2.png';
import CertificadoPreparatoriaHoja3 from '@/assets/img/highschool/CertificadoPreparatoriaHoja3.png';
//Badges AWS
import BadgeAWSCloudFoundations from '@/assets/img/badges/AWSAcademyCloudFoundations.png';
import AWSAcademyCloudDeveloping from '@/assets/img/badges/AWSAcademyCloudDeveloping.png';
import AWSAcademyIntroductiontoCloudSemester1 from '@/assets/img/badges/AWSAcademyIntroductiontoCloudSemester1.png';
import AWSAcademyCloudSecurityFoundations from '@/assets/img/badges/AWSAcademyCloudSecurityFoundations.png';
//Badges CISCO
import NetworkingBasics from '@/assets/img/badges/NetworkingBasics.png';
import NetworkSupportandSecurity from '@/assets/img/badges/NetworkSupportandSecurity.png';
import OperatingSystemsBasics from '@/assets/img/badges/OperatingSystemsBasics.png';
import EndpointSecurity from '@/assets/img/badges/EndpointSecurity.png';
import IntroductiontoCybersecurity from '@/assets/img/badges/IntroductiontoCybersecurity.png';
//Badges Google
import CertificadodeMarketingDigitalEcommercedeGoogle from '@/assets/img/badges/CertificadodeMarketingDigitalEcommercedeGoogle.png';
import GoogleMarketingDigitaleECommerce from '@/assets/img/badges/GoogleMarketingDigitaleECommerce.png';
import FundamentosDelMarketingDigitalYComercioElectronico from '@/assets/img/badges/Fundamentosdelmarketingdigitalycomercioelectronico.png';
import DeMeGustaaLeadsInteractúaConLasYLosClientesEnLínea from '@/assets/img/badges/DeMeGustaaLeadsInteractuaConLasYLosClientesEnLinea.png';
import CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico from '@/assets/img/badges/CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico.png';
import ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico from '@/assets/img/badges/ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico.png';
import InteractuarConMedianteElMarketingDigital from '@/assets/img/badges/InteractuarConMedianteElMarketingDigital.png';

const PanZoom = dynamic(() => import('react-easy-panzoom'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center text-sm text-cyan-200/70">
      Loading document...
    </div>
  ),
});

const awards: Array<{
  title: string;
  description: string;
  image?: StaticImageData;
  images?: StaticImageData[];
  type: string;
  date: string;
  category: string;
}> = [
  {
    title: 'Certificate of Title in Progress - UP Chiapas',
    description: 'Software Engineering, University Politécnica de Chiapas, 2025',
    image: ConstanciaTitulacion,
    type: 'Certificate',
    date: 'June 2025',
    category: 'University',
  },
  {
    title: 'Certificate of Graduation - UP Chiapas',
    description: 'Software Engineering, University Politécnica de Chiapas, 2025',
    image: ConstanciaEgreso,
    type: 'Certificate',
    date: 'May 2025',
    category: 'University',
  },
  {
    title: 'Certificate of TOEFL ITP - UP Chiapas',
    description: 'TOEFL ITP Score - University Politécnica de Chiapas, 2025',
    image: ConstanciaToefl,
    type: 'Certificate',
    date: 'November 2024',
    category: 'University',
  },
  {
    title: 'Complete Transcript - UP Chiapas',
    description: 'Complete university transcript, University Politécnica de Chiapas, 2025',
    images: [KardexUpHoja1, KardexUpHoja2],
    type: 'Transcript',
    date: 'July 2025',
    category: 'University',
  },
  {
    title: 'COEPES Certificate',
    description: 'Certificate of participation in COEPES, 2024',
    image: CertificadoCOEPES,
    type: 'Certificate',
    date: 'September 2024',
    category: 'Certifications',
  },
  {
    title: 'Letter of Release of Internship',
    description: 'Letter of release of professional internship from the University Politécnica de Chiapas - 2025',
    image: CartaLiberacionEstadia,
    type: 'Certificate',
    date: 'January - April 2025',
    category: 'University',
  },
  {
    title: 'High School Diploma',
    description: 'High School Diploma, 2024',
    images: [CertificadoPreparatoriaHoja1, CertificadoPreparatoriaHoja2, CertificadoPreparatoriaHoja3],
    type: 'Diploma',
    date: 'August 2017 - July 2020',
    category: 'High School',
  },
  {
    title: 'Professional Certificate',
    description: 'Professional Certificate, 2025',
    image: CedulaProfesional,
    type: 'Certificate',
    date: 'November 2025',
    category: 'Certifications',
  },
];

type BadgeProvider = 'AWS' | 'Cisco' | 'Google';
type BadgeTrack = 'Cloud' | 'Cybersecurity' | 'Marketing';
type BadgePlatform = 'Credly' | 'Coursera';
type BadgeFilter = 'All' | BadgeProvider;

const badgeProviders: BadgeFilter[] = ['All', 'AWS', 'Cisco', 'Google'];

const providerStyles: Record<BadgeProvider, string> = {
  AWS: 'border-amber-300/30 bg-amber-400/12 text-amber-200',
  Cisco: 'border-cyan-300/30 bg-cyan-400/12 text-cyan-200',
  Google: 'border-emerald-300/30 bg-emerald-400/12 text-emerald-200',
};

const trackStyles: Record<BadgeTrack, string> = {
  Cloud: 'text-sky-200',
  Cybersecurity: 'text-violet-200',
  Marketing: 'text-emerald-200',
};

const badges: Array<{
  id: string;
  title: string;
  url: string;
  img: string | StaticImageData;
  platform: BadgePlatform;
  provider: BadgeProvider;
  issuedLabel: string;
  issuedOrder: number;
  track: BadgeTrack;
  skills: string[];
  featured?: boolean;
}> = [
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    url: 'https://www.credly.com/badges/22b9c5b2-50a7-4a23-bd0d-e8bd1561d36a/linked_in_profile',
    img: BadgeAWSCloudFoundations,
    platform: 'Credly',
    provider: 'AWS',
    issuedLabel: '2024',
    issuedOrder: 202404,
    track: 'Cloud',
    skills: ['AWS', 'Cloud Basics', 'Infrastructure'],
  },
  {
    id: 'aws-intro-cloud-s1',
    title: 'AWS Academy Introduction to Cloud (Semester 1)',
    url: 'https://www.credly.com/badges/4c1c4aa6-f531-4635-a23a-d0cb112f1e31/linked_in_profile',
    img: AWSAcademyIntroductiontoCloudSemester1,
    platform: 'Credly',
    provider: 'AWS',
    issuedLabel: '2024',
    issuedOrder: 202406,
    track: 'Cloud',
    skills: ['AWS', 'Cloud Concepts', 'Cloud Services'],
    featured: true,
  },
  {
    id: 'aws-cloud-developing',
    title: 'AWS Academy Cloud Developing',
    url: 'https://www.credly.com/badges/6c226820-4530-4528-bd8b-5de421532070/linked_in_profile',
    img: AWSAcademyCloudDeveloping,
    platform: 'Credly',
    provider: 'AWS',
    issuedLabel: '2025',
    issuedOrder: 202502,
    track: 'Cloud',
    skills: ['AWS', 'Cloud Development', 'Application Design'],
    featured: true,
  },
  {
    id: 'aws-cloud-security-foundations',
    title: 'AWS Academy Cloud Security Foundations',
    url: 'https://www.credly.com/badges/a62185aa-be22-4483-82db-402ab5336101/linked_in_profile',
    img: AWSAcademyCloudSecurityFoundations,
    platform: 'Credly',
    provider: 'AWS',
    issuedLabel: '2025',
    issuedOrder: 202503,
    track: 'Cybersecurity',
    skills: ['AWS Security', 'Cloud Security', 'Risk Management'],
    featured: true,
  },
  {
    id: 'cisco-networking-basics',
    title: 'Networking Basics',
    url: 'https://www.credly.com/badges/35f93d61-e44e-4977-967d-e2f51a4cbb90/linked_in_profile',
    img: NetworkingBasics,
    platform: 'Credly',
    provider: 'Cisco',
    issuedLabel: '2024',
    issuedOrder: 202405,
    track: 'Cybersecurity',
    skills: ['Networking', 'OSI Model', 'Network Fundamentals'],
  },
  {
    id: 'cisco-network-support-security',
    title: 'Network Support and Security',
    url: 'https://www.credly.com/badges/35ce798f-6caf-4822-8ae1-a027daf866a3/linked_in_profile',
    img: NetworkSupportandSecurity,
    platform: 'Credly',
    provider: 'Cisco',
    issuedLabel: '2024',
    issuedOrder: 202407,
    track: 'Cybersecurity',
    skills: ['Network Security', 'IT Support', 'Troubleshooting'],
    featured: true,
  },
  {
    id: 'cisco-os-basics',
    title: 'Operating Systems Basics',
    url: 'https://www.credly.com/badges/ad58ab2a-741a-4ac7-9d3c-e1b0c619ffac/linked_in_profile',
    img: OperatingSystemsBasics,
    platform: 'Credly',
    provider: 'Cisco',
    issuedLabel: '2024',
    issuedOrder: 202408,
    track: 'Cybersecurity',
    skills: ['Operating Systems', 'System Administration', 'Core IT'],
  },
  {
    id: 'cisco-endpoint-security',
    title: 'Endpoint Security',
    url: 'https://www.credly.com/badges/4a15b2d8-fab1-4820-8ed4-aace1da38b26/linked_in_profile',
    img: EndpointSecurity,
    platform: 'Credly',
    provider: 'Cisco',
    issuedLabel: '2024',
    issuedOrder: 202409,
    track: 'Cybersecurity',
    skills: ['Endpoint Protection', 'Device Security', 'Threat Prevention'],
  },
  {
    id: 'cisco-intro-cybersecurity',
    title: 'Introduction to Cybersecurity',
    url: 'https://www.credly.com/badges/3b93c9ef-08cb-4377-b9c7-c488051dd4d2/linked_in_profile',
    img: IntroductiontoCybersecurity,
    platform: 'Credly',
    provider: 'Cisco',
    issuedLabel: '2024',
    issuedOrder: 202410,
    track: 'Cybersecurity',
    skills: ['Cybersecurity', 'Threat Landscape', 'Security Foundations'],
    featured: true,
  },
  {
    id: 'google-dm-ecommerce-cert',
    title: 'Google Digital Marketing & E-commerce Certificate',
    url: 'https://www.credly.com/badges/83e02fce-50b4-4cef-9638-69a76d9fdffe/linked_in_profile',
    img: CertificadodeMarketingDigitalEcommercedeGoogle,
    platform: 'Credly',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202501,
    track: 'Marketing',
    skills: ['Digital Marketing', 'E-commerce', 'Analytics'],
    featured: true,
  },
  {
    id: 'google-marketing-specialization',
    title: 'Google Marketing Digital e E-Commerce',
    url: 'https://www.coursera.org/account/accomplishments/specialization/8CTJHFRMQ6Q8',
    img: GoogleMarketingDigitaleECommerce,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202502,
    track: 'Marketing',
    skills: ['Marketing Strategy', 'Content', 'Campaign Planning'],
  },
  {
    id: 'google-foundations-dm-ecommerce',
    title: 'Foundations of Digital Marketing and E-commerce',
    url: 'https://www.coursera.org/account/accomplishments/verify/XTGLZMU85JHQ',
    img: FundamentosDelMarketingDigitalYComercioElectronico,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202503,
    track: 'Marketing',
    skills: ['Digital Fundamentals', 'E-commerce Basics', 'Market Research'],
  },
  {
    id: 'google-from-likes-to-leads',
    title: 'From Likes to Leads: Interact with Customers Online',
    url: 'https://www.coursera.org/account/accomplishments/verify/C8X4MFH5BL5D',
    img: DeMeGustaaLeadsInteractúaConLasYLosClientesEnLínea,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202504,
    track: 'Marketing',
    skills: ['Lead Generation', 'Social Media', 'Customer Engagement'],
  },
  {
    id: 'google-creativity-inbox',
    title: 'Creativity in the Inbox: Email Marketing',
    url: 'https://www.coursera.org/account/accomplishments/verify/2VJ7MADLG369',
    img: CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202505,
    track: 'Marketing',
    skills: ['Email Marketing', 'Automation', 'Retention'],
  },
  {
    id: 'google-make-the-sale',
    title: 'Make the Sale: Create, Launch, and Manage E-commerce Stores',
    url: 'https://www.coursera.org/account/accomplishments/verify/6UQWURGK4JJA',
    img: ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202506,
    track: 'Marketing',
    skills: ['Store Operations', 'Conversion', 'E-commerce Management'],
  },
  {
    id: 'google-attract-engage-customers',
    title: 'Attract and Engage Customers with Digital Marketing',
    url: 'https://www.coursera.org/account/accomplishments/verify/2P94NJWCYDAZ',
    img: InteractuarConMedianteElMarketingDigital,
    platform: 'Coursera',
    provider: 'Google',
    issuedLabel: '2025',
    issuedOrder: 202507,
    track: 'Marketing',
    skills: ['Customer Acquisition', 'Engagement', 'Marketing Funnels'],
  },
];

const awardsByCategory = awards.reduce((acc, award) => {
  if (!acc[award.category]) {
    acc[award.category] = [];
  }

  acc[award.category].push(award);
  return acc;
}, {} as Record<string, typeof awards>);

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 650;
    const startValue = 0;
    const startTime = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const nextValue = Math.round(startValue + (value - startValue) * progress);
      setCount(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{count}</span>;
};

const Awards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [modalImgs, setModalImgs] = useState<string[] | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const panzoomRef = useRef<unknown>(null);
  const [fade, setFade] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>('All');
  const [badgeSearch, setBadgeSearch] = useState('');

  const badgeHighlights = useMemo(
    () => badges.filter((badge) => badge.featured).slice(0, 4),
    []
  );

  const badgeStats = useMemo(
    () => ({
      total: badges.length,
      cloud: badges.filter((badge) => badge.track === 'Cloud').length,
      cybersecurity: badges.filter((badge) => badge.track === 'Cybersecurity').length,
      marketing: badges.filter((badge) => badge.track === 'Marketing').length,
    }),
    []
  );

  const filteredBadges = useMemo(() => {
    const searchValue = badgeSearch.trim().toLowerCase();
    let nextBadges = badges.filter((badge) => {
      const providerMatch = badgeFilter === 'All' || badge.provider === badgeFilter;
      const searchMatch =
        searchValue === '' ||
        `${badge.title} ${badge.provider} ${badge.track} ${badge.skills.join(' ')}`
          .toLowerCase()
          .includes(searchValue);

      return providerMatch && searchMatch;
    });

    nextBadges = [...nextBadges].sort((a, b) => b.issuedOrder - a.issuedOrder);

    return nextBadges;
  }, [badgeFilter, badgeSearch]);

  const openModal = (
    imgOrImgs: string | StaticImageData | Array<string | StaticImageData>,
    title: string
  ) => {
    if (Array.isArray(imgOrImgs)) {
      const imgs = imgOrImgs.map(i => typeof i === 'string' ? i : i.src);
      setModalImgs(imgs);
      setModalImg(null);
      setActiveImgIdx(0);
    } else {
      setModalImg(typeof imgOrImgs === 'string' ? imgOrImgs : imgOrImgs.src);
      setModalImgs(null);
      setActiveImgIdx(0);
    }
    setModalTitle(title);
    setZoom(1);
    setModalOpen(true);
    setTimeout(() => setFade(true), 10);
  };
  const closeModal = () => {
    setFade(false);
    setTimeout(() => {
      setModalOpen(false);
      setModalImg(null);
      setModalImgs(null);
      setModalTitle(null);
      setZoom(1);
    }, 250);
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };
  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
    (panzoomRef.current as unknown as { zoomIn?: () => void })?.zoomIn?.();
  };
  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
    (panzoomRef.current as unknown as { zoomOut?: () => void })?.zoomOut?.();
  };
  const handleZoomReset = () => {
    setZoom(1);
    (panzoomRef.current as unknown as { autoCenter?: () => void; reset?: () => void })?.autoCenter?.();
    (panzoomRef.current as unknown as { autoCenter?: () => void; reset?: () => void })?.reset?.();
  };
  // Doble click para zoom in/out
  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2);
      (panzoomRef.current as unknown as { zoomTo?: (z: number, x: number, y: number) => void })?.zoomTo?.(2, 0, 0);
    } else {
      handleZoomReset();
    }
  };
  
  const getFolderIcon = (category: string) => {
    switch (category) {
      case 'University':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'Certificaciones':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'Preparatoria':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
        );
    }
  };

  return (
    <section id="awards" className="py-20 bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 sm:mb-28 md:mb-32 px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words leading-tight">
            Awards & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Certificates</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-cyan-200 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto leading-snug">
            Here you can see my academic, professional achievements and certifications.
          </p>
        </div>

        {/* Sistema de Carpetas */}
        <div className="w-full max-w-full sm:max-w-6xl mx-auto mb-10 px-1 sm:px-0">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row items-center gap-4 xs:gap-6 sm:gap-10 md:gap-12 lg:gap-32 justify-center">
            {Object.entries(awardsByCategory).map(([category, categoryAwards]) => (
              <div key={category} className="relative flex justify-center items-start mt-8 mb-8 lg:mt-0 lg:mb-0">
                {/* Carpeta 3D y archivos */}
                <div
                  className="relative group flex flex-col items-center justify-center"
                  onMouseEnter={() => setExpandedFolders([category])}
                  onMouseLeave={() => setExpandedFolders([])}
                  onFocus={() => setExpandedFolders([category])}
                  onBlur={() => setExpandedFolders([])}
                  tabIndex={0}
                >
                  <div
                    className={`file relative w-28 h-20 xs:w-36 xs:h-24 sm:w-48 sm:h-32 md:w-60 md:h-40 cursor-pointer origin-bottom [perspective:1500px] z-10 transition-all duration-500 ${expandedFolders.includes(category) ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <div
                      className={`work-5 bg-gradient-to-br from-amber-500 to-amber-700 w-full h-full origin-top rounded-2xl rounded-tl-none transition-all ease duration-500 relative border-2 border-amber-600 after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-12 xs:after:w-20 after:h-3 xs:after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] xs:before:-top-[15px] before:left-[40px] xs:before:left-[75.5px] before:w-3 xs:before:w-4 before:h-3 xs:before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%)] ${expandedFolders.includes(category) ? 'shadow-[0_20px_40px_rgba(202,138,4,0.25)]' : 'group-hover:shadow-[0_20px_40px_rgba(202,138,4,0.25)]'}`}
                    ></div>
                    <div
                      className={`work-4 absolute inset-1 bg-amber-500 rounded-2xl transition-all ease duration-500 origin-bottom select-none border-2 border-amber-600 ${expandedFolders.includes(category) ? '[transform:rotateX(-20deg)]' : 'group-hover:[transform:rotateX(-20deg)]'}`}
                    ></div>
                    <div
                      className={`work-3 absolute inset-1 bg-amber-400 rounded-2xl transition-all ease duration-500 origin-bottom border-2 border-amber-600 ${expandedFolders.includes(category) ? '[transform:rotateX(-30deg)]' : 'group-hover:[transform:rotateX(-30deg)]'}`}
                    ></div>
                    <div
                      className={`work-2 absolute inset-1 bg-amber-300 rounded-2xl transition-all ease duration-500 origin-bottom border-2 border-amber-600 ${expandedFolders.includes(category) ? '[transform:rotateX(-38deg)]' : 'group-hover:[transform:rotateX(-38deg)]'}`}
                    ></div>
                    <div
                      className={`work-1 absolute bottom-0 bg-gradient-to-t from-amber-700 to-amber-500 w-full h-[70px] xs:h-[100px] sm:h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[60px] xs:after:w-[146px] after:h-[10px] xs:after:h-[16px] after:bg-amber-500 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[5px] xs:before:-top-[10px] before:right-[40px] xs:before:right-[142px] before:size-2 xs:before:size-3 before:bg-amber-600 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%)] transition-all ease duration-500 origin-bottom flex items-end border-2 border-amber-600 ${expandedFolders.includes(category) ? 'shadow-[inset_0_20px_40px_#d97706,_inset_0_-20px_40px_#b45309] [transform:rotateX(-46deg)_translateY(1px)]' : 'group-hover:shadow-[inset_0_20px_40px_#d97706,_inset_0_-20px_40px_#b45309] group-hover:[transform:rotateX(-46deg)_translateY(1px)]'}`}
                    >
                      {/* Contenido de la carpeta */}
                      <div className="absolute inset-0 flex items-center justify-center p-2 xs:p-4">
                        <div className="flex items-center space-x-2 xs:space-x-3">
                          {/* Icono de la carpeta */}
                          <div className="w-6 h-6 xs:w-8 xs:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            {getFolderIcon(category)}
                          </div>
                          {/* Información */}
                          <div className="text-center">
                            <h3 className="text-[11px] xs:text-xs sm:text-sm font-semibold text-white drop-shadow-lg">{category}</h3>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-blue-100">{categoryAwards.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Etiqueta de la carpeta */}
                  <p className="text-base xs:text-lg font-semibold text-white mt-2 xs:mt-4 opacity-80">{category}</p>
                  {/* Archivos alrededor de la carpeta */}
                  <div className={`absolute inset-0 -top-10 xs:-top-16 -left-10 xs:-left-16 -right-10 xs:-right-16 -bottom-10 xs:-bottom-16 transition-all duration-700 z-50 ${expandedFolders.includes(category) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {categoryAwards.map((award, idx) => {
                      // Distribuir de 0° (arriba) a 90° (derecha)
                      const totalItems = categoryAwards.length;
                      const angle = totalItems === 1 ? 0 : (idx / (totalItems - 1)) * 90; // 0 a 90 grados
                      const radius = expandedFolders.includes(category) ? 180 : 0;
                      const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                      const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                      const scale = expandedFolders.includes(category) ? 1 : 0;
                      return (
                        <div
                          key={idx}
                          className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 cursor-pointer group hover:bg-white/20 transition-all duration-700 hover:scale-110 transform"
                          style={{ 
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            opacity: expandedFolders.includes(category) ? 1 : 0,
                            transitionDelay: expandedFolders.includes(category) ? `${idx * 200}ms` : '0ms',
                            transitionDuration: expandedFolders.includes(category) ? '0.7s' : '0.4s',
                            pointerEvents: expandedFolders.includes(category) ? 'auto' : 'none',
                            zIndex: 50
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(award.images ? award.images : (award.image ? award.image : ''), award.title);
                          }}
                        >
                          {/* Icono de documento */}
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-8 relative rounded border border-white/30 overflow-hidden bg-white shadow-sm">
                              <Image
                                src={award.images ? (typeof award.images[0] === 'string' ? award.images[0] : award.images[0].src) : (award.image ? (typeof award.image === 'string' ? award.image : award.image.src) : '')}
                                alt={award.title}
                                fill
                                className="object-contain object-center"
                                sizes="24px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-white truncate max-w-[80px]">{award.title}</h4>
                            </div>
                          </div>
                          {/* Badge */}
                          <div className="text-center">
                            <span className="text-xs bg-blue-500/60 px-1 py-0.5 rounded text-white backdrop-blur-sm">{award.type}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para ampliar imagen */}
      {modalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleBackdropClick}
        >
          {/* Fondo animado y blur */}
          <div className={`absolute inset-0 bg-gradient-to-br from-black/90 via-emerald-950/80 to-cyan-950/80 backdrop-blur-[6px] transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`} />
          {/* Modal principal */}
          <div
            className={`relative bg-gradient-to-br from-black via-gray-900 to-emerald-950 rounded-3xl p-8 max-w-5xl w-full border border-emerald-800/60 shadow-2xl flex flex-col items-center animate-modal-pop transition-all duration-300 ${fade ? 'scale-100' : 'scale-95'}`}
            style={{ boxShadow: '0 8px 40px 0 rgba(16,185,129,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.25)' }}
          >
            {/* Botón de cierre */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-emerald-800/80 border border-emerald-900 text-cyan-200 hover:text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 scale-100 hover:scale-110 active:scale-95"
              aria-label="Close"
              title="Close"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Botones de zoom */}
            <div className="flex gap-4 mb-6 mt-2">
              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-emerald-800/80 border-2 border-emerald-700 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-110 active:scale-95"
              aria-label="Zoom out"
              title="Zoom out (-)"
              >
                {/* Lupa con - */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {/* Reset */}
              <button
                onClick={handleZoomReset}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-cyan-800/80 border-2 border-cyan-700 text-cyan-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transform hover:rotate-90 active:scale-95"
                aria-label="Reset zoom"
                title="Reset zoom"
              >
                {/* Icono de reload */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M4 4v5h.582M20 20v-5h-.581" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.21 17.89A9 9 0 1 0 6 5.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-emerald-800/80 border-2 border-emerald-700 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-110 active:scale-95"
                aria-label="Zoom in"
                title="Zoom in (+)"
              >
                {/* Lupa con + */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Imagen con animación y sombra */}
            <div className="flex w-full gap-6">
              {/* Imagen principal */}
              <div className="flex-1 flex items-center justify-center bg-black rounded-2xl border border-emerald-900/40 shadow-2xl animate-fade-in-img min-h-[300px] max-h-[70vh] overflow-hidden relative">
                <PanZoom
                  ref={panzoomRef}
                  minZoom={0.5}
                  maxZoom={3}
                  zoom={zoom}
                  autoCenter
                  boundaryRatioVertical={1}
                  boundaryRatioHorizontal={1}
                  style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  enableBoundingBox
                  enablePan
                  enableZoom
                  realPinch
                  transition="transform 0.2s"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {modalImgs
                      ? (
                        <Image
                          src={modalImgs[activeImgIdx]}
                          alt={modalTitle! + ' ' + (activeImgIdx + 1)}
                          width={1200}
                          height={900}
                          className="object-contain max-h-[70vh] max-w-full mx-auto my-auto select-none shadow-2xl rounded-xl animate-fade-in-img"
                          draggable={false}
                          priority
                          onDoubleClick={handleDoubleClick}
                        />
                      )
                      : modalImg && (
                        <Image
                          src={modalImg}
                          alt={modalTitle!}
                          width={1200}
                          height={900}
                          className="object-contain max-h-[70vh] max-w-full mx-auto my-auto select-none shadow-2xl rounded-xl animate-fade-in-img"
                          draggable={false}
                          priority
                          onDoubleClick={handleDoubleClick}
                        />
                      )}
                  </div>
                </PanZoom>
              </div>
              {/* Miniaturas a la derecha si hay varias imágenes */}
              {modalImgs && modalImgs.length > 1 && (
                <div className="flex flex-col gap-3 ml-4 max-h-[70vh] overflow-y-auto">
                  {modalImgs.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`border-2 rounded-lg overflow-hidden focus:outline-none transition-all duration-200 ${activeImgIdx === idx ? 'border-emerald-400 scale-105' : 'border-gray-700 opacity-70 hover:opacity-100'}`}
                      style={{ width: 80, height: 60 }}
                      tabIndex={0}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={modalTitle! + ' miniatura ' + (idx + 1)}
                        width={80}
                        height={60}
                        className="object-contain object-center w-full h-full"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Título con gradiente y sombra */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mt-6 text-center drop-shadow-lg animate-fade-in-img">
              {modalTitle}
            </h3>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expand-from-center {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes badge-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .expand-from-center {
          animation: expand-from-center 0.6s ease-out forwards;
        }

        .animate-badge-in {
          animation: badge-in 0.48s ease-out both;
        }
      `}</style>

      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Badges & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Digital Certificates</span>
          </h2>
          <p className="text-lg text-cyan-200 max-w-3xl mx-auto leading-8">
            Verified credentials from AWS Academy, Cisco Networking, and Google programs.
            Explore key highlights first, then browse the full library with filters and search.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/45">Total Badges</p>
            <p className="mt-3 text-3xl font-extrabold text-white">
              <AnimatedCounter value={badgeStats.total} />
            </p>
          </div>
          <div className="rounded-2xl border border-sky-300/20 bg-sky-400/[0.08] p-5 backdrop-blur-md">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-sky-100/80">Cloud</p>
            <p className="mt-3 text-3xl font-extrabold text-sky-100">
              <AnimatedCounter value={badgeStats.cloud} />
            </p>
          </div>
          <div className="rounded-2xl border border-violet-300/20 bg-violet-400/[0.08] p-5 backdrop-blur-md">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-violet-100/80">Cybersecurity</p>
            <p className="mt-3 text-3xl font-extrabold text-violet-100">
              <AnimatedCounter value={badgeStats.cybersecurity} />
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] p-5 backdrop-blur-md">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-emerald-100/80">Marketing</p>
            <p className="mt-3 text-3xl font-extrabold text-emerald-100">
              <AnimatedCounter value={badgeStats.marketing} />
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-4.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={badgeSearch}
                onChange={(event) => setBadgeSearch(event.target.value)}
                placeholder="Search by title, provider, track, or skill..."
                className="w-full rounded-xl border border-white/12 bg-black/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-cyan-300/40"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {badgeProviders.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setBadgeFilter(provider)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                    badgeFilter === provider
                      ? 'border-cyan-300/40 bg-cyan-400/16 text-cyan-100'
                      : 'border-white/14 bg-white/6 text-white/65 hover:border-white/28 hover:text-white/90'
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-white/55">
            <span>{filteredBadges.length} badge{filteredBadges.length === 1 ? '' : 's'} found</span>
            <span className="uppercase tracking-[0.22em] text-white/35">Credential Library</span>
          </div>
        </div>

        {filteredBadges.length > 0 ? (
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center mx-auto max-w-[1300px]">
            {filteredBadges.map((badge, index) => (
              <article
                key={badge.id}
                className="animate-badge-in group relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(165deg,rgba(10,16,20,0.94),rgba(5,10,14,0.98))] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/22 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)] max-w-[260px] w-full"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_85%_8%,rgba(34,211,238,0.14),transparent_48%)]" />
                <div className="relative z-10 flex items-start justify-between">
                  <span className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${providerStyles[badge.provider]}`}>
                    {badge.provider}
                  </span>
                  <span className="rounded-full border border-white/14 bg-white/8 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                    {badge.platform}
                  </span>
                </div>

                <div className="relative z-10 mt-3 rounded-lg border border-white/12 bg-black/35 p-2.5">
                  <Image
                    src={badge.img}
                    alt={badge.title}
                    width={180}
                    height={180}
                    className="mx-auto h-20 w-20 object-contain"
                  />
                </div>

                <div className="relative z-10 mt-3">
                  <h4 className="text-[0.78rem] font-semibold leading-5 text-white line-clamp-2">{badge.title}</h4>
                  <p className={`mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${trackStyles[badge.track]}`}>
                    {badge.track}
                  </p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-white/42">
                    Issued {badge.issuedLabel}
                  </p>
                </div>

                <div className="relative z-10 mt-3 flex flex-wrap gap-1">
                  {badge.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="rounded-full border border-white/12 bg-white/7 px-2 py-0.5 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-white/72">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 mt-3">
                  <a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-300/24 bg-cyan-400/12 px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cyan-100 transition-all duration-200 hover:border-cyan-200/38 hover:bg-cyan-400/20"
                  >
                    Verify Credential
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14h14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">No Results</p>
            <p className="mt-2 text-white/70">
              Try another search term or switch provider filters.
            </p>
          </div>
        )}
      </section>
    </section>
  );
};

export default Awards; 
