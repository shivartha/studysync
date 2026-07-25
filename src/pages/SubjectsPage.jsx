import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import generateId from "../utils/generateId";
import SubjectForm from "../components/subjects/SubjectForm";
import SubjectList from "../components/subjects/SubjectList";
import "./SubjectsPage.css";

// SubjectsPage is the "smart" component: it owns the data and the
// logic (add/delete), and passes both down to dumb, reusable pieces
// (SubjectForm, SubjectList). This split is deliberate — Form and List
// stay reusable, while all the state logic lives in exactly one place.
function SubjectsPage() {
  const [subjects, setSubjects] = useLocalStorage(STORAGE_KEYS.SUBJECTS, []);

  function handleAddSubject(newSubject) {
    setSubjects([...subjects, { id: generateId(), ...newSubject }]);
  }

  function handleDeleteSubject(id) {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  }

  return (
    <div>
      <h1>Subjects</h1>
      <SubjectForm onAddSubject={handleAddSubject} />
      <SubjectList subjects={subjects} onDelete={handleDeleteSubject} />
    </div>
  );
}

export default SubjectsPage;