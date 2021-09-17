import React, {useState} from 'react';
import {InertiaLink, usePage} from '@inertiajs/inertia-react';
import Layout from '@/Common/Layout';
import Categories from "@/Common/Categories";
import Brands from "@/Common/Brands";
import {Inertia} from "@inertiajs/inertia";
import axios from "axios";
import Pagination from "@/Common/Pagination";

const Products = () => {

  const {products, csrf_token} = usePage().props;
  const {data, meta: {links}} = products;

  const [items, setItems] = useState(data);

  function putToCart(product) {
    axios.put(route('cart.put'), {_token: csrf_token, productId: product.id}).then(response => {
      const newItems = items.map(item => {
        if (item.id !== product.id) return item;
        item.qty++;
        return item;
      })
      setItems(newItems);
    });
  }

  function removeFromCart(productId) {
    axios.put(route('cart.remove'), {_token: csrf_token, productId}).then(response => console.log(response));
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="left-sidebar">
              <Categories/>
              <Brands/>
            </div>
          </div>
          <div className="col-sm-9 padding-right">
            <div className="features_items">
              <h2 className="title text-center">Features Items</h2>
              {items.map((item) => (
                <div className="col-sm-4" key={item.id}>
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={item.photo} alt=""/>
                        <h2>${item.price}</h2>
                        <p>{item.title}</p>
                        {item.qty === 0
                          ? (
                            <button className="btn btn-default add-to-cart" onClick={() => putToCart(item)}>
                              <i className="fa fa-shopping-cart"></i>Add to cart
                            </button>)
                          : (
                            <div className="pb-4">Already in cart</div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination links={links} />
          </div>
        </div>
      </div>
    </section>
  );
};

Products.layout = page => <Layout title="Products" children={page}/>;
export default Products;
