import { QueryClient, QueryClientProvider } from "react-query";
import FlipStudy from "./FlipStudy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FlipStudy />
    </QueryClientProvider>
  );
}
