import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../helpers/userHelper";
import { User } from "../models/User";

const AuthContext = createContext<User | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    setUser(await getUser());
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
