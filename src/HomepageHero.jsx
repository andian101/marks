/* eslint-disable react/prop-types */
import "./hh.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function HomepageHero({ data }) {
  const {
    callToAction,
    desktopImage,
    introduction,
    mainCopy,
    mobileImage,
    moduleColour,
    subCopy,
    category,
    fontColour,
    subCategory,
  } = data;

  return (
    <div className="hh">
      <h2>{data.internalName}</h2>
      <div className="intro">{documentToReactComponents(introduction)}</div>
      <section className="hh-wrap">
        <div className="hh-left" style={{ backgroundColor: moduleColour }}>
          <h2>{mainCopy}</h2>
          <h3>{subCopy}</h3>
          <div>
            <button>{callToAction}</button>
          </div>
        </div>
        <div>
          <picture>
            <source
              media="(min-width:900px)"
              srcSet={desktopImage?.fields?.file?.url}
            />
            <source
              media="(min-width:0px)"
              srcSet={mobileImage?.fields?.file?.url}
            />
            <img src={desktopImage?.fields?.file?.url} alt="Flowers" />
          </picture>
        </div>
      </section>
    </div>
  );
}

export default HomepageHero;
