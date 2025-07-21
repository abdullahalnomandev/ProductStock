/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  }
);

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getCategories();
    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve categories',
    });
  }
};
