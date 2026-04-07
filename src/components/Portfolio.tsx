import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Play, Music, Film } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";

interface Project {
  id: string;
  category: "Music" | "Entertainment";
  type: string;
  title: string;
  videoUrl: string;
  description: string;
  role: string;
  points: string[];
  order?: number;
}

const initialProjects: Omit<Project, "id">[] = [
  {
    category: "Music",
    type: "Concert / Awards",
    title: "2025 K-POP World Festival 시상식",
    videoUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "무대 흐름 유지 중심 편집",
      "클라이맥스 강조",
      "퍼포먼스 집중 컷 구성"
    ]
  },
  {
    category: "Music",
    type: "Music Program",
    title: "글로벌 라이브 스테이지 'The Sound'",
    videoUrl: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "현장감 극대화를 위한 사운드-비주얼 매칭",
      "아티스트별 감정선 유지 편집",
      "다이나믹한 카메라 워킹 강조"
    ]
  },
  {
    category: "Entertainment",
    type: "Variety Show",
    title: "리얼리티 예능 '어쩌다 마주친'",
    videoUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "리듬감 있는 컷 편집",
      "몰입도 유지 구조 설계",
      "자막 리듬을 활용한 웃음 타이밍 설계"
    ]
  },
  {
    category: "Entertainment",
    type: "Short-form",
    title: "숏폼 하이라이트 리패키징",
    videoUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    description: "음악 프로그램 / 예능 콘텐츠 편집",
    role: "편집 / 연출 / 흐름 구성",
    points: [
      "3초 내 시선 집중 구간 배치",
      "바이럴 최적화 컷 구성",
      "모바일 최적화 자막 디자인"
    ]
  }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"Music" | "Entertainment">("Entertainment");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-brand-light/10">
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
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-100">
                  <img 
                    src={project.videoUrl} 
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
                      <p className="text-zinc-600 font-medium">{project.description}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">My Role</h4>
                      <p className="text-zinc-600 font-medium">{project.role}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest border-l-4 border-brand-accent pl-4">
                      Strategy Analysis
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

                  <button className="mt-10 flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
                    영상 전체 보기 <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
