import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStateAccess from "./state/useStateAccess";
import { cart } from "./state/persistent";
import Loader from "./Loader";

const propertiesNames = {
  sku: "Артикул",
  manufacturer: "Производитель",
  color: "Цвет",
  material: "Материалы",
  season: "Сезон",
  reason: "Повод"
};

// While item details are loading, show a narrower set
// of details from previous requests (if available)
function getEarlyDetails(id, itemsRequest, topSalesRequest) {
  const find = item => item.id === id;
  return itemsRequest.state.loaded.find(find)
    || topSalesRequest.state.response?.find(find);
}

const renderItemPropertiesTable = details => (
  <table className="table table-bordered"><tbody>
    {Object.keys(propertiesNames).map(field => {
      const value = details[field];
      return value && (
        <tr key={field}>
          <td>{propertiesNames[field]}</td>
          <td>{value}</td>
        </tr>
      );
    })}
  </tbody></table>
);

const ItemSection = () => {
  const id = +useParams().id;
  const navigate = useNavigate();
  const { itemDetailsRequest, itemsRequest, topSalesRequest, cartCount } = useStateAccess();

  const [selectedSize, selectSize] = useState();
  const [selectedCount, selectCount] = useState(1);
  const countInc = () => selectCount(c => Math.min(c + 1, 10));
  const countDec = () => selectCount(c => Math.max(c - 1, 1));

  const earlyDetails = getEarlyDetails(id, itemsRequest, topSalesRequest);
  const details = itemDetailsRequest.state[id]?.response;
  useEffect(() => { if (!details) itemDetailsRequest.initiate(id) }, [id]);

  function addToCart() {
    if (!selectedSize) return;
    cart.add(id, selectedSize, details.price, selectedCount, (details || earlyDetails).title);
    cartCount.update();
    navigate("/cart.html");
  }

  if (!details && !earlyDetails) { // here, display request status WHEN NO earlyDetails are present (empty page)
    if (!itemDetailsRequest.state[id]) return; // 1st render only
    const status = itemDetailsRequest.state[id].status;
    if (status.loading || status.error) return (
      <Loader type="3" {...status} retry={() => itemDetailsRequest.initiate(id)} />
    );
  }

  function renderMainPart() {
    // here, display request status WHEN earlyDetails are present (title and picture on the left are shown)
    if (!itemDetailsRequest.state[id]) return;
    const status = itemDetailsRequest.state[id].status;
    if (status.loading || status.error) return (
      <Loader type="3" {...status} retry={() => itemDetailsRequest.initiate(id)} />
    );

    const sizes = details.sizes.filter(s => s.available || s.avalible).map(s => s.size);
    const isSizeSelected = sizes.includes(selectedSize);
    function renderSizes() {
      const style = { userSelect: "none", cursor: "pointer" };
      const mkClass = size => classNames("catalog-item-size", { selected: selectedSize === size })
      const onClick = size => selectSize(prev => prev === size ? undefined : size);

      return (
        <p>Размеры в наличии: {sizes.map(size => (
          <span key={size} className={mkClass(size)} onClick={() => onClick(size)} style={style}>{size}</span>
        ))}</p>
      );
    }

    return (
      <div className="col-7">
        {renderItemPropertiesTable(details)}
        <div className="text-center">
          {renderSizes()}
          <p hidden={!isSizeSelected}>
            Количество: <span className="btn-group btn-group-sm pl-2">
              <button className="btn btn-secondary" onClick={countDec}>–</button>
              <span className="btn btn-outline-primary">{selectedCount}</span>
              <button className="btn btn-secondary" onClick={countInc}>+</button>
            </span>
          </p>
        </div>
        <button className="btn btn-danger btn-block btn-lg"
          hidden={!isSizeSelected} onClick={addToCart}>В корзину</button>
      </div>
    );
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{(details || earlyDetails).title}</h2>
      <div className="row">
        <div className="col-5"><img className="img-fluid"
          src={(details || earlyDetails).images[0]}
          alt={(details || earlyDetails).title} /></div>
        {renderMainPart()}
      </div>
    </section>
  );
};

export default ItemSection;
