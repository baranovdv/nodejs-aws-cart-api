INSERT INTO users (id) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380acc');

INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380acc', CURRENT_DATE, CURRENT_DATE, 'OPEN');

INSERT INTO products (id, title, description, price)
VALUES 
('0000bc99-9c0b-4ef8-bb6d-6bb9bd300000', 'Product title 1', 'Product description 1', 123.45),
('0000bc99-9c0b-4ef8-bb6d-6bb9bd300001', 'Product title 2', 'Product description 2', 44.2),
('0000bc99-9c0b-4ef8-bb6d-6bb9bd300002', 'Product title 3', 'Product description 3', 123.2);

INSERT INTO cart_items (id, cart_id, product_id, count)
VALUES
('f6a1ac3a-8522-4afe-a9e5-ffb65c2fcb3b','a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0000bc99-9c0b-4ef8-bb6d-6bb9bd300000', 5),
('e9653edd-5281-40a4-bf6f-bce3e4172e5b','a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0000bc99-9c0b-4ef8-bb6d-6bb9bd300001', 9),
('0a1d53fc-0ef7-4a0b-8f72-422e6ab0a7c6','a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0000bc99-9c0b-4ef8-bb6d-6bb9bd300002', 14);

INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total)
VALUES
('1c7fa2f4-fa4b-4bf9-890a-92c55fc4fabe','a0eebc99-9c0b-4ef8-bb6d-6bb9bd380acc', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '{"method": "m1"}', '{"delivery": "aaa"}', 'comment', 'OPEN', 500);