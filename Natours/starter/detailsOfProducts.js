import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsOfDetails } from '../services/api';
import CardDetails from '../components/CardDetails';
import ShopCartBtn from '../components/ShopCartBtn';
import AddToCart from '../components/AddToCart';

export default class DetailsOfProducts extends Component {
  state = {
    products: {},
    hasProducts: false,
    productsDetails: [],
  }

  componentDidMount = () => {
    this.setProducts();
  }

  setProducts = async () => {
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const products = await getProductsOfDetails(id);
    // console.log(products);
    this.setState(() => ({
      products,
      hasProducts: true,
    }));
    // console.log(products.price);
  }

  handleClick = (title, price, thumbnail) => {
    const obj = {
      title,
      price,
      thumbnail,
    };
    this.setState((prevState) => ({
      productsDetails: [...prevState.productsDetails, obj],
    }), () => this.setLocalStorage());
    console.log(title);
  }

  setLocalStorage = () => {
    const { productsDetails } = this.state;
    localStorage.setItem('products', JSON.stringify(productsDetails));
  }

  render() {
    const { products, hasProducts } = this.state;
    const { title, price, thumbnail } = products;

    return (
      <div>
        <p>Details Of Products</p>
        {
          hasProducts && (
            <CardDetails
              data-testid="shopping-cart-product-name"
              price={ products.price }
              title={ products.title }
              thumbnail={ products.thumbnail }
            />
          )
        }
        <ShopCartBtn />
        <button
          onClick={ () => this.handleClick(title, price, thumbnail) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho

        </button>

      </div>
    );
  }
}

DetailsOfProducts.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
