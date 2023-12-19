//userName
export type UserName = {
  firstName: string;
  lastName: string;
};

//user address
export type UserAddress = {
  street: string;
  city: string;
  country: string;
};


//oders 
export type Order ={
    productName : string;
    price: number;
    quantity: number;
}

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: UserName;
  age: number;
  email: string;
  isActive: true | false;
  hobbies: string[];
  address: UserAddress;
  orders?: Order[];
};


