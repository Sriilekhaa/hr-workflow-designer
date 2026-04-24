-- ═══════════════════════════════════════════════════════════════════
-- HR Workflow Designer — Supabase Schema
-- Run this in the Supabase SQL Editor to create all required tables
-- ═══════════════════════════════════════════════════════════════════

-- 1. Workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived', 'error')),
  node_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Workflow nodes table
CREATE TABLE IF NOT EXISTS workflow_nodes (
  id TEXT NOT NULL,
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('startNode', 'taskNode', 'approvalNode', 'automatedNode', 'endNode')),
  position_x FLOAT NOT NULL DEFAULT 0,
  position_y FLOAT NOT NULL DEFAULT 0,
  data JSONB NOT NULL DEFAULT '{}',
  PRIMARY KEY (id, workflow_id)
);

-- 3. Workflow edges table
CREATE TABLE IF NOT EXISTS workflow_edges (
  id TEXT NOT NULL,
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  target TEXT NOT NULL,
  PRIMARY KEY (id, workflow_id)
);

-- 4. Automations (available actions for Automated nodes)
CREATE TABLE IF NOT EXISTS automations (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT 'bolt',
  icon_color TEXT DEFAULT 'text-violet-400',
  icon_bg TEXT DEFAULT 'bg-violet-500/10',
  params TEXT[] NOT NULL DEFAULT '{}'
);

-- 5. Simulation logs / Execution logs
CREATE TABLE IF NOT EXISTS simulation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  workflow_name TEXT DEFAULT '',
  steps JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('success', 'error', 'pending', 'running')),
  duration_ms INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Activity log (for dashboard timeline)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  description TEXT DEFAULT '',
  actor TEXT DEFAULT 'System',
  icon TEXT DEFAULT 'info',
  icon_color TEXT DEFAULT 'text-violet-400',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════════════

-- ─── Automations ───────────────────────────────────────────────────

INSERT INTO automations (id, label, description, icon, icon_color, icon_bg, params) VALUES
  ('send_email',    'Send Email',           'Automated outreach via SMTP or internal mailer.',           'mail',         'text-blue-400',   'bg-blue-500/10',   ARRAY['to', 'subject', 'template_key']),
  ('generate_doc',  'Generate Document',    'Create dynamic PDF/Docx from employee data.',               'description',  'text-amber-400',  'bg-amber-500/10',  ARRAY['template', 'recipient', 'doc_type']),
  ('slack_notify',  'Slack Notification',   'Notify channels about workflow status changes.',             'chat',         'text-pink-400',   'bg-pink-500/10',   ARRAY['channel', 'message', 'webhook_url']),
  ('create_ticket', 'Create Ticket',        'Create a ticket in the issue tracking system.',              'confirmation_number', 'text-indigo-400', 'bg-indigo-500/10', ARRAY['title', 'priority', 'assignee']),
  ('update_record', 'Update Record',        'Direct mutations to the HCM database records.',             'database',     'text-indigo-400', 'bg-indigo-500/10', ARRAY['entry_uuid', 'patch_set']),
  ('ad_sync',       'AD Profile Sync',      'Synchronize employee profiles with Active Directory.',      'sync',         'text-cyan-400',   'bg-cyan-500/10',   ARRAY['user_id', 'attributes']),
  ('calendar_sync', 'Calendar Sync',        'Sync leave/absence data with calendar systems.',            'calendar_month','text-emerald-400','bg-emerald-500/10',ARRAY['employee_id', 'event_type', 'date_range']),
  ('webhook_call',  'Webhook Call',         'Fire an HTTP webhook to an external service.',               'webhook',      'text-orange-400', 'bg-orange-500/10', ARRAY['url', 'method', 'payload'])
ON CONFLICT (id) DO NOTHING;

-- ─── Workflows ─────────────────────────────────────────────────────

INSERT INTO workflows (id, name, description, status, node_count, created_at, updated_at) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Employee Onboarding Flow',     'Complete multi-stage onboarding including document signing, account provisioning, and welcome sequences.', 'active',   6, NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 minutes'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Performance Review Pipeline',  'Annual review cycle with self-assessment, peer review, and manager evaluation stages.',                  'draft',    4, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'PTO Approval Logic',           'Leave request routing through manager approval, HR verification, and calendar sync.',                     'active',   5, NOW() - INTERVAL '60 days', NOW() - INTERVAL '14 hours'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'ID Card Auto-Issue',           'Automated ID card generation and dispatch for new employees.',                                            'error',    3, NOW() - INTERVAL '90 days', NOW() - INTERVAL '2 days'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Benefits Enrollment',          'Annual benefits selection workflow with eligibility checks and confirmation.',                             'active',   7, NOW() - INTERVAL '45 days', NOW() - INTERVAL '30 minutes'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Contract Generation',          'Auto-generate employment contracts from templates with digital signature flow.',                           'active',   4, NOW() - INTERVAL '20 days', NOW() - INTERVAL '1 hour'),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Offboarding Exit Interview',   'Exit interview scheduling, equipment return tracking, and access revocation.',                            'draft',    5, NOW() - INTERVAL '7 days',  NOW() - INTERVAL '6 hours'),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Payroll Verification',         'Monthly payroll data validation with multi-level approval chain.',                                         'active',   6, NOW() - INTERVAL '120 days',NOW() - INTERVAL '5 minutes'),
  ('a1b2c3d4-0009-4000-8000-000000000009', 'Training Compliance Tracker',  'Track mandatory training completion and send reminders for overdue courses.',                              'active',   4, NOW() - INTERVAL '50 days', NOW() - INTERVAL '3 hours'),
  ('a1b2c3d4-0010-4000-8000-000000000010', 'Background Check Pipeline',    'Automated background verification with third-party API integration.',                                     'archived', 5, NOW() - INTERVAL '180 days',NOW() - INTERVAL '90 days')
ON CONFLICT (id) DO NOTHING;

-- ─── Simulation / Execution Logs ───────────────────────────────────

INSERT INTO simulation_logs (workflow_id, workflow_name, steps, status, duration_ms, created_at) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Employee Onboarding Flow',
   '[{"nodeId":"s1","step":"Start: New Hire Entry","status":"success","message":"Workflow initialized.","timestamp":1700000001},{"nodeId":"t1","step":"Task: Document Collection","status":"success","message":"Assigned to hr.team@company.com","timestamp":1700000002},{"nodeId":"a1","step":"Approval: Manager Sign-off","status":"success","message":"Approved by Manager.","timestamp":1700000003},{"nodeId":"au1","step":"Automated: Send Email","status":"success","message":"Welcome email sent.","timestamp":1700000004},{"nodeId":"e1","step":"End: Onboarding Complete","status":"success","message":"Workflow finalized with summary.","timestamp":1700000005}]',
   'success', 1200, NOW() - INTERVAL '2 minutes'),

  ('a1b2c3d4-0008-4000-8000-000000000008', 'Payroll Verification',
   '[{"nodeId":"s1","step":"Start: Payroll Cycle","status":"success","message":"Workflow initialized.","timestamp":1700000010},{"nodeId":"t1","step":"Task: Data Validation","status":"running","message":"Validating payroll records...","timestamp":1700000011}]',
   'running', 0, NOW() - INTERVAL '5 minutes'),

  ('a1b2c3d4-0004-4000-8000-000000000004', 'ID Card Auto-Issue',
   '[{"nodeId":"s1","step":"Start: Fetch Employee Data","status":"success","message":"Workflow initialized.","timestamp":1700000020},{"nodeId":"au1","step":"Automated: AD Profile Sync","status":"success","message":"Profile synced.","timestamp":1700000021},{"nodeId":"au2","step":"Automated: Generate ID Card","status":"error","message":"Error: Template service unavailable (HTTP 503).","timestamp":1700000022}]',
   'error', 4500, NOW() - INTERVAL '2 days'),

  ('a1b2c3d4-0005-4000-8000-000000000005', 'Benefits Enrollment',
   '[{"nodeId":"s1","step":"Start: Open Enrollment","status":"success","message":"Workflow initialized.","timestamp":1700000030},{"nodeId":"t1","step":"Task: Eligibility Check","status":"success","message":"Employee eligible.","timestamp":1700000031},{"nodeId":"a1","step":"Approval: HR Review","status":"success","message":"Approved by HR Admin.","timestamp":1700000032},{"nodeId":"e1","step":"End: Enrollment Confirmed","status":"success","message":"Workflow finalized.","timestamp":1700000033}]',
   'success', 800, NOW() - INTERVAL '30 minutes'),

  ('a1b2c3d4-0006-4000-8000-000000000006', 'Contract Generation',
   '[{"nodeId":"s1","step":"Start: Contract Request","status":"success","message":"Workflow initialized.","timestamp":1700000040},{"nodeId":"au1","step":"Automated: Generate Document","status":"success","message":"Contract PDF generated.","timestamp":1700000041},{"nodeId":"au2","step":"Automated: Send Email","status":"success","message":"Contract sent to employee.","timestamp":1700000042},{"nodeId":"e1","step":"End: Contract Issued","status":"success","message":"Workflow finalized.","timestamp":1700000043}]',
   'success', 2400, NOW() - INTERVAL '1 hour'),

  ('a1b2c3d4-0001-4000-8000-000000000001', 'Employee Onboarding Flow',
   '[{"nodeId":"s1","step":"Start: New Hire Entry","status":"success","message":"Workflow initialized.","timestamp":1700000050},{"nodeId":"t1","step":"Task: Document Collection","status":"success","message":"Completed.","timestamp":1700000051},{"nodeId":"a1","step":"Approval: Manager Sign-off","status":"success","message":"Approved.","timestamp":1700000052},{"nodeId":"e1","step":"End: Complete","status":"success","message":"Finalized.","timestamp":1700000053}]',
   'success', 1100, NOW() - INTERVAL '3 hours'),

  ('a1b2c3d4-0003-4000-8000-000000000003', 'PTO Approval Logic',
   '[{"nodeId":"s1","step":"Start: Leave Request","status":"success","message":"Workflow initialized.","timestamp":1700000060},{"nodeId":"a1","step":"Approval: Manager Review","status":"success","message":"Approved.","timestamp":1700000061},{"nodeId":"au1","step":"Automated: Calendar Sync","status":"success","message":"Calendar updated.","timestamp":1700000062},{"nodeId":"e1","step":"End: Leave Approved","status":"success","message":"Finalized.","timestamp":1700000063}]',
   'success', 950, NOW() - INTERVAL '14 hours'),

  ('a1b2c3d4-0009-4000-8000-000000000009', 'Training Compliance Tracker',
   '[{"nodeId":"s1","step":"Start: Compliance Check","status":"success","message":"Workflow initialized.","timestamp":1700000070},{"nodeId":"t1","step":"Task: Overdue Scan","status":"success","message":"Found 3 overdue.","timestamp":1700000071},{"nodeId":"au1","step":"Automated: Send Email","status":"success","message":"Reminders sent.","timestamp":1700000072},{"nodeId":"e1","step":"End: Scan Complete","status":"success","message":"Finalized.","timestamp":1700000073}]',
   'success', 600, NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;

-- ─── Activity Log ──────────────────────────────────────────────────

INSERT INTO activity_log (action, description, actor, icon, icon_color, created_at) VALUES
  ('Modified Workflow',     'Updated node "Slack_Invite_Trigger" in Employee Onboarding Flow',  'Alex Rivera',   'edit_note',     'text-violet-400',  NOW() - INTERVAL '12 minutes'),
  ('Approved Request',      'Auto-approved vacation request for EMP-0922',                       'Auto-system',   'check_circle',  'text-green-400',   NOW() - INTERVAL '1 hour'),
  ('Execution Warning',     'API Latency detected on Jira Integration connector',                'System Log',    'warning',       'text-amber-400',   NOW() - INTERVAL '3 hours'),
  ('Created Template',      'New template: "Offboarding Exit Interview"',                        'Sarah Chen',    'add_circle',    'text-violet-400',  NOW() - INTERVAL '6 hours'),
  ('Workflow Deployed',     'Benefits Enrollment flow promoted to production',                    'Marcus Chen',   'rocket_launch', 'text-emerald-400', NOW() - INTERVAL '8 hours'),
  ('Simulation Completed',  'Contract Generation simulation passed all checks',                  'Auto-system',   'verified',      'text-blue-400',    NOW() - INTERVAL '12 hours'),
  ('Error Resolved',        'Fixed API credentials for AD Profile Sync connector',               'James Wilson',  'build',         'text-orange-400',  NOW() - INTERVAL '1 day'),
  ('New Workflow Created',  'Background Check Pipeline created from template',                   'Sarah Chen',    'note_add',      'text-violet-400',  NOW() - INTERVAL '2 days')
ON CONFLICT DO NOTHING;

-- ─── Row-Level Security (enable for production) ────────────────────

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Allow anon/authenticated read/write for dev (restrict in prod)
CREATE POLICY "Allow all on workflows"      ON workflows      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on workflow_nodes"  ON workflow_nodes  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on workflow_edges"  ON workflow_edges  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on automations"     ON automations     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on simulation_logs" ON simulation_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on activity_log"    ON activity_log    FOR ALL USING (true) WITH CHECK (true);
