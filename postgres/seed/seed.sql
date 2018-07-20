BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Test', 'test@gmail.com', 5, '2018-05-23', 'dog', '43');
INSERT into login (hash, email) values ('$2a$10$/zvmaJVVKduE6dDWoVHBOOrtJlohf9ap7hEXmJWdTKon0sCu9CfN.', 'test@gmail.com');

COMMIT;