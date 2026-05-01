import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KeyList from './pages/KeyList';
import Search from './pages/Search';
import Log from './pages/Log';
import UserManagement from './pages/UserManagement';
import KeyDetail from './pages/KeyDetail';
import KeyEdit from './pages/KeyEdit';
import KeyRegister from './pages/KeyRegister';
import KeyBulkUpdate from './pages/KeyBulkUpdate';
import Step1KeySelect from './pages/reservation/Step1KeySelect';
import Step2LoanInfo from './pages/reservation/Step2LoanInfo';
import Step3Confirm from './pages/reservation/Step3Confirm';
import Step4Complete from './pages/reservation/Step4Complete';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="keys/in-use" element={<KeyList filter="in-use" />} />
          <Route path="keys/reserved" element={<KeyList filter="reserved" />} />
          <Route path="keys/unreturned" element={<KeyList filter="unreturned" />} />
          <Route path="keys/returning" element={<KeyList filter="returning" />} />
          <Route path="keys/register" element={<KeyRegister />} />
          <Route path="keys/bulk-update" element={<KeyBulkUpdate />} />
          <Route path="keys/detail/:id" element={<KeyDetail />} />
          <Route path="keys/detail/:id/edit" element={<KeyEdit />} />
          <Route path="search" element={<Search />} />
          <Route path="log" element={<Log />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reservation" element={<Step1KeySelect />} />
          <Route path="reservation/step2" element={<Step2LoanInfo />} />
          <Route path="reservation/step3" element={<Step3Confirm />} />
          <Route path="reservation/step4" element={<Step4Complete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
