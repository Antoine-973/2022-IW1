import { html } from 'lit';
import { Base } from '../Base';
import {addProductToCart} from "../api/cart";

export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }

  get _select() {
    return (this.___input ??= this.renderRoot?.querySelector('select') ?? null);
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    };
  }

  firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  render() {
    return html`
      <div class="card">
          <a href="/product/${this.product.id}">
          <header>
            <figure>
              <div class="placeholder ${this.loaded ? "fade": ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
              <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
            </figure>
          </header>
          <main>
            <h1>${this.product.title}</h1>
            <h3>${this.product.price} €</h3>
            <p>${this.product.description}</p>
          </main>
        </a>
        <footer>
          <p>
            <select name="quantity" id="quantity-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <button @click="${this._addToCart}">Add to cart</button>
          </p>
        </footer>
      </div>
    `;
  }

  async _addToCart()
  {
    await addProductToCart(this.product, parseInt(this._select.value.trim()), 'add');
  }
}
customElements.define('product-card', ProductCard);