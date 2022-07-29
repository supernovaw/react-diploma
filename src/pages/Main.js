import { Banner } from "../misc";
import TopSales from "../TopSales";
import CatalogSection from "../CatalogSection";

const Main = () => {
  return (
    // This is a template for now
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <TopSales />
          <CatalogSection />
        </div>
      </div>
    </main>
  );
};

export default Main;
