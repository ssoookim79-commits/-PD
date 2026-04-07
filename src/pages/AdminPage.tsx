import React, { useState, useEffect } from "react";
import { Lock, Image as ImageIcon, Save, Trash2, Plus, LogOut, RefreshCw } from "lucide-react";
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";

interface Project {
  id: string;
  category: "Music" | "Entertainment";
  type: string;
  title: string;
  videoUrl: string;
  description: string;
  role: string;
  points: string[];
  order: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg(null), 5000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (currentUser) {
        console.log("Logged in as:", currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch projects if either Google Admin is logged in OR Password "1111" is entered
    if ((user && user.email === "ssoookim79@gmail.com") || password === "1111") {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        setProjects(projectsData);
      }, (error) => {
        console.error("Fetch error:", error);
        showMsg("데이터를 불러오는 중 오류가 발생했습니다.", "error");
      });
      return () => unsubscribe();
    }
  }, [user, password]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError("");
      showMsg("구글 로그인 성공");
    } catch (err: any) {
      setError("로그인에 실패했습니다: " + err.message);
      showMsg("로그인 실패", "error");
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1111") {
      setError("");
      showMsg("비밀번호로 입장했습니다.");
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setPassword("");
    showMsg("로그아웃 되었습니다.");
  };

  const handleSave = async (project: Project) => {
    setLoading(true);
    try {
      const { id, ...data } = project;
      await setDoc(doc(db, "projects", id), {
        ...data,
        updatedAt: serverTimestamp()
      });
      showMsg("저장되었습니다.");
    } catch (err: any) {
      console.error("Save error:", err);
      if (err.message.includes("permission-denied") || err.message.includes("permissions")) {
        showMsg("권한이 없습니다. ssoookim79@gmail.com 계정으로 로그인하세요.", "error");
      } else {
        showMsg("저장 실패: " + err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "projects", id));
      showMsg("삭제되었습니다.");
    } catch (err: any) {
      console.error("Delete error:", err);
      if (err.message.includes("permission-denied") || err.message.includes("permissions")) {
        showMsg("권한이 없습니다. ssoookim79@gmail.com 계정으로 로그인하세요.", "error");
      } else {
        showMsg("삭제 실패: " + err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const newProject = {
      category: "Entertainment",
      type: "New Type",
      title: "새 프로젝트",
      videoUrl: "https://",
      description: "설명을 입력하세요",
      role: "역할을 입력하세요",
      points: ["포인트 1"],
      order: projects.length,
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, "projects"), newProject);
      showMsg("새 프로젝트가 추가되었습니다.");
    } catch (err: any) {
      console.error("Add error:", err);
      if (err.message.includes("permission-denied") || err.message.includes("permissions")) {
        showMsg("권한이 없습니다. ssoookim79@gmail.com 계정으로 로그인하세요.", "error");
      } else {
        showMsg("추가 실패: " + err.message, "error");
      }
    }
  };

  const updateProjectField = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updatePoint = (id: string, index: number, value: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const newPoints = [...p.points];
        newPoints[index] = value;
        return { ...p, points: newPoints };
      }
      return p;
    }));
  };

  if (!isAuthReady) return null;

  const isAdmin = user && user.email === "ssoookim79@gmail.com";

  if (!isAdmin && password !== "1111") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light/20 px-6">
        <div className="glass p-10 rounded-3xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-brand-primary w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-6">관리자 로그인</h1>
          
          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              구글 관리자 계정으로 로그인
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-500">또는</span></div>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <input
                type="password"
                placeholder="비밀번호 (1111)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                비밀번호로 입장
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">포트폴리오 관리</h1>
            <p className="text-zinc-500 text-sm">
              {user ? `접속 계정: ${user.email}` : "비밀번호로 접속 중 (수정 제한될 수 있음)"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-zinc-500 hover:text-brand-dark transition-colors">
              <LogOut className="w-4 h-4" /> 로그아웃
            </button>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> 새 프로젝트 추가
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className={`fixed top-24 right-6 z-50 p-4 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 ${
            statusMsg.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {statusMsg.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass p-8 rounded-3xl flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-64 space-y-4">
                <div className="aspect-video bg-zinc-200 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  {project.videoUrl.startsWith('http') ? (
                    <img src={project.videoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-zinc-400 w-8 h-8" />
                  )}
                </div>
                <select 
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200 bg-white"
                  value={project.category}
                  onChange={(e) => updateProjectField(project.id, "category", e.target.value)}
                >
                  <option value="Music">Music</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <input
                  type="number"
                  placeholder="정렬 순서"
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                  value={project.order}
                  onChange={(e) => updateProjectField(project.id, "order", parseInt(e.target.value))}
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="프로젝트 제목"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                    value={project.title}
                    onChange={(e) => updateProjectField(project.id, "title", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="유형 (예: Concert / Awards)"
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                    value={project.type}
                    onChange={(e) => updateProjectField(project.id, "type", e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="이미지/영상 URL"
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                  value={project.videoUrl}
                  onChange={(e) => updateProjectField(project.id, "videoUrl", e.target.value)}
                />
                <textarea
                  placeholder="설명"
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200 h-24"
                  value={project.description}
                  onChange={(e) => updateProjectField(project.id, "description", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="나의 역할"
                  className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                  value={project.role}
                  onChange={(e) => updateProjectField(project.id, "role", e.target.value)}
                />
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Strategy Points</p>
                  {project.points.map((point, i) => (
                    <input
                      key={i}
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-zinc-200"
                      value={point}
                      onChange={(e) => updatePoint(project.id, i, e.target.value)}
                    />
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleSave(project)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 저장
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    disabled={loading}
                    className="px-6 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-zinc-400 mb-4">등록된 프로젝트가 없습니다.</p>
              <button onClick={handleAdd} className="btn-primary">첫 프로젝트 추가하기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

