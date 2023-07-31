import "./App.css";
import useSWR from "swr";
import { Spinner } from "@contentful/f36-spinner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Preview } from "./Preview";
import HomepageHero from "./HomepageHero";

const client = createClient({
  space: "w89z4lbdennb",
  accessToken: "XuxVdITMcJzjxx0UVCNJdbPaR5_ggKG_gKobezCvPPE",
});

const getEntries = async () => {
  const entryItems = await client.getEntries({ content_type: "homepageHero" });
  const entries = entryItems.items
    .map((entry) => ({ id: entry.sys.id, ...entry.fields }))
    .sort((a, b) => a.internalName.localeCompare(b.internalName))
    .reverse();
  return { entries };
};

function App() {
  const { data, error } = useSWR("contentful", getEntries);
  if (error) return <div>failed to load </div>;
  if (!data) return <Spinner size="large" />;

  return (
    <>
      <p>
        <b>Live Page</b>: <a href="/preview">Go to preview page</a>
      </p>
      <hr />
      {data.entries.map((el) => (
        <HomepageHero key={el.id} data={el} />
      ))}
    </>
  );
}

export default App;

export const RouterSection = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/preview",
      element: <Preview />,
    },
  ]);

  return <RouterProvider router={router} />;
};
