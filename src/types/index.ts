export type KeyStatus =
  | '利用中'
  | '予約確定'
  | '未返却'
  | '返却確認中'
  | '貸出可'
  | '返却完了'
  | '管理中'
  | '予約不可';

export type UserRole = '管理者' | '営業';

export interface Key {
  id: string;
  buildingName: string;
  roomNumber: string;
  address: string;
  status: KeyStatus;
  storeBranch: string;
  category: string;
  memo?: string;
  reservedBy?: string;
  dueDate?: string;
  keyType?: string;
  totalKeys?: number;
  spareKeys?: number;
  contractCompany?: string;
}

export interface Reservation {
  id: string;
  keyId: string;
  keyName: string;
  requester: string;
  company: string;
  person: string;
  phone: string;
  reason: string;
  lendTo: string;
  startDate: string;
  endDate: string;
  status: KeyStatus;
  notes?: string;
}

export interface LogEntry {
  id: string;
  date: string;
  action: string;
  keyId: string;
  keyName: string;
  buildingName: string;
  employeeCode: string;
  user: string;
  detail: string;
}

export interface User {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branch: string;
  lastLogin: string;
}

export interface ReservationFormData {
  selectedKeys: Key[];
  reason: string;
  lendTo: string;
  company: string;
  person: string;
  phone: string;
  startDate: string;
  endDate: string;
  notes: string;
}
