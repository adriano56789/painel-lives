// This is a server-side file.
'use server';

/**
 * @fileOverview Generates stream titles and descriptions based on the content detected in the stream.
 *
 * - generateStreamDescriptions - A function that generates stream titles and descriptions.
 * - GenerateStreamDescriptionsInput - The input type for the generateStreamDescriptions function.
 * - GenerateStreamDescriptionsOutput - The return type for the generateStreamDescriptions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateStreamDescriptionsInputSchema = z.object({
  streamContent: z.string().describe('The content of the stream, including game titles, activities, and topics discussed.'),
});
export type GenerateStreamDescriptionsInput = z.infer<typeof GenerateStreamDescriptionsInputSchema>;

const GenerateStreamDescriptionsOutputSchema = z.object({
  title: z.string().describe('A suggested title for the stream.'),
  description: z.string().describe('A suggested description for the stream.'),
});
export type GenerateStreamDescriptionsOutput = z.infer<typeof GenerateStreamDescriptionsOutputSchema>;

export async function generateStreamDescriptions(input: GenerateStreamDescriptionsInput): Promise<GenerateStreamDescriptionsOutput> {
  return generateStreamDescriptionsFlow(input);
}

const generateStreamDescriptionsPrompt = ai.definePrompt({
  name: 'generateStreamDescriptionsPrompt',
  input: {
    schema: z.object({
      streamContent: z.string().describe('The content of the stream, including game titles, activities, and topics discussed.'),
    }),
  },
  output: {
    schema: z.object({
      title: z.string().describe('A suggested title for the stream.'),
      description: z.string().describe('A suggested description for the stream.'),
    }),
  },
  prompt: `You are an AI assistant that generates engaging and informative stream titles and descriptions based on the stream content.

  Stream Content: {{{streamContent}}}

  Generate a title and description that accurately reflect the stream content and would attract viewers.
`,
});

const generateStreamDescriptionsFlow = ai.defineFlow<
  typeof GenerateStreamDescriptionsInputSchema,
  typeof GenerateStreamDescriptionsOutputSchema
>({
  name: 'generateStreamDescriptionsFlow',
  inputSchema: GenerateStreamDescriptionsInputSchema,
  outputSchema: GenerateStreamDescriptionsOutputSchema,
}, async input => {
  const {output} = await generateStreamDescriptionsPrompt(input);
  return output!;
});
