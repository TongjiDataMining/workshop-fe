import {Card, Input, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {useEffect, useMemo, useState} from "react";
import {SparklesIcon} from "@heroicons/react/20/solid/index.js";

export function SingleSubject({subject}) {
    const [triples, setTriples] = useState([])

    const handleClick = () => {
        fetch(`/api/triplets?subject=${subject}`)
            .then((res) => {
                res.json().then((resp) => {
                    setTriples(resp["data"])
                })
            })
    }

    return (
        <Popover
            animate={{
                mount: {scale: 1, y: 0},
                unmount: {scale: 0, y: 25},
            }}
        >
            <PopoverHandler onClick={handleClick}>
                <Card className="p-5 hover:scale-105 duration-200 hover:cursor-pointer">
                    {subject}
                </Card>
            </PopoverHandler>
            <PopoverContent className="z-50">
                <div className="flex flex-col gap-2 font-bold">
                    {
                        triples.map((v, i) => (
                            <p key={i}>
                                {v[0]}-{v[1]}-{v[2]}
                            </p>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}

export function Subjects() {
    const [subjectList, setSubjectList] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("/api/subjects")
            .then((resp) => {
                resp.json().then(res => {
                    setSubjectList(res.data)
                })
            })
    }, []);

    const actualSubjectList = useMemo(() => {
        if (search !== "") {
            return subjectList.filter((v) => {
                return v.match(search) != null
            })
        } else {
            return subjectList
        }
    }, [subjectList, search])

    return (
        <div className="py-5 flex flex-col gap-3 relative">
            <Card className="p-4">
                <Input label="搜索" variant="standard" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </Card>
            <div className="flex flex-wrap gap-3">
                {
                    actualSubjectList.map((subject, index) => (
                        <SingleSubject subject={subject} key={index}/>
                    ))
                }
            </div>
            <div className="sticky bottom-8 left-2">
                <Card className="p-3 w-[360px] bg-white border border-black/10 flex flex-row gap-2">
                    <SparklesIcon className="w-5"/>
                    <span>点击主题可以查看与之关联的三元组</span>
                </Card>
            </div>
        </div>
    )
}

export default Subjects;
