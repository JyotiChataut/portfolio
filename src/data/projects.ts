export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo: string;
  image: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    id: "travel",
    title: "Smart Travel Management System",
    description:
      "I built a travel browsing interface around clear destination discovery, deals, categories, and responsive presentation. My focus was reusable UI pieces, consistent layouts, and motion details that feel modern without getting in the way.",
    tags: ["Grid", "Flex", "Reusable UI", "Responsive UX"],
    repo: "https://github.com/alpinemarketingstudio/Golden-Travel",
    image: "/images/travel-vangogh.svg",
    caseStudy: {
      problem:
        "Travel content gets crowded fast. I needed destinations, deals, categories, banners, and filters to feel easy to scan across screen sizes.",
      approach:
        "I used grid and flex systems to organize content, then built reusable destination cards, banners, and filter UI so each section follows the same visual rhythm.",
      outcome:
        "A more structured travel interface with responsive layouts, hover states, transitions, and clearer browsing paths for users comparing destinations.",
    },
  },
  {
    id: "recipe",
    title: "Recipe Management Web Application",
    description:
      "I designed a recipe management interface for presenting ingredients, preparation steps, and images in a readable structure. The work centers on clean content sections, responsive spacing, and a layout that supports quick cooking reference.",
    tags: ["HTML5", "CSS3", "Responsive", "GitHub"],
    repo: "https://github.com/JyotiChataut/reciepe",
    image: "/images/recipe-vangogh.svg",
    caseStudy: {
      problem:
        "Recipes need several content types on one page: ingredients, images, steps, and supporting details. The challenge was keeping that information readable instead of dense.",
      approach:
        "I designed responsive page sections with HTML5 and CSS3, grouping ingredients and instructions so users move through the recipe in order.",
      outcome:
        "The app presents recipe content in a consistent structure, versioned on GitHub for ongoing improvement and collaboration.",
    },
  },
  {
    id: "blog",
    title: "Personal Blog Platform",
    description:
      "I built a personal blog platform around clean navigation, readable content presentation, and a simple publishing experience. I used the project to experiment with usability, layout choices, and analytics-informed improvements.",
    tags: ["Next.js", "UX", "Analytics", "Vercel"],
    url: "https://chrochet.vercel.app/",
    repo: "https://github.com/JyotiChataut/chrochet",
    image: "/images/blog-vangogh.svg",
    caseStudy: {
      problem:
        "The blog needed to make personal writing easy to browse while keeping the interface light, focused, and simple to maintain.",
      approach:
        "I applied UX principles to navigation, content structure, and presentation, then deployed the static site on Vercel and connected basic analytics.",
      outcome:
        "A live space for writing and observation, with version control in GitHub and room to refine based on interaction patterns.",
    },
  },
];
