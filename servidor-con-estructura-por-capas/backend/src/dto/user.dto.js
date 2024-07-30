import { createHash } from "../utils/user.utils.js";

class UserDTO {
    constructor({ first_name, last_name, email, age, password, lastOrderId, tickets, role }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.age = age;
      this.password = createHash(password);
      this.lastOrderId = lastOrderId;
      this.tickets = tickets;
      this.role = role;
    }
  
    static Update(data) {
      return {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        email: data.email
      };
    }
  }
  
  export default UserDTO;
  