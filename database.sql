CREATE TABLE "list" (
	"id" serial primary key,
	"task_name" varchar(120) not null,
	"description" varchar(500),
	"time_added" timestamp with time zone,
	"due_date" timestamp with time zone,
	"completed" boolean,
	"time_completed" timestamp with time zone,
	"custom_sort_id" int
);

INSERT INTO "list" ("id", "task_name", "description", "completed", "custom_sort_id")
VALUES ('1000', 'Make to do list app', 'complete the to do list app, make regular commits as I go, and deploy if able', 'false', '1000');

SELECT * FROM "list";

DROP TABLE "list";
