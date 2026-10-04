import { getImgPath } from "@/utils/image";

export const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "/#blog" },
];

export const count = [
  { icon: getImgPath('/images/counter/star.svg'), value: 'Mobile', description: 'React Native and Flutter apps for iOS and Android' },
  { icon: getImgPath('/images/counter/admin.svg'), value: 'Web', description: 'Full-stack applications, backends, and databases' },
  { icon: getImgPath('/images/counter/bag.svg'), value: 'AI', description: 'AI development and integrations for your products' },
];

export const Servicebox = [
  { icon: getImgPath("/images/services/ux-design-product_1.svg"), title: "Mobile App Development", description: "Cross-platform iOS and Android apps built with React Native or Flutter and Dart, from your first MVP to new product features." },
  { icon: getImgPath("/images/services/perfomance-optimization.svg"), title: "Web App Development", description: "Responsive web applications with React and Next.js, using MERN and PERN stacks to connect your interface, APIs, and data." },
  { icon: getImgPath("/images/services/ux-design-product_2.svg"), title: "Backend & API Development", description: "Backend services, REST APIs, authentication, and business logic with Node.js, Express, and PHP." },
  { icon: getImgPath("/images/services/ux-design-product_1.svg"), title: "AI Development & Integration", description: "Bring AI into your product with custom assistants, intelligent workflows, and integrations with AI models and APIs." },
  { icon: getImgPath("/images/services/perfomance-optimization.svg"), title: "Databases & Cloud Services", description: "Data storage and application services with MongoDB, PostgreSQL, MySQL, Firebase, and Supabase." },
  { icon: getImgPath("/images/services/ux-design-product_2.svg"), title: "MVP & Product Development", description: "Turn a product idea into a focused first release, then improve it through testing, feedback, and ongoing development." },
];

export const portfolioinfo = [
    {
        image: getImgPath('/images/portfolio/cozycasa.png'),
        alt: 'Portfolio',
        title: 'Cozycasa',
        slug: 'Cozycasa',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/mars.png'),
        alt: 'Portfolio',
        title: 'Mars',
        slug: 'Mars',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/humans.png'),
        alt: 'Portfolio',
        title: 'Everyday Humans',
        slug: 'everyday-humans',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/roket-squred.png'),
        alt: 'Portfolio',
        title: 'Rocket Squared',
        slug: 'rocket-squared',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/panda-logo.png'),
        alt: 'Portfolio',
        title: 'Panda Logo',
        slug: 'panda-logo',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/humans.png'),
        alt: 'Portfolio',
        title: 'Fusion Dynamics',
        slug: 'fusion-dynamics',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/cozycasa.png'),
        alt: 'Portfolio',
        title: 'InnovateX Ventures',
        slug: 'innovate-x-ventures',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/mars.png'),
        alt: 'Portfolio',
        title: 'Nebula Holdings',
        slug: 'nebula-holdings',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/panda-logo.png'),
        alt: 'Portfolio',
        title: 'Summit Partners',
        slug: 'summit-partners',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/roket-squred.png'),
        alt: 'Portfolio',
        title: 'Apex Strategies',
        slug: 'apex-strategies',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    
]