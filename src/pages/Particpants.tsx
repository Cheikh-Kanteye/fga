import ParticipantList from "../components/ParticipantLists";
import { columns } from "../components/Particpants_Columns";

const Participants = () => {
  return (
    <ParticipantList
      type="participant"
      endpoint="participants"
      columns={columns}
    />
  );
};

export default Participants;
