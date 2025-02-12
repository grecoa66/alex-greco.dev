import Link from "next/link";

const CSSPlayground = () => {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[840px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <div className="my-12 flex flex-row justify-center">
        <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
          🚧 Under Construction 🚧
        </h1>
      </div>
      <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
        CSS Playground
      </h1>

      <div className="my-10 flex flex-col">
        <Link href={"/css-playground/components"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Components
          </button>
        </Link>
        <Link href={"/css-playground/palette"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Color Palette
          </button>
        </Link>
        <Link href={"/css-playground/grid-background"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Grid Background
          </button>
        </Link>

        <Link href={"/css-playground/solar-system"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Solar System
          </button>
        </Link>
      </div>
    </main>
  );
};

export default CSSPlayground;
