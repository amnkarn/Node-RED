"use client"
import '@xyflow/react/dist/style.css';
import Sidebar from "@/components/Sidebar";
import { useState, useCallback, useMemo } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, BackgroundVariant } from '@xyflow/react';
import { TriggerNode, ActionNode } from "@/components/zap/ActionNode";

export default function CreateZap() {
    return (
        <Sidebar state="collapsed">
            <div className="w-full h-full bg-[#F9F7F3]">
                <Flow />
            </div>
        </Sidebar>
    )
}

function Flow() {
    const nodeTypes = useMemo(() => ({
        trigger: TriggerNode,
        action: ActionNode,
    }), []);

    const initialNodes = [
        //demo nodes
        { id: 'n1', type: 'trigger', position: { x: 250, y: 100 }, data: { label: '1. Trigger' } },
        { id: 'n2', type: 'action', position: { x: 250, y: 250 }, data: { label: '2. Action' } },
    ];
    const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2', animated: true }];

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
    const onEdgesChange = useCallback((changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
    const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background variant={BackgroundVariant.Dots} color="#e0deda" gap={24} size={1.5} />
            </ReactFlow>
        </div>
    )
}