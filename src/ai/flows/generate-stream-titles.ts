'use server';
/**
 * @fileOverview An AI agent that suggests stream titles based on the content being streamed.
 *
 * - generateStreamTitles - A function that generates stream titles.
 * - GenerateStreamTitlesInput - The input type for the generateStreamTitles function.
 * - GenerateStreamTitlesOutput - The return type for the generateStreamTitles function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateStreamTitlesInputSchema = z.object({
  streamContentDescription: z.string().describe('A detailed description of the content being streamed, including the game being played, activities, and any current events or discussions.'),
});
export type GenerateStreamTitlesInput = z.infer<typeof GenerateStreamTitlesInputSchema>;

const GenerateStreamTitlesOutputSchema = z.object({
  suggestedTitles: z.array(
    z.string().describe('A list of suggested stream titles that are engaging and relevant to the stream content.')
  ).describe('A list of engaging stream titles.'),
  suggestedDescription: z.string().describe('A suggested stream description to further entice viewers.'),
});
export type GenerateStreamTitlesOutput = z.infer<typeof GenerateStreamTitlesOutputSchema>;

export async function generateStreamTitles(input: GenerateStreamTitlesInput): Promise<GenerateStreamTitlesOutput> {
  return generateStreamTitlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStreamTitlesPrompt',
  input: {
    schema: z.object({
      streamContentDescription: z.string().describe('A detailed description of the content being streamed.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedTitles: z.array(
        z.string().describe('A list of suggested stream titles.')
      ).describe('A list of engaging stream titles.'),
      suggestedDescription: z.string().describe('A suggested stream description to further entice viewers.'),
    }),
  },
  prompt: `You are an expert in creating engaging stream titles and descriptions. Based on the content of the stream, suggest a list of titles and a description that will attract viewers.

Content Description: {{{streamContentDescription}}}

Titles:`, // TODO: Ensure output includes the right format
});

const generateStreamTitlesFlow = ai.defineFlow<
  typeof GenerateStreamTitlesInputSchema,
  typeof GenerateStreamTitlesOutputSchema
>({
  name: 'generateStreamTitlesFlow',
  inputSchema: GenerateStreamTitlesInputSchema,
  outputSchema: GenerateStreamTitlesOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
