import classNames from "classnames";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from ".";
import useStateAccess from "./state/useStateAccess";

// CategorySelector operates when categories are already loaded
const CategorySelector = ({ categoryId, onSetCategoryId, categoriesList }) => {
  const mkOnClick = category => e => { e.preventDefault(); onSetCategoryId(category.id) };
  const mkClass = category => classNames("nav-link", { active: category.id === categoryId });

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
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(useLocation().search).get("search");
  const searchInputRef = useRef(null);
  const onSearch = e => {
    e.preventDefault();
    const text = e.target.children[0].value;
    if (text === '') { navigate("/catalog.html"); return }
    navigate("/catalog.html?" + new URLSearchParams({ search: text }));
  };

  const { categoriesRequest, itemsRequest } = useStateAccess();
  const { categoryId } = itemsRequest.state;

  const onSetCategoryId = newId => { if (categoryId !== newId) itemsRequest.proceed(newId, 0, searchQuery) };
  const loadMore = () => { itemsRequest.proceed(categoryId, itemsRequest.state.loaded.length, searchQuery) };
  useEffect(() => {
    if (!categoriesRequest.state.response) {
      categoriesRequest.initiate();
    }
    /* (Re)load items if:
     *  > none are present
     *  > existing ones were loaded with a different search query */
    if (itemsRequest.state.loaded.length === 0 || itemsRequest.state.usedSearchFilter !== searchQuery) {
      itemsRequest.proceed(0, 0, searchQuery); // category 0, offset 0 by default
    }
  }, []);
  useEffect(() => { // react to a new search being entered
    if (!enableSearch) return;
    searchInputRef.current.value = searchQuery;
    if (searchQuery !== itemsRequest.state.usedSearchFilter) itemsRequest.proceed(categoryId, 0, searchQuery);
  }, [searchQuery]);

  function renderInner() { // includes items and the "load more" button
    const { status } = itemsRequest.state;
    const displayNoneFound = !status.loading && !status.error && !itemsRequest.state.loaded.length;
    return <>
      <div className="row">{itemsRequest.state.loaded.map(item =>
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card">
            <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
            <div className="card-body">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{formatMoney(item.price)}</p>
              <Link to={`/catalog/${+item.id}.html`} className="btn btn-outline-primary">Заказать</Link>
            </div>
          </div>
        </div>
      )}</div>

      {status.loading && <div>Loading…</div>}
      {!!status.error && <div>Error ({status.error.message})</div>}
      {displayNoneFound && <div>Nothing was found</div>}

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
        categoryId,
        onSetCategoryId,
        categoriesList: categoriesRequest.state.response
      }} />
      {renderInner()}
    </>
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {enableSearch && <form className="catalog-search-form form-inline" onSubmit={onSearch}>
        <input className="form-control" placeholder="Поиск" ref={searchInputRef} />
      </form>}
      {renderOuter()}
    </section>
  );
};

export default CatalogSection;
