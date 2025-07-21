import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0, 'Price cannot be negative'),
    discount: z
      .number()
      .min(0, 'Discount cannot be negative')
      .max(100, 'Discount cannot exceed 100')
      .optional(),
    image: z
      .string({
        required_error: 'Image URL is required',
      })
      .url('Invalid image URL'),
    status: z.enum(['in_stock', 'out_of_stock']).default('in_stock').optional(),
    productCode: z
      .string({
        required_error: 'Product code is required',
      })
      .optional(),
    category: z.string({
      required_error: 'Category ID is required',
    }),
  }),
});

const updateProductZodSchema = z.object({
  body: z
    .object({
      description: z.string().optional(),
      discount: z
        .number()
        .min(0, 'Discount cannot be negative')
        .max(100, 'Discount cannot exceed 100')
        .optional(),
      status: z.enum(['in_stock', 'out_of_stock']).optional(),
      category: z.string().optional(),
      productCode: z.string().optional(),
    })
    .partial(),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
