import "./OrderSection.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cart } from "./state/persistent";
import useStateAccess from "./state/useStateAccess";

const postUrl = process.env.REACT_APP_BACKEND_URL + "/order";
const mapCart = items => items.map(src => ({
  // Cart items stored locally contain a name for displaying. That unnecessary field is removed here
  id: src.id,
  size: src.size,
  price: src.price,
  count: src.count
}));

function checkPhoneValidity(phone) {
  const re = /^\+?(\d{1,3} )?(\(?\d{2,3}\)? ?)[- ]?(\d{1,4}[- ]?){2,4}$/; // hmm, i think i know chinese now
  return re.test(phone);
}
function checkAddressValidity(address) {
  return address.length > 5;
}

const OrderSection = () => {
  const navigate = useNavigate();
  const cartCount = useStateAccess().cartCount;
  const cartItems = cart.get();
  const formRef = useRef();
  const shakeAnimationState = useRef({ /* [form HTML child index]: boolean, ... */ });
  const [requestStatus, setRequestStatus] = useState({ loading: false, error: null, success: false });

  // do not display this form when there are no items (and after order)
  if (cartCount.state === 0 && !requestStatus.success) return;

  function triggerShakeAnimation(index) {
    // index corresponds to HTML children of the form (0: phone, 1: address, 2: agreement)
    const state = shakeAnimationState.current
    const classes = formRef.current.children[index].classList;
    if (state[index]) return;

    classes.add("run-animation"); state[index] = true;
    setTimeout(() => {
      classes.remove("run-animation"); state[index] = false;
    }, 600);
  }

  function onSubmit(e) {
    e.preventDefault();
    const formEl = id => e.target.querySelector('#' + id);
    let isInvalid = false;

    const phone = formEl("phone").value;
    const address = formEl("address").value;
    const agreement = formEl("agreement").checked;
    if (!checkPhoneValidity(phone)) {
      triggerShakeAnimation(0);
      isInvalid = true;
    }
    if (!checkAddressValidity(address)) {
      triggerShakeAnimation(1);
      isInvalid = true;
    }
    if (!agreement) {
      triggerShakeAnimation(2);
      isInvalid = true;
    }
    if (isInvalid) return;

    const body = { owner: { phone, address }, items: mapCart(cartItems) };
    if (body.items.length === 0) return; // just in case (I'm a paranoic.)

    setRequestStatus({ loading: true, error: null, success: false });
    fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
      setRequestStatus({ loading: false, error: null, success: true });
      cart.clear();
      cartCount.update();
      navigate("/cart.html?successful_order=true");
    }).catch(error => {
      setRequestStatus({ loading: false, error, success: false });
    });
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      {!requestStatus.success && <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={onSubmit} ref={formRef}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" />
            <label className="form-check-label" htmlFor="agreement">Согласен(-на) с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary" disabled={requestStatus.loading}>Оформить</button>
          {!!requestStatus.error && <span style={{ color: "#a12138", marginLeft: "16px" }}>
            Произошла ошибка ({requestStatus.error?.message})
          </span>}
        </form>
      </div>}
      {requestStatus.success && <h3>Ваш заказ был успешно оформлен!</h3>}
    </section>
  );
};

export default OrderSection;
