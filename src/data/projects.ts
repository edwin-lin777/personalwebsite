export type ProjectImage = {
  src: string; alt: string; label: string;
  kind?: "screenshot" | "recording" | "illustration";
  width?: number; height?: number;
  crop?: { x: number; y: number; width: number; height: number };
};
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  description: string;
  contribution: string;
  stack: string[];
  highlights: string[];
  images: ProjectImage[];
  preview?: ProjectImage;
  codeUrl?: string;
  recordingUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "aipm", title: "Quantitative Portfolio Engine", subtitle: "Portfolio analytics",
    category: "Personal project", summary: "Risk decomposition, factor screening and institutional flow analysis for an equity book I trade with my own capital.",
    description: "Risk decomposition, factor screening and institutional flow analysis for an equity book I trade with my own capital.",
    contribution: "I built the Next.js frontend and Python/FastAPI backend. Portfolio calculations run through the API; scheduled jobs handle screening and research, with results stored in Postgres.",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    highlights: ["Compare capital weights with each position’s contribution to portfolio risk.", "Screen stocks and review results in a dedicated dashboard.", "Turn institutional research into structured information for review."],
    images: [
      { src: "/projects/aipm-portfolio.png", alt: "AIPM portfolio overview and risk contribution dashboard", label: "Portfolio" },
      { src: "/projects/aipm-screener.png", alt: "AIPM stock screener dashboard", label: "Screener" },
      { src: "/projects/aipm-research.png", alt: "AIPM institutional research pipeline settings", label: "Research" },
    ],
    preview: { src: "/projects/aipm-portfolio.png", alt: "Portfolio risk metrics and position-level weights", label: "Portfolio risk", width: 1913, height: 874, crop: { x: 808, y: 170, width: 1075, height: 470 } },
  },
  {
    slug: "bs-liquidity", title: "Index CFD Position Calculator", subtitle: "Position sizing & market dashboard",
    category: "Personal project",
    summary: "A position-sizing calculator I use for index CFD trades, with risk, stop-loss and take-profit inputs, a daily stock heatmap and market news.",
    description: "I use this calculator to size my index CFD trades around my account balance, risk limit, entry price and stop-loss, with a take-profit input for planning the trade. The dashboard brings together a daily stock heatmap, an S&P overview and market news.",
    contribution: "I built the position-sizing calculator and market dashboard for my own trading workflow.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Calculate position size from account balance, risk percentage, entry and stop-loss.", "Plan trades with stop-loss and take-profit inputs.", "Review daily stock moves, the S&P overview and market news in one dashboard."],
    images: [
      { src: "/projects/bs-liquidity-calculator.png", alt: "Index CFD position calculator with illustrative inputs and a calculated position size", label: "Calculator · example inputs", kind: "screenshot", width: 1440, height: 1000, crop: { x: 0, y: 64, width: 1425, height: 872 } },
      { src: "/projects/bs-liquidity-markets.png", alt: "Market dashboard with an S&P chart, daily stock heatmap and news", label: "Market dashboard", kind: "screenshot", width: 1440, height: 1000 },
    ],
    preview: { src: "/projects/bs-liquidity-markets.png", alt: "S&P chart and daily stock-market heatmap", label: "Market dashboard", width: 1440, height: 1000, crop: { x: 30, y: 108, width: 1365, height: 650 } },
    liveUrl: "https://bs-liquidity.com/",
  },
  {
    slug: "rewards-engine", title: "Credit Card Rewards Simulator", subtitle: "Canadian credit-card rewards",
    category: "Personal project", summary: "A concurrent Monte Carlo simulator evaluating credit-card rewards across 50,000 synthetic households and 286 wallet combinations.",
    description: "A concurrent Monte Carlo simulator evaluating credit-card rewards across 50,000 synthetic households and 286 wallet combinations.",
    contribution: "I built the rewards evaluation engine and its card-rule definitions in Go. The project explores wallet comparisons and household simulations.",
    stack: ["Go", "Docker"],
    highlights: ["Evaluate category rewards while accounting for spending caps and annual fees.", "Keep card definitions separate from the evaluation logic.", "Compare rewards across different spending profiles."],
    images: [{ src: "/projects/rewards-flow.svg", alt: "Illustrated simulation workflow: household spending, card rules, and wallet comparisons", label: "Simulation workflow", kind: "illustration", width: 1200, height: 720 }], codeUrl: "https://github.com/edwin-lin777/credit-card",
  },
  {
    slug: "steel-imports", title: "Steel Imports", subtitle: "Emissions vs. Shipping Cost Optimizer",
    category: "MIT Energy and Climate Hacks", summary: "Shipping cost meets carbon cost.",
    description: "A full-stack app for Array Technologies that compares the CO₂ emissions and shipping costs of HRC steel imports. Built with Team Diluted at the MIT Energy and Climate Hack.",
    contribution: "I built the Next.js frontend and interactive dashboards, and connected them to our Python backend through FastAPI.",
    stack: ["Next.js", "Python", "FastAPI"],
    highlights: ["Compare import options by shipping cost and emissions.", "Explore route and supplier information through interactive dashboards.", "Make the tradeoff between monetary cost and carbon emissions easier to understand."],
    images: [
      { src: "/projects/steel-imports-map.png", alt: "Steel import optimizer showing cost and emissions inputs beside a world map", label: "Route map · recording still", kind: "recording", width: 2448, height: 1440, crop: { x: 315, y: 390, width: 2100, height: 890 } },
      { src: "/projects/steel-imports-analysis.png", alt: "Steel import recommendation with shipping cost and carbon emissions breakdowns", label: "Cost comparison · recording still", kind: "recording", width: 2448, height: 1440, crop: { x: 315, y: 200, width: 2100, height: 1180 } },
    ],
    recordingUrl: "https://www.dropbox.com/scl/fi/a2fa1pcopr646x02hvsaj/MIT-Energy-Climate-Hacks.mp4?rlkey=wjh1e5pb6db744yscz2sco3o9&dl=0",
  },
  {
    slug: "navis", title: "Navi$", subtitle: "Energy subsidy matching",
    category: "Hack the Globe", summary: "Energy support, easier to find.",
    description: "A platform that matches households with energy subsidies through rules-based eligibility and a dashboard that makes next steps clear. Our team placed third out of 50 teams at Hack the Globe.",
    contribution: "The project combines an eligibility questionnaire with a dashboard of relevant programs, estimated savings, and application steps.",
    stack: ["Next.js"],
    highlights: ["Match household information with energy-program eligibility rules.", "Bring eligible programs and next steps into one dashboard.", "Help users track application progress and required documents."],
    images: [
      { src: "/projects/navis-benefits.png", alt: "Navi$ demo dashboard showing eligible energy programs and potential savings", label: "Energy benefits · recording still", kind: "recording", width: 1920, height: 1080, crop: { x: 263, y: 280, width: 1378, height: 690 } },
      { src: "/projects/navis-admin.png", alt: "Navi$ demo administration dashboard with enrollment charts", label: "Program dashboard · recording still", kind: "recording", width: 1920, height: 1080, crop: { x: 43, y: 153, width: 1820, height: 927 } },
    ],
    recordingUrl: "https://www.dropbox.com/scl/fi/iiivp9inf0mgq8yc6tnpf/Demo.mp4?rlkey=er9d330avb4355cqd366grap0&dl=0",
  },
];

// Upcoming placeholders stay separate from completed work and have no detail routes.
export const upcomingProjects = [
  { name: "LA Hacks", note: "Project to come after the hackathon." },
  { name: "Cal Hacks", note: "Project to come after the hackathon." },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
