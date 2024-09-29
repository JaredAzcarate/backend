import { createHash } from "../utils/user.utils.js";

class UserDTO {
  constructor({ first_name, last_name, address, email, age, password, cartId, role = 'user' }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.address = address;
      this.email = email;
      this.age = age;
      this.password = createHash(password);
      this.cartId = cartId;
      this.role = role;
  }

  static Update(data) {
      return {
          first_name: data.first_name,
          last_name: data.last_name,
          address : address,
          age: data.age,
          email: data.email
      };
  }
}
  
  export default UserDTO;
  