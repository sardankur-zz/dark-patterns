===============================

INSERT INTO "Questions" ("title", "questionnaireId", "createdAt", "updatedAt")
VALUES ('Q2', 1, now(), now());

INSERT INTO "Questions" ("title", "questionnaireId", "createdAt", "updatedAt")
VALUES ('Q3', 1, now(), now());

INSERT INTO "Questions" ("title", "questionnaireId", "createdAt", "updatedAt")
VALUES ('Q4', 1, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('YES', 2, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('NO', 2, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('YES', 3, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('NO', 3, now(), now()); 

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('YES', 4, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('NO', 4, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('YES', 5, now(), now());

INSERT INTO "Options" ("title", "questionId", "createdAt", "updatedAt") 
VALUES ('NO', 5, now(), now());

=====================================

UPDATE "Options"
SET "type"='radio'
WHERE id=5;

UPDATE "Options"
SET "type"='radio'
WHERE id=6;

UPDATE "Options"
SET "type"='button'
WHERE id=7;

UPDATE "Options"
SET "type"='button'
WHERE id=8;

UPDATE "Options"
SET "type"='button'
WHERE id=9;

UPDATE "Options"
SET "type"='button'
WHERE id=10;

UPDATE "Questions"
SET "type"='button'
WHERE id IN (;




UPDATE "Questions"
SET "type"='radio' where id IN (9,11);

