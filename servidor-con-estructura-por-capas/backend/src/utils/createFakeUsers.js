import { faker } from '@faker-js/faker';

faker.location ='es'

export const generateUsers = () => {
    const usuarios = [];
    for (let i = 0; i < 10; i++) {
        usuarios.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
        });
    }
    return usuarios;
};

