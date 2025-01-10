import "./solar-system.css";
const SolarSystem = () => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center overflow-hidden bg-white p-4 dark:bg-black">
      <div className="container h-[80%] w-[80%]">
        <div className="sun" />
        <div className="earth">
          <div className="moon" />
        </div>
        <div className="mars" />
      </div>
    </div>
  );
};

export default SolarSystem;
