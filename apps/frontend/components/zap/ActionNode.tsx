import { memo, useCallback } from "react";
 
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "./base-node";

import { useNodeId, useReactFlow } from "@xyflow/react";
import { EllipsisVertical, Rocket, Trash, Zap } from "lucide-react";

export const TriggerNode = memo(({ data }: { data?: { label?: string } }) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  return (
    <BaseNode hasTopHandle={false} hasBottomHandle={true}>
      <BaseNodeHeader className="border-b">
        <Zap className="size-4 text-amber-500 fill-amber-500" />
        <BaseNodeHeaderTitle>{data?.label || "1. Trigger"}</BaseNodeHeaderTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="nodrag p-1 hover:bg-slate-200"
              aria-label="Node Actions"
              title="Node Actions"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Trigger Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
              Delete Node
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          className="nodrag p-1 hover:bg-slate-200"
          onClick={handleDelete}
          aria-label="Delete Node"
          title="Delete Node"
        >
          <Trash className="size-4 text-slate-500" />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent>
        <p>Select an event that starts your Zap.</p>
      </BaseNodeContent>
    </BaseNode>
  );
});

TriggerNode.displayName = "TriggerNode";

export const ActionNode = memo(({ data }: { data?: { label?: string } }) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  return (
    <BaseNode hasTopHandle={true} hasBottomHandle={true}>
      <BaseNodeHeader className="border-b">
        <Rocket className="size-4 text-blue-500" />
        <BaseNodeHeaderTitle>{data?.label || "2. Action"}</BaseNodeHeaderTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="nodrag p-1 hover:bg-slate-200"
              aria-label="Node Actions"
              title="Node Actions"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
              Delete Node
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          className="nodrag p-1 hover:bg-slate-200"
          onClick={handleDelete}
          aria-label="Delete Node"
          title="Delete Node"
        >
          <Trash className="size-4 text-slate-500" />
        </Button>
      </BaseNodeHeader>
      <BaseNodeContent>
        <p>Select an action to perform.</p>
      </BaseNodeContent>
    </BaseNode>
  );
});

ActionNode.displayName = "ActionNode";

export const ActionBarNodeDemo = ActionNode;