import handlebars from 'handlebars';

import { readFile } from 'fs';

import { promisify } from 'util';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const readAsync = promisify(readFile);

    const bufferTemplateFile = await readAsync(file, { encoding: 'utf8' });

    const parseTemplate = handlebars.compile(bufferTemplateFile);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
