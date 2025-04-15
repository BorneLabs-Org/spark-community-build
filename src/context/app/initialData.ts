
import { User, Project, Post, Story, Paper } from '@/types';

// Placeholder avatar URLs
const avatarUrls = [
  "https://github.com/shadcn.png",
  "https://api.dicebear.com/7.x/personas/svg?seed=Felix",
  "https://api.dicebear.com/7.x/personas/svg?seed=John",
  "https://api.dicebear.com/7.x/personas/svg?seed=Zoe",
];

// Sample users
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatar: avatarUrls[0],
    followers: 120,
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    avatar: avatarUrls[1],
    followers: 85,
  },
  {
    id: "3",
    name: "Alice Johnson",
    username: "alicej",
    avatar: avatarUrls[2],
    followers: 42,
  },
  {
    id: "4",
    name: "Bob Wilson",
    username: "bobw",
    avatar: avatarUrls[3],
    followers: 67,
  },
];

// Sample projects
export const projects: Project[] = [
  {
    id: "1",
    name: "AI Image Generator",
    description: "Generate unique images using state-of-the-art AI models",
    image: "https://source.unsplash.com/random/800x600/?ai",
    user: users[0],
    bookmarked: true,
    sasLevel: "Advanced",
  },
  {
    id: "2",
    name: "Health Tracker App",
    description: "Monitor your daily health metrics with a simple interface",
    image: "https://source.unsplash.com/random/800x600/?health",
    user: users[1],
    bookmarked: false,
    sasLevel: "Intermediate",
  },
  {
    id: "3",
    name: "Sustainable Energy Monitor",
    description: "Track energy usage and carbon footprint in real-time",
    image: "https://source.unsplash.com/random/800x600/?energy",
    user: users[2],
    bookmarked: false,
    sasLevel: "Advanced",
  },
  {
    id: "4",
    name: "Social Media Analytics",
    description: "Analyze engagement and reach across multiple platforms",
    image: "https://source.unsplash.com/random/800x600/?social",
    user: users[3],
    bookmarked: true,
    sasLevel: "Beginner",
  },
  {
    id: "5",
    name: "Smart Home Controller",
    description: "Integrate and control all your smart home devices",
    image: "https://source.unsplash.com/random/800x600/?smarthome",
    user: users[0],
    bookmarked: false,
    sasLevel: "Intermediate",
  },
];

// Sample posts
export const posts: Post[] = [
  {
    id: "1",
    title: "Launched our new AI platform",
    description: "After months of development, our AI platform is now live!",
    media: "https://source.unsplash.com/random/800x600/?launch",
    mediaType: "image",
    user: users[0],
    views: 432,
    createdAt: "2025-02-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Health tracker reaching 1000 users",
    description: "We're thrilled to announce our app has reached 1000 active users!",
    media: "https://source.unsplash.com/random/800x600/?celebration",
    mediaType: "image",
    user: users[1],
    views: 287,
    createdAt: "2025-02-10T14:15:00Z",
  },
  {
    id: "3",
    title: "New sustainable energy dashboard",
    description: "Check out our new dashboard that helps visualize energy consumption.",
    media: "https://source.unsplash.com/random/800x600/?dashboard",
    mediaType: "image",
    user: users[2],
    views: 156,
    createdAt: "2025-02-05T08:45:00Z",
  },
  {
    id: "4",
    title: "Social media analytics update",
    description: "Our latest update brings real-time notifications and improved metrics.",
    media: "https://source.unsplash.com/random/800x600/?update",
    mediaType: "image",
    user: users[3],
    views: 321,
    createdAt: "2025-01-30T16:20:00Z",
  },
  {
    id: "5",
    title: "Smart home integration demo",
    description: "Watch this quick demo of how our smart home controller works.",
    media: "https://source.unsplash.com/random/800x600/?smarthome",
    mediaType: "video",
    user: users[0],
    views: 189,
    createdAt: "2025-01-25T12:10:00Z",
  },
];

// Sample stories
export const stories: Story[] = [
  {
    id: "1",
    title: "How We Built Our AI Image Generator",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl.",
    user: users[0],
    project: projects[0],
    bookmarked: true,
    createdAt: "2025-02-14T09:30:00Z",
  },
  {
    id: "2",
    title: "The Journey to 1000 Users",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl.",
    user: users[1],
    project: projects[1],
    bookmarked: false,
    createdAt: "2025-02-09T11:45:00Z",
  },
  {
    id: "3",
    title: "Sustainable Energy: Why It Matters",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl.",
    user: users[2],
    project: projects[2],
    bookmarked: true,
    createdAt: "2025-02-04T15:20:00Z",
  },
  {
    id: "4",
    title: "The Future of Social Media Analytics",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae ultricies nisl nisl eget nisl.",
    user: users[3],
    project: projects[3],
    bookmarked: false,
    createdAt: "2025-01-29T13:10:00Z",
  },
];

// Sample papers
export const papers: Paper[] = [
  {
    id: "1",
    title: "Advancements in Image Generation Algorithms",
    description: "This paper explores the latest breakthroughs in AI-powered image generation algorithms.",
    fileUrl: "https://example.com/papers/image-gen-algorithms.pdf",
    fileType: "pdf",
    coverImage: "https://source.unsplash.com/random/800x600/?algorithm",
    user: users[0],
    createdAt: "2025-02-10T14:30:00Z",
    downloads: 78,
  },
  {
    id: "2",
    title: "Health Tracking Applications: A Survey",
    description: "A comprehensive overview of health tracking applications and their impact on user wellness.",
    fileUrl: "https://example.com/papers/health-tracking-survey.pdf",
    fileType: "pdf",
    coverImage: "https://source.unsplash.com/random/800x600/?health",
    user: users[1],
    createdAt: "2025-01-25T09:15:00Z",
    downloads: 42,
  },
  {
    id: "3",
    title: "Sustainable Energy Consumption Patterns",
    description: "Analysis of energy consumption patterns and their environmental impact.",
    fileUrl: "https://example.com/papers/sustainable-energy.doc",
    fileType: "doc",
    coverImage: "https://source.unsplash.com/random/800x600/?energy",
    user: users[2],
    createdAt: "2025-01-15T11:45:00Z",
    downloads: 63,
  },
  {
    id: "4",
    title: "The Evolution of Social Media Metrics",
    description: "How social media metrics have evolved over the past decade and what it means for businesses.",
    fileUrl: "https://example.com/papers/social-media-metrics.pdf",
    fileType: "pdf",
    coverImage: "https://source.unsplash.com/random/800x600/?metrics",
    user: users[3],
    createdAt: "2025-01-05T16:20:00Z",
    downloads: 29,
  },
];
