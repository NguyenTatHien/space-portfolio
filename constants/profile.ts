// Single source of truth for everything personal on the site.
// Keep it in sync with the CV (Nguyen_Tat_Hien_CV.pdf). Client names are intentionally left out.

export type Lang = "en" | "vi";
export type T = Record<Lang, string>;

export const PROFILE = {
  name: "Nguyễn Tất Hiển",
  shortName: "Hien Nguyen",
  initials: "NTH",
  role: { en: "Full-stack Developer", vi: "Full-stack Developer" } as T,
  location: { en: "Ho Chi Minh City, Vietnam", vi: "TP. Hồ Chí Minh, Việt Nam" } as T,
  email: "tathien2003@gmail.com",
  github: "https://github.com/NguyenTatHien",
  linkedin: "https://www.linkedin.com/in/nguyentathien",
  cv: "/Nguyen_Tat_Hien_CV.pdf",
  avatar: "/avatar.webp",
  site: "https://hiennguyen.io.vn",
} as const;

export const ROTATING_ROLES: T[] = [
  { en: "Full-stack Developer", vi: "Full-stack Developer" },
  { en: "React · Next.js · TypeScript", vi: "React · Next.js · TypeScript" },
  { en: "Laravel · NestJS · Node.js", vi: "Laravel · NestJS · Node.js" },
  { en: "Practical AI: RAG · LLM APIs", vi: "AI thực dụng: RAG · LLM API" },
];

export const UI = {
  nav: {
    about: { en: "About", vi: "Giới thiệu" },
    experience: { en: "Experience", vi: "Kinh nghiệm" },
    projects: { en: "Projects", vi: "Dự án" },
    skills: { en: "Skills", vi: "Kỹ năng" },
    contact: { en: "Contact", vi: "Liên hệ" },
    cv: { en: "Download CV", vi: "Tải CV" },
    menu: { en: "Open menu", vi: "Mở menu" },
    close: { en: "Close menu", vi: "Đóng menu" },
    lang: { en: "Switch language", vi: "Đổi ngôn ngữ" },
  },
  hero: {
    status: { en: "System online", vi: "Hệ thống trực tuyến" },
    greeting: { en: "Hi, I'm", vi: "Xin chào, tôi là" },
    headline: {
      en: "I turn paper forms and spreadsheets into web systems businesses rely on every day.",
      vi: "Tôi biến giấy tờ và bảng tính thành hệ thống web mà doanh nghiệp dùng mỗi ngày.",
    },
    ctaProjects: { en: "Explore projects", vi: "Xem dự án" },
    ctaCv: { en: "Download CV", vi: "Tải CV (PDF)" },
    scroll: { en: "Scroll to begin the mission", vi: "Cuộn xuống để bắt đầu hành trình" },
  },
  sections: {
    about: { en: "Mission brief", vi: "Hồ sơ nhiệm vụ" },
    aboutTitle: { en: "About me", vi: "Về tôi" },
    experience: { en: "Flight log", vi: "Nhật ký hành trình" },
    experienceTitle: { en: "Experience", vi: "Kinh nghiệm làm việc" },
    projects: { en: "Missions completed", vi: "Nhiệm vụ đã hoàn thành" },
    projectsTitle: { en: "Featured projects", vi: "Dự án nổi bật" },
    skills: { en: "Onboard systems", vi: "Hệ thống trên tàu" },
    skillsTitle: { en: "Skills & tools", vi: "Kỹ năng và công cụ" },
    education: { en: "Training academy", vi: "Học viện" },
    educationTitle: { en: "Education & certificates", vi: "Học vấn và chứng chỉ" },
    contact: { en: "Open channel", vi: "Kênh liên lạc" },
    contactTitle: {
      en: "Let's build something people actually rely on.",
      vi: "Cùng xây thứ mà người dùng thật sự cần đến.",
    },
  },
  projects: {
    production: { en: "In production", vi: "Đang chạy thật" },
    highlights: { en: "Highlights", vi: "Điểm nổi bật" },
    suiteIntro: {
      en: "Enterprise carbon accounting platform. I worked on 4 of its products in a Scrum team of 15.",
      vi: "Nền tảng kế toán carbon cho doanh nghiệp. Tôi làm 4 sản phẩm của nền tảng trong nhóm Scrum 15 người.",
    },
  },
  contact: {
    body: {
      en: "I'm open to full-stack roles in teams with strong engineering practices. The fastest way to reach me is email.",
      vi: "Tôi sẵn sàng cho vị trí full-stack ở những đội có quy trình kỹ thuật tốt. Cách nhanh nhất để liên hệ là email.",
    },
    copy: { en: "Copy email", vi: "Chép email" },
    copied: { en: "Copied!", vi: "Đã chép!" },
    send: { en: "Send an email", vi: "Gửi email" },
  },
  footer: {
    built: {
      en: "Designed & built by Nguyễn Tất Hiển with Next.js and Three.js.",
      vi: "Thiết kế và xây dựng bởi Nguyễn Tất Hiển, bằng Next.js và Three.js.",
    },
    top: { en: "Back to top", vi: "Lên đầu trang" },
  },
};

export const ABOUT = {
  paragraphs: [
    {
      en: "I enjoy understanding how a business works before writing code, and I take ownership of what I build until people actually rely on it.",
      vi: "Tôi thích hiểu cách một doanh nghiệp vận hành trước khi viết code, và chịu trách nhiệm với thứ mình làm cho tới khi người dùng thật sự dựa vào nó.",
    },
    {
      en: "Most of my work turns paper forms and spreadsheets into web systems that companies use every day: an internal staff portal with an AI assistant, an operations system for a car-care chain, and a safety & environment compliance platform for a group of factories.",
      vi: "Phần lớn công việc của tôi là biến giấy tờ và bảng tính thành hệ thống web mà công ty dùng hằng ngày: cổng nội bộ cho nhân viên có trợ lý AI, hệ thống vận hành cho chuỗi chăm sóc xe, và nền tảng tuân thủ an toàn môi trường cho một nhóm nhà máy.",
    },
    {
      en: "Short term, I want to be a dependable full-stack developer in a team with strong engineering practices. Long term, I want to grow into a senior engineer who leads projects, works closely with customers and supports younger developers.",
      vi: "Trước mắt, tôi muốn là một full-stack developer đáng tin cậy trong đội có quy trình kỹ thuật tốt. Lâu dài, tôi muốn trở thành kỹ sư senior dẫn dắt dự án, làm việc sát với khách hàng và hỗ trợ các bạn trẻ.",
    },
  ] as T[],
  values: [
    { en: "Clear data design and simple flows real users understand", vi: "Thiết kế dữ liệu rõ ràng, luồng đơn giản mà người dùng thật hiểu được" },
    { en: "Working across the stack: UI, APIs, permissions, integrations", vi: "Làm xuyên suốt: giao diện, API, phân quyền, tích hợp" },
    { en: "AI where it genuinely saves time, with answers that are checked", vi: "Dùng AI ở chỗ thật sự tiết kiệm thời gian, và kiểm tra câu trả lời" },
    { en: "Automated tests, code reviews and support after launch", vi: "Test tự động, review code và hỗ trợ sau khi bàn giao" },
  ] as T[],
};

export const STATS: { value: string; label: T }[] = [
  { value: "4", label: { en: "client systems delivered", vi: "hệ thống bàn giao cho khách" } },
  { value: "3", label: { en: "running in production", vi: "đang chạy thật" } },
  { value: "~500", label: { en: "staff on a portal I built solo", vi: "nhân sự dùng cổng tôi làm một mình" } },
  { value: "18", label: { en: "modules shipped in ~6 weeks", vi: "module bàn giao trong ~6 tuần" } },
];

export type Experience = {
  company: string;
  role: T;
  type: T;
  period: T;
  summary: T;
  bullets: T[];
  stack: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "19T Digital",
    role: { en: "Full-stack Developer", vi: "Full-stack Developer" },
    type: { en: "Full-time", vi: "Toàn thời gian" },
    period: { en: "Apr 2026 – Oct 2026", vi: "04/2026 – 10/2026" },
    summary: {
      en: "Software house building custom management systems for Vietnamese businesses.",
      vi: "Công ty phần mềm làm hệ thống quản lý theo yêu cầu cho doanh nghiệp Việt Nam.",
    },
    bullets: [
      {
        en: "Delivered 4 client systems: Hobi Portal, AP Service Hub, GEMS and Trung Tâm Thanh Hằng, 3 of them now in production",
        vi: "Bàn giao 4 hệ thống cho khách: Hobi Portal, AP Service Hub, GEMS và Trung Tâm Thanh Hằng, 3 hệ thống đang chạy thật",
      },
      {
        en: "Owned each client project from requirements to delivery and feedback rounds",
        vi: "Phụ trách trọn dự án từ lấy yêu cầu tới bàn giao và các vòng góp ý của khách",
      },
      {
        en: "Built on the in-house app framework with AI coding tools; every change reviewed and covered by automated tests before release",
        vi: "Xây trên framework nội bộ cùng công cụ AI coding; mọi thay đổi đều được review và có test tự động trước khi phát hành",
      },
    ],
    stack: ["React", "TypeScript", "Laravel", "Next.js", "MySQL"],
  },
  {
    company: "CMC Global",
    role: { en: "Front-end Developer · Remote", vi: "Front-end Developer · Từ xa" },
    type: { en: "Scrum team of 15", vi: "Nhóm Scrum 15 người" },
    period: { en: "Jul 2025 – Mar 2026", vi: "07/2025 – 03/2026" },
    summary: {
      en: "Front-end work for GoNetZero, an enterprise carbon accounting platform.",
      vi: "Phát triển front-end cho GoNetZero, nền tảng kế toán carbon cho doanh nghiệp.",
    },
    bullets: [
      {
        en: "Worked on 4 products of the platform: Measure, Spotlight, the public website and Manage, plus the shared component library Lush",
        vi: "Làm 4 sản phẩm của nền tảng: Measure, Spotlight, website công khai và Manage, cùng thư viện component dùng chung Lush",
      },
      {
        en: "Took part in code reviews and handled releases to production through Azure DevOps pipelines",
        vi: "Tham gia review code và phát hành lên production qua pipeline Azure DevOps",
      },
    ],
    stack: ["Angular 17", "TypeScript", "PrimeNG", "Chart.js", "Go"],
  },
];

export type ProjectVisual = "ai" | "ops" | "compliance" | "learning";

export type Project = {
  slug: string;
  name: string;
  subtitle: T;
  period: T;
  role: T;
  production: boolean;
  visual: ProjectVisual;
  /** Optional real screenshot in /public/projects, e.g. "/projects/hobi-portal.webp". */
  image?: string;
  summary: T;
  highlights: T[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "hobi-portal",
    name: "Hobi Portal",
    subtitle: { en: "Internal staff portal with an AI assistant", vi: "Cổng nội bộ cho nhân viên, có trợ lý AI" },
    period: { en: "Aug – Oct 2026", vi: "08 – 10/2026" },
    role: { en: "Sole developer · ~500 staff", vi: "Làm một mình · ~500 nhân sự" },
    production: true,
    visual: "ai",
    summary: {
      en: "Replaced paper requests and scattered policy files with one portal that office and factory staff open on their phones with an employee code and PIN.",
      vi: "Thay đơn giấy và file quy định rải rác bằng một cổng duy nhất, nhân viên văn phòng và nhà máy mở trên điện thoại bằng mã nhân viên và PIN.",
    },
    highlights: [
      {
        en: "AI assistant answers policy questions with links to the source document (RAG on Qdrant, function calling for live HR data) and only shows what each person is allowed to see",
        vi: "Trợ lý AI trả lời câu hỏi về quy định kèm link tài liệu gốc (RAG trên Qdrant, function calling lấy dữ liệu nhân sự trực tiếp), và chỉ hiện đúng phần mỗi người được xem",
      },
      {
        en: "Requests with delegation, HR records, recruitment, news, training videos and a protected document library",
        vi: "Đơn từ có uỷ quyền, hồ sơ nhân sự, tuyển dụng, tin tức, video đào tạo và thư viện tài liệu được bảo vệ",
      },
      {
        en: "Candidate CVs are read automatically into the hiring form; staff records import and export in the client's own Excel template",
        vi: "CV ứng viên được đọc tự động vào form tuyển dụng; hồ sơ nhân sự nhập và xuất đúng mẫu Excel của khách",
      },
    ],
    stack: ["React", "Laravel", "MariaDB", "Claude / OpenAI", "Qdrant"],
  },
  {
    slug: "ap-service-hub",
    name: "AP Service Hub",
    subtitle: { en: "Operations system for a car-care chain", vi: "Hệ thống vận hành cho chuỗi chăm sóc xe" },
    period: { en: "Sep – Oct 2026", vi: "09 – 10/2026" },
    role: { en: "Lead full-stack · 8 locations", vi: "Full-stack chính · 8 chi nhánh" },
    production: true,
    visual: "ops",
    summary: {
      en: "Grew a browser-only demo into one system for the whole chain: check-in by license plate, signed quotes, bay scheduling, QC, parts stock, invoices, prepaid cards, SMS/Zalo campaigns and commission payroll.",
      vi: "Phát triển một bản demo chỉ chạy trên trình duyệt thành hệ thống chung cho cả chuỗi: nhận xe theo biển số, báo giá có ký, xếp lịch khoang, QC, kho phụ tùng, hoá đơn, thẻ trả trước, chiến dịch SMS/Zalo và lương hoa hồng.",
    },
    highlights: [
      {
        en: "Face clock-in on a phone with checks against photo spoofing and wrong locations (Python, OpenCV)",
        vi: "Chấm công bằng khuôn mặt trên điện thoại, chống ảnh giả và sai vị trí (Python, OpenCV)",
      },
      {
        en: "Connected to the existing CRM and online store",
        vi: "Kết nối với CRM và cửa hàng online sẵn có",
      },
      {
        en: "Staging and production on Ubuntu with versioned releases, rollback and off-site backups",
        vi: "Môi trường staging và production trên Ubuntu, phát hành có phiên bản, rollback và sao lưu ngoài máy chủ",
      },
    ],
    stack: ["React", "TypeScript", "Laravel", "MySQL", "Python"],
  },
  {
    slug: "gems",
    name: "GEMS",
    subtitle: { en: "Safety & environment compliance platform", vi: "Nền tảng tuân thủ an toàn và môi trường" },
    period: { en: "Aug – Oct 2026", vi: "08 – 10/2026" },
    role: { en: "Built the first release alone · 5 factories", vi: "Một mình làm bản đầu · 5 nhà máy" },
    production: true,
    visual: "compliance",
    summary: {
      en: "Replaced spreadsheets for chemicals, incidents, work permits, health checks, waste and carbon reporting with 18 connected modules, delivered through 3 feedback rounds in about 6 weeks.",
      vi: "Thay bảng tính về hoá chất, sự cố, giấy phép làm việc, khám sức khoẻ, chất thải và báo cáo carbon bằng 18 module liên kết, bàn giao qua 3 vòng góp ý trong khoảng 6 tuần.",
    },
    highlights: [
      {
        en: "Chemical management with legal lookup by CAS number, purchase requests, stock by lot (first in, first out) and GHS hazard-label printing",
        vi: "Quản lý hoá chất: tra cứu pháp lý theo số CAS, đề nghị mua, tồn kho theo lô (nhập trước xuất trước) và in nhãn cảnh báo GHS",
      },
      {
        en: "Moved the app from browser storage to a Laravel API (Sanctum, MariaDB)",
        vi: "Chuyển ứng dụng từ lưu trên trình duyệt sang API Laravel (Sanctum, MariaDB)",
      },
      {
        en: "Permissions for 7 roles across 18 modules, so each user only sees their own factory's data",
        vi: "Phân quyền 7 vai trò trên 18 module, mỗi người chỉ thấy dữ liệu nhà máy của mình",
      },
    ],
    stack: ["React", "TypeScript", "Laravel", "MariaDB", "PWA"],
  },
  {
    slug: "thanh-hang",
    name: "Trung Tâm Thanh Hằng",
    subtitle: { en: "Education center management & e-learning", vi: "Quản lý trung tâm ngoại ngữ và học trực tuyến" },
    period: { en: "Apr – Aug 2026", vi: "04 – 08/2026" },
    role: { en: "One of 2 core developers · multi-campus", vi: "1 trong 2 dev chính · nhiều cơ sở" },
    production: false,
    visual: "learning",
    summary: {
      en: "Runs the full student journey (leads, enrollment, classes, schedules, attendance, deferrals, campus transfers, payments) plus an e-learning site with video lessons, assignments and practice tests.",
      vi: "Quản lý trọn hành trình học viên (khách tiềm năng, ghi danh, lớp, lịch học, điểm danh, bảo lưu, chuyển cơ sở, thanh toán) cùng trang học trực tuyến có video, bài tập và đề luyện.",
    },
    highlights: [
      {
        en: "Access by role and campus, multi-step approvals and automatic commission calculation",
        vi: "Phân quyền theo vai trò và cơ sở, duyệt nhiều bước, tự tính hoa hồng",
      },
      {
        en: "Integrated accounting & e-invoicing, video streaming with resumable uploads and download protection",
        vi: "Tích hợp kế toán và hoá đơn điện tử, phát video có tải lên tiếp tục được và chống tải về",
      },
      {
        en: "Employment contracts generated from 21 Word templates; releases with notes, QC flows and Docker/Nginx deploy scripts",
        vi: "Sinh hợp đồng lao động từ 21 mẫu Word; phát hành kèm release note, luồng QC và script deploy Docker/Nginx",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Laravel", "PostgreSQL"],
  },
];

export const SUITE = {
  name: "GoNetZero",
  period: { en: "Aug 2025 – Mar 2026", vi: "08/2025 – 03/2026" } as T,
  modules: [
    {
      name: "Measure",
      title: { en: "Emissions data", vi: "Dữ liệu phát thải" },
      text: {
        en: "Scope 1, 2 and 3 submission and review, new calculation API, CSV export, analytics charts with drill-down and percentage-change indicators.",
        vi: "Nộp và duyệt dữ liệu scope 1, 2, 3, API tính toán mới, xuất CSV, biểu đồ phân tích có drill-down và chỉ báo phần trăm thay đổi.",
      },
    },
    {
      name: "Spotlight",
      title: { en: "Custom energy dashboard · main FE dev", vi: "Dashboard năng lượng · FE chính" },
      text: {
        en: "Drag-and-drop dashboards branded per client, present-mode slideshow, auto-refresh and a portfolio view; updated the Go authorization middleware and its tests.",
        vi: "Dashboard kéo thả theo thương hiệu từng khách, chế độ trình chiếu, tự làm mới và góc nhìn toàn danh mục; sửa middleware phân quyền Go và unit test.",
      },
    },
    {
      name: "Website",
      title: { en: "Public site & sign-up", vi: "Website và đăng ký" },
      text: {
        en: "Pricing pages, PPA solution page with case studies, contact form, terms step in sign-up and redirect fixes, responsive on tablet and mobile.",
        vi: "Trang bảng giá, trang giải pháp PPA kèm case study, form liên hệ, bước điều khoản khi đăng ký và sửa chuyển hướng, chạy tốt trên tablet và điện thoại.",
      },
    },
    {
      name: "Manage · Lush",
      title: { en: "Design system", vi: "Design system" },
      text: {
        en: "Reusable tree table (tooltips, paging) in the shared component library, used for the business unit, tenant and site hierarchy.",
        vi: "Tree table tái sử dụng (tooltip, phân trang) trong thư viện component dùng chung, dùng cho cây đơn vị, tenant và địa điểm.",
      },
    },
  ],
  stack: ["Angular 17", "TypeScript", "PrimeNG", "Chart.js", "Go", "Azure DevOps"],
};

export type SkillGroup = { key: string; title: T; items: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  { key: "lang", title: { en: "Languages", vi: "Ngôn ngữ" }, items: ["TypeScript", "JavaScript", "PHP", "SQL", "Python", "Go"] },
  { key: "fe", title: { en: "Frontend", vi: "Frontend" }, items: ["React", "Next.js", "Angular", "Tailwind CSS", "PrimeNG", "MUI", "Zustand"] },
  { key: "be", title: { en: "Backend", vi: "Backend" }, items: ["Laravel", "Node.js", "NestJS", "REST API"] },
  { key: "db", title: { en: "Databases", vi: "Cơ sở dữ liệu" }, items: ["MySQL", "MariaDB", "PostgreSQL"] },
  { key: "ai", title: { en: "AI", vi: "AI" }, items: ["Claude / OpenAI APIs", "RAG", "Qdrant", "Function calling", "OCR", "Claude Code · Codex"] },
  { key: "ops", title: { en: "DevOps & testing", vi: "DevOps và kiểm thử" }, items: ["Docker", "Nginx", "Linux", "GitHub Actions", "Azure DevOps", "Cloudflare", "Pest / PHPUnit", "Vitest", "Playwright"] },
];

export const SOFT_SKILLS: T[] = [
  { en: "English VSTEP B2: reading and writing technical documents daily", vi: "Tiếng Anh VSTEP B2: đọc và viết tài liệu kỹ thuật hằng ngày" },
  { en: "OOP, data structures, algorithms, design patterns, Git", vi: "OOP, cấu trúc dữ liệu, giải thuật, design pattern, Git" },
  { en: "Team player, problem solving, self-learning, adaptability", vi: "Làm việc nhóm, giải quyết vấn đề, tự học, thích nghi" },
];

export const EDUCATION: { school: string; degree: T; period: T; note?: T }[] = [
  {
    school: "FPT University",
    degree: { en: "Master of Software Engineering (Artificial Intelligence)", vi: "Thạc sĩ Kỹ thuật phần mềm (Trí tuệ nhân tạo)" },
    period: { en: "Sep 2025 – Aug 2027 (expected)", vi: "09/2025 – 08/2027 (dự kiến)" },
  },
  {
    school: "Van Lang University",
    degree: { en: "Bachelor of Software Engineering", vi: "Cử nhân Kỹ thuật phần mềm" },
    period: { en: "Sep 2021 – Aug 2025", vi: "09/2021 – 08/2025" },
    note: {
      en: "Thesis: FaceID attendance system with fake-photo detection, team leader",
      vi: "Khoá luận: hệ thống điểm danh FaceID có phát hiện ảnh giả, trưởng nhóm",
    },
  },
];

export const CERTIFICATES: { name: T; issuer: string; date: T }[] = [
  {
    name: { en: "VSTEP English, Level B2 (Upper-intermediate)", vi: "Tiếng Anh VSTEP bậc B2 (Trung cao cấp)" },
    issuer: "Van Lang University",
    date: { en: "Aug 2025", vi: "08/2025" },
  },
];
