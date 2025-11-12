
const Dots = () => {
  return (
    <div className="gap-1 flex flex-col sm:flex-row items-center">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-white rounded-full" />
      ))}
    </div>
  );
};


export default Dots;