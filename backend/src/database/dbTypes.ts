import mongoose  from "mongoose"

 interface IAddress {
    street: string
    state: string
    country: string
    area: string
    landmark: string
}

 interface IUser {
    name: string,
    email: string,
    phone_no: string,
    password: string,
    address: IAddress[]
}

interface IAdmin extends IUser {
    role : "admin"|"seller"
}
 interface IImages {
    id: string,
    url: string
}

 interface ICart {
    cart_id: mongoose.Schema.Types.ObjectId,
    name: string,
    description: string,
    price: number,
    quantity: number,
    images: IImages[]
}

 interface IItems {
    product_id: string,
    name: string
    quantity: number, 
    price: number,
    total_amount: number
}

interface IProduct {
    product_id: mongoose.Schema.Types.ObjectId,
    name: string,
    description: string,
    price: number,
    stock: number,
    images: IImages[]
}

 interface IOrder {
    order_id: mongoose.Schema.Types.ObjectId,
    price: number,
    items :IItems[]

}

export type {IOrder ,IImages ,IProduct,ICart,IUser,IAdmin,IItems}