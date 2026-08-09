CREATE TABLE "agent_settings" (
	"id" serial PRIMARY KEY,
	"agent_name" text DEFAULT 'Ana' NOT NULL,
	"active" integer DEFAULT 1 NOT NULL,
	"tone" text DEFAULT 'consultivo' NOT NULL,
	"model" text DEFAULT 'claude-haiku-4-5' NOT NULL,
	"greeting" text DEFAULT 'Olá! Sou a Ana, consultora virtual da 87 Serviços e Soluções. Me conte o que você precisa que eu já indico a melhor solução.' NOT NULL,
	"goal" text DEFAULT 'agendar uma avaliação técnica gratuita com um consultor' NOT NULL,
	"offer" text,
	"instructions" text,
	"paused_message" text DEFAULT 'Nosso atendimento automático está temporariamente pausado. Fale agora com um consultor pelo WhatsApp (41) 99981-8412.' NOT NULL,
	"capture_leads" integer DEFAULT 1 NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY,
	"session_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sales_scripts" (
	"id" serial PRIMARY KEY,
	"lead_id" integer,
	"goal" text DEFAULT 'fechar-venda' NOT NULL,
	"contact_name" text,
	"phone" text,
	"business_type" text,
	"service_interest" text,
	"notes" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "sales_scripts" ADD CONSTRAINT "sales_scripts_lead_id_leads_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id");
--> statement-breakpoint
INSERT INTO "agent_settings" ("id") VALUES (1) ON CONFLICT DO NOTHING;
--> statement-breakpoint
SELECT setval(pg_get_serial_sequence('agent_settings', 'id'), 1);