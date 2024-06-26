import readline from 'readline';

export const getUserInput = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(prompt, (input: string) => {
      rl.close();
      resolve(input);
    });
  });
};
