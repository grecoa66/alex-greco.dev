import "./solar-system.css";
const SolarSystem = () => {
  return (
    <div className="full flex h-[calc(100vh-theme(space.16))] w-full flex-row items-center justify-center overflow-hidden bg-white p-4 dark:bg-black">
      <div className="container h-[80%] w-[80%]">
        <div className="sun" />

        <div className="earth">
          <div className="moon" />
        </div>

        <div className="mars">
          <div className="phobos" />
          <div className="deimos" />
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
