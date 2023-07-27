import "./App.css";
import useSWR from "swr";
import { Spinner } from "@contentful/f36-spinner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";

const client = createClient({
  space: "w89z4lbdennb",
  accessToken: "XuxVdITMcJzjxx0UVCNJdbPaR5_ggKG_gKobezCvPPE",
  host: "preview.contentful.com",
});

const getEntries = async () => {
  const entryItems = await client.getEntries({ content_type: "contentModel1" });
  const entries = entryItems.items.map((entry) => {
    return { id: entry.sys.id, ...entry.fields };
  });

  return { entries };
};

export function Preview() {
  const { data, error } = useSWR("contentful", getEntries);
  if (error) return <div>failed to load </div>;
  if (!data) return <Spinner size="large" />;

  return (
    <>
      <h1>{data.entries[0].title}</h1>
      {documentToReactComponents(data.entries[0].text)}
    </>
  );
}

export default Preview;
