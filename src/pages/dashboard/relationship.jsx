import {Card, CardBody} from "@material-tailwind/react";
import {RelationGraph} from "@/widgets/graph/index.js";
import {useEffect, useState} from "react";

export function Relationship() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/api/relationships")
            .then((res)=>{
                res.json().then((resp)=>{
                    setData(resp["data"])
                })
            })
    }, []);

    return (
        <div className="my-5">
            <Card>
                <CardBody>
                    <RelationGraph data={data}/>
                </CardBody>
            </Card>
        </div>
    )
}

export default Relationship
