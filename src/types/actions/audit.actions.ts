import { auditProperty } from "types/models/audit";

export const AUDIT_PROPERTY = 'AUDIT_PROPERTY';
export const AUDIT_TAG = 'AUDIT_TAG';
export const AUDIT_CONTEXT = 'AUDIT_CONTEXT';
export const AUDIT_CLEAR = 'AUDIT_CLEAR';


export interface AUDIT_ACTION {
    type: typeof AUDIT_PROPERTY;
    audit: auditProperty | null;
  }
