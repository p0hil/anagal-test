import React, {useState} from 'react';
import {InertiaLink, usePage} from '@inertiajs/inertia-react';
import Layout from '@/Common/Layout';
import axios from "axios";
import {removeFromList, updateList} from "@/utils";

const Cart = () => {

  const {products, csrf_token} = usePage().props;
  const [items, setItems] = useState(products);

  function increase(product) {
    changeQty(product, product.qty + 1);
  }

  function decrease(product) {
    if (product.qty === 1) {
      return;
    }
    changeQty(product, product.qty - 1);
  }

  function changeQty(product, qty) {
    product.qty = qty > 1 ? qty : 1;

    axios.put(route('cart.change'), {_token: csrf_token, productId: product.id, qty}).then(response => {
      updateList(items, product, setItems);
    });
  }

  function remove(product) {
    axios.put(route('cart.remove'), {_token: csrf_token, productId: product.id}).then(response => {
      removeFromList(items, product, setItems);
    });
  }

  return (
    <div className="container">
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li><InertiaLink href={route('products')}>Home</InertiaLink></li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description"></td>
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
              {
                items.map(item => (
                  <tr key={item.id}>
                    <td className="cart_product">
                      <img src={item.photo} alt=""/>
                    </td>
                    <td className="cart_description">
                      <h4>{item.title}</h4>
                    </td>
                    <td className="cart_price">
                      <p>{item.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <button className="btn btn-default" onClick={() => decrease(item)}> -</button>
                        <input className="cart_quantity_input" type="text"
                               value={item.qty} autoComplete="off" size="2"
                               onChange={e => {
                                 changeQty(item, e.target.value)
                               }}
                        />
                        <button className="btn btn-default" onClick={() => increase(item)}> +</button>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">${(item.price * item.qty).toFixed(2)}</p>
                    </td>
                    <td className="cart_delete">
                      <button className="btn btn-default cart_quantity_delete" onClick={() => remove(item)}><i className="fa fa-times"></i></button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your
              delivery
              cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="pl-10">
                  <li>
                    <input type="checkbox"/>
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox"/>
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox"/>
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="pl-10">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>Israel</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Upper galil</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text"/>
                  </li>
                </ul>
                <a className="btn btn-default check_out" href="#continue">Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul className="pl-10">
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span>${(items.reduce((acc, item) => {
                    return acc + (item.price * item.qty)
                  }, 0)).toFixed(2)}</span></li>
                </ul>
                <a className="btn btn-default check_out" href="#checkout">Check Out</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Cart.layout = page =>
  <Layout title="Cart" children={page}/>
;
export default Cart;
