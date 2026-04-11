import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Play, Music, Film, ArrowRight } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { Link } from "react-router-dom";

interface Video {
  title: string;
  url: string;
}

interface Project {
  id: string;
  category: "Music" | "Entertainment";
  type: string;
  title: string;
  thumbnailUrl?: string;
  videoUrl?: string; // Legacy field
  description: string;
  role: string;
  points: string[];
  videos: Video[];
  order?: number;
}

const initialProjects: Omit<Project, "id">[] = [
  {
    category: "Music",
    type: "Concert / Awards",
    title: "2025 K-POP World Festival 시상식",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "무대 흐름 유지 중심 편집",
      "클라이맥스 강조",
      "퍼포먼스 집중 컷 구성"
    ],
    videos: [
      { title: "하이라이트 영상", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ]
  },
  {
    category: "Music",
    type: "Music Program",
    title: "글로벌 라이브 스테이지 'The Sound'",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "현장감 극대화를 위한 사운드-비주얼 매칭",
      "아티스트별 감정선 유지 편집",
      "다이나믹한 카메라 워킹 강조"
    ],
    videos: [
      { title: "라이브 무대 1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ]
  },
  {
    category: "Entertainment",
    type: "Variety Show",
    title: "리얼리티 예능 '어쩌다 마주친'",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "리듬감 있는 컷 편집",
      "몰입도 유지 구조 설계",
      "자막 리듬을 활용한 웃음 타이밍 설계"
    ],
    videos: [
      { title: "예능 하이라이트", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ]
  },
  {
    category: "Entertainment",
    type: "Short-form",
    title: "숏폼 하이라이트 리패키징",
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "3초 내 시선 집중 구간 배치",
      "바이럴 최적화 컷 구성",
      "모바일 최적화 자막 디자인"
    ],
    videos: [
      { title: "숏폼 모음", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ]
  }
];

export default function Portfolio({ limit }: { limit?: number }) {
  const [activeTab, setActiveTab] = useState<"Music" | "Entertainment">("Entertainment");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      if (projectsData.length === 0) {
        // Fallback to initial mock data if collection is empty
        setProjects(initialProjects.map((p, i) => ({ ...p, id: `initial-${i}` })) as Project[]);
      } else {
        setProjects(projectsData);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "projects");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeTab);
  const displayedProjects = limit 
    ? filteredProjects.filter(p => p.isFeatured).slice(0, limit) 
    : filteredProjects;

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
  };

  const getThumbnail = (project: Project) => {
    let url = project.thumbnailUrl || project.videoUrl || "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
      }
    }
    if (url.includes("drive.google.com")) {
      const driveIdMatch = url.match(/\/d\/([^\/]+)/) || url.match(/id=([^&]+)/);
      if (driveIdMatch) {
        return `https://drive.google.com/uc?export=view&id=${driveIdMatch[1]}`;
      }
    }
    return url;
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-brand-light/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Portfolio</h2>
            <p className="text-zinc-500 font-medium">실력과 범용성을 증명하는 결과물입니다.</p>
          </div>
          
          <div className="flex p-1 bg-white rounded-2xl border border-zinc-100 shadow-sm">
            <button 
              onClick={() => setActiveTab("Entertainment")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "Entertainment" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-zinc-400 hover:text-brand-primary"}`}
            >
              <Film className="w-4 h-4" /> Entertainment
            </button>
            <button 
              onClick={() => setActiveTab("Music")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "Music" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-zinc-400 hover:text-brand-primary"}`}
            >
              <Music className="w-4 h-4" /> Music
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div 
                  className="relative group aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-100 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={getThumbnail(project)} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded mb-4 uppercase tracking-wider">
                    {project.type}
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-brand-dark">{project.title}</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Project Overview</h4>
                      <p className="text-zinc-600 font-medium whitespace-pre-wrap">{project.description}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">My Role</h4>
                      <p className="text-zinc-600 font-medium">{project.role}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest border-l-4 border-brand-accent pl-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-4">
                      {project.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-600 font-medium">
                          <span className="text-brand-accent mt-1 font-bold">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="mt-10 flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary/80 transition-colors"
                  >
                    영상 전체 보기 <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {limit && filteredProjects.length > limit && (
          <div className="mt-20 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark font-bold rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all shadow-sm group"
            >
              포트폴리오 전체 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                setActiveVideoUrl(null);
              }}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-zinc-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div>
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1 block">{selectedProject.type}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">{selectedProject.title}</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      setActiveVideoUrl(null);
                    }}
                    className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Player Area */}
                    <div className="lg:col-span-2">
                      {activeVideoUrl ? (
                        <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                          <iframe
                            src={getEmbedUrl(activeVideoUrl) || ""}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="aspect-video rounded-2xl overflow-hidden relative group shadow-inner">
                          <img 
                            src={getThumbnail(selectedProject)} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-dark z-10">
                            <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg">
                              <Play className="w-8 h-8 text-brand-primary fill-current ml-1" />
                            </div>
                            <p className="font-bold text-lg">오른쪽 리스트에서 영상을 선택해주세요</p>
                          </div>
                        </div>
                      )}
                      
                      {activeVideoUrl && (
                        <div className="mt-6 p-6 bg-brand-light/10 rounded-2xl border border-brand-light/30">
                          <h4 className="text-sm font-bold text-brand-dark mb-2 uppercase tracking-widest">Now Playing</h4>
                          <p className="text-brand-dark font-bold text-lg">
                            {selectedProject.videos.find(v => v.url === activeVideoUrl)?.title}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Playlist Area */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Playlist</h4>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {(selectedProject.videos || []).map((video, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveVideoUrl(video.url)}
                            className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left border ${
                              activeVideoUrl === video.url 
                                ? "bg-brand-primary/5 border-brand-primary/30 shadow-sm" 
                                : "bg-white border-zinc-100 hover:border-brand-primary/20 hover:bg-zinc-50"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                              activeVideoUrl === video.url ? "bg-brand-primary text-white" : "bg-zinc-100 text-zinc-400"
                            }`}>
                              <Play className={`w-5 h-5 ${activeVideoUrl === video.url ? "fill-current" : ""}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-bold text-sm truncate ${activeVideoUrl === video.url ? "text-brand-primary" : "text-brand-dark"}`}>
                                {video.title}
                              </p>
                              <p className="text-xs text-zinc-400 mt-1">Click to play</p>
                            </div>
                          </button>
                        ))}
                        {(selectedProject.videos || []).length === 0 && (
                          <p className="text-center text-zinc-400 text-sm py-10">등록된 영상이 없습니다.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
