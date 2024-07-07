import ParticipantList from "../components/ParticipantLists";
import { columns } from "../components/Particpants_Columns";

const Participants = () => {
  return (
    <ParticipantList type="speaker" endpoint="speakers" columns={columns} />
  );
};

export default Participants;
