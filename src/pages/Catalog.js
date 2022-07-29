import CatalogSection from "../CatalogSection";
import { Banner } from "../misc";

const Catalog = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <CatalogSection enableSearch />
        </div>
      </div>
    </main>
  );
};

export default Catalog;