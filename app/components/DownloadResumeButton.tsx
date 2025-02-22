import { twMerge } from "tailwind-merge";
import { LinkButton } from "./Button";
import { FaDownload } from "react-icons/fa";

export const DownloadResumeButton = ({
  classNames,
}: {
  classNames: string;
}) => {
  return (
    <LinkButton
      text="Download Resume"
      href="/Alexander_Greco-Resume-24.pdf"
      variant="inverse"
      target="_blank"
      download={true}
      StartIcon={FaDownload}
      className={twMerge("", classNames)}
    />
  );
};
