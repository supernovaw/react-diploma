import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from ".";
import Loader from "./Loader";
import useStateAccess from "./state/useStateAccess";

const Item = ({ item }) => (
  <div className="col-4">
    <div className="card">
      <img src={item.images[0]}
        className="card-img-top img-fluid" alt={item.title} />
      <div className="card-body">
        <p className="card-text">{item.title}</p>
        <p className="card-text">{formatMoney(item.price)}</p>
        <Link to={`/catalog/${+item.id}.html`} className="btn btn-outline-primary">Заказать</Link>
      </div>
    </div>
  </div>
)

const TopSales = () => {
  const { state, initiate: initiateRequest } = useStateAccess().topSalesRequest;
  useEffect(() => { initiateRequest() }, []);

  const dataPresent = state.response?.length > 0;
  const noDataConfirmed = !dataPresent && !state.status.loading && !state.status.error;

  return !noDataConfirmed && (
    <div>
      <Loader type="1" {...state.status} retry={initiateRequest} />
      {dataPresent && <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {state.response.map(item => <Item item={item} key={item.id} />)}
        </div>
      </section>}
    </div>
  );
};

export default TopSales;
