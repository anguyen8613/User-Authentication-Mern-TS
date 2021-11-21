import Customer from '../models/customerModel';
import { Request, Response } from 'express';

const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;
    //user is the id added by the auth middleware
    const newCustomer = new Customer({ name: name, createdBy: userId });

    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCustomer = async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;
    //user is the id added by the auth middleware
    const newCustomer = new Customer({ name: name, createdBy: userId });

    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const controller = { createCustomer, getCustomer };

export default controller;
