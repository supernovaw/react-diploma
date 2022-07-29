import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const searchFormRef = useRef(null);
  const toggleSearchForm = () => {
    const el = searchFormRef.current;
    el.classList.toggle("invisible");

    const text = el.children[0].value;
    if (text === '') return;
    navigate("/catalog.html?" + new URLSearchParams({ search: text }));
    el.children[0].value = '';
  };

  return (
    <header className="container">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src="/img/header-logo.png" alt="Bosa Noga" />
        </NavLink>
        <div className="collapase navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Главная</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/catalog.html">Каталог</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about.html">О магазине</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacts.html">Контакты</NavLink></li>
          </ul>
          <div>
            <div className="header-controls-pics">
              <div data-id="search-expander" onClick={toggleSearchForm}
                className="header-controls-pic header-controls-search" />
              <NavLink className="header-controls-pic header-controls-cart" to="/cart.html">
                <div className="header-controls-cart-full">1</div>
                <div className="header-controls-cart-menu" />
              </NavLink>
            </div>
            <form data-id="search-form" ref={searchFormRef} onSubmit={e => { e.preventDefault(); toggleSearchForm() }}
              className="header-controls-search-form form-inline invisible">
              <input className="form-control" placeholder="Поиск" />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};
