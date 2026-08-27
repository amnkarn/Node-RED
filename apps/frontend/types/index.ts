

interface ActionType {
  id: string;
  name: string;
  image?: string;
}

interface TriggerType {
  id: string;
  name: string;
  image?: string;
}

interface Action {
  id: string;
  zapId: string;
  actionId: string;
  sortingOrder: number;
  metadata?: any;
  type?: ActionType;
}

interface Trigger {
  id: string;
  zapId: string;
  triggerId: string;
  metadata?: any;
  type?: TriggerType;
}

export interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  trigger?: Trigger;
  actions: Action[];
}