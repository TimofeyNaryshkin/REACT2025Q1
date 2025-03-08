import { Provider } from "react-redux";
import { ThemeProvider } from "src/hooks/useTheme";
import { setupStore } from "src/store/store";

const store = setupStore();

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}