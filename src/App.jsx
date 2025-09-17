import AppRoutes from 'src/routes'

import "src/App.css";
import AuthProvider from 'src/contexts/AuthProvider';
import SocketProvider from 'src/contexts/SocketProvider';
import Test from 'src/pages/test/Test';

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
        {/* <Test /> */}
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
