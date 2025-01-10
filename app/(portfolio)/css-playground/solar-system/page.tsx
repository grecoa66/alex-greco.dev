import "./solar-system.css";
const SolarSystem = () => {
  return (
    <div className="flex h-[calc(100vh-theme(space.16))] w-[100vw] flex-row content-center items-center justify-center bg-white p-4 dark:bg-black">
      <div className="container max-w-[50em]">
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
