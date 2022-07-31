import { Link } from "react-router-dom";
import { cart } from "./state/persistent";
import useStateAccess from "./state/useStateAccess";

const CartSection = () => {
  const entries = cart.get();
  const totalSum = entries.map(e => e.price * e.count).reduce((a, b) => a + b, 0);

  const { cartCount } = useStateAccess();
  const onRemove = entry => {
    cart.remove(entry);
    cartCount.update();
  };

  const renderRow = (entry, index) => (
    <tr key={entry.id + "/" + entry.size}>
      <td scope="row">{index + 1}</td>
      <td><Link to={`/catalog/${entry.id}.html`}>{entry.name}</Link></td>
      <td>{entry.size}</td>
      <td>{entry.count}</td>
      <td>{entry.price.toLocaleString()} руб.</td>
      <td>{(entry.price * entry.count).toLocaleString()} руб.</td>
      <td><button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(entry)}>Удалить</button></td>
    </tr>
  );

  const renderTable = () => (
    <table className="table table-bordered">
      <thead><tr>
        {["#", "Название", "Размер", "Кол-во", "Стоимость", "Итого", "Действия"].map(
          (field, i) => <th scope="col" key={i}>{field}</th>
        )}
      </tr></thead>
      <tbody>
        {entries.map(renderRow)}
        <tr>
          <td colSpan={5} className="text-right">Общая стоимость</td>
          <td>{totalSum.toLocaleString()} руб.</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {entries.length === 0 ?
        <div>Your cart is empty</div>
        :
        renderTable()
      }
    </section>
  );
};

export default CartSection;
