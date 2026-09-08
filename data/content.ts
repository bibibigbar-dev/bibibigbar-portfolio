export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  year: string;
  link?: string;
};

export type Skill = {
  name: string;
  level: number; // 0 - 100
  color: string;
};

export const siteConfig = {
  name: "BIBIBIGBAR",
  tagline: "Creative Developer & Digital Designer",
  email: "hello@bibibigbar.dev",
  social: {
    github: "https://github.com/bibibigbar-dev",
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
  },
};

export const aboutText = [
  "안녕하세요, 저는 색과 움직임으로 이야기를 만드는 크리에이티브 개발자입니다.",
  "타이포그래피, 인터랙션, 그리고 코드가 만나는 지점에서 실험하는 것을 좋아합니다.",
  "새로운 기술을 배우고, 그것을 재미있는 경험으로 바꾸는 과정을 즐깁니다.",
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Prism Studio",
    description: "인터랙티브 3D 갤러리를 위한 크리에이티브 에이전시 웹사이트 (샘플 프로젝트)",
    tags: ["Next.js", "Three.js", "GSAP"],
    color: "from-accent-pink to-accent-purple",
    year: "2024",
  },
  {
    id: "p2",
    title: "Neon Market",
    description: "알록달록한 애니메이션이 돋보이는 이커머스 랜딩 페이지 (샘플 프로젝트)",
    tags: ["React", "Framer Motion", "Tailwind"],
    color: "from-accent-orange to-accent-yellow",
    year: "2024",
  },
  {
    id: "p3",
    title: "Wave Radio",
    description: "실시간 음악 시각화를 제공하는 스트리밍 플랫폼 (샘플 프로젝트)",
    tags: ["TypeScript", "WebAudio", "Canvas"],
    color: "from-accent-green to-accent-blue",
    year: "2023",
  },
  {
    id: "p4",
    title: "Kinetic Type",
    description: "움직이는 타이포그래피를 실험하는 개인 프로젝트 (샘플 프로젝트)",
    tags: ["GSAP", "SVG", "Motion"],
    color: "from-accent-purple to-accent-pink",
    year: "2023",
  },
];

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, color: "bg-accent-pink" },
  { name: "TypeScript", level: 90, color: "bg-accent-orange" },
  { name: "Framer Motion / GSAP", level: 85, color: "bg-accent-yellow" },
  { name: "Three.js / WebGL", level: 70, color: "bg-accent-green" },
  { name: "UI / UX Design", level: 80, color: "bg-accent-blue" },
  { name: "Tailwind CSS", level: 92, color: "bg-accent-purple" },
];
