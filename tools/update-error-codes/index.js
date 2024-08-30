/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const errorCodeFilePath = path.resolve(
  __dirname,
  '../../packages/core/shared/src/error-code.ts'
);
const serviceErrorFilePath = path.resolve(
  __dirname,
  '../../packages/core/shared/src/service-error.ts'
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the new error code: ', (newErrorCode) => {
  const newInterface = toPascalCase(newErrorCode);

  const newErrorInterface = `
export interface ${newInterface}Error {
  code: ErrorCode.${newErrorCode};
  params: {
    detail: string;
  };
}
`;

  // Step 1: Update error-code.ts
  function updateErrorCodeFile() {
    let errorCodeFileContent = fs.readFileSync(errorCodeFilePath, 'utf8');
    const errorCodeEnumPattern = /export enum ErrorCode \{([\s\S]*?)\}/;
    const match = errorCodeFileContent.match(errorCodeEnumPattern);

    if (match) {
      const enumContent = match[1];
      const updatedEnumContent = `${enumContent.trim()},\n  ${newErrorCode} = '${newErrorCode}'`;
      errorCodeFileContent = errorCodeFileContent.replace(
        enumContent,
        updatedEnumContent
      );
      fs.writeFileSync(errorCodeFilePath, errorCodeFileContent, 'utf8');
      console.log('Updated error-code.ts');
    } else {
      console.error('ErrorCode enum not found in error-code.ts');
    }
  }

  // Step 2: Update service-error.ts
  function updateServiceErrorFile() {
    let serviceErrorFileContent = fs.readFileSync(serviceErrorFilePath, 'utf8');

    // Insert new error interface above BaseError
    const baseErrorPattern = /export interface BaseError \{/;
    serviceErrorFileContent = serviceErrorFileContent.replace(
      baseErrorPattern,
      `${newErrorInterface}\nexport interface BaseError {`
    );

    // Exclude new error from BaseError
    const baseErrorExcludePattern =
      /code: Exclude<([\s\S]*?)>\s*;\s+params\?: never;/;
    const baseErrorExcludeMatch = serviceErrorFileContent.match(
      baseErrorExcludePattern
    );

    if (baseErrorExcludeMatch) {
      const baseErrorExcludeContent = baseErrorExcludeMatch[1];
      const updatedBaseErrorExcludeContent = `${baseErrorExcludeContent.trim()} | ErrorCode.${newErrorCode}`;
      serviceErrorFileContent = serviceErrorFileContent.replace(
        baseErrorExcludeContent,
        updatedBaseErrorExcludeContent
      );
    } else {
      console.error('BaseError type not found in service-error.ts');
    }
    // Add new error to ServiceError union type
    const serviceErrorPattern = /export type ServiceError =([\s\S]*?);/;
    const serviceErrorMatch =
      serviceErrorFileContent.match(serviceErrorPattern);

    if (serviceErrorMatch) {
      const serviceErrorContent = serviceErrorMatch[1];
      const updatedServiceErrorContent = `${serviceErrorContent.trim()} | ${newInterface}Error`;
      serviceErrorFileContent = serviceErrorFileContent.replace(
        serviceErrorContent,
        updatedServiceErrorContent
      );
      fs.writeFileSync(serviceErrorFilePath, serviceErrorFileContent, 'utf8');
      console.log('Updated service-error.ts');
    } else {
      console.error('ServiceError type not found in service-error.ts');
    }
  }

  // Execute the updates
  updateErrorCodeFile();
  updateServiceErrorFile();

  rl.close();
});

function toPascalCase(snakeCaseString) {
  return snakeCaseString
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
