 import { AppLayout } from "@/components/layout/AppLayout";
 import { UserAvatar } from "@/components/UserAvatar";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Search, UserPlus, Check } from "lucide-react";
 import { mockUsers } from "@/data/mockData";
 import { Link } from "react-router-dom";
 
 const Friends = () => {
   return (
     <AppLayout>
       <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
         <section className="mb-8">
           <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
             Friends
           </h1>
           <p className="text-muted-foreground">
             Connect with music lovers and see what they're listening to.
           </p>
         </section>
 
         {/* Search */}
         <div className="relative mb-8">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
           <Input
             placeholder="Search for friends by name or username..."
             className="pl-10 bg-secondary border-transparent focus:border-primary/50"
           />
         </div>
 
         <Tabs defaultValue="following">
           <TabsList className="bg-secondary/50 p-1 w-full justify-start">
             <TabsTrigger
               value="following"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Following
             </TabsTrigger>
             <TabsTrigger
               value="followers"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Followers
             </TabsTrigger>
             <TabsTrigger
               value="discover"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Discover
             </TabsTrigger>
           </TabsList>
 
           <TabsContent value="following" className="mt-6">
             <div className="space-y-4">
               {mockUsers.slice(1).map((user) => (
                 <div
                   key={user.id}
                   className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors animate-fade-in"
                 >
                   <Link to={`/user/${user.id}`}>
                     <UserAvatar name={user.name} image={user.avatar} size="md" />
                   </Link>
                   <div className="flex-1 min-w-0">
                     <Link
                       to={`/user/${user.id}`}
                       className="font-medium text-foreground hover:text-primary transition-colors"
                     >
                       {user.name}
                     </Link>
                     <p className="text-sm text-muted-foreground">@{user.username}</p>
                     <p className="text-xs text-muted-foreground mt-1">
                       {user.ratingsCount} takes · {user.followers.toLocaleString()} followers
                     </p>
                   </div>
                   <Button variant="secondary" size="sm" className="gap-1">
                     <Check className="w-4 h-4" />
                     Following
                   </Button>
                 </div>
               ))}
             </div>
           </TabsContent>
 
           <TabsContent value="followers" className="mt-6">
             <div className="space-y-4">
               {mockUsers.slice(1).map((user) => (
                 <div
                   key={user.id}
                   className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                 >
                   <Link to={`/user/${user.id}`}>
                     <UserAvatar name={user.name} image={user.avatar} size="md" />
                   </Link>
                   <div className="flex-1 min-w-0">
                     <Link
                       to={`/user/${user.id}`}
                       className="font-medium text-foreground hover:text-primary transition-colors"
                     >
                       {user.name}
                     </Link>
                     <p className="text-sm text-muted-foreground">@{user.username}</p>
                   </div>
                   <Button
                     size="sm"
                     className="gap-1 bg-gradient-warm text-primary-foreground hover:opacity-90"
                   >
                     <UserPlus className="w-4 h-4" />
                     Follow Back
                   </Button>
                 </div>
               ))}
             </div>
           </TabsContent>
 
           <TabsContent value="discover" className="mt-6">
             <div className="space-y-4">
               {mockUsers.map((user) => (
                 <div
                   key={user.id}
                   className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                 >
                   <Link to={`/user/${user.id}`}>
                     <UserAvatar name={user.name} image={user.avatar} size="md" />
                   </Link>
                   <div className="flex-1 min-w-0">
                     <Link
                       to={`/user/${user.id}`}
                       className="font-medium text-foreground hover:text-primary transition-colors"
                     >
                       {user.name}
                     </Link>
                     <p className="text-sm text-muted-foreground">@{user.username}</p>
                     <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
                   </div>
                   <Button
                     size="sm"
                     className="gap-1 bg-gradient-warm text-primary-foreground hover:opacity-90"
                   >
                     <UserPlus className="w-4 h-4" />
                     Follow
                   </Button>
                 </div>
               ))}
             </div>
           </TabsContent>
         </Tabs>
       </div>
     </AppLayout>
   );
 };
 
 export default Friends;