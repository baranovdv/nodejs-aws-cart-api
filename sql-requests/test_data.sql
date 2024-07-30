-- Insert data into carts
INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', CURRENT_DATE, CURRENT_DATE, 'OPEN'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', CURRENT_DATE, CURRENT_DATE, 'ORDERED');

-- Insert data into cart_items
INSERT INTO cart_items (id, cart_id, product_id, price, count)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a00','a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 100, 5),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01','b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 200, 8);