import { Link } from "react-router-dom";
import { Card } from "../ui/card";

interface ProcessCardType {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
}

const ProcessCard = (props: ProcessCardType) => (
  <Link to={props.linkTo}>
    <Card className="p-4 border-2 border-solid text-black border-neutral-300 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:border-primary ">
      <div className="mb-8">{props.icon}</div>
      <h2 className="font-semibold text-xl">{props.title}</h2>
      <p className="mt-5">{props.description}</p>
    </Card>
  </Link>
);

export default ProcessCard;
