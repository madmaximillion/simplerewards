INSERT INTO users (
    username,
    password_hash,
    role,
    display_name,
    parent_id,
    created_at
)
VALUES (
           'max',
           '$2a$10$Qv1gJvJZzYzFzKzYzFzKzOeXzVQz8ZKJ3eYJwQvJZzYzFzKzYzFzK',  -- bcrypt hash of "96195851"
           'PARENT',
           'Daddy',
           NULL,
           CURRENT_TIMESTAMP
       );

INSERT INTO users (
    username,
    password_hash,
    role,
    display_name,
    parent_id,
    created_at
)
VALUES (
           'harri',
           '$2a$10$Qv1gJvJZzYzFzKzYzFzKzOeXzVQz8ZKJ3eYJwQvJZzYzFzKzYzFzK',  -- bcrypt hash of "96195851"
           'CHILD',
           'Harri',
           1,
           CURRENT_TIMESTAMP
       ),(
            'bea',
            '$2a$10$Qv1gJvJZzYzFzKzYzFzKzOeXzVQz8ZKJ3eYJwQvJZzYzFzKzYzFzK',  -- bcrypt hash of "96195851"
            'CHILD',
            'Bea',
            1,
            CURRENT_TIMESTAMP
        );