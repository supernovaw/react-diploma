import { Banner } from "../misc";
import TopSales from "../TopSales";
import CatalogSection from "../CatalogSection";

const Main = () => {
  return (
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
