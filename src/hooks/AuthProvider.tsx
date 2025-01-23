import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../helpers/userHelper";
import { User } from "../models/User";
import { useCookies } from "react-cookie";

const AuthContext = createContext<User | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [cookies] = useCookies(["wos-session"]);

  useEffect(() => {
    if (cookies["wos-session"]) {
      const setUserData = async () => {
        const user = await getUser();
        if (!user) return;
        setUser(user);
      };
      setUserData();
    }
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
