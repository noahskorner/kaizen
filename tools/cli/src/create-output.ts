import fs, { mkdirSync } from 'fs';
import path from 'path';
import { CreateFileChatCompletion } from './create-file-chat-completion';
import { toFile } from './to-file';

export const createOutput = (
  requestId: string,
  responses: CreateFileChatCompletion[]
) => {
  // Create the necessary directories
  if (!fs.existsSync(path.resolve(__dirname, 'output'))) {
    mkdirSync(path.resolve(__dirname, 'output'));
  }
  mkdirSync(path.resolve(__dirname, `output/${requestId}`));
  const responseDir = path.resolve(__dirname, `output/${requestId}/responses`);
  mkdirSync(responseDir);
  const codeDir = path.resolve(__dirname, `output/${requestId}/code`);
  mkdirSync(codeDir);

  responses.forEach((response) => {
    // Create the unique response directory
    const uniqueResponseDir = path.resolve(responseDir, response.name);
    mkdirSync(uniqueResponseDir);

    // Log the input and output
    fs.writeFileSync(
      path.resolve(uniqueResponseDir, 'input.json'),
      JSON.stringify(response.prompt)
    );
    fs.writeFileSync(
      path.resolve(uniqueResponseDir, 'output.json'),
      JSON.stringify(response.response)
    );

    // Create the code file
    const file = toFile(response.response);
    if (file == null) {
      console.error('No file to create!');
      return;
    }
    fs.writeFileSync(path.resolve(codeDir, file.name), file.content);
  });
};
