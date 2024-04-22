import {Button, Card, CardBody, CardFooter, CardHeader, Textarea, Typography} from "@material-tailwind/react";
import React from "react";

export function AddArticle() {
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
                        添加新文章
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Textarea label="文章内容" className="h-80"/>
                </CardBody>
                <CardFooter className="pt-0 mt-0">
                    <Button>提交</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AddArticle