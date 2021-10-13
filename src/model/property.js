class Property {
    constructor(rent, price, type) {
        this.rent_ = rent;
        this.price = price;
        this.type_ = type;
    }

    rent_ = 0;
    price_ = 0;
    type_;
}

class Hotel extends Property {
    constructor(rent, price) {
        super(rent, price, "hotel");
    }

}

class House extends Property {
    constructor(rent, price) {
        super(rent, price, "house");
    }

}
