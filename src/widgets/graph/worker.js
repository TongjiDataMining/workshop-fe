import Graph from "graphology";
import {circular} from "graphology-layout";
import FA2, {inferSettings as FA2InferSettings} from "graphology-layout-forceatlas2";

console.log("worker.js executed")


self.onmessage = function (event) {
    const { inst, data } = event.data
    if (inst === "start") {
        console.log("Worker start")

        const graph = new Graph({
            multi: true
        })

        const node_name_map = {}
        const node_node_relation = {}
        const node_friends_map = {}

        data.forEach(([n1, n1_name, n2, n2_name]) => {
            node_name_map[n1] = n1_name
            node_name_map[n2] = n2_name
            if (!node_node_relation[n1]) {
                node_node_relation[n1] = [n2]
            } else {
                node_node_relation[n1].push(n2)
            }

            if (!node_friends_map[n1]) {
                node_friends_map[n1] = 1
            } else {
                node_friends_map[n1] += 1
            }

            if (!node_friends_map[n2]) {
                node_friends_map[n2] = 1
            } else {
                node_friends_map[n2] += 1
            }
        })

        Object.keys(node_name_map).forEach((key) => {
            graph.addNode(key, {
                label: node_name_map[key],
                size: 4 + node_friends_map[key] * 0.5
            })
        })

        Object.keys(node_node_relation).forEach((key) => {
            node_node_relation[key].forEach((v) => {
                graph.addEdge(key, v, {weight: 1})
            })
        })

        const COLOR = "rgb(165, 171, 182)"
        graph.forEachNode((node, attributes) => {
            graph.setNodeAttribute(node, "color", COLOR)
        })

        circular.assign(graph)
        const settings = FA2InferSettings(graph)
        FA2.assign(graph, {settings, iterations: 100})

        let serialized = graph.export()

        console.log("Worker finish", graph)
        self.postMessage({msg:"finish", data: serialized})
    }
}

