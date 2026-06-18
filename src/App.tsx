import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Dices, 
  Sparkles, 
  TrendingUp, 
  Check, 
  CheckSquare, 
  Phone, 
  MessageSquare, 
  Plus, 
  Minus, 
  Building2, 
  ExternalLink, 
  Lock, 
  Home, 
  ChevronRight, 
  Coins, 
  Instagram, 
  Users, 
  Menu, 
  X,
  MapPin,
  Calendar,
  Layers,
  Heart,
  ChevronDown,
  RefreshCw,
  Coffee,
  Gamepad2,
  HelpCircle,
  GraduationCap,
  Award
} from 'lucide-react';

// Custom component imports
import CounselForm from './components/CounselForm';
import AdminPanel from './components/AdminPanel';
import CubeBoxLogo from './components/CubeBoxLogo';

// Data imports
import { 
  whyCubeboxList, 
  founderPointList, 
  brandCompetitivenessList, 
  processSteps, 
  galleryItemList, 
  instagramFeedList, 
  faqList 
} from './data';

// Pictograms mapping for each section
const whyIcons = [
  Users,      // SPEC 01: 넓은 고객층
  Coins,      // SPEC 02: 다양한 수익구조
  Award,      // SPEC 03: 상권맞춤 점주 자율운영
  Sparkles,   // SPEC 04: 차별화에 집중하는 공간
];

const founderPointIcons = [
  Coins,      // POINT 01: 독보적인 복합 수익 구조
  MapPin,     // POINT 02: 철저한 상권 맞춤형 공간 설계
  Sparkles,   // POINT 03: 밀착형 본사 토탈 케어 지원
];

const competitivenessIcons = [
  Tv,         // 1: 프라이빗 OTT룸
  Dices,      // 2: 엄선된 다양한 보드게임
  Users,      // 3: 단체 모임 스튜디오
  Coffee,     // 4: 트렌드 반영 스낵 & 키친
  Home,       // 5: 공간 감성 인테리어
  Heart,      // 6: 꾸준한 단골 고객 및 높은 재방문
];

const processStepIcons = [
  Phone,         // STEP 01: 상담 신청
  MapPin,        // STEP 02: 상권 및 입지 분석
  MessageSquare, // STEP 03: 창업 상세 상담
  CheckSquare,   // STEP 04: 가맹 계약 체결
  GraduationCap, // STEP 05: 인테리어 및 교육
  Award,         // STEP 06: 성공적인 오픈
  TrendingUp,    // STEP 07: 사후 운영 지원
];

const galleryIconsMap: Record<string, typeof Tv> = {
  ott: Tv,
  board: Dices,
  entertainment: Gamepad2,
  group: Users,
  food: Coffee,
  lounge: Home,
};

export default function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [activeGalleryTag, setActiveGalleryTag] = useState<string>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Stats counter backup indicator
  const [leadsCount, setLeadsCount] = useState<number>(1);

  // Sync total counselor count dynamically from localStorage
  useEffect(() => {
    const syncCount = () => {
      try {
        const localCached = JSON.parse(localStorage.getItem('cubebox_local_backup') || '[]');
        setLeadsCount(1 + localCached.length); // Mock 1 initial default + cached ones
      } catch (e) {
        // Safe bypass
      }
    };
    syncCount();
    window.addEventListener('local_lead_added', syncCount);
    return () => window.removeEventListener('local_lead_added', syncCount);
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // Filter gallery items by tag
  const filteredGalleryItems = activeGalleryTag === 'all' 
    ? galleryItemList 
    : galleryItemList.filter(item => item.id === activeGalleryTag);

  return (
    <div className="min-h-screen bg-brand-gray text-brand-black font-sans selection:bg-[#FF6B35] selection:text-white">
      {/* ----------------- GLOBAL HEADER ----------------- */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group decoration-transparent py-2">
              <CubeBoxLogo variant="horizontal" size="md" />
            </a>

            {/* Desktop Navigation */}
            {!isAdminView ? (
              <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-slate-700">
                <a href="#why" className="hover:text-brand-orange transition-colors">와이 큐브박스</a>
                <a href="#founder" className="hover:text-brand-orange transition-colors">창업 강점</a>
                <a href="#gallery" className="hover:text-brand-orange transition-colors">공간 갤러리</a>
                <a href="#costs" className="hover:text-brand-orange transition-colors">창업 비용</a>
                <a href="#faq" className="hover:text-brand-orange transition-colors">FAQ</a>
                <a href="#counsel" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1.5 text-brand-orange font-black">
                  <span className="w-2 h-2 bg-[#FF6B35] animate-ping"></span>
                  가맹 상담
                </a>
              </nav>
            ) : (
              <nav className="hidden md:flex items-center gap-3 text-sm">
                <button
                  onClick={() => setIsAdminView(false)}
                  className="px-4 py-2 bg-white border-2 border-black hover:bg-brand-gray text-brand-black font-bold flex items-center gap-1.5 transition-colors text-xs cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  홈페이지로 돌아가기
                </button>
              </nav>
            )}

            {/* Header Right Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsAdminView(!isAdminView)}
                className={`px-4 py-2 border-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAdminView 
                    ? 'bg-[#FF6B35] border-black text-white shadow-[2px_2px_0px_#000000]'
                    : 'bg-white border-black hover:bg-brand-gray text-brand-black'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                {isAdminView ? "가맹점 관리자 나가기" : "관리자 콘솔"}
              </button>
              
              {!isAdminView && (
                <a
                  href="#counsel"
                  className="px-5 py-2.5 bg-black hover:bg-[#FF6B35] text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#FF6B35] transition-all hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 block decoration-transparent"
                >
                  창업 문의신청
                </a>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsAdminView(!isAdminView)}
                className={`p-2 border-2 flex items-center justify-center cursor-pointer ${
                  isAdminView 
                    ? 'bg-[#FF6B35] border-black text-white'
                    : 'bg-white border-black text-brand-black'
                }`}
                title="관리자 전환"
              >
                <Lock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 bg-white border-2 border-black text-brand-black hover:bg-brand-gray"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b-4 border-black py-4 px-4 space-y-3.5 border-t-2">
            {!isAdminView ? (
              <>
                <a 
                  href="#why" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-slate-800 hover:text-brand-orange"
                >
                  왜 큐브박스인가?
                </a>
                <a 
                  href="#founder" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-slate-800 hover:text-brand-orange"
                >
                  창업자가 선택하는 이유
                </a>
                <a 
                  href="#gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-slate-800 hover:text-brand-orange"
                >
                  실제 공간 갤러리
                </a>
                <a 
                  href="#costs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-slate-800 hover:text-brand-orange"
                >
                  합리적인 창업 비용
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-slate-800 hover:text-brand-orange"
                >
                  자주 묻는 질문 FAQ
                </a>
                <a 
                  href="#counsel" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-black uppercase text-brand-orange"
                >
                  실시간 가맹상담 접수
                </a>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAdminView(false);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-xs font-black uppercase text-brand-black py-1 flex items-center gap-2"
              >
                <Home className="w-4 h-4 text-brand-orange" /> Web Landings
              </button>
            )}
          </div>
        )}
      </header>

      {/* ----------------- RENDERING VIEW ----------------- */}
      {isAdminView ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="admin-panel-section">
          {/* Backoffice component */}
          <AdminPanel />
        </main>
      ) : (
        <>
          {/* ----------------- 01. MAIN VISUAL (HERO) ----------------- */}
          <section className="relative overflow-hidden pt-20 pb-32 border-b-4 border-black bg-white" id="main-visual">
            {/* Board game photo background */}
            <div 
              className="absolute inset-0 bg-cover bg-center animate-fade-in" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=1600')",
              }}
            ></div>
            {/* High legibility color overlay & backdrop blur */}
            <div className="absolute inset-0 bg-white bg-opacity-92 backdrop-blur-[1px]"></div>

            {/* Checkerboard subtle background mask */}
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#000000 1.2px, transparent 1.2px)", backgroundSize: "24px 24px", opacity: 0.12 }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto space-y-6">
                
                {/* Visual Label Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white border-2 border-black rounded-none text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  <span>새로운 멀티플레이어 문화 공간</span>
                </div>

                {/* Vertical Large Brand Logo variation */}
                <div className="py-2 flex justify-center">
                  <CubeBoxLogo variant="vertical" size="md" className="transform hover:scale-105 duration-300 transition-transform" />
                </div>

                {/* Headcopy */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-brand-black font-display">
                  머무는 시간이 즐거워지는 공간
                  <br className="hidden sm:inline" />
                  <span className="text-brand-orange uppercase font-black text-5xl sm:text-6xl md:text-7xl block mt-2">
                    CUBEBOX
                  </span>
                </h1>

                {/* Subcopy */}
                <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2 font-medium">
                  단순한 보드게임카페가 아닙니다.
                  <br />
                  <strong className="text-[#1A1A1A]">OTT 콘텐츠, 프라이빗 룸, 모임 공간,</strong> 그리고 복합 즐길 거리를 결합하여 
                  사람들이 즐겁게 머무는 이유를 창조하는 복합 문화 공간 브랜드입니다.
                </p>

                {/* CTA Buttons in hero */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <a
                    href="#counsel"
                    className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-[#FF6B35] text-white font-bold border-2 border-black shadow-[4px_4px_0px_#FF6B35] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-xs uppercase tracking-widest text-center block decoration-transparent"
                  >
                    가맹 상담 신청
                  </a>
                  <a
                    href="#costs"
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-brand-gray text-[#1A1A1A] font-bold border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-xs uppercase tracking-widest text-center block decoration-transparent"
                  >
                    창업 비용 문의하기
                  </a>
                </div>

                {/* Core USP quick overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-16 text-left">
                  {[
                    { label: "프라이빗 OTT룸", desc: "개별룸 완벽 사운드", icon: Tv, iconColor: "text-brand-orange" },
                    { label: "보드게임 300종+", desc: "살균 소독 세척", icon: Dices, iconColor: "text-brand-orange" },
                    { label: "올디너리 F&B", desc: "시그니처 디저트 가득", icon: Layers, iconColor: "text-brand-orange" },
                    { label: "높은 재방문율", desc: "동시 모임/오락 연동", icon: TrendingUp, iconColor: "text-brand-orange" }
                  ].map((usp, i) => (
                    <div key={i} className="bg-white border-2 border-black p-4 rounded-none hover:bg-brand-gray transition-colors shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 bg-black border border-black text-white ${usp.iconColor}`}>
                          <usp.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-brand-black block">{usp.label}</span>
                          <span className="text-[10px] text-slate-500 block font-bold">{usp.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* ----------------- 02. WHY CUBEBOX ----------------- */}
          <section className="py-24 border-b-4 border-black bg-white relative" id="why">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section titles */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">HOW WE DEVIATE</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mt-2 uppercase tracking-tight">
                  왜 CUBEBOX 일까요?
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
                <p className="text-slate-650 text-xs sm:text-sm mt-4 font-bold">
                  보편화된 실내 카페 공간을 넘어, 이용 목적과 고객층을 완벽히 확장한 하이브리드 공간 구성의 핵심
                </p>
              </div>

              {/* WHY Grid cards with OutfitDisplay font */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyCubeboxList.map((item, index) => {
                  const IconComponent = whyIcons[index] || Sparkles;
                  return (
                    <div 
                      key={item.id} 
                      className="group bg-white border-2 border-black rounded-none p-6 lg:p-8 hover:bg-brand-gray hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all relative overflow-hidden flex flex-col justify-between"
                    >
                      {/* Glowing index overlay */}
                      <span className="absolute right-6 top-4 text-7xl font-black text-slate-200 group-hover:text-[#FF6B35]/10 transition-colors pointer-events-none select-none">
                        {item.id}
                      </span>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#FF6B35]/15 border-2 border-black flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-brand-black" />
                          </div>
                          <span className="text-xs text-[#FF6B35] font-extrabold uppercase tracking-widest font-mono">
                            CUBEBOX SPEC 0{index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-brand-black tracking-tight">{item.title}</h3>
                        <p className="text-xs text-white bg-black border-2 border-black px-2.5 py-1 rounded-none inline-block font-extrabold uppercase tracking-wider">
                          {item.subtitle}
                        </p>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-6">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] text-slate-800 bg-brand-gray border border-black px-2 py-1 font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendation banner/section */}
              <div className="mt-20 border-4 border-black bg-[#FFFBF0] p-8 md:p-12 relative overflow-hidden">
                {/* Accent decoration line */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6B35]"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase bg-white border-2 border-black px-3 py-1 inline-block">RECOMMENDED FOR YOU</span>
                    <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-4">
                      [ 이런 분들께 <span className="text-[#FF6B35]">추천합니다</span> ]
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 font-bold">고객과 가맹점 모두 행복하게 동반 성장하는 큐브박스 맞춤 플랜</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { num: "1", text: "카페나 음식점과는 다른 차별화된 창업 아이템을 찾고 계신 분" },
                      { num: "2", text: "데이트, 모임, 영화 감상 등 다양한 수요를 수용할 수 있는 업종을 원하시는 분" },
                      { num: "3", text: "고객이 오래 머물고 다시 찾는 공간을 만들고 싶으신 분" },
                      { num: "4", text: "상권 특성에 맞게 유연하게 매장을 운영하고 싶으신 분" },
                      { num: "5", text: "본사의 지원은 받되 자율성도 중요하게 생각하시는 분" },
                      { num: "6", text: "고객과 함께 성장하는 공간을 만들고 싶으신 분" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-4 bg-white/50 hover:bg-white border-2 border-transparent hover:border-black transition-all">
                        <span className="text-2xl leading-none font-black text-[#FF6B35] tracking-tight font-mono select-none">
                          0{item.num}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-brand-black leading-relaxed pt-0.5">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ----------------- 03. 창업자가 선택하는 이유 ----------------- */}
          <section className="py-24 border-b-4 border-black bg-brand-gray relative" id="founder">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">FOUNDER BENEFITS</span>
                <h2 className="text-3xl md:text-4xl font-black text-brand-black mt-2 leading-tight uppercase tracking-tight">
                  고객이 오래 머무는 공간은
                  <br />
                  <span className="text-brand-orange">수익도 오래 머뭅니다.</span>
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
                <p className="text-slate-700 text-xs sm:text-sm mt-4 font-bold">
                  창업을 결심하는 순간부터 가맹 개점 후 매출 고공 자립까지 본사가 제안하는 절대 경쟁 우위 포인트
                </p>
              </div>

              {/* Point Grid rows */}
              <div className="space-y-6">
                {founderPointList.map((point) => {
                  const idx = parseInt(point.num) - 1;
                  const IconComponent = founderPointIcons[idx] || Sparkles;
                  return (
                    <div 
                      key={point.num} 
                      className="bg-white border-2 border-black rounded-none p-6 lg:p-8 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#FCFCFC] transition-all"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        <div className="lg:col-span-1 lg:border-r-2 border-black pr-4 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4">
                          <div className="text-left">
                            <span className="text-3xl font-black font-mono text-brand-orange leading-none">
                              {point.num}
                            </span>
                            <span className="text-[9px] text-brand-black font-extrabold tracking-widest block mt-1 uppercase font-mono">
                              POINT
                            </span>
                          </div>
                          <div className="w-10 h-10 bg-brand-gray border-2 border-black flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-brand-black" />
                          </div>
                        </div>

                        <div className="lg:col-span-6 space-y-2">
                          <h3 className="text-lg sm:text-xl font-black text-brand-black">{point.title}</h3>
                          <p className="text-slate-705 text-xs sm:text-sm leading-relaxed font-semibold">
                            {point.desc}
                          </p>
                        </div>

                      <div className="lg:col-span-5 bg-brand-gray border-2 border-black rounded-none p-4">
                        <span className="text-[10px] uppercase font-black text-brand-black tracking-widest block mb-2.5 font-mono">
                          성공 설계 핵심 수칙
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-800 font-bold">
                          {point.bullets.map((el, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 stroke-[3]" />
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                );
              })}
              </div>

            </div>
          </section>

          {/* ----------------- 04. 브랜드 경쟁력 ----------------- */}
          <section className="py-24 border-b-4 border-black bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Text description on the left */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="px-3 py-1 bg-black text-white text-xs font-black tracking-widest border border-black rounded-none uppercase">
                    BRAND COMPETITIVENESS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
                    여가 공간은 많지만
                    <br />
                    <span className="inline-block px-2.5 py-1 bg-[#FF6B35] text-white font-black border-2 border-black rotate-[-1deg] shadow-[3px_3px_0px_#000000] my-1">기억에 남는 공간</span>은 드뭅니다.
                  </h2>
                  <p className="text-slate-705 text-sm leading-relaxed font-semibold">
                    CUBEBOX는 타 카피 브랜드들이 추종할 수 없는 확실한 사용자 가치(UX)를 정의합니다. 보드게임과 멀티미디어 스트리밍의 영리한 조화는 매끄러운 단골 연동을 견인합니다.
                  </p>
                  
                  <div className="p-4 bg-brand-gray border-2 border-black rounded-none flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white border border-black flex items-center justify-center font-black text-sm">
                      ✔
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-brand-black block">검증 완료된 독창적인 브랜드</span>
                      <span className="text-xs text-slate-500 font-bold block">주중 한산 시간대를 커버하는 강력한 프로텍트 솔루션</span>
                    </div>
                  </div>
                </div>

                {/* Grid checklist on the right */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {brandCompetitivenessList.map((comp, idx) => {
                    const IconComponent = competitivenessIcons[idx] || Sparkles;
                    return (
                      <div key={idx} className="p-5 bg-white border-2 border-black rounded-none hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-brand-gray transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#FF6B35]/15 border-2 border-black rounded-none flex items-center justify-center text-brand-black shrink-0">
                            <IconComponent className="w-5 h-5 stroke-[2]" />
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <span className="text-sm font-black text-brand-black block">{comp.title}</span>
                            <p className="text-slate-700 text-xs leading-relaxed font-bold">{comp.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>

          {/* ----------------- 05. 창업 프로세스 ----------------- */}
          <section className="py-24 border-b-4 border-black bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">FRANCHISE PROCEDURE</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mt-2 uppercase tracking-tight">
                  체계적인 가맹 개점 절차
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
                <p className="text-slate-700 text-xs sm:text-sm mt-4 font-bold">
                  본사의 출점 설계 및 서비스 아카데미를 경유해 실제 가동까지 걸리는 평균 매뉴얼 스텝
                </p>
              </div>

              {/* Horizontal / Vertical responsive Process flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                {processSteps.map((p, idx) => {
                  const IconComponent = processStepIcons[idx] || Sparkles;
                  return (
                    <div key={p.step} className="bg-white border-2 border-black rounded-none p-4 hover:bg-brand-gray transition-colors relative flex flex-col justify-between shadow-[2px_2px_0px_#000000] hover:shadow-none">
                      
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="text-[10px] font-black font-mono text-white bg-[#FF6B35] border border-black px-2 py-0.5 rounded-none uppercase tracking-wider">
                            STEP {p.step}
                          </span>
                          <div className="w-8 h-8 bg-[#FF6B35]/15 border-2 border-black rounded-none flex items-center justify-center text-brand-black shrink-0">
                            <IconComponent className="w-4 h-4 stroke-[2]" />
                          </div>
                        </div>
                        <span className="text-sm font-black text-brand-black block leading-tight">{p.title}</span>
                      </div>

                      <p className="text-slate-605 text-[11px] font-bold leading-relaxed mt-2 pt-2 border-t border-black/20">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ----------------- 06. 실제 공간 소개 (GALLERY) ----------------- */}
          <section className="py-24 border-b-4 border-black bg-white" id="gallery">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black uppercase tracking-tight">
                    CUBEBOX 공간 인스펙션
                  </h2>
                  <p className="text-slate-650 text-xs sm:text-sm mt-2 font-bold">오직 CUBEBOX에서만 만날 수 있는 세련되고 안락한 오프라인 독립 룸 구성을 확인하세요.</p>
                </div>

                {/* Filter tags buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: '전체 보기' },
                    { id: 'ott', label: 'OTT 관람룸' },
                    { id: 'board', label: '보드게임룸 (좌석/입식/단체석)' }
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => setActiveGalleryTag(btn.id)}
                      className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-black ${
                        activeGalleryTag === btn.id
                          ? 'bg-[#FF6B35] text-white shadow-[2px_2px_0px_#000000]'
                          : 'bg-white hover:bg-brand-gray text-brand-black'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGalleryItems.map((item) => {
                  const IconComponent = galleryIconsMap[item.id] || Sparkles;
                  return (
                    <div 
                      key={item.id} 
                      className="group bg-white border-2 border-black rounded-none overflow-hidden hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a] border-b-2 border-black">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-none uppercase tracking-wider border border-black">
                          {item.tag}
                        </span>
                      </div>
                      <div className="p-5 space-y-2 bg-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-brand-gray border border-black flex items-center justify-center shrink-0">
                            <IconComponent className="w-3.5 h-3.5 text-brand-black" />
                          </div>
                          <span className="text-sm font-black text-brand-black block">{item.title}</span>
                        </div>
                        <p className="text-slate-705 text-xs leading-relaxed font-bold">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ----------------- 07. INSTAGRAM FEED ----------------- */}
          <section className="py-24 border-b-4 border-black bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">#CUBEBOX_DAILY</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mt-2 uppercase tracking-tight">
                  실시간 SNS 피드 연동
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
                <p className="text-slate-705 text-xs sm:text-sm mt-4 font-bold">
                  실시간 매장 소식을 전하는 인스타 피드 자동 연동 (Instagram Feed API 연계)
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {instagramFeedList.map(feed => (
                  <div 
                    key={feed.id} 
                    className="group bg-white border-2 border-black rounded-none overflow-hidden hover:shadow-[3px_3px_0px_#000000] hover:bg-brand-gray transition-all relative flex flex-col justify-between"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#1a1a1a] border-b-2 border-black">
                      <img 
                        src={feed.imageUrl} 
                        alt="Instagram update" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Instagram hover layer overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                        <p className="text-[10px] text-white font-bold select-none line-clamp-4 leading-relaxed">
                          {feed.caption}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-white flex items-center justify-between">
                      <span className="text-[10px] text-[#FF6B35] font-black">❤️ {feed.likes}</span>
                      <span className="text-[9px] text-slate-650 font-mono font-black">{feed.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ----------------- 08. 창업 비용 안내 ----------------- */}
          <section className="py-24 border-b-4 border-black bg-white" id="costs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">REASONABLE INVESTMENT</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mt-2 uppercase tracking-tight">
                  합리적인 창업, 안정적인 운영
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
                <p className="text-slate-700 text-xs sm:text-sm mt-4 font-bold">
                  창업 비용은 상권 특성 및 매장 점포 구조에 따라 합리적으로 달라질 수 있습니다. 
                  <br />
                  큐브박스만의 10호점 한정 선착순 파격 가맹 혜택을 통해 초기 창업 리스크를 대폭 낮춰보세요.
                </p>
              </div>

              {/* Standard Cost Guide Visual Table Component */}
              <div className="bg-white border-4 border-black p-6 lg:p-10 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Visual grid content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Cost Item Table Grid */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-black text-white border-2 border-black">
                        <span className="text-sm font-black text-[#FF6B35]">₩</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-brand-black uppercase tracking-tight">큐브박스 가맹 개설 표준 비용</h4>
                        <p className="text-xs text-slate-500 mt-0.5">상권 면적 60평(8개 프라이빗 룸 기준)의 정밀 시공 및 컨설팅 가이드라인 예산입니다.</p>
                      </div>
                    </div>

                    <div className="border-2 border-black rounded-none overflow-hidden pb-1">
                      {/* Table Header */}
                      <div className="grid grid-cols-12 bg-black text-white text-xs font-black p-3 text-center tracking-wider">
                        <div className="col-span-4 lg:col-span-3 text-left pl-2">구분 항목</div>
                        <div className="col-span-4 lg:col-span-5 text-left">세부 시공 및 내역 설명</div>
                        <div className="col-span-4 lg:col-span-4 text-right pr-2">표준 예산 (VAT 별도)</div>
                      </div>

                      {/* Cost Rows */}
                      <div className="divide-y-2 divide-black text-xs sm:text-sm font-bold">
                        {/* Row 1: 가맹비 */}
                        <div className="grid grid-cols-12 p-3.5 items-center bg-brand-gray">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">가맹비 (상표권)</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">독점 정밀 지역권 및 브랜드 라이센스 이용 권한</div>
                          <div className="col-span-4 lg:col-span-4 text-right pr-1">
                            <span className="line-through text-slate-400 mr-2">1,500만원</span>
                            <span className="text-[#FF6B35] font-black">전액 면제 (0원)</span>
                          </div>
                        </div>

                        {/* Row 2: 교육비 */}
                        <div className="grid grid-cols-12 p-3.5 items-center bg-brand-gray">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">가맹 교육비</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">F&B 제조 레시피 전수, 매장 운영 매뉴얼 교육 (본사 7일 실습)</div>
                          <div className="col-span-4 lg:col-span-4 text-right pr-1">
                            <span className="line-through text-slate-400 mr-2">300만원</span>
                            <span className="text-[#FF6B35] font-black">전액 면제 (0원)</span>
                          </div>
                        </div>

                        {/* Row 3: 보증금 */}
                        <div className="grid grid-cols-12 p-3.5 items-center bg-brand-gray">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">가맹 보증금</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">의무 계약 이행 보증금 (계약 기간 종료 후 100% 반환)</div>
                          <div className="col-span-4 lg:col-span-4 text-right pr-1">
                            <span className="line-through text-slate-400 mr-2">500만원</span>
                            <span className="text-[#FF6B35] font-black">전액 선제 면제 (0원)</span>
                          </div>
                        </div>

                        {/* Row 4: 인테리어 */}
                        <div className="grid grid-cols-12 p-3.5 items-center">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">친환경 인테리어</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">최고급 우드/메탈 복합 마감, 전용 파티션 및 부스 하이앤드 모듈화</div>
                          <div className="col-span-4 lg:col-span-4 text-right text-brand-black font-black pr-1">1억 3,200만원 <span className="text-slate-500 font-bold text-xs">(평당 220만원)</span></div>
                        </div>

                        {/* Row 5: OTT 프라이빗 룸 설비 */}
                        <div className="grid grid-cols-12 p-3.5 items-center">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">OTT 룸 미디어 하드웨어</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">고화질 대형 TV 스마트 스크린, 고성능 서라운드 바 및 프라이빗 리클라이너 소파 8조</div>
                          <div className="col-span-4 lg:col-span-4 text-right text-brand-black font-black pr-1">1,440만원 <span className="text-slate-500 font-bold text-xs">(룸당 180만원)</span></div>
                        </div>

                        {/* Row 6: 보드게임 세트 */}
                        <div className="grid grid-cols-12 p-3.5 items-center">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">보드게임 콘텐츠 일체</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">300종 이상의 세계 인기 컬렉션, 전용 진열장 및 보정용 칩 소모품</div>
                          <div className="col-span-4 lg:col-span-4 text-right text-brand-black font-black pr-1">1,200만원</div>
                        </div>

                        {/* Row 7: 냉난방 및 덕트 */}
                        <div className="grid grid-cols-12 p-3.5 items-center">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">기브슨 냉난방/F&B 키친</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">초안전 흡배기 닥트 환기 설비, 소방 보완 공사, 멀티 스마트 간판 포함</div>
                          <div className="col-span-4 lg:col-span-4 text-right text-brand-black font-black pr-1">2,800만원</div>
                        </div>

                        {/* Row 8: 마케팅 패키지 */}
                        <div className="grid grid-cols-12 p-3.5 items-center bg-brand-gray/40">
                          <div className="col-span-4 lg:col-span-3 font-black text-brand-black pl-1">오픈 초도 마케팅</div>
                          <div className="col-span-4 lg:col-span-5 text-slate-650 text-xs">인플루언서 초청 마케팅, 플레이스 노출 최적화 및 타겟 키워드 분석</div>
                          <div className="col-span-4 lg:col-span-4 text-right pr-1">
                            <span className="line-through text-slate-400 mr-2">300만원</span>
                            <span className="text-brand-black font-black">150만원</span> <span className="text-[#FF6B35] font-black text-xs">(본사 50% 공동 지원)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic summary bento card */}
                  <div className="lg:col-span-4 bg-brand-gray border-4 border-black p-6 space-y-6 flex flex-col justify-between self-stretch">
                    <div className="space-y-4">
                      <div className="inline-block py-1 px-2.5 bg-black text-[#FF6B35] text-[10px] font-black uppercase tracking-wider">
                        10호점 선착순 특전 대상
                      </div>
                      <h5 className="text-xl font-black text-brand-black leading-tight">초기 창업 금융 부담을 덜어드립니다</h5>
                      <div className="w-8 h-1 bg-black"></div>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-600">본사 총 면제 혜택가</span>
                          <span className="text-[#FF6B35] font-black">- 2,450 만원 즉시 차감</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-600">기준 면적</span>
                          <span className="text-brand-black font-black">실평수 60평 기준 모델 (8룸)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-600">기타 가전/하드웨어</span>
                          <span className="text-brand-black font-black">고화질 대형 TV 풀옵션 포함</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t-2 border-dashed border-black/30 space-y-4">
                      <div className="bg-white border-2 border-black p-4 relative">
                        <span className="text-[10px] text-slate-500 font-black block">최종 파격가 런칭 개설가</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-black text-brand-black">약 1억 8,790</span>
                          <span className="text-sm font-black text-brand-black">만원선</span>
                        </div>
                        <span className="text-[9px] text-slate-450 block mt-1 leading-relaxed">
                          * 임대보증금 및 전기 증설 무단철거, 냉난방기 기기 본품 구매 비용 별도 (매장 상황 상이)
                        </span>
                      </div>

                      <a 
                        href="#counsel"
                        className="w-full py-3.5 bg-black hover:bg-[#FF6B35] text-white font-black text-xs text-center block uppercase tracking-widest border-2 border-black transition-colors"
                      >
                        세부 견적 무료 상담 신청하기
                      </a>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* ----------------- 09. FAQ ACCORDION ----------------- */}
          <section className="py-24 border-b-4 border-black bg-white" id="faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              <div className="text-center mb-16">
                <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">QUESTIONS &amp; ANSWERS</span>
                <h2 className="text-3xl font-extrabold text-brand-black mt-2 uppercase tracking-tight">
                  자주 묻는 질문 FAQ
                </h2>
                <div className="w-12 h-1.5 bg-black mx-auto mt-4"></div>
              </div>

              <div className="space-y-4">
                {faqList.map((faq, index) => {
                  const isExpanded = expandedFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="border-2 border-black rounded-none overflow-hidden bg-brand-gray transition-colors hover:bg-white animate-none"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left py-5 px-6 flex items-start justify-between gap-4 text-brand-black hover:text-[#FF6B35] focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-[#FF6B35]/15 border-2 border-black rounded-none flex items-center justify-center text-brand-black shrink-0 mt-0.5">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <span className="font-extrabold text-sm sm:text-base pr-4">
                            {faq.question}
                          </span>
                        </div>
                        <div className={`p-1 bg-white border-2 border-black text-black rounded-none shrink-0 transition-transform duration-200 mt-0.5 ${isExpanded ? 'rotate-180 bg-[#FF6B35] text-white border-black' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-white border-t-2 border-black p-6">
                          <p className="text-slate-705 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-bold">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ----------------- 10. COUNSEL FORM APPLICATION SECTION ----------------- */}
          <section className="py-24 bg-brand-gray border-b-4 border-black relative" id="counsel">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side Section Texts */}
                <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                  <div className="space-y-4">
                    <span className="text-xs font-black text-[#FF6B35] tracking-widest uppercase">START YOUR CAREER</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight leading-tight uppercase font-black">
                      지금, CUBEBOX
                      <br />
                      창업을 시작해 보세요.
                    </h2>
                    <p className="text-slate-705 text-xs sm:text-sm leading-relaxed font-bold">
                      CUBEBOX 복합 문화 시스템은 유동 인구가 조밀한 입지부터 골목 상권까지 안정적인 자치 영업을 약속합니다. 개설 세부 분석, 평당 건축 단가 검증, 선착순 면제 혜택 등 1:1 맞춤 카운슬링 파일럿을 전송합니다.
                    </p>
                  </div>

                  {/* Immediate Lead Counter dynamic tracker */}
                  <div className="p-4 bg-white border-2 border-black rounded-none flex items-center justify-between shadow-[2px_2px_0px_#000000]">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-[#FF6B35] rounded-full animate-ping"></div>
                      <span className="text-xs font-black text-brand-black">실시간 전국 예상 상담 건수</span>
                    </div>
                    <span className="text-base font-black text-[#FF6B35] font-mono">
                      {leadsCount}건 실시간 연동중
                    </span>
                  </div>

                  {/* Alternative Direct contact options (Telephone, Kakao, Instagram) */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block font-mono">
                      DIRECT CHANNELS (빠른 즉시 문의)
                    </span>
                    
                    {/* Phone */}
                    <div className="p-4 bg-white border-2 border-black rounded-none flex items-center justify-between hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-brand-gray border border-black text-[#FF6B35]">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-600 block font-bold">유선 전화 가맹 본부</span>
                          <span className="text-sm sm:text-base font-extrabold text-brand-black font-mono">042-000-0000</span>
                        </div>
                      </div>
                      <a 
                        href="tel:042-000-0000" 
                        className="px-3.5 py-1.5 bg-black hover:bg-[#FF6B35] text-[11px] font-black text-white rounded-none cursor-pointer decoration-transparent select-none text-center border-2 border-black transition-colors"
                      >
                        전화 걸기
                      </a>
                    </div>

                    {/* Kakao */}
                    <div className="p-4 bg-white border-2 border-black rounded-none flex items-center justify-between hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-[#F7E600]/10 border border-[#F7E600] text-amber-500">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-600 block font-bold">카카오톡 공식 채널</span>
                          <span className="text-sm font-extrabold text-brand-black">큐브박스 창업상담센터</span>
                        </div>
                      </div>
                      <a 
                        href="https://pf.kakao.com" // Standard Kakao mockup link
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-[#F7E600] hover:bg-[#E5D500] text-slate-900 border-2 border-black text-[11px] font-black rounded-none cursor-pointer decoration-transparent select-none text-center transition-colors"
                      >
                        채널 연결
                      </a>
                    </div>

                    {/* Instagram */}
                    <div className="p-4 bg-white border-2 border-black rounded-none flex items-center justify-between hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-pink-500/10 border border-pink-500 text-pink-500">
                          <Instagram className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-600 block font-bold">인스타그램 채널</span>
                          <span className="text-sm font-extrabold text-brand-black">@cubebox_official</span>
                        </div>
                      </div>
                      <a 
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-black hover:bg-pink-500 border-2 border-black text-white hover:text-white rounded-none cursor-pointer"
                        title="공식 인스타그램 새창 열기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                  </div>

                </div>

                {/* Right Side Counsel Application Form */}
                <div className="lg:col-span-7">
                  <CounselForm />
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ----------------- GLOBAL FOOTER ----------------- */}
      <footer className="bg-white border-t-4 border-black py-12 text-slate-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-2 border-black">
            <div className="space-y-3">
              <CubeBoxLogo variant="horizontal" size="sm" />
              <p className="max-w-md leading-relaxed text-slate-700 font-bold">
                (주)큐브박스 코리아 | 대표이사: 프랜차이즈 출점 위원회 | 대전광역시 서구 둔산중로 | 사업자등록번호: 000-00-00000 | 가맹 상담 대표 전화: 042-000-0000
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-black">
              <button 
                onClick={() => setIsAdminView(!isAdminView)}
                className="text-slate-800 hover:text-[#FF6B35] transition-colors flex items-center gap-1 font-bold cursor-pointer"
              >
                <Lock className="w-3 h-3 text-black" />
                관리자 로그인 접수
              </button>
              <span className="text-black">|</span>
              <a href="#why" className="text-slate-800 hover:text-[#FF6B35] decoration-transparent">코어 비전</a>
              <span className="text-black">|</span>
              <a href="#costs" className="text-slate-800 hover:text-[#FF6B35] decoration-transparent">인테리어 단가</a>
              <span className="text-black">|</span>
              <a href="#counsel" className="text-[#FF6B35] hover:text-[#FF6B35]/80 decoration-transparent font-black">가맹 문의하기</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 text-[11px] font-bold text-slate-605">
            <p>© 2026 CUBEBOX. All Rights Reserved. Designed with absolute craftsmanship.</p>
            <div className="flex items-center gap-1 text-slate-800">
              <Heart className="w-3.5 h-3.5 fill-current text-slate-800" />
              <span>머무는 시간이 즐거워지는 복합 문화공동체 큐브박스 코리아</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
