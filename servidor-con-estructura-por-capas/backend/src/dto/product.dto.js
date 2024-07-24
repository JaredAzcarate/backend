class ProductDTO {
  constructor({ title, description, details, price, status, category, image }) {
      this.title = title;
      this.description = description;
      this.details = details;
      this.price = price;
      this.status = status;
      this.category = category;
      this.image = image;
  }

  static getImageFromMulter(body, file) {
      return new ProductDTO({
          ...body,
          image: file ? file.path : null
      });
  }
}

export default ProductDTO;
