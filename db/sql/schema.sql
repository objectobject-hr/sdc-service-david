CREATE TABLE IF NOT EXISTS zip (
  zipcode varchar(255),
  ListingId int
);

CREATE TABLE IF NOT EXISTS review (
  rating INT not NULL,
  dateS date,
  title varchar(255) not null,
  review varchar(255) not null,
  dateP date,
  author varchar(255) not null,
  aLocation varchar(255),
  ownerR varchar(255),
  ListingId INT not Null
);

