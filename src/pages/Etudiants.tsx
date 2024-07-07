import ParticipantList from "../components/ParticipantLists";
import { columns } from "../components/Particpants_Columns";

const Participants = () => {
  return (
    <ParticipantList type="etudiant" endpoint="etudiants" columns={columns} />
  );
};

export default Participants;
