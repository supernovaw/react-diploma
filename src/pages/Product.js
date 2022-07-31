import { Banner } from "../misc";
import ItemSection from "../ItemSection";

const Product = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <ItemSection />
        </div>
      </div>
    </main>
  );
};

export default Product;
