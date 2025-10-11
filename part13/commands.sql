CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Pepe', 'http://pepe-blog.com', 'El dia de pepe');

insert into blogs (author, url, title) values ('Martin Fowler', 'http://martinfowler.com', 'Software Architecture Guide');
