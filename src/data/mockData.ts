 // Mock data for Resonance app
 
 export interface User {
   id: string;
   name: string;
   username: string;
   avatar?: string;
   bio?: string;
   followers: number;
   following: number;
   ratingsCount: number;
 }
 
export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: number;
  genre: string[];
  averageRating: number;
  ratingsCount: number;
  isNewRelease?: boolean;
}
 
 export interface Rating {
   id: string;
   userId: string;
   albumId: string;
   rating: number;
   comment: string;
   likes: number;
   replies: number;
   createdAt: string;
 }
 
 export const mockUsers: User[] = [
   {
     id: "1",
     name: "Alex Rivera",
     username: "alexr",
     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
     bio: "Music enthusiast. Jazz & electronic lover.",
     followers: 1240,
     following: 89,
     ratingsCount: 342,
   },
   {
     id: "2",
     name: "Maya Chen",
     username: "mayac",
     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
     bio: "Indie rock is life. Also into ambient and shoegaze.",
     followers: 892,
     following: 156,
     ratingsCount: 567,
   },
   {
     id: "3",
     name: "Jordan Blake",
     username: "jblake",
     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
     bio: "Hip-hop head. Always hunting for new beats.",
     followers: 2100,
     following: 234,
     ratingsCount: 890,
   },
 ];
 
export const mockAlbums: Album[] = [
  {
    id: "1",
    title: "In Rainbows",
    artist: "Radiohead",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg",
    releaseYear: 2007,
    genre: ["Alternative Rock", "Art Rock"],
    averageRating: 4.7,
    ratingsCount: 12453,
  },
  {
    id: "2",
    title: "Blonde",
    artist: "Frank Ocean",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.png",
    releaseYear: 2016,
    genre: ["R&B", "Art Pop"],
    averageRating: 4.8,
    ratingsCount: 18902,
  },
  {
    id: "3",
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
    releaseYear: 2015,
    genre: ["Hip-Hop", "Jazz Rap"],
    averageRating: 4.9,
    ratingsCount: 21340,
  },
  {
    id: "4",
    title: "Currents",
    artist: "Tame Impala",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png",
    releaseYear: 2015,
    genre: ["Psychedelic Pop", "Synth-pop"],
    averageRating: 4.5,
    ratingsCount: 15678,
  },
  {
    id: "5",
    title: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Good_Kid_M.A.A.D_City.jpg",
    releaseYear: 2012,
    genre: ["Hip-Hop", "West Coast"],
    averageRating: 4.8,
    ratingsCount: 19234,
  },
  {
    id: "6",
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    releaseYear: 1973,
    genre: ["Progressive Rock", "Psychedelic"],
    averageRating: 4.9,
    ratingsCount: 34567,
  },
  {
    id: "7",
    title: "Random Access Memories",
    artist: "Daft Punk",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    releaseYear: 2013,
    genre: ["Electronic", "Disco"],
    averageRating: 4.6,
    ratingsCount: 16230,
    isNewRelease: false,
  },
  {
    id: "8",
    title: "Abbey Road",
    artist: "The Beatles",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    releaseYear: 1969,
    genre: ["Rock", "Pop Rock"],
    averageRating: 4.9,
    ratingsCount: 42100,
    isNewRelease: false,
  },
  {
    id: "9",
    title: "Igor",
    artist: "Tyler, The Creator",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/8/8b/Igor_-_Tyler%2C_the_Creator.jpg",
    releaseYear: 2019,
    genre: ["Hip-Hop", "Neo-Soul"],
    averageRating: 4.4,
    ratingsCount: 14500,
    isNewRelease: false,
  },
  {
    id: "10",
    title: "OK Computer",
    artist: "Radiohead",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    releaseYear: 1997,
    genre: ["Alternative Rock", "Art Rock"],
    averageRating: 4.8,
    ratingsCount: 28900,
    isNewRelease: false,
  },
  {
    id: "11",
    title: "GNX",
    artist: "Kendrick Lamar",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/54/Kendrick_Lamar_-_GNX.png",
    releaseYear: 2025,
    genre: ["Hip-Hop", "West Coast"],
    averageRating: 4.3,
    ratingsCount: 3200,
    isNewRelease: true,
  },
  {
    id: "12",
    title: "Brat",
    artist: "Charli XCX",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a5/Charli_XCX_-_Brat.png",
    releaseYear: 2024,
    genre: ["Pop", "Electronic"],
    averageRating: 4.1,
    ratingsCount: 8700,
    isNewRelease: true,
  },
  {
    id: "13",
    title: "Cowboy Carter",
    artist: "Beyoncé",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/6/69/Beyonc%C3%A9_-_Cowboy_Carter.png",
    releaseYear: 2024,
    genre: ["Country", "Pop"],
    averageRating: 4.0,
    ratingsCount: 11200,
    isNewRelease: true,
  },
  {
    id: "14",
    title: "Hit Me Hard and Soft",
    artist: "Billie Eilish",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/2c/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png",
    releaseYear: 2024,
    genre: ["Pop", "Art Pop"],
    averageRating: 4.2,
    ratingsCount: 9800,
    isNewRelease: true,
  },
];
 
export const mockRatings: Rating[] = [
  // --- Top Takes (thoughtful, consensus-driven) ---
  {
    id: "1",
    userId: "2",
    albumId: "1",
    rating: 5,
    comment: "Absolutely transcendent. Every track flows into the next with such grace. This album changed how I think about music.",
    likes: 234,
    replies: 45,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    userId: "3",
    albumId: "3",
    rating: 5,
    comment: "A masterpiece of modern hip-hop. The jazz influences are incredible and Kendrick's storytelling is unmatched.",
    likes: 567,
    replies: 89,
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    userId: "1",
    albumId: "2",
    rating: 4.5,
    comment: "Frank Ocean at his most vulnerable. The production is minimal but every sound feels intentional. 'Self Control' hits different every time.",
    likes: 189,
    replies: 23,
    createdAt: "6 hours ago",
  },
  {
    id: "4",
    userId: "2",
    albumId: "4",
    rating: 4,
    comment: "Kevin Parker is a genius. The shift from psychedelic rock to synth-pop works surprisingly well. 'Let It Happen' is an instant classic.",
    likes: 145,
    replies: 18,
    createdAt: "1 day ago",
  },
  {
    id: "5",
    userId: "1",
    albumId: "6",
    rating: 5,
    comment: "There's a reason this album is considered one of the greatest of all time. The production was so ahead of its time.",
    likes: 890,
    replies: 156,
    createdAt: "2 days ago",
  },
  // --- Hot Takes (spicy, contrarian, polarizing) ---
  {
    id: "6",
    userId: "3",
    albumId: "2",
    rating: 2,
    comment: "Blonde is honestly boring. Half the tracks feel like unfinished demos. I don't understand why everyone treats this like a masterpiece.",
    likes: 47,
    replies: 213,
    createdAt: "3 hours ago",
  },
  {
    id: "7",
    userId: "2",
    albumId: "6",
    rating: 2.5,
    comment: "Dark Side of the Moon is the most overrated album in history. It's background music people pretend is deep. Fight me.",
    likes: 31,
    replies: 187,
    createdAt: "5 hours ago",
  },
  {
    id: "8",
    userId: "3",
    albumId: "4",
    rating: 2,
    comment: "Currents has one great song and the rest is forgettable synth wallpaper. Tame Impala peaked with Lonerism and it's not close.",
    likes: 22,
    replies: 145,
    createdAt: "8 hours ago",
  },
  {
    id: "9",
    userId: "2",
    albumId: "3",
    rating: 3,
    comment: "To Pimp a Butterfly is exhausting to listen to. Technically impressive? Sure. But I never want to press play on it again.",
    likes: 58,
    replies: 234,
    createdAt: "1 day ago",
  },
  {
    id: "10",
    userId: "3",
    albumId: "1",
    rating: 2.5,
    comment: "In Rainbows is Radiohead on autopilot. It's fine. But calling it their best is wild when OK Computer exists.",
    likes: 39,
    replies: 167,
    createdAt: "1 day ago",
  },
];
 
 // Helper function to get user by id
 export const getUserById = (id: string): User | undefined =>
   mockUsers.find((u) => u.id === id);
 
 // Helper function to get album by id
 export const getAlbumById = (id: string): Album | undefined =>
   mockAlbums.find((a) => a.id === id);
 
 // Get ratings with user and album data
 export const getEnrichedRatings = () =>
   mockRatings.map((rating) => ({
     ...rating,
     user: getUserById(rating.userId)!,
     album: getAlbumById(rating.albumId)!,
   }));