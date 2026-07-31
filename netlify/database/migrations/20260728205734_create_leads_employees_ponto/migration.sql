CREATE TABLE "employees" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"pin" text NOT NULL UNIQUE,
	"active" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"company" text,
	"service" text,
	"message" text NOT NULL,
	"source" text DEFAULT 'site' NOT NULL,
	"status" text DEFAULT 'novo' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "time_clock_entries" (
	"id" serial PRIMARY KEY,
	"employee_id" integer NOT NULL,
	"type" text NOT NULL,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "time_clock_entries" ADD CONSTRAINT "time_clock_entries_employee_id_employees_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id");
--> statement-breakpoint
INSERT INTO "employees" ("name", "role", "pin", "active") VALUES
	('João Silva', 'Segurança Patrimonial', '1001', 1),
	('Maria Oliveira', 'Limpeza e Conservação', '1002', 1),
	('Carlos Mendes', 'Paisagismo e Jardinagem', '1003', 1),
	('Ana Souza', 'Facilities Management', '1004', 1);