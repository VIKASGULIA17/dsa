
const HeroSection = () => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold text-white">
        Data Structures & Algorithms Hub
      </h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        A curated collection of essential DSA topics. Click on a card to revise
        the concept, view templates, and practice problems.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: "Arrays & Strings",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 2,
            title: "Sorting Algorithms",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 3,
            title: "Linked Lists",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 4,
            title: "Graph Algorithms (BFS, DFS)",
            width: "md:col-span-3",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1573495611823-5397efa4fac7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 5,
            title: "Stacks & Queues",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1517852058149-07c7a2e65cc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 6,
            title: "Dynamic Programming",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 7,
            title: "Trees & Heaps",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1758351754305-fe00523aaefe?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 8,
            title: "Binary Search",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 9,
            title: "Time & Space Complexity (Big O)",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            id: 10,
            title: "Hash Maps",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
            url:"https://images.unsplash.com/photo-1758519873981-4638ff8ee79b?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
        ].map((box) => (
          <div
            key={box.id}
            style={{ backgroundImage: `url(${box.url})` }}
            className={`${box.width} ${box.height} group relative flex items-center justify-center rounded-lg bg-cover bg-center p-4 shadow-sm transition-all duration-300 hover:scale-105`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>

            {/* Title */}
            <h2 className="relative text-center text-xl font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {box.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;