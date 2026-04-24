import type { WorkflowNode, SimulationStep, WorkflowNodeType } from '../types/workflow.types';
import {
  executeStartNode,
  executeTaskNode,
  executeApprovalNode,
  executeAutomatedNode,
  executeEndNode,
} from './executors';
import React from 'react';

// ─── Registry Types ────────────────────────────────────────────────

export interface NodeRegistryEntry {
  type: WorkflowNodeType;
  label: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  description: string;
  executor: (node: WorkflowNode) => Promise<SimulationStep>;
  formComponent?: React.LazyExoticComponent<React.ComponentType<any>>;
}

export type NodeRegistryMap = Record<WorkflowNodeType, NodeRegistryEntry>;

// ─── Lazy-loaded form components ───────────────────────────────────

const StartNodeForm = React.lazy(() => import('../../src/components/forms/StartNodeForm'));
const TaskNodeForm = React.lazy(() => import('../../src/components/forms/TaskNodeForm'));
const ApprovalNodeForm = React.lazy(() => import('../../src/components/forms/ApprovalNodeForm'));
const AutomatedNodeForm = React.lazy(() => import('../../src/components/forms/AutomatedNodeForm'));
const EndNodeForm = React.lazy(() => import('../../src/components/forms/EndNodeForm'));

// ─── Registry ──────────────────────────────────────────────────────

export const nodeRegistry: NodeRegistryMap = {
  startNode: {
    type: 'startNode',
    label: 'Start',
    icon: 'play_circle',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    description: 'Initiates the workflow process based on triggers.',
    executor: executeStartNode,
    formComponent: StartNodeForm,
  },
  taskNode: {
    type: 'taskNode',
    label: 'Task',
    icon: 'task',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    description: 'A manual action required from a specific user.',
    executor: executeTaskNode,
    formComponent: TaskNodeForm,
  },
  approvalNode: {
    type: 'approvalNode',
    label: 'Approval',
    icon: 'fact_check',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    description: 'Conditional branch requiring review and sign-off.',
    executor: executeApprovalNode,
    formComponent: ApprovalNodeForm,
  },
  automatedNode: {
    type: 'automatedNode',
    label: 'Automated Step',
    icon: 'auto_mode',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    description: 'Execute scripts or API calls without intervention.',
    executor: executeAutomatedNode,
    formComponent: AutomatedNodeForm,
  },
  endNode: {
    type: 'endNode',
    label: 'End',
    icon: 'stop_circle',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    description: 'Finalizes the logic flow and archives the instance.',
    executor: executeEndNode,
    formComponent: EndNodeForm,
  },
};

export const getNodeTypes = (): WorkflowNodeType[] =>
  Object.keys(nodeRegistry) as WorkflowNodeType[];
