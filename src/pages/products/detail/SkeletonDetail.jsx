export function SkeletonDetail() {
  const className = "animate-pulse bg-gradient-to-r from-dark to-primary opacity-20 ";

  return (
    <div className="mx-auto my-24 mt-32 max-w-7xl gap-16 px-7 md:flex">
      <div className="mb-10 grid grid-cols-5 gap-2 md:flex-1">
        <div className={`${className} col-span-5 aspect-[10/6] rounded-2xl`}></div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${className} aspect-[10/6] rounded`}></div>
        ))}
      </div>
      <div className="flex-1">
        <div className={`${className} my-2 h-8 w-2/3 rounded-full`}></div>
        <div className={`${className} my-6 h-12 w-2/3 rounded-full`}></div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className={`${className} mt-5 h-5 w-1/3 rounded-full`}></div>
            <div className={`${className} mt-1 h-3 w-5/6 rounded-full`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
