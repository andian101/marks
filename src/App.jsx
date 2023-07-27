import "./App.css";
import useSWR from "swr";
import { Spinner } from "@contentful/f36-spinner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Preview } from "./Preview";

const client = createClient({
  space: "w89z4lbdennb",
  accessToken: "XuxVdITMcJzjxx0UVCNJdbPaR5_ggKG_gKobezCvPPE",
});

const getEntries = async () => {
  const entryItems = await client.getEntries({ content_type: "contentModel1" });
  const entries = entryItems.items.map((entry) => {
    return { id: entry.sys.id, ...entry.fields };
  });

  return { entries };
};

function App() {
  const { data, error } = useSWR("contentful", getEntries);
  if (error) return <div>failed to load </div>;
  if (!data) return <Spinner size="large" />;

  return (
    <>
      <a href={"/preview"}>Go to preview</a>
      <h1>Live Page</h1>
      <hr />
      <h2>{data.entries[0].title}</h2>
      {documentToReactComponents(data.entries[0].text)}
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
