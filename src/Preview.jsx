import "./App.css";
import useSWR from "swr";
import { Spinner } from "@contentful/f36-spinner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import { Link } from "react-router-dom";
import HomepageHero from "./HomepageHero";

const client = createClient({
  space: "w89z4lbdennb",
  accessToken: "jqRJ1IbhkuYud0Pbd3eZ3SfAE9shG3uF2nb6F5fEuOM",
  host: "preview.contentful.com",
});

const getEntries = async () => {
  const entryItems = await client.getEntries();
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
      <a href="/">Go to live page</a>
      <h1>Preview Page</h1>
      <hr />
      <HomepageHero data={data.entries[0]} />
    </>
  );
}

export default Preview;
