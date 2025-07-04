'use client';
import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { AppReducer, AppStoreState, DispatchAction } from './AppReducer';
import { refreshToken } from '../services/sessionServices';
import { Spinner } from '@/components/Spinner';
import { localStorageGet } from '@/utils/localStorage';

const INITIAL_APP_STATE: AppStoreState = {
  isAuthenticated: false,
  token: '',
};

/**
 * Instance of React Context for global AppStore
 */
type AppContextReturningType = [AppStoreState, Dispatch<DispatchAction>];

const AppContext = createContext<AppContextReturningType>([
  INITIAL_APP_STATE,
  () => null,
]);

interface AppStoreProviderProps {
  children: ReactNode;
}

/**
 * Main global Store as HOC with React Context API
 *
 * import {AppStoreProvider} from './store'
 * ...
 * <AppStoreProvider>
 *  <App/>
 * </AppStoreProvider>
 */
const AppStoreProvider: FunctionComponent<AppStoreProviderProps> = ({
  children,
}) => {
  const reducer: AppContextReturningType = useReducer(
    AppReducer,
    INITIAL_APP_STATE
  );

  const [, dispatch] = reducer;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validadeToken = async (token: string) => {
      try {
        const res = await refreshToken(token);
        dispatch({ type: 'LOG_IN', payload: { token: res.token } });
      } catch (error) {
        console.error('Token validation failed:', error);
        dispatch({ type: 'LOG_OUT' });
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorageGet('token');

    if (token) {
      validadeToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={reducer}>
      {isLoading ? (
        <div className="my-20 flex w-full justify-center ring-2">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

const useAppStore = (): AppContextReturningType => useContext(AppContext);

export { AppStoreProvider, AppContext, useAppStore };