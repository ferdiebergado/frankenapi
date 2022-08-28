CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL CHECK (email <> '') UNIQUE,
    password VARCHAR(255) NOT NULL CHECK (password <> ''),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_users_timestamp BEFORE
UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp();