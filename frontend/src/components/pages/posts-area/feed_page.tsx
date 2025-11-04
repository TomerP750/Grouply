import { FilterProvider } from "../../../context/filter_context";
import { Feed } from "./feed";

export default function FeedPage() {
  return (
    <FilterProvider>
      <Feed />
    </FilterProvider>
  );
}