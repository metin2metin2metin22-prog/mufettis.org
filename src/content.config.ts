import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    focus_keyword: z.string().optional(),
    is_quiz: z.boolean().default(false)
  })
});

const examsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './src/content/exams' }),
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    questions: z.array(z.any()).optional()
  })
});

export const collections = {
  posts: postsCollection,
  exams: examsCollection
};
