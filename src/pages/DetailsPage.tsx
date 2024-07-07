import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  return <div>DetailsPage {id}</div>;
};

export default DetailsPage;
