export interface UserData {
  id: number;
  name: string;
  emailAddress: string;
  agency: { id: number; name: string };
  role: number;
}

export interface AgencyData {
  id: number;
  name: string;
}
