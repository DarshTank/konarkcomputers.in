import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import type { AdminAuditEntry } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);

    let auditLogs: AdminAuditEntry[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('adminAudit').orderBy('timestamp.seconds', 'desc').limit(100).get();
        auditLogs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      }
    } catch {}

    return NextResponse.json({ auditLogs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
