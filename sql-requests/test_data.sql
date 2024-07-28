-- Insert data into carts
INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', CURRENT_DATE, CURRENT_DATE, 'OPEN'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', CURRENT_DATE, CURRENT_DATE, 'ORDERED');

-- Insert data into cart_items
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 5),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 8);