CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (email, user_name, password, role) VALUES
('admin@gmail.com', 'Pavan sai', uuid(), 'admin');

CREATE TABLE sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    sub_section_name VARCHAR(100) NULL,
    is_visible BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO sections (section_name, sub_section_name, is_visible, display_order) VALUES
('Hero', NULL, true, 1),
('Featured Products', NULL, true, 2),
('Why Choose us', NULL, true, 3),
('Testimonials', 'sub section name', true, 4),
('Footer', NULL, true, 5);

CREATE TABLE section_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT,
    title TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

const abc = {
    "section_name": "Hero",
    "sub_section_name": null,
    "is_visible": true,
    "display_order": 1,
    "content": [
        {
            "title": "Welcome to Our Platform",
            "description": "Discover amazing products and services that transform your business"
        },
        {
            "title": "Get Started Today",
            "description": "Join thousands of satisfied customers"
        }
    ]
}

INSERT INTO section_content (section_id, title, description) VALUES
(1, 'Welcome to Our Platform', 'Discover amazing products and services that transform your business'),
(1, 'Get Started Today', 'Join thousands of satisfied customers'),

(2, 'Easy Integration', 'Seamlessly integrate with your existing systems', DEFAULT, DEFAULT),
(2, '24/7 Support', 'Round-the-clock customer support for your needs', DEFAULT, DEFAULT),
(2, 'Secure Platform', 'Enterprise-grade security for your peace of mind', DEFAULT, DEFAULT),

(3, 'Our Story', 'Leading innovation since 2010 with cutting-edge solutions', DEFAULT, DEFAULT),
(3, '10+ Years Experience', 'Serving clients worldwide with excellence', DEFAULT, DEFAULT),

(4, 'Consulting', 'Expert guidance for your business growth', DEFAULT, DEFAULT),
(4, 'Development', 'Custom software solutions for your needs', DEFAULT, DEFAULT),
(4, 'Marketing', 'Strategic digital marketing services', DEFAULT, DEFAULT);

CREATE TABLE social_media_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    platform_name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

INSERT INTO social_media_links (section_id, platform_name, url) VALUES
(5, 'Facebook', 'https://facebook.com/yourpage'),
(5, 'Twitter', 'https://twitter.com/yourpage'),
(5, 'LinkedIn', 'https://linkedin.com/in/yourpage');

CREATE TABLE contact_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    contact_type VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

INSERT INTO contact_details (section_id, contact_type, value) VALUES
(5, 'Phone', '+1-800-555-1234'),
(5, 'Email', 'info@yourwebsite.com'),
(5, 'Address', '123 Main Street, Cityville, Country');

CREATE TABLE newsletter_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);
