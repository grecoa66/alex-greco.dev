import "./solar-system.css";
const SolarSystem = () => {
  return (
    <div className="stars flex h-[calc(100vh-theme(space.16))] w-[100vw] flex-col content-center items-center justify-center bg-black p-4 dark:bg-black">
      <div className="container">
        <div className="sun" />

        <div className="mercury" />
        <div className="venus" />
        <div className="earth">
          <div className="moon" />
        </div>

        <div className="mars">
          <div className="phobos" />
          <div className="deimos" />
        </div>

        <div className="jupiter">
          <div className="europa" />
          <div className="ganymede" />
          <div className="io" />
          <div className="callisto" />
        </div>
        <div className="saturn"></div>
      </div>
    </div>
  );
};

export default SolarSystem;
