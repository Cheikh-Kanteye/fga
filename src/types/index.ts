
export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  country: string;
  phone: string;
  registrationDate: string;
  type: 'participant' | 'panelist' | 'student' | 'press';
  status: 'pending' | 'approved' | 'rejected';
}
