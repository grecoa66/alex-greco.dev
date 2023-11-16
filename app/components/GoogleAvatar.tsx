import { useSession } from "next-auth/react";

const GoogleAvatar = () => {
  const session = useSession();
  return (
    <>
      {session.data?.user?.image && (
        <img
          src={session.data?.user?.image}
          className="h-10 w-10 rounded-full"
          referrerPolicy="no-referrer"
          alt="Picture of the author"
        />
      )}
    </>
  );
};

export default GoogleAvatar;