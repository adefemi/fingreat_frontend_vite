import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ContentHeadingType {
  title: string;
  sideSection?: React.ReactNode;
}

const ContentHeading = (props: ContentHeadingType) => {
  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-2">
        <div className="flex items-center">
          <Link to="/">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="font-bold ml-15">{props.title}</h2>
        </div>
      </div>
      <div className="">{props.sideSection}</div>
    </>
  );
};

export default ContentHeading;
