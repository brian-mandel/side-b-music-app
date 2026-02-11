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
 
export interface StreamingLinks {
  spotify?: string;
  apple_music?: string;
  youtube_music?: string;
  tidal?: string;
  soundcloud?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover_image_url: string | null;
  releaseYear: number;
  genre: string[];
  averageRating: number;
  ratingsCount: number;
  isNewRelease?: boolean;
  streaming_links?: StreamingLinks;
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
    cover_image_url: "https://coverartarchive.org/release/a58f4eb2-9829-37d5-b46c-e8163038e0f5/front-500",
    releaseYear: 2007,
    genre: ["Alternative Rock", "Art Rock"],
    averageRating: 4.7,
    ratingsCount: 12453,
    streaming_links: { spotify: "https://open.spotify.com/album/5vkqYmiPBYLaalcmjujWxK", apple_music: "https://music.apple.com/album/in-rainbows/1109714933" },
  },
  {
    id: "2",
    title: "Blonde",
    artist: "Frank Ocean",
    cover_image_url: "https://coverartarchive.org/release/b6981b3a-00a1-414b-a149-f3e17c7df060/front-500",
    releaseYear: 2016,
    genre: ["R&B", "Art Pop"],
    averageRating: 4.8,
    ratingsCount: 18902,
    streaming_links: { spotify: "https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf" },
  },
  {
    id: "3",
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    cover_image_url: "https://coverartarchive.org/release/88ab7a5c-fd27-421e-85f0-f107ed86a43f/front-500",
    releaseYear: 2015,
    genre: ["Hip-Hop", "Jazz Rap"],
    averageRating: 4.9,
    ratingsCount: 21340,
    streaming_links: { spotify: "https://open.spotify.com/album/7ycBtnsMtyVbbwTfJwRjSP" },
  },
  {
    id: "4",
    title: "Currents",
    artist: "Tame Impala",
    cover_image_url: "https://coverartarchive.org/release/f942ccca-07a9-45cd-8981-a0ad8f0dc788/front-500",
    releaseYear: 2015,
    genre: ["Psychedelic Pop", "Synth-pop"],
    averageRating: 4.5,
    ratingsCount: 15678,
  },
  {
    id: "5",
    title: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    cover_image_url: null,
    releaseYear: 2012,
    genre: ["Hip-Hop", "West Coast"],
    averageRating: 4.8,
    ratingsCount: 19234,
    streaming_links: { spotify: "https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv" },
  },
  {
    id: "6",
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover_image_url: "https://coverartarchive.org/release/6ef6e6cd-ad36-4c2f-816d-121bfb2f6774/front-500",
    releaseYear: 1973,
    genre: ["Progressive Rock", "Psychedelic"],
    averageRating: 4.9,
    ratingsCount: 34567,
  },
  {
    id: "7",
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover_image_url: null,
    releaseYear: 2013,
    genre: ["Electronic", "Disco"],
    averageRating: 4.6,
    ratingsCount: 16230,
  },
  {
    id: "8",
    title: "Abbey Road",
    artist: "The Beatles",
    cover_image_url: null,
    releaseYear: 1969,
    genre: ["Rock", "Pop Rock"],
    averageRating: 4.9,
    ratingsCount: 42100,
  },
  {
    id: "9",
    title: "Igor",
    artist: "Tyler, The Creator",
    cover_image_url: null,
    releaseYear: 2019,
    genre: ["Hip-Hop", "Neo-Soul"],
    averageRating: 4.4,
    ratingsCount: 14500,
  },
  {
    id: "10",
    title: "OK Computer",
    artist: "Radiohead",
    cover_image_url: null,
    releaseYear: 1997,
    genre: ["Alternative Rock", "Art Rock"],
    averageRating: 4.8,
    ratingsCount: 28900,
  },
  // Trending albums
  {
    id: "11",
    title: "GNX",
    artist: "Kendrick Lamar",
    cover_image_url: "https://coverartarchive.org/release/45bbde2e-bfc1-48c6-8b58-491348cd5459/front-500",
    releaseYear: 2024,
    genre: ["Hip-Hop", "West Coast"],
    averageRating: 4.3,
    ratingsCount: 3200,
  },
  {
    id: "12",
    title: "Brat",
    artist: "Charli XCX",
    cover_image_url: "https://coverartarchive.org/release/ab55ac76-eee5-4f89-ac14-7bb9aa837bc8/front-500",
    releaseYear: 2024,
    genre: ["Pop", "Electronic"],
    averageRating: 4.1,
    ratingsCount: 8700,
  },
  {
    id: "13",
    title: "Cowboy Carter",
    artist: "Beyoncé",
    cover_image_url: "https://coverartarchive.org/release/952c9ce2-965b-48fb-89b1-5e0b0c87ddcc/front-500",
    releaseYear: 2024,
    genre: ["Country", "Pop"],
    averageRating: 4.0,
    ratingsCount: 11200,
  },
  {
    id: "14",
    title: "Hit Me Hard and Soft",
    artist: "Billie Eilish",
    cover_image_url: "https://coverartarchive.org/release/ef57c4d0-af1c-4574-a162-20aaf7a7120b/front-500",
    releaseYear: 2024,
    genre: ["Pop", "Art Pop"],
    averageRating: 4.2,
    ratingsCount: 9800,
  },
  // New Albums (2026) - real MusicBrainz releases
  {
    id: "15",
    title: "With Heaven on Top",
    artist: "Zach Bryan",
    cover_image_url: "https://coverartarchive.org/release/02df0459-7357-4047-be41-a4dc9119dc54/front-500",
    releaseYear: 2026,
    genre: ["Country", "Folk"],
    averageRating: 4.1,
    ratingsCount: 2100,
    isNewRelease: true,
  },
  {
    id: "16",
    title: "Secret Love",
    artist: "Dry Cleaning",
    cover_image_url: "https://coverartarchive.org/release/f6fcbfaa-3417-4524-8703-96981ae0b7c4/front-500",
    releaseYear: 2026,
    genre: ["Post-Punk", "Art Rock"],
    averageRating: 4.0,
    ratingsCount: 1800,
    isNewRelease: true,
  },
  {
    id: "17",
    title: "Selling a Vibe",
    artist: "The Cribs",
    cover_image_url: "https://coverartarchive.org/release/6fb0cfcb-131f-4ab1-aa84-bcb1a88e6f24/front-500",
    releaseYear: 2026,
    genre: ["Indie Rock"],
    averageRating: 4.4,
    ratingsCount: 5200,
    isNewRelease: true,
  },
  {
    id: "18",
    title: "BEFORE I FORGET",
    artist: "The Kid LAROI",
    cover_image_url: "https://coverartarchive.org/release/40c6dc9a-8289-48e2-b73b-fc34165a48b7/front-500",
    releaseYear: 2026,
    genre: ["Hip-Hop", "Pop"],
    averageRating: 3.9,
    ratingsCount: 1500,
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