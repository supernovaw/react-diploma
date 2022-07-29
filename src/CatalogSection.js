import classNames from "classnames";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStateAccess from "./state/useStateAccess";

// This component operates when categories are already loaded
const CategorySelector = ({ selectedCategoryId, setSelectedCategoryId, categoriesList }) => {
  const mkOnClick = category => e => { e.preventDefault(); setSelectedCategoryId(category.id) };
  const mkClass = category => classNames("nav-link", { active: category.id === selectedCategoryId });

  const mkEntry = category => (
    <li className="nav-item" key={category.id}>
      <a className={mkClass(category)} href="#" onClick={mkOnClick(category)}>{category.title}</a>
    </li>
  );
  return (
    <ul className="catalog-categories nav justify-content-center">
      {mkEntry({ id: 0, title: "Все" })}
      {categoriesList.map(mkEntry)}
    </ul>
  );
};

const CatalogSection = ({ enableSearch }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { categoriesRequest, itemsRequest } = useStateAccess();

  const loadMore = () => itemsRequest.proceed(selectedCategoryId, itemsRequest.state.loaded.length);
  useEffect(() => {
    if (!categoriesRequest.state.response) categoriesRequest.initiate();
    itemsRequest.proceed(selectedCategoryId);
  }, [selectedCategoryId]);

  function renderInner() { // includes items and the "load more" button
    const { status } = itemsRequest.state;
    return <>
      <div className="row">{itemsRequest.state.loaded.map(item =>
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card">
            <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
            <div className="card-body">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{item.price.toLocaleString()} руб.</p>
              <Link to={`/catalog/${+item.id}.html`} className="btn btn-outline-primary">Заказать</Link>
            </div>
          </div>
        </div>
      )}</div>

      {status.loading && <div>Loading…</div>}
      {!!status.error && <div>Error ({status.error.message})</div>}

      {!itemsRequest.state.endReached && !itemsRequest.state.status.loading && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={loadMore}>Загрузить ещё</button>
        </div>
      )}
    </>
  }
  function renderOuter() { // includes CategorySelector and renderInner
    const categoriesStatus = categoriesRequest.state.status;
    if (categoriesStatus.loading) return <div>Loading…</div>
    if (categoriesStatus.error) return <div>Error ({categoriesStatus.error.message})</div>
    if (!categoriesRequest.state.response) return;
    return <>
      <CategorySelector {...{
        selectedCategoryId,
        setSelectedCategoryId,
        categoriesList: categoriesRequest.state.response
      }} />
      {renderInner()}
    </>
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {enableSearch && <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" />
      </form>}
      {renderOuter()}
    </section>
  );
};

export default CatalogSection;
