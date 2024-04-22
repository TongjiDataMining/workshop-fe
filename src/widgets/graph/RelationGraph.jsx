import {memo, useEffect, useRef, useState} from "react";
import Sigma from "sigma";
import {Spinner, Typography} from "@material-tailwind/react";
import Graph from "graphology";

let last_data = []

export const RelationGraph = memo(({data}) => {
    const container = useRef(null)

    useEffect(()=>{
        last_data = []
    }, [])

    const sigma = () => {
        if (last_data.length === data.length) {
            return
        } else {
            last_data = data
        }

        const worker = new Worker(
            new URL('./worker', import.meta.url),
            {type: 'module'}
        );

        worker.onmessage = (event) => {
            const {msg, data} = event.data
            const graph = new Graph({multi: true})
            graph.import(data)
            if (msg === "finish") {
                setLoading(false)
                new Sigma(graph, container.current, {})
                worker.terminate()
            }
        }

        worker.postMessage({
            inst: "start",
            data
        })

        setLoading(true)
    }

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!data || data.length === 0) {
            return
        }
        sigma()
    }, [data]);

    return (
        <div ref={container} className="h-[80vh] w-full relative">
            {
                loading && (
                    <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
                        <Spinner className="w-16 h-16"/>
                        <Typography variant="h6" color="black">
                            请稍等，关系图正在渲染
                        </Typography>
                    </div>
                ) || (
                    <span className="text-gray-600 absolute bottom-0 right-0">
                        滑动滚轮可以缩放
                    </span>
                )
            }
        </div>
    )
})

export default RelationGraph;
