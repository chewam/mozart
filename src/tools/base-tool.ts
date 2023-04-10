export abstract class BaseTool {
  name: string
  description: string

  constructor({ name, description }: { name: string; description: string }) {
    this.name = name
    this.description = description
  }

  abstract run(input: string): Promise<string>
}
