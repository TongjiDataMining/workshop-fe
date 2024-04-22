import {Alert, Button, Card, CardBody, CardFooter, CardHeader, Textarea, Typography} from "@material-tailwind/react";
import React, {useState} from "react";

export function AddArticle() {
    const [content, setContent] = useState("")

    const [openSuccess, setOpenSuccess] = useState(false)

    const handleSubmit = () => {
        let url_q = new URLSearchParams()
        url_q.set("text", content)
        let url = new URL(document.URL)
        url.pathname = "/api/articles"
        url.search = url_q.toString()
        fetch(url, {
            method: "POST",
        }).then(()=>{
            setOpenSuccess(true)
            setTimeout(()=>{
                setOpenSuccess(false)
            }, 3000)
        })
    }

    return (
        <div className="my-5">
            <Card>
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="m-0 px-4 pt-4"
                >
                    <Typography variant="h5" color="blue-gray">
                        导入文章
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Textarea label="文章内容" className="h-[60vh]"
                              value={content} onChange={e => setContent(e.target.value)}
                    />
                </CardBody>
                <CardFooter className="pt-0 mt-0">
                    <Button onClick={handleSubmit}>提交</Button>
                </CardFooter>
            </Card>
            {
                open && (
                    <div className="fixed w-[400px] right-2 top-4">
                        <Alert
                            open={openSuccess}
                            onClose={()=>setOpenSuccess(false)}
                            animate={{
                                mount: {x: 0},
                                unmount: {x: 100},
                            }}>
                            插入成功
                        </Alert>
                    </div>
                )
            }
        </div>
    )
}

export default AddArticle
