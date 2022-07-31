import CartSection from "../CartSection";
import { Banner } from "../misc"
import OrderSection from "../OrderSection";

const Cart = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <CartSection />
          <OrderSection />
        </div>
      </div>
    </main>
  );
};

export default Cart;
