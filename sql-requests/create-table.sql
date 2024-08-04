CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE users (
    id UUID PRIMARY KEY
);

CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status cart_status,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Unknown title',
    description VARCHAR(255) NOT NULL DEFAULT 'Unknown description',
    price NUMERIC(5,2) NOT NULL DEFAULT 0,
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    count INTEGER,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID,
    cart_id UUID,
    payment JSON,
    delivery JSON,
    comments VARCHAR(255) NOT NULL DEFAULT 'No comment',
    status cart_status NOT NULL DEFAULT 'OPEN',
    total NUMERIC(5,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
