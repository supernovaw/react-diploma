import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStateAccess from "./state/useStateAccess";

const Item = ({ item }) => (
  <div className="col-4">
    <div className="card">
      <img src={item.images[0]}
        className="card-img-top img-fluid" alt={item.title} />
      <div className="card-body">
        <p className="card-text">{item.title}</p>
        <p className="card-text">{item.price.toLocaleString()} руб.</p>
        <Link to={`/catalog/${+item.id}.html`} className="btn btn-outline-primary">Заказать</Link>
      </div>
    </div>
  </div>
)

const TopSales = () => {
  const { state, initiate: initiateRequest } = useStateAccess().topSalesRequest;
  useEffect(() => { initiateRequest() }, []);

  const displayLoading = state.status.loading;
  const displayError = !displayLoading && !!state.status.error;
  const displayData = !displayLoading && !displayError && !!state.response && state.response.length > 0;

  const displayNothing = !displayLoading && !displayError && !displayData;
  return displayNothing || (
    <div>
      {displayLoading && <div>Loading…</div>}
      {displayError && <div>Error: {state.status.error.message}</div>}

      {displayData && <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {displayData && state.response.map(item => <Item item={item} key={item.id} />)}
        </div>
      </section>}
    </div>
  );
};

export default TopSales;
