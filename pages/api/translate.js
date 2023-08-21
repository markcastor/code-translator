// Import the OpenAIStream function from the '@/utils' file
import { OpenAIStream } from '@/utils';

// Define the configuration for the serverless function
export const config = {
  runtime: 'edge',
};

// Define the main function for the serverless function
export default async function handler(req, res) {
  try {
    console.log('Request received:', req.method, req.url);

    // Parse incoming request data as JSON
    const { inputLanguage, outputLanguage, inputCode } = await req.json();
    
    console.log('Request data:', { inputLanguage, outputLanguage, inputCode });

    // Call the OpenAIStream function with input parameters
    const stream = await OpenAIStream(
      inputLanguage,
      outputLanguage,
      inputCode
    );

    console.log('OpenAIStream response:', stream);

    // Return the response from the OpenAIStream function
    return new Response(stream);
  } catch (error) {
    console.error('Error:', error.message);
    
    // Catch errors and return an error message
    res.status(500).send('Error');
  }
}
