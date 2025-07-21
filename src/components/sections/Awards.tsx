'use client';

import { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import PanZoom from 'react-easy-panzoom';
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
//Badges
import BadgeAWSCloudFoundations from '@/assets/img/badges/AWSAcademyCloudFoundations.png';
import AWSAcademyCloudDeveloping from '@/assets/img/badges/AWSAcademyCloudDeveloping.png';
import NetworkingBasics from '@/assets/img/badges/NetworkingBasics.png';
import NetworkSupportandSecurity from '@/assets/img/badges/NetworkSupportandSecurity.png';
import OperatingSystemsBasics from '@/assets/img/badges/OperatingSystemsBasics.png';
import AWSAcademyIntroductiontoCloudSemester1 from '@/assets/img/badges/AWSAcademyIntroductiontoCloudSemester1.png';
import EndpointSecurity from '@/assets/img/badges/EndpointSecurity.png';
import CertificadodeMarketingDigitalEcommercedeGoogle from '@/assets/img/badges/CertificadodeMarketingDigitalEcommercedeGoogle.png';
import IntroductiontoCybersecurity from '@/assets/img/badges/IntroductiontoCybersecurity.png';
import AWSAcademyCloudSecurityFoundations from '@/assets/img/badges/AWSAcademyCloudSecurityFoundations.png';
import GoogleMarketingDigitaleECommerce from '@/assets/img/badges/GoogleMarketingDigitaleECommerce.png';
import FundamentosDelMarketingDigitalYComercioElectronico from '@/assets/img/badges/Fundamentosdelmarketingdigitalycomercioelectrónico.png';
import DeMeGustaaLeadsInteractúaConLasYLosClientesEnLínea from '@/assets/img/badges/DeMeGustaaLeadsInteractúaConLasYLosClientesEnLínea.png';
import CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico from '@/assets/img/badges/CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico.png';
import ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico from '@/assets/img/badges/ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico.png';
import InteractuarConMedianteElMarketingDigital from '@/assets/img/badges/InteractuarConMedianteElMarketingDigital.png';



const awards: Array<{
  title: string;
  description: string;
  image?: StaticImageData;
  images?: StaticImageData[];
  type: string;
  date: string;
}> = [
  {
    title: 'Constancia de Titulo en trámite - UP Chiapas',
    description: 'Ingeniería en Software, Universidad Politécnica de Chiapas, 2025',
    image: ConstanciaTitulacion,
    type: 'Constancia',
    date: 'Junio 2025',
  },
  {
    title: 'Constancia de Egreso - UP Chiapas',
    description: 'Ingeniería en Software, Universidad Politécnica de Chiapas, 2025',
    image: ConstanciaEgreso,
    type: 'Constancia',
    date: 'Mayo 2025',
  },
  {
    title: 'Constancia de TOEFL ITP - UP Chiapas',
    description: 'Score TOEFL ITP - Universidad Politécnica de Chiapas, 2025',
    image: ConstanciaToefl,
    type: 'Constancia',
    date: 'Noviembre 2024',
  },
  {
    title: 'Kárdex Completo - UP Chiapas',
    description: 'Kárdex universitario completo, Universidad Politécnica de Chiapas, 2025',
    images: [KardexUpHoja1, KardexUpHoja2],
    type: 'Kárdex',
    date: 'Julio 2025',
  },
  {
    title: 'Certificado COEPES',
    description: 'Certificado de participación en COEPES, 2024',
    image: CertificadoCOEPES,
    type: 'Certificado',
    date: 'Septiembre 2024',
  },
  {
    title: 'Carta de Liberación de Estadia',
    description: 'Carta de liberación de estadia profesional de la Universidad Politécnica de Chiapas - 2025',
    image: CartaLiberacionEstadia,
    type: 'Certificado',
    date: 'Enero - Abril 2025',
  },
  {
    title: 'Certificado de Preparatoria',
    description: 'Certificado de Preparatoria, 2024',
    images: [CertificadoPreparatoriaHoja1, CertificadoPreparatoriaHoja2, CertificadoPreparatoriaHoja3],
    type: 'Certificado',
    date: 'Agosto 2017 - Julio 2020',
  }
];

const badges: Array<{
  title: string;
  url: string;
  img: string | StaticImageData;
  platform: string;
}> = [
  {
    title: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
    url: 'https://www.credly.com/badges/22b9c5b2-50a7-4a23-bd0d-e8bd1561d36a/linked_in_profile',
    img: BadgeAWSCloudFoundations,
    platform: 'Credly',
  },
  {
    title: 'AWS Academy Graduate - AWS Academy Cloud Developing',
    url: 'https://www.credly.com/badges/6c226820-4530-4528-bd8b-5de421532070/linked_in_profile',
    img: AWSAcademyCloudDeveloping,
    platform: 'Credly',
  },
  {
    title: 'Networking Basics',
    url: 'https://www.credly.com/badges/35f93d61-e44e-4977-967d-e2f51a4cbb90/linked_in_profile',
    img: NetworkingBasics,
    platform: 'Credly',
  },
  {
    title: 'Network Support and Security',
    url: 'https://www.credly.com/badges/35ce798f-6caf-4822-8ae1-a027daf866a3/linked_in_profile',
    img: NetworkSupportandSecurity,
    platform: 'Credly',
  },
  {
    title: 'Operating Systems Basics',
    url: 'https://www.credly.com/badges/ad58ab2a-741a-4ac7-9d3c-e1b0c619ffac/linked_in_profile',
    img: OperatingSystemsBasics,
    platform: 'Credly',
  },
  {
    title: 'AWS Academy Graduate - AWS Academy Introduction to Cloud Semester 1',
    url: 'https://www.credly.com/badges/4c1c4aa6-f531-4635-a23a-d0cb112f1e31/linked_in_profile',
    img: AWSAcademyIntroductiontoCloudSemester1,
    platform: 'Credly',
  },
  {
    title: 'Endpoint Security',
    url: 'https://www.credly.com/badges/4a15b2d8-fab1-4820-8ed4-aace1da38b26/linked_in_profile',
    img: EndpointSecurity,
    platform: 'Credly',
  },
  {
    title: 'Certificado de Marketing Digital e E-commerce de Google',
    url: 'https://www.credly.com/badges/83e02fce-50b4-4cef-9638-69a76d9fdffe/linked_in_profile',
    img: CertificadodeMarketingDigitalEcommercedeGoogle,
    platform: 'Credly',
  },
  {
    title: 'Introduction to Cybersecurity',
    url: 'https://www.credly.com/badges/3b93c9ef-08cb-4377-b9c7-c488051dd4d2/linked_in_profile',
    img: IntroductiontoCybersecurity,
    platform: 'Credly',
  },
  {
    title: 'AWS Academy Graduate - AWS Academy Cloud Security Foundations',
    url: 'https://www.credly.com/badges/a62185aa-be22-4483-82db-402ab5336101/linked_in_profile',
    img: AWSAcademyCloudSecurityFoundations,
    platform: 'Credly',
  },
  // Coursera
  {
    title: 'Google Marketing Digital e E-Commerce',
    url: 'https://www.coursera.org/account/accomplishments/specialization/8CTJHFRMQ6Q8',
    img: GoogleMarketingDigitaleECommerce,
    platform: 'Coursera',
  },
  {
    title: 'Fundamentos del marketing digital y comercio electrónico',
    url: 'https://www.coursera.org/account/accomplishments/verify/XTGLZMU85JHQ',
    img: FundamentosDelMarketingDigitalYComercioElectronico,
    platform: 'Coursera',
  },
  {
    title: 'De me gusta a leads: interactúa con las y los clientes en línea',
    url: 'https://www.coursera.org/account/accomplishments/verify/C8X4MFH5BL5D',
    img: DeMeGustaaLeadsInteractúaConLasYLosClientesEnLínea,
    platform: 'Coursera',
  },
  {
    title: 'Creatividad en la bandeja de entrada: marketing por correo electrónico',
    url: 'https://www.coursera.org/account/accomplishments/verify/2VJ7MADLG369',
    img: CreatividadEnLaBandejaDeEntradaMarketingPorCorreoElectronico,
    platform: 'Coursera',
  },
  {
    title: 'Consigue la venta: crea, lanza y administra tiendas de comercio electrónico',
    url: 'https://www.coursera.org/account/accomplishments/verify/6UQWURGK4JJA',
    img: ConsigueLaVentaCreaLanzaYAdministraTiendasDeComercioElectronico,
    platform: 'Coursera',
  },
  {
    title: 'Atraer clientes e interactuar con ellos/as mediante el marketing digital',
    url: 'https://www.coursera.org/account/accomplishments/verify/2P94NJWCYDAZ',
    img: InteractuarConMedianteElMarketingDigital,
    platform: 'Coursera',
  },
];

const Awards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [modalImgs, setModalImgs] = useState<string[] | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const panzoomRef = useRef<unknown>(null);
  const [fade, setFade] = useState(false);

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

  return (
    <section id="reconocimientos" className="py-20 bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Reconocimientos & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Constancias</span>
          </h2>
          <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
            Aquí puedes ver mis logros académicos, profesionales y certificaciones.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="bg-black/70 border border-emerald-800/40 rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-shadow duration-300 flex flex-col items-center p-6 cursor-pointer group"
              onClick={() => openModal(award.images ? award.images : (award.image ? award.image : ''), award.title)}
            >
              <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden border border-emerald-900/40 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={award.images ? (typeof award.images[0] === 'string' ? award.images[0] : award.images[0].src) : (award.image ? (typeof award.image === 'string' ? award.image : award.image.src) : '')}
                  alt={award.title}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                />
              </div>
              <h3 className="text-xl font-bold text-emerald-300 mb-2 text-center">{award.title}</h3>
              <p className="text-cyan-200 text-center mb-2">{award.description}</p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="bg-emerald-900/60 px-2 py-1 rounded-full">{award.type}</span>
                <span className="text-cyan-400">{award.date}</span>
              </div>
            </div>
          ))}
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
              aria-label="Cerrar"
              title="Cerrar"
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
                aria-label="Alejar"
                title="Alejar (-)"
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
                aria-label="Resetear zoom"
                title="Restablecer zoom"
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
                aria-label="Acercar"
                title="Acercar (+)"
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
                      aria-label={`Ver imagen ${idx + 1}`}
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

      <section className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Insignias y <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Certificados Digitales</span>
          </h2>
          <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
            Logros y certificaciones obtenidas en plataformas internacionales.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <a
              key={idx}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-black/70 border border-emerald-800/40 rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-shadow duration-300 p-6 cursor-pointer group hover:scale-105"
            >
                               <Image
                 src={badge.img}
                 alt={badge.title}
                 width={96}
                 height={96}
                 className="w-24 h-24 object-contain mb-4 rounded-lg border-2 border-cyan-400 bg-white"
               />
              <h3 className="text-lg font-bold text-emerald-300 mb-2 text-center">{badge.title}</h3>
              <span className="text-xs text-cyan-400 font-semibold">{badge.platform}</span>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Awards; 