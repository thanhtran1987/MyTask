import type { NextApiRequest, NextApiResponse } from "next";

import Tasks, { ITask, TaskStatus } from "@/models/Tasks";
import connectDB from "@/app/lib/mongodb";
import { APIMethod } from "@/helper/data";
import { decrypt } from "@/app/lib/session";
export interface ResponseData {
  data: ITask[];
  count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const auth = (await decrypt(req.cookies.session)) || {};
  // enforce auth
  if (!auth.id) {
    return res.status(401).json({ data: [], count: 0 });
  }
  await connectDB();
  // handles save/post
  if (req.method === APIMethod.POST) {
    const { name, description } = req.body;
    const data: ITask = {
      name: name,
      description: description,
      ownerID: auth.id.toString(),
      status: TaskStatus.STATUS_PENDING,
    };
    const newTask = new Tasks(data);

    await newTask
      .save()
      .then(() => {
        return res.status(200).json({ data: [], count: 1 });
      })
      .catch(() => {
        return res.status(500).json({ data: [], count: 0 });
      });
  } else if (req.method === APIMethod.DELETE) {
    const { id } = req.body;
    await Tasks.deleteOne({ _id: id });
    return res.status(200).json({ data: [], count: 1 });
  } else if (req.method === APIMethod.PUT) {
    const { id, status, description, name } = req.body;

    const filter = { _id: id };
    const update: ITask = {};
    if (status) {
      update.status = status;
    }
    if (description) {
      update.description = description;
    }
    if (name) {
      update.name = name;
    }

    await Tasks.findOneAndUpdate(filter, update);

    return res.status(200).json({ data: [], count: 1 });
  } else {
    // defaults to get methods

    let data: ITask[] = [];

    await Tasks.find({
      ownerID: auth.id.toString(),
    }).then((docs: any) => {
      const result = docs.map((item: ITask) => {
        item.id = item._id;
        return item;
      });
      return res.status(200).json({ data: result, count: data.length });
    });
  }
}